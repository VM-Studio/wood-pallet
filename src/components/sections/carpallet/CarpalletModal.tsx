'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'

export default function CarpalletModal() {
  const router = useRouter()

  // Bloquear scroll mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <AnimatePresence>
      {/* Backdrop con blur */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(28,18,8,0.55)' }}
      >
        {/* Panel */}
        <motion.div
          key="panel"
          className="relative w-full max-w-md bg-brand-white border border-brand-sand p-8 md:p-10 flex flex-col gap-6"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Label */}
          <p className="section-label">Pallet de Cartón</p>

          {/* Línea dorada */}
          <span className="h-px w-12 bg-accent-gold block" />

          {/* Título */}
          <h2 className="text-2xl md:text-3xl font-light text-brand-dark leading-snug">
            Por el momento no estamos{' '}
            <em className="em-gradient">fabricando pallets de cartón</em>
          </h2>

          {/* Descripción */}
          <p className="text-sm text-brand-dark/60 leading-relaxed">
            Si tenés una consulta o querés que te avisemos cuando esté disponible, escribinos por WhatsApp.
          </p>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={WHATSAPP_LINKS.carton}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex-1 justify-center text-xs py-3"
            >
              <FaWhatsapp className="text-sm" />
              Consultar por WhatsApp
            </a>
            <button
              onClick={() => router.back()}
              className="btn-outline flex-1 justify-center text-xs py-3 flex items-center"
            >
              Volver atrás
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
