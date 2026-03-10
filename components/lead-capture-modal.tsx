'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Scale, Users, BarChart3, Rocket, User, Building2, Check, Lock } from 'lucide-react'

interface LeadCaptureModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

type Step = 1 | 2 | 3 | 4

interface UTMParams {
  utm_source: string
  utm_campaign: string
  utm_medium: string
  utm_content: string
  utm_term: string
  fbclid: string
}

interface FormData {
  perfil: string
  equipe: string
  leads: string
  nome: string
  email: string
  telefone: string
}

const perfilOptions = [
  { id: 'advogado', label: 'Sou advogado ou dono de escritório', icon: Scale },
  { id: 'interessado', label: 'Sou apenas interessado no assunto', icon: User },
]

const equipeOptions = [
  { id: 'apenas-eu', label: 'Apenas eu', icon: User },
  { id: '2-5', label: 'Entre 2 a 5 pessoas', icon: Users },
  { id: '6-10', label: 'Entre 6 a 10 pessoas', icon: Building2 },
  { id: '10+', label: 'Mais de 10 pessoas', icon: Building2 },
]

const leadsOptions = [
  { id: 'menos-50', label: 'Menos de 50', icon: BarChart3 },
  { id: '51-100', label: 'Entre 51 a 100', icon: BarChart3 },
  { id: '101-400', label: 'Entre 101 a 400', icon: BarChart3 },
  { id: '400+', label: 'Mais de 400', icon: Rocket },
]

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwI72jE8hP2T9J1kySB_Vf0suTncv5jWDNAuhoWsYFFRvRUT_kse2OsdSXynbGXjt1R/exec'

