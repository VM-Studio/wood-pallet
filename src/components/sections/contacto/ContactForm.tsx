'use client'

import { useState } from 'react'
import { FaWhatsapp, FaSpinner } from 'react-icons/fa'

const PHONE_NUMBER = '5491166231866'

const PALLET_OPTIONS = [
  'Pallet Seminuevo Reforzado',
  'Pallet Seminuevo Descartable',
  'Pallet Euro (1200×800mm)',
  'Pallet Estándar (1200×1000mm)',
  'Pallet Estándar Liviano',
  'Pallet con Tirante',
  'Pallet Doble Faz',
  'Pallets a Medida',
  'No sé — necesito asesoramiento',
]

interface FormState {
  empresa: string
  nombre: string
  email: string
  telefono: string
  tipo: string
  mensaje: string
}

interface FormErrors {
  empresa?: string
  nombre?: string
  email?: string
  telefono?: string
  tipo?: string
  mensaje?: string
  general?: string
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {}
  if (data.empresa.trim().length < 2) errors.empresa = 'Ingresá el nombre de la empresa (mínimo 2 caracteres).'
  if (data.nombre.trim().length < 2) errors.nombre = 'Ingresá tu nombre (mínimo 2 caracteres).'
  if (!validateEmail(data.email.trim())) errors.email = 'Ingresá un email válido.'
  if (data.telefono.replace(/\D/g, '').length < 8) errors.telefono = 'Ingresá un teléfono válido (mínimo 8 dígitos).'
  if (!data.tipo) errors.tipo = 'Seleccioná el tipo de pallet.'
  if (data.mensaje.trim().length < 20) errors.mensaje = 'El mensaje debe tener al menos 20 caracteres.'
  return errors
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    empresa: '',
    nombre: '',
    email: '',
    telefono: '',
    tipo: '',
    mensaje: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function buildWhatsAppUrl(data: FormState): string {
    const text = [
      'Hola Wood Pallet! Vengo del formulario web.',
      `*Empresa:* ${data.empresa}`,
      `*Nombre:* ${data.nombre}`,
      `*Email:* ${data.email}`,
      `*Teléfono:* ${data.telefono}`,
      `*Tipo de pallet:* ${data.tipo}`,
      `*Mensaje:* ${data.mensaje}`,
    ].join('\n')
    return `https://api.whatsapp.com/send/?phone=${PHONE_NUMBER}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setErrors({})

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setErrors({ general: data.error ?? 'Error al enviar. Intentá de nuevo.' })
      }
    } catch {
      setErrors({ general: 'Error de red. Verificá tu conexión e intentá de nuevo.' })
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setForm({ empresa: '', nombre: '', email: '', telefono: '', tipo: '', mensaje: '' })
    setErrors({})
    setSuccess(false)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="border border-accent-green/30 bg-brand-white p-8 flex flex-col items-center text-center gap-4">
        <span
          className="text-accent-green font-light leading-none select-none"
          style={{ fontSize: 40 }}
          aria-hidden="true"
        >
          ✓
        </span>
        <p className="text-base font-medium text-brand-dark">¡Consulta enviada!</p>
        <p className="text-sm text-brand-tan leading-relaxed max-w-xs">
          Recibimos tu mensaje y te respondemos a la brevedad. También podés escribirnos directo por WhatsApp.
        </p>
        <a
          href={buildWhatsAppUrl(form)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-2"
        >
          <FaWhatsapp /> Escribir por WhatsApp
        </a>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-brand-tan hover:text-brand-dark transition-colors duration-200 underline underline-offset-2 mt-1 cursor-pointer"
        >
          Enviar otra consulta
        </button>
      </div>
    )
  }

  const fieldClass = (hasError: boolean) =>
    [
      'w-full rounded-none border bg-brand-white px-4 py-3 text-sm text-brand-dark',
      'placeholder:text-brand-sand focus:outline-none transition-colors duration-200',
      hasError ? 'border-accent-warm' : 'border-brand-sand focus:border-brand-tan',
    ].join(' ')

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="empresa" className="input-label">
          Nombre de la empresa <span className="text-accent-warm">*</span>
        </label>
        <input id="empresa" name="empresa" type="text" value={form.empresa} onChange={handleChange} placeholder="Ej: Distribuidora López S.A." className={fieldClass(!!errors.empresa)} />
        {errors.empresa && <p className="text-xs text-accent-warm mt-1">{errors.empresa}</p>}
      </div>

      <div>
        <label htmlFor="nombre" className="input-label">
          Tu nombre <span className="text-accent-warm">*</span>
        </label>
        <input id="nombre" name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Ej: Juan García" className={fieldClass(!!errors.nombre)} />
        {errors.nombre && <p className="text-xs text-accent-warm mt-1">{errors.nombre}</p>}
      </div>

      <div>
        <label htmlFor="email" className="input-label">
          Email de contacto <span className="text-accent-warm">*</span>
        </label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="juan@empresa.com" className={fieldClass(!!errors.email)} />
        {errors.email && <p className="text-xs text-accent-warm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="telefono" className="input-label">
          Teléfono / WhatsApp <span className="text-accent-warm">*</span>
        </label>
        <input id="telefono" name="telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="11 1234-5678" className={fieldClass(!!errors.telefono)} />
        {errors.telefono && <p className="text-xs text-accent-warm mt-1">{errors.telefono}</p>}
      </div>

      <div>
        <label htmlFor="tipo" className="input-label">
          ¿Qué tipo de pallet necesitás? <span className="text-accent-warm">*</span>
        </label>
        <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange} className={fieldClass(!!errors.tipo) + ' cursor-pointer'}>
          <option value="" disabled>Seleccioná una opción...</option>
          {PALLET_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.tipo && <p className="text-xs text-accent-warm mt-1">{errors.tipo}</p>}
      </div>

      <div>
        <label htmlFor="mensaje" className="input-label">
          Contanos tu necesidad <span className="text-accent-warm">*</span>
        </label>
        <textarea id="mensaje" name="mensaje" rows={4} value={form.mensaje} onChange={handleChange} placeholder="Ej: Necesito 500 pallets euro por mes para distribución. Entrega en Pilar, Buenos Aires." className={fieldClass(!!errors.mensaje) + ' resize-none'} />
        {errors.mensaje && <p className="text-xs text-accent-warm mt-1">{errors.mensaje}</p>}
      </div>

      {errors.general && (
        <p className="text-sm p-3 border border-accent-warm text-accent-warm">{errors.general}</p>
      )}

      <button type="submit" disabled={loading} className="btn-whatsapp w-full mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
        {loading ? (
          <><FaSpinner className="animate-spin" /> Enviando...</>
        ) : (
          'Enviar consulta'
        )}
      </button>
    </form>
  )
}
