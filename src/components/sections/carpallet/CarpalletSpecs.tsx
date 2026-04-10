'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const EASE = 'easeOut'

const SPECS = [
  { clave: 'Material',                  valor: 'Cartón corrugado de alta densidad' },
  { clave: 'Dimensiones disponibles',   valor: '1200×800mm / 1200×1000mm / A medida' },
  { clave: 'Peso propio',               valor: 'Aproximadamente 3–5 kg (según medida)' },
  { clave: 'Carga máxima estática',     valor: 'Consultar según modelo' },
  { clave: 'Carga máxima dinámica',     valor: 'Consultar según modelo' },
  { clave: 'Resistencia a la humedad',  valor: 'Tratamiento hidrófugo disponible' },
]

export default function CarpalletSpecs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="especificaciones" ref={ref} className="py-14 md:py-20 lg:py-28 px-4 md:px-8 bg-brand-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Columna izquierda — Especificaciones */}
        <div>
          {/* Header */}
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Ficha técnica
          </motion.p>
          <motion.h2
            className="section-title mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          >
            Especificaciones del{' '}
            <em className="em-gradient">CarPallet</em>
          </motion.h2>
          <motion.span
            className="h-px bg-accent-gold block mb-10"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            style={{ maxWidth: 48 }}
          />

          {/* Lista de specs */}
          <motion.div
            className="flex flex-col border-t border-brand-sand"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.22 }}
          >
            {SPECS.map(({ clave, valor }) => (
              <div
                key={clave}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 py-3.5 border-b border-brand-sand"
              >
                <span className="text-[10px] uppercase tracking-wide text-brand-dark/50 sm:shrink-0">
                  {clave}
                </span>
                <span className="text-sm font-medium text-brand-dark sm:text-right">{valor}</span>
              </div>
            ))}
          </motion.div>

          {/* Nota al pie */}
          <motion.p
            className="mt-5 text-xs text-brand-tan italic"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.36 }}
          >
            Las especificaciones exactas de carga varían según el modelo y las
            condiciones de uso. Consultá con nuestro equipo.
          </motion.p>
        </div>

        {/* Columna derecha — Imagen + bloque CTA */}
        <motion.div
          className="flex flex-col gap-0 mt-20"
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
        >
          {/* Imagen */}
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src="/palletcarton2.png"
              alt="Detalle pallet de cartón CarPallet"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