export function LeadCaptureModal({ open, onOpenChange, onSuccess }: LeadCaptureModalProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [leadId] = useState(() => crypto.randomUUID())
  const [formData, setFormData] = useState<FormData>({
    perfil: '',
    equipe: '',
    leads: '',
    nome: '',
    email: '',
    telefone: '',
  })
  const [utmParams, setUtmParams] = useState<UTMParams>({
    utm_source: '',
    utm_campaign: '',
    utm_medium: '',
    utm_content: '',
    utm_term: '',
    fbclid: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Captura os parâmetros UTM da URL quando o componente é montado
  useEffect(() => {
    setUtmParams({
      utm_source: searchParams.get('utm_source') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_content: searchParams.get('utm_content') || '',
      utm_term: searchParams.get('utm_term') || '',
      fbclid: searchParams.get('fbclid') || '',
    })
  }, [searchParams])

  const sendPartial = (partial: Partial<FormData>) => {
    const merged = { ...formData, ...partial }
    const body = JSON.stringify({
      id: leadId,
      source: 'webnario',
      name: merged.nome,
      email: merged.email,
      phone: merged.telefone,
      teamSize: merged.equipe,
      leadsPerMonth: merged.leads,
      practiceArea: merged.perfil,
      timestamp: new Date().toISOString(),
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_content: utmParams.utm_content,
      utm_term: utmParams.utm_term,
      fbclid: utmParams.fbclid,
    })
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body,
    }).catch(() => {})
  }

  const handleOptionSelect = (field: keyof FormData, value: string) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    sendPartial({ [field]: value })
    // Auto advance to next step after selection
    if (step < 4) {
      setTimeout(() => {
        setStep((prev) => (prev + 1) as Step)
      }, 300)
    }
  }

  const formatPhone = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '')
    
    // Limita a 11 dígitos
    const limited = numbers.slice(0, 11)
    
    // Aplica a máscara (11) 99999-9999
    if (limited.length <= 2) {
      return limited.length ? `(${limited}` : ''
    } else if (limited.length <= 7) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
    } else {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData(prev => ({ ...prev, telefone: formatted }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    sendPartial({})

    try {
      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          source: 'webnario',
          name: formData.nome,
          email: formData.email,
          phone: formData.telefone,
          teamSize: formData.equipe,
          leadsPerMonth: formData.leads,
          practiceArea: formData.perfil,
          timestamp: new Date().toISOString(),
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          utm_content: utmParams.utm_content,
          utm_term: utmParams.utm_term,
          fbclid: utmParams.fbclid,
        }),
      })
    } catch (err) {
      console.error('[Sheets] Erro no envio final:', err)
    }

    setIsSubmitting(false)
    onOpenChange(false)

    // Reset form
    setStep(1)
    setFormData({
      perfil: '',
      equipe: '',
      leads: '',
      nome: '',
      email: '',
      telefone: '',
    })

    // Redireciona para a página de obrigado
    router.push('/obrigado')
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.perfil !== ''
      case 2:
        return formData.equipe !== ''
      case 3:
        return formData.leads !== ''
      case 4:
        return formData.nome !== '' && formData.email !== '' && formData.telefone !== ''
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepContent
            title="Qual é o seu perfil?"
            options={perfilOptions}
            selectedValue={formData.perfil}
            onSelect={(value) => handleOptionSelect('perfil', value)}
          />
        )
      case 2:
        return (
          <StepContent
            title="Quantas pessoas atuam na sua equipe comercial/atendimento?"
            options={equipeOptions}
            selectedValue={formData.equipe}
            onSelect={(value) => handleOptionSelect('equipe', value)}
          />
        )
      case 3:
        return (
          <StepContent
            title="Quantos leads você recebe por mês?"
            options={leadsOptions}
            selectedValue={formData.leads}
            onSelect={(value) => handleOptionSelect('leads', value)}
          />
        )
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-[#2D2A6E] text-center">
              Ótimo! Agora reserve sua vaga:
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Nome completo"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  onBlur={(e) => sendPartial({ nome: e.target.value })}
                  className="h-12 bg-white border-[#E5E5EA] focus:border-[#6C63FF] focus:ring-[#6C63FF]/20"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  onBlur={(e) => sendPartial({ email: e.target.value })}
                  className="h-12 bg-white border-[#E5E5EA] focus:border-[#6C63FF] focus:ring-[#6C63FF]/20"
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  onBlur={(e) => sendPartial({ telefone: e.target.value })}
                  className="h-12 bg-white border-[#E5E5EA] focus:border-[#6C63FF] focus:ring-[#6C63FF]/20"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={!canProceed() || isSubmitting}
                className="w-full h-14 bg-[#6C63FF] hover:bg-[#5B54E8] text-white font-bold text-base rounded-xl shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:shadow-[0_0_40px_rgba(108,99,255,0.6)] transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Reservando...
                  </span>
                ) : (
                  'GARANTIR MINHA VAGA GRATUITA'
                )}
              </Button>
              <p className="text-center text-sm text-[#555566] flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Seus dados estão seguros. Não enviamos spam.
              </p>
            </form>
          </motion.div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        showCloseButton={false}
        className="sm:max-w-[480px] p-0 overflow-hidden bg-white border-0 shadow-2xl"
        style={{
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #6C63FF 0%, #2D2A6E 100%) border-box',
          border: '2px solid transparent',
          borderRadius: '1rem',
        }}
      >
        <DialogTitle className="sr-only">Reservar Vaga no Congresso</DialogTitle>
        <div className="p-6 pt-10">
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F5F5F7] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-[#555566]" />
          </button>

          {/* Step content */}
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface StepContentProps {
  title: string
  options: Array<{ id: string; label: string; icon: React.ElementType }>
  selectedValue: string
  onSelect: (value: string) => void
}

function StepContent({ title, options, selectedValue, onSelect }: StepContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold text-[#2D2A6E] text-center mb-6">
        {title}
      </h3>
      <div className="space-y-3">
        {options.map((option) => {
          const Icon = option.icon
          const isSelected = selectedValue === option.id
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 text-left ${
                isSelected
                  ? 'border-[#6C63FF] bg-[#6C63FF]/5 shadow-[0_0_20px_rgba(108,99,255,0.2)]'
                  : 'border-[#E5E5EA] bg-white hover:border-[#6C63FF]/50 hover:bg-[#F5F5F7]'
              }`}
            >
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#6C63FF] text-white' : 'bg-[#F5F5F7] text-[#555566]'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`font-medium ${isSelected ? 'text-[#2D2A6E]' : 'text-[#111111]'}`}>
                {option.label}
              </span>
              {isSelected && (
                <Check className="w-5 h-5 text-[#6C63FF] ml-auto" />
              )}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
