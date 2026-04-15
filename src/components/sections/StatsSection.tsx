'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = 'easeOut'

const STATS = [
  { num: '+20', unit: 'años',  label: 'de trayectoria familiar' },
  { num: '7',   unit: 'tipos', label: 'de pallets disponibles' },
  { num: '∞',   unit: 'stock', label: 'permanente todo el año' },
  { num: 'NIMF', unit: '15',   label: 'certificación exportación' },
]

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4 md:px-8"
      style={{ background: 'linear-gradient(135deg, #1C1208 0%, #0D0D0D 100%)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Título superior */}
        <motion.p
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <em
            className="text-brand-sand/60"
            style={{ fontSize: '1.25rem', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 300, letterSpacing: '0.01em' }}
          >
            Por qué elegir Wood Pallet
          </em>
        </motion.p>

        {/* Grid de métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map(({ num, unit, label }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center border border-brand-tan/10"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            >
              {/* Línea dorada decorativa arriba */}
              <span className="block h-px w-6 bg-accent-gold/40 mb-1" />

              <div className="flex items-end gap-1.5 leading-none">
                <span
                  className="font-extralight text-brand-cream"
                  style={{ fontSize: '3.75rem', letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {num}
                </span>
                <span
                  className="font-light text-accent-gold mb-1.5"
                  style={{ fontSize: '1rem' }}
                >
                  {unit}
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-brand-tan/50">{label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
