'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'

const EASE = 'easeOut'

const PRODUCTOS = [
  {
    nombre: 'Pallet Euro',
    medida: '1200×800mm',
    carga: '1.300 kg',
    uso: 'Consumo masivo',
    img: 'palleteuro.png',
    waLink: WHATSAPP_LINKS.euro,
  },
  {
    nombre: 'Pallet Estándar',
    medida: '1200×1000mm',
    carga: '1.800 kg',
    uso: 'Consumo masivo',
    img: 'palletstandard.png',
    waLink: WHATSAPP_LINKS.estandar,
  },
  {
    nombre: 'Pallet Doble Faz',
    medida: '1200×1000mm',
    carga: '+2.000 kg',
    uso: 'Reforzado',
    img: 'palletdoblefaz.png',
    waLink: WHATSAPP_LINKS.dobleFaz,
  },
  {
    nombre: 'Pallets con Tirante',
    medida: 'Medida personalizada',
    carga: 'Uso cementero',
    uso: 'Industrial',
    img: 'palletcontirante.png',
    waLink: WHATSAPP_LINKS.tirante,
  },
]

export default function ProductsPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8 bg-brand-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Nuestros productos
          </motion.p>

          <motion.h2
            className="section-title mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          >
            Pallets para cada{' '}
            <em className="text-brand-brown">necesidad</em>
          </motion.h2>

          <motion.span
            className="h-px bg-accent-gold block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            style={{ maxWidth: 48 }}
          />
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTOS.map(({ nombre, medida, carga, uso, img, waLink }, i) => (
            <motion.div
              key={nombre}
              className="group bg-brand-white border border-brand-sand hover:border-brand-tan flex flex-col transition-colors duration-300"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08 }}
            >
              {/* Imagen — tamaño fijo igual en todas */}
              <div className="relative w-full bg-brand-cream overflow-hidden" style={{ height: '180px' }}>
                <Image
                  src={`/${img}`}
                  alt={nombre}
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Separador dorado */}
              <span className="block h-px w-8 bg-accent-gold/50 mx-5 mt-4" />

              {/* Info */}
              <div className="px-5 pt-3 pb-5 flex flex-col gap-3 flex-1">
                {/* Badge uso */}
                <span className="text-[9px] uppercase tracking-[0.18em] text-brand-tan">
                  {uso}
                </span>

                {/* Nombre */}
                <h3 className="font-light text-brand-dark text-base leading-snug">{nombre}</h3>

                {/* Datos */}
                <div className="flex flex-col gap-1 text-[10px] uppercase tracking-wide text-brand-tan/70 mt-auto">
                  <span>{medida}</span>
                  <span>{carga}</span>
                </div>

                {/* CTA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center text-xs py-2.5 mt-1"
                >
                  <FaWhatsapp className="text-sm" />
                  Consultar
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA inferior */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-5 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
        >
          <p className="text-sm text-brand-tan">
            Fabricamos también medidas especiales a pedido
          </p>
          <Link href="/productos" className="btn-outline">
            Ver catálogo completo →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
