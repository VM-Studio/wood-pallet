'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { FaWhatsapp, FaCheck } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'

const EASE = 'easeOut'

const BULLETS = [
  'Hasta 70% más liviano que el pallet de madera',
  '100% reciclable — compromiso ambiental',
  'Apto para industria alimentaria y farmacéutica',
]

export default function CarpalletHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="px-4 md:px-8 bg-brand-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[55fr_45fr] min-h-130">

        {/* Columna izquierda */}
        <div className="flex flex-col justify-center gap-6 py-20 md:py-28 md:pr-12">

          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-2 text-xs text-brand-tan"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-brand-dark transition-colors duration-200">
              Inicio
            </Link>
            <span className="text-brand-sand">/</span>
            <span className="text-brand-dark">Pallet de Cartón</span>
          </motion.nav>

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
            <em className="text-accent-gold">cartón</em>
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
            className="text-sm text-brand-tan leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
          >
            Una alternativa moderna, liviana y ecológica al pallet de madera
            tradicional. Ideal para exportación aérea, industria alimentaria
            y empresas que priorizan la sustentabilidad.
          </motion.p>

          {/* Bullets */}
          <motion.ul
            className="flex flex-col gap-2.5"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
          >
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-brand-dark">
                <FaCheck className="text-accent-green mt-0.5 shrink-0 text-[10px]" />
                {b}
              </li>
            ))}
          </motion.ul>

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
        <div className="bg-brand-cream flex items-center justify-center p-8 md:p-12 min-h-75">
          <motion.div
            className="relative w-full"
            style={{ maxWidth: 420 }}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
          >
            {/* Imagen / Placeholder */}
            <div className="relative aspect-4/3 bg-brand-sand overflow-hidden">
              {/*
              <Image
                src="/images/carpallet/pallet-carton.jpg"
                alt="Pallet de Cartón CarPallet — Wood Pallet Tigre"
                fill
                className="object-cover"
              />
              */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brand-tan/40">
                <span className="text-5xl">📦</span>
                <span className="text-[9px] uppercase tracking-widest">pallet-carton.jpg</span>
                <span className="text-[8px] text-brand-tan/30">/public/images/carpallet/pallet-carton.jpg</span>
              </div>

              {/* Tag WhatsApp superpuesto */}
              <a
                href={WHATSAPP_LINKS.carton}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-0 right-0 bg-brand-dark text-brand-cream text-[10px] uppercase tracking-wide px-4 py-2.5 hover:bg-brand-brown transition-colors duration-200"
              >
                Cotizar por WhatsApp →
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
