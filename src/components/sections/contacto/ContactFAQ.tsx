'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronDown, FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'

const FAQS = [
  {
    q: '¿Venden por menor o solo mayorista?',
    a: 'PalletsJJ trabaja exclusivamente con empresas y pedidos mayoristas. No realizamos ventas al por menor bajo ninguna circunstancia. Si necesitás una cantidad pequeña de pallets, te recomendamos consultar en ferreterías o bazares de tu zona.',
  },
  {
    q: '¿Cuál es el pedido mínimo?',
    a: 'El pedido mínimo varía según el tipo de pallet y la disponibilidad de stock. Te recomendamos consultarnos directamente por WhatsApp indicando el tipo de pallet y la cantidad que necesitás para darte una respuesta precisa e inmediata.',
  },
  {
    q: '¿Hacen envíos o solo retiro en planta?',
    a: 'Contamos con logística propia para entrega en toda la Provincia de Buenos Aires. El costo de envío se cotiza según el destino y la cantidad de pallets. También podés retirar en nuestra planta en Los Troncos del Talar, Tigre.',
  },
  {
    q: '¿Qué es el tratamiento NIMF-15 y por qué lo necesito?',
    a: 'NIMF-15 es la normativa internacional que exige que los pallets de madera usados en exportación hayan recibido un tratamiento fitosanitario certificado (generalmente tratamiento térmico a 56°C). Si exportás mercadería, tus pallets DEBEN tener este tratamiento para pasar aduana en destino. En PalletsJJ todos nuestros pallets nuevos pueden recibir el tratamiento bajo pedido.',
  },
  {
    q: '¿Tienen pallets en stock o hay que esperar fabricación?',
    a: 'Contamos con stock permanente de los modelos más demandados: Pallet Euro, Pallet Estándar, Pallets Usados y Pallet Doble Faz. Para medidas especiales o grandes volúmenes puede haber un tiempo de producción. Consultanos por WhatsApp para confirmar disponibilidad inmediata.',
  },
  {
    q: '¿En qué se diferencia el Pallet Euro del Pallet Estándar?',
    a: 'El Pallet Euro mide 1200×800mm y es el estándar europeo, ideal para racks y supermercados. El Pallet Estándar (tipo ARLOG) mide 1200×1000mm y es el más usado en Argentina para distribución general. La elección depende de tus racks, vehículos y el destino de tu mercadería.',
  },
  {
    q: '¿Fabrican pallets a medida?',
    a: 'Sí. Fabricamos pallets con dimensiones personalizadas según los requerimientos específicos de cada cliente. Para cotizar medidas especiales necesitamos: largo, ancho, altura del tirante, capacidad de carga requerida y volumen de pedido.',
  },
  {
    q: '¿Cómo puedo obtener una cotización?',
    a: 'La forma más rápida es por WhatsApp al +54 9 11 6623-1866. También podés completar el formulario en esta página o enviarnos un email a ventasmadererajj32@gmail.com. Respondemos todas las consultas en horario comercial (lunes a viernes de 8 a 18hs).',
  },
]

export default function ContactFAQ() {
  const [openIdx, setOpenIdx] = useState<number>(0)

  function toggle(idx: number) {
    setOpenIdx((prev) => (prev === idx ? -1 : idx))
  }

  return (
    <section className="bg-brand-cream py-20 md:py-28 px-5 md:px-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <span className="section-label mb-4">Preguntas frecuentes</span>
        <h2 className="section-title mt-3 mb-2">
          Todo lo que querés <em>saber</em>
        </h2>
        <span className="deco-line mb-10" style={{ display: 'block' }} />

        {/* Accordion */}
        <div>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div key={idx} className="border-b border-brand-sand">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between py-5 px-0 cursor-pointer text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-200 pr-4 ${
                      isOpen ? 'text-brand-brown' : 'text-brand-dark group-hover:text-brand-brown'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <FaChevronDown
                    className={`text-brand-tan shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-sm text-brand-dark/60 leading-relaxed pb-5">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* CTA bajo accordion */}
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-brand-dark/60">¿Tu pregunta no está acá?</p>
          <a
            href={WHATSAPP_LINKS.general}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full sm:w-auto justify-center"
          >
            <FaWhatsapp /> Preguntanos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
