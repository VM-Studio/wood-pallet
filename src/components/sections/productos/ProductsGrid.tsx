'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { FaWhatsapp, FaRuler, FaWeightHanging } from 'react-icons/fa'
import { PRODUCTS, type Product } from '@/lib/products'
import ModelViewer3D from './ModelViewer3D'

const EASE = 'easeOut'

/** Divide el nombre en partes para poner la 2ª palabra en <em> */
function ProductName({ nombre }: { nombre: string }) {
  const words = nombre.split(' ')
  if (words.length < 2) return <>{nombre}</>
  return (
    <>
      {words[0]}{' '}
      <em className="em-gradient">{words.slice(1).join(' ')}</em>
    </>
  )
}

function ProductCard({ product, delay, inView }: {
  product: Product
  delay: number
  inView: boolean
}) {
  const { nombre, medida, carga, uso, descripcion, imagen, wa, badge } = product
  const isDestacado = badge === 'Más vendido'
  const [modelOpen, setModelOpen] = useState(false)
  const MODEL_MAP: Record<string, string> = {
    euro: '/palleteuro.glb',
    tirante: '/palletcontirante.glb',
  }
  const modelSrc = MODEL_MAP[product.id]

  return (
    <motion.article
      className="group flex flex-col w-full bg-brand-white border border-brand-sand hover:border-brand-tan transition-colors duration-300"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {/* Zona imagen */}
      <div className="relative aspect-4/3 bg-brand-cream overflow-hidden">
        <Image
          src={imagen}
          alt={nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-300"
        />

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-0 left-0 px-2.5 py-1 text-[9px] uppercase tracking-wide font-semibold z-10 ${
              isDestacado
                ? 'bg-accent-gold text-brand-dark'
                : 'bg-brand-dark/80 text-brand-cream'
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Zona contenido */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        {/* Nombre */}
        <h3 className="text-base font-medium text-brand-dark leading-snug">
          <ProductName nombre={nombre} />
        </h3>

        {/* Datos técnicos */}
        <div className="flex gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-brand-dark/50">
            <FaRuler className="text-[9px] shrink-0" />
            {medida}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-brand-dark/50">
            <FaWeightHanging className="text-[9px] shrink-0" />
            {carga}
          </span>
        </div>

        {/* Uso / categoría */}
        <span className="inline-flex items-center px-2.5 py-1 text-[9px] uppercase tracking-wide font-medium bg-accent-gold/12 text-brand-brown border border-accent-gold/25 w-fit">
          {uso}
        </span>

        {/* Descripción */}
        <p className="text-sm text-brand-dark/60 leading-relaxed mt-1 flex-1">{descripcion}</p>

        {/* Separador */}
        <span className="h-px bg-brand-sand block mt-2" />

        {/* Botón 3D — productos con modelo */}
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
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full justify-center text-xs py-3"
        >
          <FaWhatsapp className="text-sm" />
          Consultar precio
        </a>
      </div>
    </motion.article>
  )
}

/** Bloque especial que agrupa los dos tipos de pallet seminuevo */
function SeminuevoGroup({ products, delay, inView }: {
  products: Product[]
  delay: number
  inView: boolean
}) {
  return (
    <div>
      {/* Encabezado del grupo */}
      <motion.div
        className="flex items-center gap-3 mb-5"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: EASE, delay }}
      >
        <span className="h-px flex-1 bg-brand-sand" />
        <span className="px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-semibold bg-accent-gold text-brand-dark">
          Pallets Seminuevos
        </span>
        <span className="h-px flex-1 bg-brand-sand" />
      </motion.div>

      {/* Dos tarjetas centradas, mismo tamaño que las del grid de abajo */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-5">
        {products.map((product, i) => (
          <div key={product.id} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex">
            <ProductCard
              product={product}
              delay={delay + i * 0.06}
              inView={inView}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductsGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const seminuevos = PRODUCTS.filter((p) => p.id.startsWith('seminuevo'))
  const resto      = PRODUCTS.filter((p) => !p.id.startsWith('seminuevo'))

  return (
    <section ref={ref} className="py-14 md:py-20 lg:py-28 px-4 md:px-8 bg-brand-cream">
      <div className="max-w-6xl mx-auto">

        {/* Header de sección */}
        <div className="max-w-xl mb-14">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Todos los productos
          </motion.p>
          <motion.h2
            className="section-title mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          >
            Fabricación y stock{' '}
            <em className="em-gradient">permanente</em>
          </motion.h2>
          <motion.span
            className="h-px bg-accent-gold block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            style={{ maxWidth: 48 }}
          />
        </div>

        {/* Fila 1: Seminuevos centrados, dos tarjetas del mismo tamaño que las de abajo */}
        <SeminuevoGroup products={seminuevos} delay={0.08} inView={inView} />

        {/* Separador + etiqueta "Pallets Nuevos" */}
        <motion.div
          className="flex items-center gap-3 mt-10 mb-5"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
        >
          <span className="h-px flex-1 bg-brand-sand" />
          <span className="px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-semibold bg-accent-gold text-brand-dark">
            Pallets Nuevos
          </span>
          <span className="h-px flex-1 bg-brand-sand" />
        </motion.div>

        {/* Fila 2+: resto de productos en grid de 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resto.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              delay={0.22 + i * 0.06}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
