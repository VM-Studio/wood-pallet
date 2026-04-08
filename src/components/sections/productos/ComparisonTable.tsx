'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TABLE_ROWS } from '@/lib/products'

const EASE = 'easeOut'

const COLS = [
  { label: 'Producto',    key: 'nombre'  },
  { label: 'Medida',      key: 'medida'  },
  { label: 'Carga máx.', key: 'carga'   },
  { label: 'Uso',         key: 'uso'     },
  { label: 'NIMF-15',    key: 'nimf'    },
  { label: 'Acción',     key: 'accion'  },
]

export default function ComparisonTable() {
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
            Especificaciones técnicas
          </motion.p>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          >
            Elegí el pallet{' '}
            <em className="text-brand-brown">indicado</em>
          </motion.h2>
          <motion.span
            className="h-px bg-accent-gold block mb-5"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            style={{ maxWidth: 48 }}
          />
          <motion.p
            className="text-sm text-brand-tan"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
          >
            Comparativa completa de todos nuestros productos
          </motion.p>
        </div>

        {/* Tabla */}
        <motion.div
          className="overflow-x-auto border border-brand-sand"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
        >
          <table className="w-full border-collapse" style={{ minWidth: 640 }}>
            {/* Head */}
            <thead>
              <tr className="bg-brand-dark">
                {COLS.map((col) => (
                  <th
                    key={col.key}
                    className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.12em] text-brand-cream font-medium whitespace-nowrap border-r border-brand-tan/10 last:border-r-0"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr
                  key={row.nombre}
                  className={`group border-t border-brand-sand/50 hover:bg-brand-sand/30 transition-colors duration-150 ${
                    i % 2 === 0 ? 'bg-brand-white' : 'bg-brand-cream/50'
                  }`}
                >
                  {/* Producto */}
                  <td className="px-5 py-4 text-sm font-medium text-brand-dark whitespace-nowrap border-r border-brand-sand/40">
                    {row.nombre}
                  </td>

                  {/* Medida */}
                  <td className="px-5 py-4 text-sm text-brand-tan whitespace-nowrap border-r border-brand-sand/40">
                    {row.medida}
                  </td>

                  {/* Carga */}
                  <td className="px-5 py-4 text-sm text-brand-tan whitespace-nowrap border-r border-brand-sand/40">
                    {row.carga}
                  </td>

                  {/* Uso */}
                  <td className="px-5 py-4 text-sm text-brand-tan border-r border-brand-sand/40">
                    {row.uso}
                  </td>

                  {/* NIMF-15 */}
                  <td className="px-5 py-4 text-sm whitespace-nowrap border-r border-brand-sand/40">
                    {row.nimf === true ? (
                      <span className="font-semibold text-accent-green">✓</span>
                    ) : (
                      <span className="text-brand-tan text-xs">Consultar</span>
                    )}
                  </td>

                  {/* Acción */}
                  <td className="px-5 py-4">
                    <a
                      href={row.wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-gold hover:text-brand-brown transition-colors duration-200 whitespace-nowrap font-medium"
                    >
                      Cotizar →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  )
}
