'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaArrowRight, FaPhone } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { EMPRESA } from '@/lib/constants'

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
      className="bg-linear-to-b from-brand-white via-brand-cream to-brand-sand"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ── Columna izquierda — Texto ── */}
          <div className="flex flex-col gap-8">

            {/* H1 */}
            <FadeUp delay={0.08} inView={inView}>
              <h1
                className="font-light text-brand-dark leading-tight text-[2.6rem] md:text-[clamp(2rem,5vw,5.5rem)]"
                style={{ letterSpacing: '-0.03em', overflowWrap: 'break-word' }}
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
              <p className="text-brand-tan leading-relaxed text-sm sm:text-base sm:max-w-md">
                Venta de pallets de madera nuevos y usados para uso local y exportación.{' '}
                <span className="font-medium text-brand-dark">Más de 20 años</span> de
                trayectoria familiar, stock permanente y tratamiento{' '}
                <span className="font-medium text-brand-dark">NIMF-15</span> certificado.
              </p>
            </FadeUp>

            {/* Botones */}
            <FadeUp delay={0.4} inView={inView}>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <a
                  href={`tel:${EMPRESA.telefono.replace(/\s/g, '')}`}
                  className="btn-outline w-full sm:w-auto justify-center"
                >
                  {EMPRESA.telefono}
                  <FaPhone className="text-sm" />
                </a>
                <Link href="/productos" className="btn-outline w-full sm:w-auto justify-center">
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
            {/* Imagen principal */}
            <div className="relative w-full aspect-video md:aspect-4/3 overflow-hidden">
              <Image
                src="/palletseminuevo.png"
                alt="Pallets semi nuevos de madera — Wood Pallet Tigre"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
                priority
              />
            </div>

            {/* Tarjeta flotante — separada debajo, no encima */}
            <div className="bg-brand-dark px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-brand-tan mb-1">
                  Pallets semi nuevos
                </p>
                <p className="text-brand-sand/80 text-sm leading-relaxed">
                  La mejor relación{' '}
                  <em className="text-accent-gold">calidad-precio</em>{' '}
                  del mercado · Stock permanente
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
