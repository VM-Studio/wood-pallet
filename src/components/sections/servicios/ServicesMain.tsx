'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'
import Image from 'next/image'

const EASE = 'easeOut'

const SERVICIOS = [
  {
    num: '01',
    titulo: 'Logística de',
    emWord: 'entrega',
    imagen: '/logistica.png',
    texto:
      'En Wood Pallet, entendemos la importancia de una logística eficiente y confiable para el éxito de tu negocio. Es por eso que ofrecemos un servicio completo de logística que garantiza la entrega oportuna y segura de tus productos en cualquier lugar que lo necesites.',
    puntos: [
      'Cobertura en toda la Provincia de Buenos Aires',
      'Coordinación de horarios según tu operación',
      'Flota propia — no dependemos de terceros',
      'Entregas programadas y urgentes',
    ],
    reverse: false,
  },
  {
    num: '02',
    titulo: 'Stock',
    emWord: 'permanente',
    imagen: '/stock.png',
    texto:
      'En Wood Pallet, nos enorgullece ofrecer un stock permanente de pallets de madera de alta calidad para satisfacer tus necesidades de embalaje y transporte en todo momento. Con un amplio inventario disponible, podés confiar en nosotros para proporcionarte los pallets que necesitás, justo cuando los necesitás.',
    puntos: [
      'Inventario disponible los 365 días del año',
      'Todos los tipos de pallets en stock',
      'Sin tiempos de espera por fabricación',
      'Retiro en planta o entrega a domicilio',
    ],
    reverse: true,
  },
  {
    num: '03',
    titulo: 'Tratamiento',
    emWord: 'NIMF-15',
    imagen: '/palletsNIMF.png',
    texto:
      'En Wood Pallet, nos comprometemos a garantizar la calidad y la seguridad de nuestros productos. Ofrecemos un tratamiento fitosanitario especializado para nuestros pallets de madera. Este proceso asegura que nuestros pallets cumplan con los estándares internacionales de sanidad vegetal, lo que los hace aptos para la exportación a cualquier parte del mundo.',
    puntos: [
      'Cumplimiento de estándares internacionales de sanidad vegetal',
      'Pallets habilitados para exportación sin restricciones aduaneras',
      'Certificación reconocida en todos los destinos del mundo',
      'Sin riesgo de contaminación ni rechazo en aduana',
    ],
    reverse: false,
  },
]

function ServiceBlock({
  servicio,
  inView,
}: {
  servicio: (typeof SERVICIOS)[number]
  inView: boolean
}) {
  const { num, titulo, emWord, imagen, texto, puntos, reverse } = servicio

  const imgCol = (
    <motion.div
      className="relative aspect-square bg-transparent overflow-hidden order-1 lg:order-0"
      initial={{ opacity: 0, x: reverse ? 24 : -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
    >
      <Image
        src={imagen}
        alt={`${titulo} ${emWord} — Wood Pallet`}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain p-4"
      />
    </motion.div>
  )

  const textCol = (
    <motion.div
      className="flex flex-col gap-5 justify-center order-2 lg:order-0"
      initial={{ opacity: 0, x: reverse ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: 0.18 }}
    >
      {/* Número decorativo */}
      <span className="text-[3rem] font-extralight text-brand-sand leading-none select-none">
        {num}
      </span>

      {/* Título H3 */}
      <h3 className="font-light text-brand-dark leading-snug" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
        {titulo}{' '}
        <em className="em-gradient">{emWord}</em>
      </h3>

      {/* Línea */}
      <span className="h-px bg-brand-sand block w-8" />

      {/* Texto */}
      <p className="text-sm text-brand-dark/60 leading-relaxed">{texto}</p>

      {/* Puntos */}
      <ul className="flex flex-col gap-2.5">
        {puntos.map((p) => (
          <li key={p} className="flex items-start gap-3 text-sm text-brand-dark">
            <FaCheck className="text-accent-green mt-0.5 shrink-0 text-[10px]" />
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  )

  return (
    <div className="py-10 md:py-14 border-b border-brand-sand last:border-b-0 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
      {reverse ? (
        <>
          {textCol}
          {imgCol}
        </>
      ) : (
        <>
          {imgCol}
          {textCol}
        </>
      )}
    </div>
  )
}

export default function ServicesMain() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-14 md:py-20 lg:py-28 px-4 md:px-8 bg-brand-cream overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-4">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Nuestros servicios
          </motion.p>
          <motion.h2
            className="section-title mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          >
            Todo lo que tu empresa{' '}
            <em className="em-gradient">necesita</em>
          </motion.h2>
          <motion.span
            className="h-px bg-accent-gold block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            style={{ maxWidth: 48 }}
          />
        </div>

        {/* Servicios alternados */}
        <div>
          {SERVICIOS.map((s) => (
            <ServiceBlock key={s.num} servicio={s} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}
