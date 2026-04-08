'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'

const EASE = 'easeOut'

export default function ServicesCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4 md:px-8"
      style={{ background: 'linear-gradient(135deg, #6B3F1A 0%, #1C1208 100%)' }}
    >
      <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-7">

        {/* Label */}
        <motion.p
          className="section-label"
          style={{ color: 'rgba(201,168,76,0.7)' }}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE }}
        >
          ¿Necesitás más información?
        </motion.p>

        {/* H2 */}
        <motion.h2
          className="font-light text-brand-cream leading-tight"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
        >
          Hablemos de tu{' '}
          <em className="text-accent-gold">proyecto</em>
        </motion.h2>

        {/* Párrafo */}
        <motion.p
          className="text-brand-sand/70 leading-relaxed text-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.14 }}
        >
          Nuestro equipo está disponible para asesorarte sobre qué tipo de pallet
          y qué servicio se adapta mejor a tu operación. Respondemos al instante por WhatsApp.
        </motion.p>

        {/* Línea dorada */}
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
            href={WHATSAPP_LINKS.general}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <FaWhatsapp className="text-base" />
            Escribinos por WhatsApp
          </a>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-none border text-sm tracking-wide bg-transparent hover:bg-brand-cream/10 transition-all duration-200 active:scale-95 cursor-pointer"
            style={{ borderColor: 'rgba(250,250,249,0.35)', color: '#FAFAF9' }}
          >
            Ir a contacto
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
