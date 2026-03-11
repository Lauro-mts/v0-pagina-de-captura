import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
 
const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-outfit"
});

export const metadata: Metadata = {
  title: 'Lexa | Congresso Exclusivo para Advogados',
  description: 'Descubra como colocar Inteligência Artificial na Advocacia que Qualifica e Converte os Seus Leads. Evento 100% gratuito e online.',
  generator: 'v0.app',
  icons: [
    { url: '/favicon.ico' },
    {
      url: '/icon-light-32x32.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/icon-dark-32x32.png',
      media: '(prefers-color-scheme: dark)',
    },
    {
      url: '/icon.svg',
      type: 'image/svg+xml',
    },
  ],
  apple: '/apple-icon.png',
}

export const viewport: Viewport = {
  themeColor: '#2D2A6E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5ZGPB3RT');`,
          }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5ZGPB3RT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
