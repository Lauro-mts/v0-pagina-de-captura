import { NextRequest, NextResponse } from 'next/server'

// this should match the URL from the previous script deployment
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxTqZW_xP4t_XJ7rNwOiTlCxvRxirfMj4Yd6M3-4qi-fq4H6GBbHefUxi1zYkUJfPzQ/exec'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // forward the payload to the Apps Script web‑app
    // Google Apps Script redirects POST requests — use 'manual' to avoid losing the body on redirect
    const res = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      redirect: 'manual',
    })

    console.log('[Sheets Proxy] response status:', res.status, res.type)

    // 2xx = success, 3xx = redirect (Google processes before redirecting — treat as ok)
    if (res.status >= 400) {
      const text = await res.text()
      console.error('[Sheets Proxy] response not ok', res.status, text)
    }
  } catch (err) {
    console.error('[Sheets Proxy] failed to post lead', err)
  }

  // always respond success to the client; the main work happens server‑side
  return NextResponse.json({ ok: true })
}
