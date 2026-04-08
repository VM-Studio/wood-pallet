'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaLeaf, FaFeather, FaShieldAlt, FaBug, FaIndustry, FaDollarSign,
} from 'react-icons/fa'

const EASE = 'easeOut'

const VENTAJAS = [
  {
    num: '01',
    Icon: FaLeaf,
    iconColor: 'text-accent-green',
    titulo: '100% reciclable',
    texto:
      'Fabricado con cartón corrugado de alta densidad, es completamente reciclable al final de su vida útil. Reducí la huella de carbono de tu empresa sin sacrificar rendimiento.',
  },
  {
    num: '02',
    Icon: FaFeather,
    iconColor: 'text-accent-gold',
    titulo: 'Hasta 70% más liviano',
    texto:
      'Su bajo peso propio reduce costos de flete, especialmente en exportación aérea donde cada kilo cuenta. Más carga útil, menos gasto logístico.',
  },
  {
    num: '03',
    Icon: FaShieldAlt,
    iconColor: 'text-brand-brown',
    titulo: 'Alta resistencia estructural',
    texto:
      'El diseño de cartón corrugado multicapa soporta cargas considerables manteniendo su integridad. Resistente a la compresión vertical bajo estiba.',
  },
  {
    num: '04',
    Icon: FaBug,
    iconColor: 'text-accent-green',
    titulo: 'Sin tratamiento fitosanitario',
    texto:
      'Al ser un producto no vegetal procesado, no requiere tratamiento NIMF-15. Simplifica el proceso de exportación y reduce trámites aduaneros.',
  },
  {
    num: '05',
    Icon: FaIndustry,
    iconColor: 'text-brand-tan',
    titulo: 'Apto industria alimentaria',
    texto:
      'Material neutro, sin astillas ni clavos. Ideal para industrias donde la higiene y la ausencia de contaminantes físicos es prioritaria.',
  },
  {
    num: '06',
    Icon: FaDollarSign,
    iconColor: 'text-accent-gold',
    titulo: 'Costo competitivo',
    texto:
      'En comparación con el pallet de madera nuevo, el pallet de cartón ofrece una alternativa de bajo costo para operaciones de un solo uso o ciclos cortos.',
  },
]

export default function CarpalletWhy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8 bg-brand-cream">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-14">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            ¿Por qué elegir el pallet de cartón?
          </motion.p>
          <motion.h2
            className="section-title mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          >
            Ventajas que hacen la{' '}
            <em className="text-brand-brown">diferencia</em>
          </motion.h2>
          <motion.span
            className="h-px bg-accent-gold block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            style={{ maxWidth: 48 }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-sand">
          {VENTAJAS.map(({ num, Icon, iconColor, titulo, texto }, i) => (
            <motion.div
              key={num}
              className="group relative flex flex-col gap-4 p-8 bg-brand-cream hover:bg-brand-white transition-colors duration-300 overflow-hidden cursor-default"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE, delay: 0.08 + i * 0.07 }}
            >
              {/* Número decorativo */}
              <span className="absolute top-6 right-6 text-[2rem] font-extralight text-brand-sand group-hover:text-accent-gold/30 transition-colors duration-300 leading-none select-none">
                {num}
              </span>

              {/* Ícono */}
              <span className={`text-xl ${iconColor}`}>
                <Icon />
              </span>

              {/* Título */}
              <h3 className="font-medium text-brand-dark text-base leading-snug pr-8">{titulo}</h3>

              {/* Texto */}
              <p className="text-sm text-brand-tan leading-relaxed">{texto}</p>

              {/* Línea hover inferior */}
              <span className="absolute bottom-0 left-0 h-px bg-accent-gold w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
