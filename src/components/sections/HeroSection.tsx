'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { WHATSAPP_LINKS } from '@/lib/constants'

// Framer Motion v12: ease debe ser EasingFunction o string, no number[]
const EASE = 'easeOut'

function FadeUp({ children, delay = 0, inView }: {
  children: React.ReactNode
  delay?: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function HeroSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="min-h-[90vh] bg-linear-to-b from-brand-white via-brand-cream to-brand-sand"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Columna izquierda — Texto ── */}
          <div className="flex flex-col gap-8">

            {/* Label */}
            <FadeUp delay={0} inView={inView}>
              <p className="section-label">
                Fabricación y venta de pallets · Tigre, Buenos Aires
              </p>
            </FadeUp>

            {/* H1 */}
            <FadeUp delay={0.16} inView={inView}>
              <h1
                className="font-light text-brand-dark leading-tight"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
              >
                Líderes en{' '}
                <em className="text-brand-brown">pallets</em>{' '}
                de{' '}
                <em className="text-accent-gold">madera</em>
              </h1>
            </FadeUp>

            {/* Línea dorada */}
            <motion.span
              className="h-px bg-accent-gold block"
              initial={{ width: 0 }}
              animate={inView ? { width: 48 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
              style={{ maxWidth: 48 }}
            />

            {/* Párrafo */}
            <FadeUp delay={0.32} inView={inView}>
              <p className="text-brand-tan leading-relaxed max-w-md">
                Venta de pallets de madera nuevos y usados para uso local y exportación.{' '}
                <span className="font-medium text-brand-dark">Más de 20 años</span> de
                trayectoria familiar, stock permanente y tratamiento{' '}
                <span className="font-medium text-brand-dark">NIMF-15</span> certificado.
              </p>
            </FadeUp>

            {/* Botones */}
            <FadeUp delay={0.4} inView={inView}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={WHATSAPP_LINKS.general}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <FaWhatsapp className="text-base" />
                  Cotizar al instante
                </a>
                <Link href="/productos" className="btn-outline">
                  Ver productos
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* ── Columna derecha — Imagen ── */}
          <motion.div
            className="relative flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            {/* Imagen principal — proporción controlada */}
            <div className="relative w-full aspect-4/3 overflow-hidden bg-brand-sand">
              <Image
                src="/palletsNIMF.png"
                alt="Pallets de madera con certificación NIMF-15 — Wood Pallet Tigre"
                fill
                className="object-contain object-center"
                priority
              />
            </div>

            {/* Tarjeta flotante — separada debajo, no encima */}
            <div className="bg-brand-dark px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-brand-tan mb-1">
                  Certificación internacional
                </p>
                <p className="text-brand-sand/80 text-sm leading-relaxed">
                  Pallets con tratamiento{' '}
                  <em className="text-accent-gold">NIMF-15</em>{' '}
                  aptos para exportación
                </p>
              </div>
              <span
                className="text-accent-gold font-extralight shrink-0 leading-none"
                style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}
              >
                15
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
