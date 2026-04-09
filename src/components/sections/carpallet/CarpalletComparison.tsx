'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = 'easeOut'

const ROWS = [
  { caracteristica: 'Peso propio',          madera: '20–25 kg',               carton: '3–5 kg' },
  { caracteristica: 'Carga máxima',         madera: 'Hasta +2.000 kg',        carton: 'Consultar modelo' },
  { caracteristica: 'Requiere NIMF-15',     madera: '✓ Sí',                   carton: '✗ No requerido', madBool: 'warn', carBool: 'ok' },
  { caracteristica: 'Reciclable',           madera: 'Parcialmente',           carton: '100%' },
  { caracteristica: 'Apto alimentos',       madera: 'Con tratamiento',        carton: '✓ Nativo', carBool: 'ok' },
  { caracteristica: 'Durabilidad',          madera: 'Alta (reutilizable)',     carton: 'Media (1 a 3 usos)' },
  { caracteristica: 'Costo por unidad',     madera: 'Mayor',                  carton: 'Menor' },
  { caracteristica: 'Ideal para',           madera: 'Uso intensivo / pesado', carton: 'Exportación aérea / liviana' },
]

type BoolType = 'ok' | 'warn' | undefined

function Cell({ text, boolType }: { text: string; boolType?: BoolType }) {
  if (boolType === 'ok')   return <span className="text-accent-green font-semibold">{text}</span>
  if (boolType === 'warn') return <span className="text-accent-warm font-semibold">{text}</span>
  return <>{text}</>
}

export default function CarpalletComparison() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-14 md:py-20 lg:py-28 px-4 md:px-8 bg-brand-cream">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-14">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Análisis comparativo
          </motion.p>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          >
            Madera vs <em className="text-brand-brown">Cartón</em> — ¿Cuál te conviene?
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
            Comparativa objetiva para ayudarte a elegir
          </motion.p>
        </div>

        {/* Indicador scroll mobile */}
        <p className="block md:hidden text-xs text-brand-tan text-center mb-2">
          ← Deslizá para ver más →
        </p>

        {/* Tabla */}
        <motion.div
          className="overflow-x-auto border border-brand-sand"
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
        >
          <table className="w-full border-collapse" style={{ minWidth: 560 }}>
            <thead>
              <tr>
                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.12em] text-brand-dark font-medium bg-brand-sand/50 border-r border-brand-sand">
                  Característica
                </th>
                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.12em] text-brand-cream font-medium bg-brand-brown border-r border-brand-sand/30">
                  Pallet de Madera
                </th>
                <th
                  className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.12em] text-white font-medium bg-accent-green"
                  style={{ borderLeft: '2px solid #C9A84C' }}
                >
                  Pallet de Cartón
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.caracteristica}
                  className={`border-t border-brand-sand/50 hover:bg-brand-sand/20 transition-colors duration-150 ${
                    i % 2 === 0 ? 'bg-brand-white' : 'bg-brand-cream/40'
                  }`}
                >
                  <td className="px-5 py-3.5 text-xs uppercase tracking-wide text-brand-tan bg-brand-sand/20 border-r border-brand-sand">
                    {row.caracteristica}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-brand-dark border-r border-brand-sand/40">
                    <Cell text={row.madera} boolType={row.madBool as BoolType} />
                  </td>
                  <td
                    className="px-5 py-3.5 text-sm text-brand-dark"
                    style={{ borderLeft: '2px solid #C9A84C30' }}
                  >
                    <Cell text={row.carton} boolType={row.carBool as BoolType} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Nota al pie */}
        <motion.p
          className="mt-5 text-xs text-brand-tan italic text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
        >
          Ambos productos disponibles en stock. Consultá por WhatsApp para asesoramiento personalizado según tu operación.
        </motion.p>

      </div>
    </section>
  )
}
