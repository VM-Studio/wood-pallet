'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = 'easeOut'

export default function TrajectorySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4 md:px-8"
      style={{ background: 'linear-gradient(135deg, #6B3F1A 0%, #1C1208 100%)' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Imagen / Placeholder */}
        <motion.div
          className="relative order-2 md:order-1"
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="relative aspect-4/5 bg-brand-dark/50 border border-brand-tan/10 overflow-hidden">
            {/*
            <Image
              src="/images/fabrica.jpg"
              alt="Fábrica Wood Pallet en Tigre"
              fill
              className="object-cover"
            />
            */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brand-tan/30">
              <span className="text-5xl">🏭</span>
              <span className="text-[10px] uppercase tracking-widest">fabrica.jpg</span>
              <span className="text-[9px]">/public/images/fabrica.jpg</span>
            </div>

            {/* Tag año */}
            <div className="absolute top-5 left-5 bg-accent-gold px-4 py-2">
              <span className="text-[10px] uppercase tracking-widest text-brand-dark font-semibold">
                Desde 2012
              </span>
            </div>
          </div>

          {/* Linea deco */}
          <motion.span
            className="absolute -bottom-4 -right-4 h-px bg-accent-gold/40 hidden md:block"
            style={{ display: 'block', bottom: -16, right: -16 }}
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          />
        </motion.div>

        {/* Texto */}
        <div className="order-1 md:order-2 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="section-label mb-4" style={{ color: 'rgb(var(--color-accent-gold) / 0.75)' }}>
              Nuestra historia
            </p>
          </motion.div>

          <motion.h2
            className="font-light leading-tight text-brand-cream"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          >
            Una empresa familiar con más de una{' '}
            <em className="text-accent-gold">década</em> de{' '}
            <em className="text-accent-gold">experiencia</em>
          </motion.h2>

          <motion.span
            className="h-px bg-accent-gold/50 block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            style={{ maxWidth: 48 }}
          />

          <div className="flex flex-col gap-5">
            {[
              'Wood Pallet nació en 2012 en Tigre, Buenos Aires, con la convicción de que los palets de madera de calidad son la base de una cadena logística eficiente. Lo que empezó como un taller familiar hoy es una empresa consolidada con capacidad de producción a gran escala.',
              'Fabricamos pallets NIMF 15 certificados para exportación, con maderas seleccionadas y procesos de secado que garantizan resistencia y durabilidad. Cada palet que sale de nuestra planta cumple con estándares nacionales e internacionales.',
              'Trabajamos con empresas de todos los rubros: alimentación, construcción, cementeras, farmacias y logística general. Nuestra flexibilidad para fabricar medidas especiales a pedido nos distingue en el mercado del Gran Buenos Aires.',
            ].map((text, i) => (
              <motion.p
                key={i}
                className="text-brand-sand/75 leading-relaxed text-[0.9375rem]"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.1 }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Métricas inline */}
          <motion.div
            className="flex gap-8 pt-4 border-t border-brand-tan/15"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
          >
            {[
              { num: '+10', label: 'Años en el mercado' },
              { num: '7', label: 'Tipos de pallet' },
              { num: 'NIMF 15', label: 'Certificación exportación' },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-extralight text-brand-cream text-2xl tracking-tight">
                  {num}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-brand-tan/60">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
