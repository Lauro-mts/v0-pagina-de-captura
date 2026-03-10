'use client'

import { motion } from 'framer-motion'
import { Check, CheckCheck } from 'lucide-react'

export function ChatMockup() {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/20 to-[#2D2A6E]/20 blur-3xl rounded-full scale-110" />
      
      {/* Phone mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative bg-[#111111] rounded-[2.5rem] p-2 shadow-2xl max-w-[320px] mx-auto"
      >
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#111111] rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="bg-[#0B141A] rounded-[2rem] overflow-hidden">
          {/* WhatsApp header */}
          <div className="bg-[#202C33] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#2D2A6E] flex items-center justify-center">
              <span className="text-white font-bold text-sm">IA</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Lexa IA</p>
              <p className="text-[#8696A0] text-xs">online</p>
            </div>
          </div>
          
          {/* Chat area */}
          <div className="p-3 space-y-2 min-h-[320px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzBCMTQxQSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSIjMTIyMjI5Ii8+Cjwvc3ZnPg==')] bg-repeat">
            {/* Pergunta 1 - Cliente */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end"
            >
              <div className="bg-[#005C4B] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%]">
                <p className="text-white text-xs">
                  Olá, quero saber se tenho direito ao BPC/LOAS
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[#8696A0] text-[10px]">14:32</span>
                  <CheckCheck className="w-3 h-3 text-[#53BDEB]" />
                </div>
              </div>
            </motion.div>
            
            {/* Resposta 1 - IA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-start"
            >
              <div className="bg-[#202C33] rounded-lg rounded-tl-none px-3 py-2 max-w-[85%]">
                <p className="text-white text-xs">
                  Olá, eu sou a Raquel, irei te atender e verificar se você possui o direito ao benefício. Para iniciarmos, qual o seu nome?
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[#8696A0] text-[10px]">14:32</span>
                </div>
              </div>
            </motion.div>
            
            {/* Pergunta 2 - Cliente */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="flex justify-end"
            >
              <div className="bg-[#005C4B] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%]">
                <p className="text-white text-xs">
                  Maria de Lourdes
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[#8696A0] text-[10px]">14:33</span>
                  <CheckCheck className="w-3 h-3 text-[#53BDEB]" />
                </div>
              </div>
            </motion.div>
            
            {/* Resposta 2 - IA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="flex justify-start"
            >
              <div className="bg-[#202C33] rounded-lg rounded-tl-none px-3 py-2 max-w-[85%]">
                <p className="text-white text-xs">
                  Perfeito, e quantos anos você tem?
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[#8696A0] text-[10px]">14:33</span>
                </div>
              </div>
            </motion.div>
            
            {/* Pergunta 3 - Cliente */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 }}
              className="flex justify-end"
            >
              <div className="bg-[#005C4B] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%]">
                <p className="text-white text-xs">
                  Faço 65 anos em julho
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[#8696A0] text-[10px]">14:34</span>
                  <CheckCheck className="w-3 h-3 text-[#53BDEB]" />
                </div>
              </div>
            </motion.div>
            
            {/* Typing indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
              className="flex justify-start"
            >
              <div className="bg-[#202C33] rounded-lg rounded-tl-none px-4 py-3">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 200 }}
        className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 bg-white rounded-xl p-4 shadow-xl border border-[#E5E5EA]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center">
            <Check className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111111]">Lead qualificado</p>
            <p className="text-xs text-[#10B981] font-medium">Conversão: +112%</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
