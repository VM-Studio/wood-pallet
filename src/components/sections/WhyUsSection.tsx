'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = 'easeOut'

const VENTAJAS = [
  {
    num: '01',
    titulo: 'Calidad garantizada',
    emWord: 'garantizada',
    texto: 'Fabricamos con madera seleccionada y procesos de control rigurosos. Cada pallet sale de nuestra planta listo para usar.',
  },
  {
    num: '02',
    titulo: 'Logística propia',
    emWord: 'propia',
    texto: 'Contamos con flota propia para entrega en tiempo y forma. Cubrimos toda la provincia de Buenos Aires.',
  },
  {
    num: '03',
    titulo: 'Stock permanente',
    emWord: 'permanente',
    texto: 'Tenemos inventario disponible los 365 días del año. Tu cadena de suministro no se detiene.',
  },
  {
    num: '04',
    titulo: 'Certificación NIMF-15',
    emWord: 'NIMF-15',
    texto: 'Tratamiento fitosanitario certificado que habilita la exportación a cualquier destino sin restricciones aduaneras.',
  },
]

function buildTitle(titulo: string, emWord: string) {
  const parts = titulo.split(emWord)
  return (
    <>
      {parts[0]}
      <em className="text-brand-brown not-italic">{emWord}</em>
      {parts[1]}
    </>
  )
}

function VentajaCard({ num, titulo, emWord, texto, delay, inView }: {
  num: string
  titulo: string
  emWord: string
  texto: string
  delay: number
  inView: boolean
}) {
  return (
    <motion.div
      className="group relative flex flex-col gap-5 p-8 bg-brand-cream hover:bg-brand-white transition-colors duration-300 cursor-default overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {/* Número índice */}
      <span className="text-[2rem] font-extralight text-brand-sand group-hover:text-accent-gold transition-colors duration-300 leading-none select-none">
        {num}
      </span>

      {/* Título */}
      <h3 className="font-light text-brand-dark text-xl leading-snug italic">
        {buildTitle(titulo, emWord)}
      </h3>

      {/* Separador */}
      <span className="h-px bg-brand-sand w-8 block" />

      {/* Texto */}
      <p className="text-sm text-brand-tan leading-relaxed">{texto}</p>

      {/* Línea hover inferior */}
      <span className="absolute bottom-0 left-0 h-px bg-accent-gold w-0 group-hover:w-full transition-all duration-500" />
    </motion.div>
  )
}

export default function WhyUsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8 bg-brand-cream">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Nuestras ventajas
          </motion.p>

          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          >
            Por qué eligen{' '}
            <em className="text-brand-brown italic">Wood Pallet</em>
          </motion.h2>

          <motion.p
            className="text-sm text-brand-tan leading-relaxed mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.14 }}
          >
            Más de una década fabricando pallets con estándares de calidad que marcan la diferencia.
          </motion.p>

          {/* Línea dorada */}
          <motion.span
            className="h-px bg-accent-gold block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
            style={{ maxWidth: 48 }}
          />
        </div>

        {/* Grid de cards: gap-px sobre fondo brand-sand simula bordes entre celdas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-sand">
          {VENTAJAS.map((v, i) => (
            <VentajaCard key={v.num} {...v} delay={0.1 + i * 0.08} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}
