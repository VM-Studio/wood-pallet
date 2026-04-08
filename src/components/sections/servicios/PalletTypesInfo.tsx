'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const EASE = 'easeOut'

const ARTICULOS = [
  {
    titulo: 'Pallet Estándar',
    emWord: 'ARLOG',
    imagen: '/images/servicios/pallet-estandar-info.jpg',
    emoji: '🪵',
    texto:
      'El pallet normalizado, con dimensiones estándar de 1200mm x 1000mm, es la opción preferida por muchas empresas argentinas debido a su versatilidad y amplia compatibilidad con equipos de manipulación. Este diseño facilita el almacenamiento, transporte y distribución de productos de manera eficiente y segura en toda la cadena de suministro, simplificando así las operaciones logísticas.',
    datos: ['1200 × 1000 mm', 'Hasta 1.800 kg', 'NIMF-15'],
  },
  {
    titulo: 'Pallet',
    emWord: 'Euro',
    imagen: '/images/servicios/pallet-euro-info.jpg',
    emoji: '🪵',
    texto:
      'El pallet europeo, con medidas estandarizadas de 1200mm x 800mm, es ampliamente utilizado por empresas en todo el mundo. Su diseño compacto y robusto lo convierte en una opción popular para el almacenamiento, transporte y distribución de productos. Ofrece una manipulación eficiente y segura de mercancías en la cadena de suministro, simplificando las operaciones logísticas y optimizando el uso del espacio en almacenes y vehículos de transporte.',
    datos: ['1200 × 800 mm', 'Hasta 1.300 kg', 'NIMF-15'],
  },
]

export default function PalletTypesInfo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8 bg-brand-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-14">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Guía de productos
          </motion.p>
          <motion.h2
            className="section-title mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          >
            Conocé cada tipo de{' '}
            <em className="text-brand-brown">pallet</em>
          </motion.h2>
          <motion.span
            className="h-px bg-accent-gold block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            style={{ maxWidth: 48 }}
          />
        </div>

        {/* Artículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-sand">
          {ARTICULOS.map(({ titulo, emWord, imagen, emoji, texto, datos }, i) => (
            <motion.article
              key={emWord}
              className="bg-brand-white flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.1 }}
            >
              {/* Imagen / Placeholder */}
              <div className="relative aspect-4/3 bg-brand-sand overflow-hidden">
                {/*
                <Image
                  src={imagen}
                  alt={`${titulo} ${emWord} — Wood Pallet`}
                  fill
                  className="object-cover"
                />
                */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brand-tan/40">
                  <span className="text-5xl">{emoji}</span>
                  <span className="text-[9px] uppercase tracking-widest">{imagen.split('/').pop()}</span>
                  <span className="text-[8px] text-brand-tan/30">/public{imagen}</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-7 flex flex-col gap-4 flex-1">
                <h3 className="font-light text-brand-dark text-xl leading-snug">
                  {titulo}{' '}
                  <em className="text-brand-brown">{emWord}</em>
                </h3>

                <p className="text-sm text-brand-tan leading-relaxed flex-1">{texto}</p>

                {/* Datos técnicos en píldoras */}
                <div className="flex flex-wrap gap-2">
                  {datos.map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1 text-[10px] uppercase tracking-wide text-brand-dark border border-brand-sand bg-brand-cream"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <Link href="/productos" className="btn-ghost self-start text-xs px-0 hover:text-accent-gold">
                  Ver producto →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
