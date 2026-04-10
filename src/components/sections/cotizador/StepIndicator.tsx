'use client'

const PASOS = [
  { num: '01', nombre: 'Tipo de pallet' },
  { num: '02', nombre: 'Cantidad y uso' },
  { num: '03', nombre: 'Entrega' },
  { num: '04', nombre: 'Tus datos' },
]

interface StepIndicatorProps {
  pasoActual: number // 1-based
}

export default function StepIndicator({ pasoActual }: StepIndicatorProps) {
  return (
    <>
      {/* Desktop: 4 pasos con líneas conectoras */}
      <div className="hidden sm:flex items-center mb-10">
        {PASOS.map((paso, i) => {
          const idx = i + 1
          const completado = idx < pasoActual
          const activo = idx === pasoActual

          return (
            <div key={paso.num} className="flex items-center flex-1 last:flex-none">
              {/* Paso */}
              <div
                className="flex items-center gap-2.5 shrink-0"
                aria-current={activo ? 'step' : undefined}
              >
                <div
                  className="w-9 h-9 flex items-center justify-center text-xs font-medium transition-all duration-300"
                  style={
                    completado
                      ? { background: '#1C1208', color: '#C9A84C' }
                      : activo
                        ? { background: 'transparent', border: '2px solid #C9A84C', color: '#C9A84C' }
                        : { background: 'transparent', border: '1px solid #E8D5BC', color: '#E8D5BC' }
                  }
                >
                  {completado ? '✓' : paso.num}
                </div>
                <div className="hidden lg:block">
                  <div
                    className="text-xs font-medium leading-tight"
                    style={{ color: completado ? '#1C1208' : activo ? '#1C1208' : '#B8814A' }}
                  >
                    {paso.nombre}
                  </div>
                </div>
              </div>

              {/* Línea conectora */}
              {i < PASOS.length - 1 && (
                <div className="flex-1 mx-3 h-px relative" style={{ background: '#E8D5BC' }}>
                  <div
                    className="absolute inset-y-0 left-0 transition-all duration-500"
                    style={{
                      background: '#C9A84C',
                      width: completado ? '100%' : '0%',
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: solo paso actual con "Paso X de 4" */}
      <div className="sm:hidden mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-brand-tan">
            Paso {pasoActual} de {PASOS.length}
          </span>
          <span className="text-xs font-medium text-brand-dark">
            {PASOS[pasoActual - 1].nombre}
          </span>
        </div>
        {/* Barra de progreso */}
        <div className="h-px w-full" style={{ background: '#E8D5BC' }}>
          <div
            className="h-px transition-all duration-500"
            style={{
              background: '#C9A84C',
              width: `${((pasoActual - 1) / (PASOS.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </>
  )
}
