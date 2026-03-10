'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'

export default function ObrigadoPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

  // Data do congresso - ajuste conforme necessário
  const congressDate = new Date('2026-03-20T19:00:00')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = congressDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000) // Atualiza a cada minuto

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lexa%20logo%20roxo-LQT1LMHQJrKOJfAqTBf0zvI6bmgo83.png"
            alt="Lexa"
            width={120}
            height={48}
            className="h-12 w-auto"
          />
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="text-center text-gray-600 text-sm">
            <span>50%</span>
          </div>
          <Progress value={50} className="h-2 bg-gray-200 [&>div]:bg-red-500" />
        </div>

        {/* Main content */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Sua vaga ainda não está garantida
          </h1>
          
          <p className="text-gray-700 text-lg">
            Clique no botão verde abaixo para finalizar a sua inscrição
          </p>
          
          <p className="text-gray-500 text-sm">
            Este é um grupo silencioso que enviaremos o link + Materiais e Informações importantes.
          </p>
        </div>

        {/* WhatsApp button */}
        <Button
          asChild
          className="w-full h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-all duration-300"
        >
          <a 
            href="https://chat.whatsapp.com/FO8lc3s8YE22SRniIJhpHK" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3"
          >
            <MessageCircle className="w-6 h-6" />
            Confirmar minha vaga
          </a>
        </Button>

        {/* Countdown */}
        <div className="pt-8 space-y-4">
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                <span className="text-3xl font-bold text-gray-900">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
              </div>
              <span className="text-gray-500 text-sm mt-2 block">Dias</span>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                <span className="text-3xl font-bold text-gray-900">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
              </div>
              <span className="text-gray-500 text-sm mt-2 block">Horas</span>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                <span className="text-3xl font-bold text-gray-900">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
              </div>
              <span className="text-gray-500 text-sm mt-2 block">Minutos</span>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm">
            para o Congresso
          </p>
        </div>
      </motion.div>
    </div>
  )
}
