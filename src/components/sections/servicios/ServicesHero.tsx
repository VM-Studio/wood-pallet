'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = 'easeOut'

export default function ServicesHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8 bg-brand-white">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">

        {/* Label */}
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
        >
          Lo que ofrecemos
        </motion.p>

        {/* H1 */}
        <motion.h1
          className="section-title"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
        >
          Más que pallets — un servicio{' '}
          <em className="em-gradient">completo</em>
        </motion.h1>

        {/* Línea dorada centrada */}
        <motion.span
          className="h-px bg-accent-gold block mx-auto"
          initial={{ width: 0 }}
          animate={inView ? { width: 48 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          style={{ maxWidth: 48 }}
        />

        {/* Párrafo */}
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE, delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold/10 border border-accent-gold/30 text-[10px] uppercase tracking-[0.18em] text-brand-brown">
            <span className="w-1.5 h-1.5 bg-accent-gold inline-block" />
            Empresa familiar con más de 10 años de trayectoria
          </span>
        </motion.div>

      </div>
    </section>
  )
}
