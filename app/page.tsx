'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LeadCaptureModal } from '@/components/lead-capture-modal'
import { ChatMockup } from '@/components/chat-mockup'
import { 
  Check, 
  ArrowRight, 
  Bot,
  MessageSquare,
  Scale,
  CheckCircle2
} from 'lucide-react'

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCTAClick = () => {
    setIsModalOpen(true)
  }

  const handleSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Success message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#10B981] text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
        >
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-medium">Vaga reservada! Você receberá as instruções no seu e-mail.</span>
        </motion.div>
      )}

      {/* Header/Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lexa%20logo%20roxo-LQT1LMHQJrKOJfAqTBf0zvI6bmgo83.png"
              alt="Lexa"
              width={100}
              height={40}
              className="h-8 lg:h-10 w-auto"
            />
            
            {/* CTA Button */}
            <Button
              onClick={handleCTAClick}
              className="bg-[#6C63FF] hover:bg-[#5B54E8] text-white font-semibold px-4 lg:px-6 h-10 lg:h-11 rounded-full shadow-[0_0_20px_rgba(108,99,255,0.4)] hover:shadow-[0_0_30px_rgba(108,99,255,0.6)] transition-all duration-300"
            >
              <span className="hidden sm:inline">QUERO MINHA VAGA</span>
              <span className="sm:hidden">INSCREVER</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-24 pb-12 lg:pb-16 overflow-hidden">
        {/* Grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#2D2A6E 1px, transparent 1px), linear-gradient(90deg, #2D2A6E 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left column - Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <Badge className="inline-flex items-center gap-2 bg-[#2D2A6E]/5 text-[#2D2A6E] border-[#2D2A6E]/20 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                AO VIVO · 19 DE MARÇO · 20H
              </Badge>
              
              {/* Headline */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-[#2D2A6E] leading-tight mb-3 text-balance">
                CONGRESSO EXCLUSIVO PARA ADVOGADOS E DONOS DE ESCRITÓRIOS DE ADVOCACIA
              </h1>
              
              {/* Subheadline */}
              <p className="text-base lg:text-lg text-[#555566] mb-5 leading-relaxed text-pretty">
                Descubra como colocar Inteligência Artificial na Advocacia que Qualifica e Converte os Seus Leads
              </p>
              
              {/* Bullet points */}
              <ul className="space-y-2 mb-5 text-left inline-block">
                {[
                  '100% Validada',
                  '100% Criada por Engenheiros, Programadores e Donos de Escritório',
                  'Não alucina',
                  'Em média DOBRA a Conversão dos Leads no WhatsApp',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#6C63FF] shrink-0 mt-0.5" />
                    <span className="text-[#111111]">{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <div className="space-y-2">
                <Button
                  onClick={handleCTAClick}
                  size="lg"
                  className="w-full sm:w-auto bg-[#6C63FF] hover:bg-[#5B54E8] text-white font-bold text-sm lg:text-base px-6 h-12 lg:h-14 rounded-xl shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:shadow-[0_0_40px_rgba(108,99,255,0.6)] transition-all duration-300"
                >
                  QUERO GARANTIR MINHA VAGA
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                {/* Urgency line */}
                <p className="flex items-center justify-center lg:justify-start gap-2 text-xs text-[#555566]">
                  Evento 100% gratuito e online
                </p>
              </div>
            </motion.div>
            
            {/* Right column - Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <ChatMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-[#2D2A6E] text-balance">
              O que você vai descobrir no congresso
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Bot,
                title: 'IA que Qualifica',
                description: 'Como usar IA para filtrar e qualificar leads antes de chegar na sua equipe',
              },
              {
                icon: MessageSquare,
                title: 'Conversão no WhatsApp',
                description: 'Scripts e fluxos inteligentes que dobram suas taxas de conversão',
              },
              {
                icon: Scale,
                title: 'Específico para Advocacia',
                description: 'Desenvolvido por advogados e especialistas em tecnologia jurídica',
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #6C63FF 0%, #2D2A6E 100%) border-box',
                  border: '2px solid transparent',
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#6C63FF] group-hover:text-white transition-colors duration-300">
                  <card.icon className="w-7 h-7 text-[#6C63FF] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#2D2A6E] mb-2">{card.title}</h3>
                <p className="text-[#555566] leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="py-16 lg:py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-[#2D2A6E] text-center mb-12 text-balance">
              Este evento é para você se...
            </h2>
            
            <ul className="space-y-4">
              {[
                'Você é advogado ou dono de escritório de advocacia',
                'Você recebe leads e tem dificuldade de qualificá-los',
                'Você quer escalar seu escritório sem aumentar a equipe proporcionalmente',
                'Você ainda não usa IA no seu processo comercial',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 lg:p-5 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-[#6C63FF]/10 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-[#6C63FF]" />
                  </div>
                  <span className="text-[#111111] font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#2D2A6E]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at center, #6C63FF 0%, transparent 50%)',
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Reserve sua vaga gratuita agora
            </h2>
            <p className="text-xl text-white/80 mb-8">
              19 de Março · 20h · Online e Ao Vivo
            </p>
            
            <Button
              onClick={handleCTAClick}
              size="lg"
              className="bg-white text-[#2D2A6E] hover:bg-white/90 font-bold text-lg px-10 h-16 rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              QUERO PARTICIPAR
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-white/70 mt-6 text-sm">
              Evento 100% gratuito e online
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#1A1744]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lexa%20logo%20cinza%20claro-fsAc5IERXi1PYb6LwOVbnRFXeQSTSu.png"
              alt="Lexa"
              width={80}
              height={32}
              className="h-6 w-auto opacity-60"
            />
            <p className="text-white/50 text-sm">
              © 2025 Lexa · Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>

      {/* Lead Capture Modal */}
      <Suspense fallback={null}>
        <LeadCaptureModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSuccess={handleSuccess}
        />
      </Suspense>
    </div>
  )
}
