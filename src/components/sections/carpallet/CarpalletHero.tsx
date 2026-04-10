'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'
import Image from 'next/image'

const EASE = 'easeOut'

export default function CarpalletHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="px-4 md:px-8 bg-brand-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[55fr_45fr]">

        {/* Columna izquierda */}
        <div className="flex flex-col justify-center gap-6 py-10 md:py-16 md:pr-12">

          {/* Label */}
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
          >
            Producto alternativo
          </motion.p>

          {/* H1 */}
          <motion.h1
            className="section-title"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          >
            El pallet de{' '}
            <em className="em-gradient">cartón</em>
            {' '}que tu logística necesita
          </motion.h1>

          {/* Línea dorada */}
          <motion.span
            className="h-px bg-accent-gold block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            style={{ maxWidth: 48 }}
          />

          {/* Párrafo */}
          <motion.p
            className="text-sm text-brand-dark/60 leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
          >
            Una alternativa moderna, liviana y ecológica al pallet de madera
            tradicional. Ideal para exportación aérea, industria alimentaria
            y empresas que priorizan la sustentabilidad.
          </motion.p>

          {/* Botones */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-2"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.34 }}
          >
            <a
              href={WHATSAPP_LINKS.carton}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <FaWhatsapp className="text-base" />
              Cotizar CarPallet
            </a>
            <a href="#especificaciones" className="btn-outline">
              Ver especificaciones técnicas
            </a>
          </motion.div>
        </div>

        {/* Columna derecha — fondo brand-cream */}
        <div className="bg-brand-cream flex items-center justify-center p-6 md:p-12 py-8 md:py-12">
          <motion.div
            className="relative w-full"
            style={{ maxWidth: 420 }}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
          >
            {/* Imagen */}
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/palletcarton.png"
                alt="Pallet de Cartón CarPallet — Wood Pallet Tigre"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-contain object-center"
                priority
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
