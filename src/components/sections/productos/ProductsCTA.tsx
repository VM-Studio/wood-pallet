'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { FaWhatsapp, FaWarehouse, FaBoxOpen, FaGlobeAmericas } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'

const EASE = 'easeOut'

const TRUST = [
  {
    Icon: FaWarehouse,
    line1: 'Planta propia',
    line2: 'Tigre, Buenos Aires',
  },
  {
    Icon: FaBoxOpen,
    line1: 'Stock permanente',
    line2: 'Entrega inmediata',
  },
  {
    Icon: FaGlobeAmericas,
    line1: 'Exportación',
    line2: 'Certificación NIMF-15',
  },
]

export default function ProductsCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4 md:px-8"
      style={{ background: 'linear-gradient(135deg, #6B3F1A 0%, #1C1208 100%)' }}
    >
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">

        {/* Label */}
        <motion.p
          className="section-label"
          style={{ color: 'rgba(200,168,76,0.7)' }}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE }}
        >
          ¿No encontraste lo que buscás?
        </motion.p>

        {/* H2 */}
        <motion.h2
          className="font-light text-brand-cream leading-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
        >
          Fabricamos a{' '}
          <em className="text-accent-gold">medida</em>
        </motion.h2>

        {/* Párrafo */}
        <motion.p
          className="text-brand-sand/80 leading-relaxed text-sm max-w-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.14 }}
        >
          Si necesitás dimensiones especiales, mayor capacidad de carga o un diseño
          específico para tu industria, contáctanos. Más de 10 años fabricando
          soluciones a medida.
        </motion.p>

        {/* Línea dorada centrada */}
        <motion.span
          className="h-px bg-accent-gold/50 block mx-auto"
          initial={{ width: 0 }}
          animate={inView ? { width: 48 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          style={{ maxWidth: 48 }}
        />

        {/* Botones */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.26 }}
        >
          <a
            href={WHATSAPP_LINKS.especiales}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <FaWhatsapp className="text-base" />
            Cotizar medida especial
          </a>

          <Link
            href="/servicios"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-none border text-sm tracking-wide bg-transparent hover:bg-brand-cream/10 transition-all duration-200 active:scale-95 cursor-pointer"
            style={{ borderColor: 'rgba(250,250,249,0.35)', color: '#FAFAF9' }}
          >
            Ver servicios →
          </Link>
        </motion.div>

        {/* Iconos de confianza */}
        <motion.div
          className="flex flex-col sm:flex-row gap-10 items-center justify-center pt-4 border-t w-full"
          style={{ borderColor: 'rgba(232,213,188,0.12)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.36 }}
        >
          {TRUST.map(({ Icon, line1, line2 }) => (
            <div key={line1} className="flex flex-col items-center gap-2">
              <Icon className="text-2xl text-accent-gold/60" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-wide text-brand-sand/60">{line1}</span>
                <span className="text-[10px] uppercase tracking-wide text-brand-sand/45">{line2}</span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
