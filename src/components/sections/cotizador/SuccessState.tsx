'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { DatosCotizacion } from '@/lib/cotizadorConfig'
import { TIPOS_PALLET } from '@/lib/cotizadorConfig'
import { EMPRESA } from '@/lib/constants'

interface SuccessStateProps {
  datos: DatosCotizacion
  onReset: () => void
}

export default function SuccessState({ datos, onReset }: SuccessStateProps) {
  const nombreTipo = TIPOS_PALLET.find((t) => t.id === datos.tipoPallet)?.nombre ?? datos.tipoPallet
  const whatsappMsg = encodeURIComponent(
    `Hola, acabo de enviar una consulta por ${datos.cantidad} ${nombreTipo}. ¿Me pueden confirmar disponibilidad?`
  )
  const whatsappLink = `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+', '')}&text=${whatsappMsg}&type=phone_number&app_absent=0`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center py-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.15 }}
        className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
        style={{ border: '2px solid #C9A84C' }}
      >
        <span style={{ color: '#C9A84C', fontSize: '32px' }}>✓</span>
      </motion.div>

      <h2 className="text-2xl md:text-3xl font-light text-brand-dark mb-3">
        ¡Consulta enviada!
      </h2>
      <p className="text-brand-tan mb-1">Te respondemos a la brevedad en:</p>
      <p className="font-medium text-brand-dark text-lg mb-3">{datos.email}</p>
      <p className="text-sm text-brand-tan mb-8 max-w-sm mx-auto">
        Revisá tu bandeja de entrada y también la carpeta de spam por si acaso.
      </p>

      <div className="bg-brand-dark p-6 mb-8 text-left max-w-sm mx-auto">
        <p className="text-brand-cream text-sm mb-1">
          {datos.cantidad} pallets {nombreTipo}
        </p>
        <div className="h-px bg-brand-tan/20 my-3" />
        <p className="text-xs text-brand-tan">
          {datos.requiereEnvio
            ? `Entrega en: ${datos.zonaEntrega}`
            : 'Retiro en planta · Tigre, Buenos Aires'}
        </p>
      </div>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full justify-center"
        >
          Confirmar por WhatsApp
        </a>
        <Link href="/productos" className="btn-primary w-full justify-center text-center">
          Ver catálogo completo
        </Link>
        <button
          onClick={onReset}
          className="text-sm text-brand-tan hover:text-brand-dark transition-colors underline underline-offset-4"
        >
          Hacer otra consulta
        </button>
      </div>
    </motion.div>
  )
}
