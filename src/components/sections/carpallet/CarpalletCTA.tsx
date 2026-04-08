'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'

const EASE = 'easeOut'

export default function CarpalletCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4 md:px-8"
      style={{ background: 'linear-gradient(135deg, #1C1208 0%, #0D0D0D 100%)' }}
    >
      <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-7">

        {/* Label */}
        <motion.p
          className="section-label"
          style={{ color: 'rgba(201,168,76,0.7)' }}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE }}
        >
          ¿Listo para cotizar?
        </motion.p>

        {/* H2 */}
        <motion.h2
          className="font-light text-brand-cream leading-tight"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
        >
          Pedí tu cotización de{' '}
          <em className="text-accent-gold">CarPallet</em> ahora
        </motion.h2>

        {/* Párrafo */}
        <motion.p
          className="text-brand-sand/70 leading-relaxed text-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.14 }}
        >
          Respondemos en minutos por WhatsApp con precios y disponibilidad
          para tu volumen de pedido. Solo trabajamos con empresas.
        </motion.p>

        {/* Botón */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
        >
          <a
            href={WHATSAPP_LINKS.carton}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <FaWhatsapp className="text-base" />
            Cotizar CarPallet por WhatsApp
          </a>
        </motion.div>

        {/* Link secundario */}
        <motion.p
          className="text-xs text-brand-tan/50"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
        >
          También podés ver nuestros pallets de madera en{' '}
          <Link
            href="/productos"
            className="text-accent-gold/70 hover:text-accent-gold transition-colors duration-200"
          >
            /productos
          </Link>
        </motion.p>

      </div>
    </section>
  )
}
