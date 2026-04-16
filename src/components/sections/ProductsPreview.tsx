'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'
import ModelViewer3D from '@/components/sections/productos/ModelViewer3D'

const EASE = 'easeOut'

const MODEL_MAP: Record<string, string> = {
  euro: '/palleteuro.glb',
  'normalizado-nuevo': '/palletnormalizadonuevo.glb',
  'seminuevo-reforzado': '/palletnormalizadoseminuevo.glb',
}

const PRODUCTOS = [
  {
    id: 'normalizado-nuevo',
    nombre: 'Pallet Normalizado Nuevo',
    medida: '1200×1000mm',
    carga: '1.500 kg',
    uso: 'Uso general',
    img: 'palletnormalizadonuevo.png',
    waLink: WHATSAPP_LINKS.normalizadoNuevo,
  },
  {
    id: 'seminuevo-reforzado',
    nombre: 'Pallet Normalizado Seminuevo',
    medida: '1200×1000mm',
    carga: '1.500 kg',
    uso: 'Uso general',
    img: 'palletnormalizadoseminuevo.png',
    waLink: WHATSAPP_LINKS.seminuevoReforzado,
  },
  {
    id: 'euro',
    nombre: 'Pallet Euro',
    medida: '1200×800mm',
    carga: '1.800 kg',
    uso: 'Consumo masivo',
    img: 'palleteuro.png',
    waLink: WHATSAPP_LINKS.euro,
  },
  {
    id: 'especiales',
    nombre: 'Pallets a Medida',
    medida: 'A pedido',
    carga: 'Según diseño',
    uso: 'Uso general',
    img: 'amedida.png',
    waLink: WHATSAPP_LINKS.especiales,
  },
]

interface ProductoPreview {
  id: string
  nombre: string
  medida: string
  carga: string
  uso: string
  img: string
  waLink: string
}

function ProductCard({ producto, delay, inView }: { producto: ProductoPreview; delay: number; inView: boolean }) {
  const { id, nombre, medida, carga, uso, img, waLink } = producto
  const [modelOpen, setModelOpen] = useState(false)
  const modelSrc = MODEL_MAP[id]

  return (
    <motion.div
      key={nombre}
      className="group bg-brand-white border border-brand-sand hover:border-brand-tan flex flex-col transition-colors duration-300"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {/* Imagen */}
      <div className="relative w-full bg-brand-cream overflow-hidden aspect-video sm:aspect-auto sm:h-60">
        <Image
          src={`/${img}`}
          alt={nombre}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          priority
          className="object-contain object-center p-0 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Separador dorado */}
      <span className="block h-px w-8 bg-accent-gold/50 mx-5 mt-4" />

      {/* Info */}
      <div className="px-5 pt-3 pb-5 flex flex-col gap-3 flex-1">
        {/* Badge uso */}
        <span className="text-[9px] uppercase tracking-[0.18em] text-brand-dark/50">
          {uso}
        </span>

        {/* Nombre */}
        <h3 className="font-light text-brand-dark text-base leading-snug">{nombre}</h3>

        {/* Datos */}
        <div className="flex flex-col gap-1 text-[10px] uppercase tracking-wide text-brand-dark/50 mt-auto">
          <span>{medida}</span>
          <span>{carga}</span>
        </div>

        {/* Botón 3D */}
        {modelSrc && (
          <>
            <button
              onClick={() => setModelOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-wide bg-accent-gold text-brand-dark hover:brightness-110 transition-all duration-200"
            >
              <span>⬡</span>
              Ver modelo 3D
            </button>
            <ModelViewer3D
              open={modelOpen}
              onClose={() => setModelOpen(false)}
              src={modelSrc}
              nombre={nombre}
            />
          </>
        )}

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
  )
}

export default function ProductsPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-14 md:py-20 lg:py-28 px-4 md:px-8 bg-brand-white">
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
            <em className="em-gradient">necesidad</em>
          </motion.h2>

          <motion.span
            className="h-px bg-accent-gold block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            style={{ maxWidth: 48 }}
          />
        </div>

        {/* Grid de productos: 1 col mobile, 2 sm, 4 lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTOS.map((producto, i) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              delay={0.1 + i * 0.08}
              inView={inView}
            />
          ))}
        </div>

        {/* CTA inferior */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-5 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
        >
          <p className="text-sm text-brand-dark/60">
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
