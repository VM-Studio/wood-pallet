'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaWhatsapp, FaCheck } from 'react-icons/fa'
import { EMPRESA } from '@/lib/constants'

const EASE = 'easeOut'

const CHECKLIST = [
  'Presupuesto sin cargo en minutos',
  'Atención personalizada',
  'Entregas en todo el Gran Buenos Aires',
  'Fabricación a medida disponible',
]

export default function QuoteSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [empresa, setEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const body = encodeURIComponent(
      `Hola Wood Pallet, me comunico desde *${empresa || 'mi empresa'}*.\n` +
        `📧 ${email || '(sin email)'}\n` +
        `📞 ${telefono || '(sin teléfono)'}\n\n` +
        `${mensaje || 'Quiero solicitar un presupuesto.'}`
    )

    window.open(`https://wa.me/${EMPRESA.whatsapp.replace(/\D/g, '')}?text=${body}`, '_blank')
    setSent(true)
  }

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8 bg-brand-cream">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Columna izquierda — Copy */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="section-label mb-4">Cotizá ahora</p>
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          >
            Tu presupuesto{' '}
            <em className="text-brand-brown">en minutos</em>
          </motion.h2>

          <motion.span
            className="h-px bg-accent-gold block"
            initial={{ width: 0 }}
            animate={inView ? { width: 48 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            style={{ maxWidth: 48 }}
          />

          <motion.ul
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
          >
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-brand-dark/80">
                <FaCheck className="text-accent-gold mt-0.5 shrink-0 text-[10px]" />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-4 px-5 py-4 bg-accent-gold/10 border border-accent-gold/25 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
          >
            <FaWhatsapp className="text-accent-green text-xl shrink-0" />
            <span className="text-xs text-brand-dark/70 leading-snug">
              También podés escribirnos directamente a{' '}
              <strong className="text-brand-dark">WhatsApp {EMPRESA.telefono}</strong>
            </span>
          </motion.div>
        </div>

        {/* Columna derecha — Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center border border-brand-sand bg-brand-white">
              <FaCheck className="text-accent-green text-2xl" />
              <p className="text-brand-dark font-medium">¡Mensaje enviado!</p>
              <p className="text-sm text-brand-tan">
                Se abrió WhatsApp con tu consulta. Te respondemos a la brevedad.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-xs text-brand-tan underline underline-offset-4 mt-2"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 bg-brand-white border border-brand-sand p-8"
            >
              <div className="flex flex-col gap-1.5">
                <label className="input-label">Empresa *</label>
                <input
                  required
                  type="text"
                  placeholder="Nombre de tu empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="input-label">Email</label>
                  <input
                    type="email"
                    placeholder="tu@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="input-label">Teléfono</label>
                  <input
                    type="tel"
                    placeholder="11 0000-0000"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="input-label">Mensaje *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Contanos qué necesitás: tipo de pallet, cantidad, medidas especiales..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className="input-field resize-none"
                />
              </div>

              <button type="submit" className="btn-whatsapp w-full justify-center py-3.5 text-sm">
                <FaWhatsapp className="text-base" />
                Enviar por WhatsApp
              </button>

              <p className="text-[10px] text-brand-tan text-center">
                Al enviar, se abrirá WhatsApp con tu mensaje pre-completado.
              </p>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  )
}
