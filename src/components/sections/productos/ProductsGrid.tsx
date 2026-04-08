'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaWhatsapp, FaRuler, FaWeightHanging } from 'react-icons/fa'
import { PRODUCTS, type Product } from '@/lib/products'

const EASE = 'easeOut'

/** Divide el nombre en partes para poner la 2ª palabra en <em> */
function ProductName({ nombre }: { nombre: string }) {
  const words = nombre.split(' ')
  if (words.length < 2) return <>{nombre}</>
  return (
    <>
      {words[0]}{' '}
      <em className="text-brand-brown">{words.slice(1).join(' ')}</em>
    </>
  )
}

function ProductCard({ product, delay, inView }: {
  product: Product
  delay: number
  inView: boolean
}) {
  const { nombre, medida, carga, uso, descripcion, imagen, wa, badge } = product
  const isDestacado = badge === 'Más pedido'

  return (
    <motion.article
      className="group flex flex-col bg-brand-white border border-brand-sand hover:border-brand-tan transition-colors duration-300"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {/* Zona imagen */}
      <div className="relative aspect-4/3 bg-brand-sand overflow-hidden">
        {/*
        <Image
          src={imagen}
          alt={nombre}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
        */}
        {/* Placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brand-tan/40 group-hover:scale-[1.02] transition-transform duration-300">
          <span className="text-4xl">🪵</span>
          <span className="text-[9px] uppercase tracking-widest">{imagen.split('/').pop()}</span>
          <span className="text-[8px] text-brand-tan/25">/public{imagen}</span>
        </div>

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
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-brand-tan">
            <FaRuler className="text-[9px] shrink-0" />
            {medida}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-brand-tan">
            <FaWeightHanging className="text-[9px] shrink-0" />
            {carga}
          </span>
        </div>

        {/* Uso / categoría */}
        <span className="inline-flex items-center px-2.5 py-1 text-[9px] uppercase tracking-wide font-medium bg-accent-gold/12 text-brand-brown border border-accent-gold/25 w-fit">
          {uso}
        </span>

        {/* Descripción */}
        <p className="text-sm text-brand-tan leading-relaxed mt-1 flex-1">{descripcion}</p>

        {/* Separador */}
        <span className="h-px bg-brand-sand block mt-2" />

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

export default function ProductsGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8 bg-brand-cream">
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
            <em className="text-brand-brown">permanente</em>
          </motion.h2>
          <motion.span
            className="h-px bg-accent-gold block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            style={{ maxWidth: 48 }}
          />
        </div>

        {/* Grid 3 / 2 / 1 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-sand">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              delay={0.08 + i * 0.06}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
