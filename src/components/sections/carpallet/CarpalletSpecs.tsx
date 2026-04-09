'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'

const EASE = 'easeOut'

const SPECS = [
  { clave: 'Material',                  valor: 'Cartón corrugado de alta densidad' },
  { clave: 'Dimensiones disponibles',   valor: '1200×800mm / 1200×1000mm / A medida' },
  { clave: 'Peso propio',               valor: 'Aproximadamente 3–5 kg (según medida)' },
  { clave: 'Carga máxima estática',     valor: 'Consultar según modelo' },
  { clave: 'Carga máxima dinámica',     valor: 'Consultar según modelo' },
  { clave: 'Resistencia a la humedad',  valor: 'Tratamiento hidrófugo disponible' },
  { clave: 'Apto para',                 valor: 'Exportación aérea, industria alimentaria, farmacéutica' },
  { clave: 'Reciclable',                valor: '100%' },
  { clave: 'Requiere NIMF-15',          valor: 'No' },
]

export default function CarpalletSpecs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="especificaciones" ref={ref} className="py-14 md:py-20 lg:py-28 px-4 md:px-8 bg-brand-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">

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
            <em className="text-brand-brown">CarPallet</em>
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
                <span className="text-[10px] uppercase tracking-wide text-brand-tan sm:shrink-0">
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
          className="flex flex-col gap-0"
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
        >
          {/* Imagen / Placeholder */}
          <div className="relative aspect-4/3 bg-brand-sand overflow-hidden">
            {/*
            <Image
              src="/images/carpallet/carpallet-detalle.jpg"
              alt="Detalle pallet de cartón CarPallet"
              fill
              className="object-cover"
            />
            */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brand-tan/40">
              <span className="text-5xl">📦</span>
              <span className="text-[9px] uppercase tracking-widest">carpallet-detalle.jpg</span>
              <span className="text-[8px] text-brand-tan/30">/public/images/carpallet/carpallet-detalle.jpg</span>
            </div>
          </div>

          {/* Bloque CTA debajo de la imagen */}
          <div className="bg-brand-dark p-6 flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-wide text-accent-gold">
              ¿Dudás entre madera y cartón?
            </p>
            <p className="text-sm text-brand-cream leading-relaxed">
              Nuestros asesores te ayudan a elegir el producto correcto para tu operación.
            </p>
            <a
              href={WHATSAPP_LINKS.carton}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold self-start text-xs px-5 py-2.5"
            >
              <FaWhatsapp className="text-sm" />
              Consultar ahora
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
