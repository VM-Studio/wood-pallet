'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepIndicator from './StepIndicator'
import SuccessState from './SuccessState'
import {
  TIPOS_PALLET,
  ZONAS_ENTREGA,
  calcularPresupuesto,
  formatPrecio,
  type DatosCotizacion,
  type ResultadoCotizacion,
} from '@/lib/cotizadorConfig'

type FormData = Partial<DatosCotizacion>

const URGENCIA_OPTS = ['Lo antes posible', 'En 1 a 2 semanas', 'En 1 mes o más']

const EASE = 'easeOut'

// ——————————————————————————————————————
// Estilos reutilizables
// ——————————————————————————————————————
const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #1C1208',
  borderRadius: 0,
  padding: '10px 14px',
  fontSize: '16px', // mínimo 16px para evitar zoom en iOS
  backgroundColor: '#FAFAF9',
  color: '#1C1208',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 500,
  color: '#1C1208',
  marginBottom: '6px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
}

// ——————————————————————————————————————
// Variantes de animación entre pasos
// ——————————————————————————————————————
function variants(dir: 1 | -1) {
  return {
    enter: { opacity: 0, x: dir * 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: dir * -24 },
  }
}

// ——————————————————————————————————————
// Card seleccionable
// ——————————————————————————————————————
interface SelectCardProps {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}
function SelectCard({ selected, onClick, children, className = '' }: SelectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left transition-all duration-150 ${className}`}
      style={{
        border: selected ? '2px solid #C9A84C' : '1px solid #E8D5BC',
        borderRadius: 0,
        backgroundColor: selected ? '#F7F3EE' : '#FAFAF9',
        padding: '14px',
        cursor: 'pointer',
      }}
    >
      {selected && (
        <span
          className="absolute top-2 right-2 text-xs font-bold"
          style={{ color: '#C9A84C' }}
        >
          ✓
        </span>
      )}
      {children}
    </button>
  )
}

// ——————————————————————————————————————
// COMPONENTE PRINCIPAL
// ——————————————————————————————————————
export default function CotizadorForm() {
  const [paso, setPaso] = useState(1)
  const [dir, setDir] = useState<1 | -1>(1)
  const [form, setForm] = useState<FormData>({})
  const [errores, setErrores] = useState<Partial<Record<keyof DatosCotizacion | 'general', string>>>({})
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<ResultadoCotizacion | null>(null)
  const [exito, setExito] = useState(false)

  const set = useCallback((campo: keyof DatosCotizacion, valor: unknown) => {
    setForm((prev) => ({ ...prev, [campo]: valor }))
    setErrores((prev) => { const e = { ...prev }; delete e[campo]; return e })
  }, [])

  // Calcular presupuesto en tiempo real
  const calculo = calcularPresupuesto({
    cantidad: Number(form.cantidad ?? 0),
    esExportacion: Boolean(form.esExportacion),
    requiereEnvio: Boolean(form.requiereEnvio),
  })

  // ————————————————————————————————
  // Validaciones por paso
  // ————————————————————————————————
  function validarPaso(): boolean {
    const e: typeof errores = {}

    if (paso === 1) {
      if (!form.tipoPallet) e.tipoPallet = 'Seleccioná un tipo de pallet para continuar'
    }

    if (paso === 2) {
      if (!form.cantidad || Number(form.cantidad) < 1)
        e.cantidad = 'Ingresá una cantidad válida'
      if (form.esExportacion === undefined)
        e.esExportacion = 'Seleccioná el uso del pallet'
      if (!form.urgencia)
        e.urgencia = 'Seleccioná cuándo lo necesitás'
    }

    if (paso === 3) {
      if (form.requiereEnvio === undefined)
        e.requiereEnvio = 'Seleccioná si necesitás entrega'
      if (form.requiereEnvio) {
        if (!form.zonaEntrega) e.zonaEntrega = 'Seleccioná la zona de entrega'
        if (!form.direccionEntrega?.trim()) e.direccionEntrega = 'Ingresá la dirección de entrega'
      }
    }

    if (paso === 4) {
      if (!form.empresa?.trim()) e.empresa = 'Ingresá el nombre de tu empresa'
      if (!form.nombre?.trim()) e.nombre = 'Ingresá tu nombre'
      if (!form.email?.trim()) e.email = 'Ingresá tu email'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = 'El formato del email no es válido'
      if (!form.telefono?.trim()) e.telefono = 'Ingresá tu teléfono'
    }

    setErrores(e)
    return Object.keys(e).length === 0
  }

  function avanzar() {
    if (!validarPaso()) return
    setDir(1)
    setPaso((p) => Math.min(p + 1, 4))
  }

  function retroceder() {
    setDir(-1)
    setPaso((p) => Math.max(p - 1, 1))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validarPaso()) return

    setEnviando(true)
    setErrores({})

    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
      const res = await fetch('/api/cotizador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: siteUrl,
        },
        body: JSON.stringify({ ...form, cantidad: Number(form.cantidad) }),
      })

      const data = await res.json()

      if (data.success) {
        setResultado(calculo)
        setExito(true)
      } else {
        setErrores({ general: data.error ?? 'Error al enviar. Intentá de nuevo.' })
      }
    } catch {
      setErrores({ general: 'Error de red. Verificá tu conexión e intentá de nuevo.' })
    } finally {
      setEnviando(false)
    }
  }

  function resetear() {
    setForm({})
    setErrores({})
    setPaso(1)
    setDir(1)
    setExito(false)
    setResultado(null)
  }

  if (exito && resultado) {
    return (
      <SuccessState
        datos={form as DatosCotizacion}
        calculo={resultado}
        onReset={resetear}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <StepIndicator pasoActual={paso} />

      <div className="relative overflow-hidden min-h-100">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={paso}
            variants={variants(dir)}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: EASE }}
          >

            {/* ================================================
                PASO 1 — Tipo de pallet
            ================================================ */}
            {paso === 1 && (
              <div>
                <h3 className="section-title mb-1">
                  ¿Qué tipo de pallet <em className="em-gradient">necesitás?</em>
                </h3>
                <p className="text-sm text-brand-dark/60 mb-6">
                  Seleccioná el modelo que mejor se adapta a tu operación
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {TIPOS_PALLET.map((tipo) => (
                    <SelectCard
                      key={tipo.id}
                      selected={form.tipoPallet === tipo.id}
                      onClick={() => set('tipoPallet', tipo.id)}
                    >
                      <div className="font-medium text-sm text-brand-dark mb-1">{tipo.nombre}</div>
                      <div className="text-xs text-brand-tan">{tipo.medida}</div>
                      <div className="text-xs text-brand-tan">{tipo.cargaMax}</div>
                    </SelectCard>
                  ))}
                </div>

                {errores.tipoPallet && (
                  <p className="text-xs mt-3" style={{ color: '#C9A84C' }}>{errores.tipoPallet}</p>
                )}
              </div>
            )}

            {/* ================================================
                PASO 2 — Cantidad y uso
            ================================================ */}
            {paso === 2 && (
              <div className="flex flex-col gap-8">
                <h3 className="section-title mb-0">
                  Contanos sobre tu <em className="em-gradient">pedido</em>
                </h3>

                {/* Cantidad */}
                <div>
                  <label style={labelStyle} htmlFor="cantidad">
                    ¿Cuántos pallets necesitás?
                  </label>
                  <input
                    id="cantidad"
                    type="number"
                    min={1}
                    max={99999}
                    placeholder="Ej: 100"
                    value={form.cantidad ?? ''}
                    onChange={(e) => set('cantidad', e.target.value)}
                    style={inputStyle}
                  />
                  {form.cantidad && Number(form.cantidad) > 0 && (
                    <p className="text-sm mt-2 font-medium" style={{ color: '#C9A84C' }}>
                      Subtotal pallets: {formatPrecio(Number(form.cantidad) * 50)}
                    </p>
                  )}
                  {errores.cantidad && (
                    <p className="text-xs mt-1" style={{ color: '#C9A84C' }}>{errores.cantidad}</p>
                  )}
                </div>

                {/* Exportación */}
                <div>
                  <label style={labelStyle}>¿Es para exportación?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <SelectCard
                      selected={form.esExportacion === false}
                      onClick={() => set('esExportacion', false)}
                      className="flex-1"
                    >
                      <div className="text-2xl mb-2">🏭</div>
                      <div className="font-medium text-sm text-brand-dark mb-1">Uso local</div>
                      <div className="text-xs text-brand-tan">Para distribución y operaciones dentro de Argentina</div>
                    </SelectCard>
                    <SelectCard
                      selected={form.esExportacion === true}
                      onClick={() => set('esExportacion', true)}
                      className="flex-1"
                    >
                      <div className="text-2xl mb-2">🌍</div>
                      <div className="font-medium text-sm text-brand-dark mb-1">Exportación internacional</div>
                      <div className="text-xs text-brand-tan">Requiere tratamiento NIMF-15 (+$25 por unidad)</div>
                    </SelectCard>
                  </div>

                  <AnimatePresence>
                    {form.esExportacion === true && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs mt-3 px-3 py-2 border-l-2" style={{ color: '#1E4035', borderColor: '#1E4035', backgroundColor: '#f0faf8' }}>
                          ✓ Se incluirá el tratamiento fitosanitario NIMF-15 certificado para exportación a cualquier destino
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {errores.esExportacion && (
                    <p className="text-xs mt-2" style={{ color: '#C9A84C' }}>{errores.esExportacion}</p>
                  )}
                </div>

                {/* Urgencia */}
                <div>
                  <label style={labelStyle}>¿Para cuándo lo necesitás?</label>
                  <div className="flex flex-wrap gap-2">
                    {URGENCIA_OPTS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set('urgencia', opt)}
                        className="px-4 py-2 text-sm transition-all duration-150"
                        style={{
                          border: form.urgencia === opt ? '1px solid #1C1208' : '1px solid #E8D5BC',
                          borderRadius: 0,
                          backgroundColor: form.urgencia === opt ? '#1C1208' : '#FAFAF9',
                          color: form.urgencia === opt ? '#F7F3EE' : '#B8814A',
                          cursor: 'pointer',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errores.urgencia && (
                    <p className="text-xs mt-2" style={{ color: '#C9A84C' }}>{errores.urgencia}</p>
                  )}
                </div>
              </div>
            )}

            {/* ================================================
                PASO 3 — Entrega
            ================================================ */}
            {paso === 3 && (
              <div className="flex flex-col gap-8">
                <h3 className="section-title mb-0">
                  ¿Necesitás que te lo <em className="em-gradient">entreguemos?</em>
                </h3>

                {/* Tipo de entrega */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <SelectCard
                      selected={form.requiereEnvio === false}
                      onClick={() => set('requiereEnvio', false)}
                    >
                      <div className="font-medium text-brand-dark mb-1">Retiro en planta</div>
                      <div className="text-xs text-brand-tan mb-3">
                        Retirás en nuestra planta en Los Troncos del Talar, Tigre, Buenos Aires
                      </div>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wide px-2 py-1"
                        style={{ backgroundColor: '#1E4035', color: '#fff' }}
                      >
                        GRATIS
                      </span>
                    </SelectCard>
                    <SelectCard
                      selected={form.requiereEnvio === true}
                      onClick={() => set('requiereEnvio', true)}
                    >
                      <div className="font-medium text-brand-dark mb-1">Entrega a domicilio</div>
                      <div className="text-xs text-brand-tan mb-3">
                        Te llevamos los pallets a tu depósito o dirección indicada
                      </div>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wide px-2 py-1"
                        style={{ backgroundColor: '#C9A84C', color: '#1C1208' }}
                      >
                        $10/unidad
                      </span>
                    </SelectCard>
                  </div>
                  {errores.requiereEnvio && (
                    <p className="text-xs mt-2" style={{ color: '#C9A84C' }}>{errores.requiereEnvio}</p>
                  )}
                </div>

                {/* Campos adicionales de entrega */}
                <AnimatePresence>
                  {form.requiereEnvio === true && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="overflow-hidden flex flex-col gap-6"
                    >
                      {/* Zona */}
                      <div>
                        <label style={labelStyle} htmlFor="zona">
                          ¿En qué zona necesitás la entrega?
                        </label>
                        <select
                          id="zona"
                          value={form.zonaEntrega ?? ''}
                          onChange={(e) => set('zonaEntrega', e.target.value)}
                          style={{ ...inputStyle, appearance: 'none' }}
                        >
                          <option value="">Seleccioná una zona...</option>
                          {ZONAS_ENTREGA.map((z) => (
                            <option key={z.id} value={z.id}>{z.nombre}</option>
                          ))}
                        </select>
                        {errores.zonaEntrega && (
                          <p className="text-xs mt-1" style={{ color: '#C9A84C' }}>{errores.zonaEntrega}</p>
                        )}
                      </div>

                      {/* Dirección */}
                      <div>
                        <label style={labelStyle} htmlFor="direccion">
                          Dirección de entrega
                        </label>
                        <input
                          id="direccion"
                          type="text"
                          placeholder="Calle, número, ciudad, partido"
                          value={form.direccionEntrega ?? ''}
                          onChange={(e) => set('direccionEntrega', e.target.value)}
                          style={inputStyle}
                        />
                        {errores.direccionEntrega && (
                          <p className="text-xs mt-1" style={{ color: '#C9A84C' }}>{errores.direccionEntrega}</p>
                        )}
                      </div>

                      {/* Fecha */}
                      <div>
                        <label style={labelStyle} htmlFor="fecha">
                          Fecha preferida de entrega
                        </label>
                        <input
                          id="fecha"
                          type="date"
                          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                          value={form.fechaEntrega ?? ''}
                          onChange={(e) => set('fechaEntrega', e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ================================================
                PASO 4 — Datos del cliente + Resumen + Submit
            ================================================ */}
            {paso === 4 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="section-title mb-1">
                    Tus datos para recibir el <em className="em-gradient">presupuesto</em>
                  </h3>
                  <p className="text-sm text-brand-dark/60">
                    Te enviamos el presupuesto detallado por email al instante
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Empresa */}
                  <div className="sm:col-span-2">
                    <label style={labelStyle} htmlFor="empresa">Nombre de la empresa</label>
                    <input
                      id="empresa"
                      type="text"
                      placeholder="Ej: Distribuidora López S.A."
                      value={form.empresa ?? ''}
                      onChange={(e) => set('empresa', e.target.value)}
                      style={inputStyle}
                    />
                    {errores.empresa && <p className="text-xs mt-1" style={{ color: '#C9A84C' }}>{errores.empresa}</p>}
                  </div>

                  {/* Nombre */}
                  <div>
                    <label style={labelStyle} htmlFor="nombre">Tu nombre completo</label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Ej: Juan García"
                      value={form.nombre ?? ''}
                      onChange={(e) => set('nombre', e.target.value)}
                      style={inputStyle}
                    />
                    {errores.nombre && <p className="text-xs mt-1" style={{ color: '#C9A84C' }}>{errores.nombre}</p>}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label style={labelStyle} htmlFor="telefono">Teléfono / WhatsApp</label>
                    <input
                      id="telefono"
                      type="tel"
                      placeholder="11 1234-5678"
                      value={form.telefono ?? ''}
                      onChange={(e) => set('telefono', e.target.value)}
                      style={inputStyle}
                    />
                    {errores.telefono && <p className="text-xs mt-1" style={{ color: '#C9A84C' }}>{errores.telefono}</p>}
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label style={labelStyle} htmlFor="email">Email donde recibís el presupuesto</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="juan@empresa.com"
                      value={form.email ?? ''}
                      onChange={(e) => set('email', e.target.value)}
                      style={inputStyle}
                    />
                    <p className="text-xs mt-1 text-brand-tan">📧 Te enviamos el presupuesto a este email</p>
                    {errores.email && <p className="text-xs mt-1" style={{ color: '#C9A84C' }}>{errores.email}</p>}
                  </div>

                  {/* Mensaje */}
                  <div className="sm:col-span-2">
                    <label style={labelStyle} htmlFor="mensaje">¿Alguna aclaración o pregunta? (opcional)</label>
                    <textarea
                      id="mensaje"
                      rows={3}
                      placeholder="Ej: Necesito los pallets paletizados, ¿tienen ese servicio?"
                      value={form.mensaje ?? ''}
                      onChange={(e) => set('mensaje', e.target.value)}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>
                </div>

                {/* Resumen */}
                <div className="bg-brand-dark p-6">
                  <p
                    className="text-[10px] uppercase tracking-widest mb-4"
                    style={{ color: '#B8814A' }}
                  >
                    Resumen de tu cotización
                  </p>
                  <div className="flex flex-col gap-2 mb-4">
                    {calculo.desglose.map((linea, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-sm text-brand-cream">
                          {i === 0
                            ? `${form.cantidad} pallets ${TIPOS_PALLET.find((t) => t.id === form.tipoPallet)?.nombre ?? ''}`
                            : linea.descripcion}
                        </span>
                        <span className="text-sm font-medium text-brand-cream">
                          {formatPrecio(linea.monto)}
                        </span>
                      </div>
                    ))}
                    {calculo.subtotalEnvio === 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-brand-cream">Envío</span>
                        <span className="text-sm text-brand-cream">Sin costo (retiro en planta)</span>
                      </div>
                    )}
                  </div>
                  <div className="h-px mb-4" style={{ backgroundColor: 'rgba(184,129,74,0.2)' }} />
                  <div className="flex justify-between items-center">
                    <span
                      className="text-[10px] uppercase tracking-widest"
                      style={{ color: '#B8814A' }}
                    >
                      Total estimado
                    </span>
                    <span
                      className="font-light"
                      style={{ color: '#C9A84C', fontSize: '28px', fontFamily: 'Georgia, serif' }}
                    >
                      {formatPrecio(calculo.total)}
                    </span>
                  </div>
                  <p className="text-xs italic mt-4" style={{ color: 'rgba(184,129,74,0.6)' }}>
                    * Presupuesto estimado. El precio final puede variar según disponibilidad y condiciones específicas del pedido.
                  </p>
                </div>

                {/* Error general */}
                {errores.general && (
                  <p className="text-sm p-3 border" style={{ color: '#C9A84C', borderColor: '#C9A84C' }}>
                    {errores.general}
                  </p>
                )}

                {/* Botón submit */}
                <button
                  type="submit"
                  disabled={enviando}
                  className="btn-primary w-full justify-center text-center"
                  style={{ opacity: enviando ? 0.7 : 1 }}
                >
                  {enviando ? (
                    <span className="flex items-center gap-2 justify-center">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                      Enviando presupuesto...
                    </span>
                  ) : (
                    'Recibir presupuesto por email'
                  )}
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegación anterior / siguiente */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-sand">
        {paso > 1 ? (
          <button
            type="button"
            onClick={retroceder}
            className="btn-ghost text-sm"
          >
            ← Anterior
          </button>
        ) : (
          <div />
        )}

        {paso < 4 && (
          <button
            type="button"
            onClick={avanzar}
            className="btn-primary"
          >
            Siguiente →
          </button>
        )}
      </div>
    </form>
  )
}
