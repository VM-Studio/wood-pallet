'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = 'easeOut'

const CARDS = [
  {
    num: '56°C',
    texto: 'Temperatura mínima de tratamiento térmico requerida',
  },
  {
    num: "30'",
    texto: 'Minutos continuos de exposición al calor mínimos',
  },
  {
    num: 'IPPC',
    texto: 'Sello de certificación reconocido en todo el mundo',
  },
]

const PARRAFOS = [
  'NIMF-15 (Normas Internacionales para Medidas Fitosanitarias N° 15) es una normativa internacional que regula el tratamiento de materiales de embalaje de madera utilizados en el comercio internacional para prevenir la propagación de plagas y enfermedades.',
  'Todos los países que exportan e importan mercadería exigen que los pallets de madera utilizados en el comercio internacional hayan recibido un tratamiento fitosanitario aprobado y estén marcados con el sello IPPC correspondiente.',
  'En Wood Pallet aplicamos el tratamiento de calor (HT — Heat Treatment) certificado, que consiste en elevar la temperatura interna de la madera a 56°C durante al menos 30 minutos continuos, eliminando cualquier organismo vivo que pueda representar un riesgo.',
]

export default function NimfSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4 md:px-8"
      style={{ background: '#1C1208' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">

        {/* Columna izquierda — Explicación */}
        <div className="flex flex-col gap-7">
          <motion.p
            className="section-label"
            style={{ color: 'rgba(201,168,76,0.65)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Certificación internacional
          </motion.p>

          <motion.h2
            className="font-light text-brand-cream leading-tight"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          >
            ¿Qué es el{' '}
            <em className="text-accent-gold">NIMF-15</em>?
          </motion.h2>

          <motion.span
            className="h-px bg-accent-gold/50 block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            style={{ maxWidth: 48 }}
          />

          <div className="flex flex-col gap-5">
            {PARRAFOS.map((p, i) => (
              <motion.p
                key={i}
                className="text-brand-sand/80 leading-relaxed text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.22 + i * 0.09 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Columna derecha — Cards de datos */}
        <div className="flex flex-col gap-4">
          {CARDS.map(({ num, texto }, i) => (
            <motion.div
              key={num}
              className="group border border-brand-tan/20 hover:border-accent-gold/40 p-6 flex flex-col gap-3 transition-colors duration-300"
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE, delay: 0.18 + i * 0.1 }}
            >
              <span
                className="font-extralight text-accent-gold leading-none"
                style={{ fontSize: '2.8rem', letterSpacing: '-0.02em' }}
              >
                {num}
              </span>
              <p className="text-sm text-brand-sand/70 leading-snug">{texto}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
