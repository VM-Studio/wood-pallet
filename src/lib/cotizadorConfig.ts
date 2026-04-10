// ============================================================
// CONFIGURACIÓN CENTRALIZADA DEL COTIZADOR
// Para cambiar precios, editar SOLO este archivo.
// ============================================================

export const PRECIOS = {
  palletPorUnidad: 50,   // $50 por pallet
  envioPorUnidad: 10,    // $10 por pallet para envío/logística
  nimf15PorUnidad: 25,   // $25 por pallet para exportación/NIMF-15
}

export type TipoPallet = {
  id: string
  nombre: string
  descripcion: string
  medida: string
  cargaMax: string
}

export const TIPOS_PALLET: TipoPallet[] = [
  {
    id: 'euro',
    nombre: 'Pallet Euro',
    descripcion: 'El más utilizado en Europa y para exportación',
    medida: '1200 × 800 mm',
    cargaMax: '1.300 kg',
  },
  {
    id: 'estandar',
    nombre: 'Pallet Estándar',
    descripcion: 'El estándar del mercado argentino',
    medida: '1200 × 1000 mm',
    cargaMax: '1.800 kg',
  },
  {
    id: 'estandar-liviano',
    nombre: 'Pallet Estándar Liviano',
    descripcion: 'Menor peso, ideal para cargas medianas',
    medida: '1200 × 1000 mm',
    cargaMax: '1.000 kg',
  },
  {
    id: 'usados',
    nombre: 'Pallets Usados',
    descripcion: 'Pallets recuperados y reparados en buen estado',
    medida: '1200 × 1000 mm',
    cargaMax: '1.800 kg',
  },
  {
    id: 'tirante',
    nombre: 'Pallet con Tirante',
    descripcion: 'Con refuerzo central para mayor resistencia',
    medida: 'Personalizada',
    cargaMax: 'Según medida',
  },
  {
    id: 'doble-faz',
    nombre: 'Pallet Doble Faz',
    descripcion: 'Tablillas en ambas caras para uso intensivo',
    medida: '1200 × 1000 mm',
    cargaMax: '+2.000 kg',
  },
  {
    id: 'especiales',
    nombre: 'Medidas Especiales',
    descripcion: 'Fabricación a medida según tus necesidades',
    medida: 'A pedido',
    cargaMax: 'Según diseño',
  },
  {
    id: 'carton',
    nombre: 'Pallet de Cartón',
    descripcion: 'Liviano, sin tratamiento NIMF, ideal para aéreo',
    medida: 'Varias medidas',
    cargaMax: 'Consultar',
  },
]

export type ZonaEntrega = {
  id: string
  nombre: string
}

export const ZONAS_ENTREGA: ZonaEntrega[] = [
  { id: 'gba-norte',       nombre: 'GBA Norte (Tigre, San Isidro, Vicente López)' },
  { id: 'gba-oeste',       nombre: 'GBA Oeste (Morón, La Matanza, Merlo)' },
  { id: 'gba-sur',         nombre: 'GBA Sur (Quilmes, Lanús, Avellaneda)' },
  { id: 'caba',            nombre: 'Ciudad Autónoma de Buenos Aires' },
  { id: 'interior-ba',     nombre: 'Interior Provincia de Buenos Aires' },
  { id: 'otras-provincias',nombre: 'Otras provincias — consultar' },
]

export type DatosCotizacion = {
  tipoPallet: string
  cantidad: number
  esExportacion: boolean
  urgencia: string
  requiereEnvio: boolean
  zonaEntrega: string
  direccionEntrega: string
  fechaEntrega: string
  empresa: string
  nombre: string
  email: string
  telefono: string
  mensaje: string
}

export type ResultadoCotizacion = {
  subtotalPallets: number
  subtotalEnvio: number
  subtotalNimf: number
  total: number
  desglose: { descripcion: string; monto: number }[]
}

export function calcularPresupuesto(datos: Pick<DatosCotizacion, 'cantidad' | 'esExportacion' | 'requiereEnvio'>): ResultadoCotizacion {
  const subtotalPallets = datos.cantidad * PRECIOS.palletPorUnidad
  const subtotalEnvio   = datos.requiereEnvio  ? datos.cantidad * PRECIOS.envioPorUnidad   : 0
  const subtotalNimf    = datos.esExportacion  ? datos.cantidad * PRECIOS.nimf15PorUnidad  : 0
  const total = subtotalPallets + subtotalEnvio + subtotalNimf

  const desglose: { descripcion: string; monto: number }[] = [
    { descripcion: `${datos.cantidad} pallets`, monto: subtotalPallets },
  ]
  if (subtotalEnvio > 0) {
    desglose.push({ descripcion: 'Envío a domicilio', monto: subtotalEnvio })
  }
  if (subtotalNimf > 0) {
    desglose.push({ descripcion: 'Tratamiento NIMF-15', monto: subtotalNimf })
  }

  return { subtotalPallets, subtotalEnvio, subtotalNimf, total, desglose }
}

export function formatPrecio(monto: number): string {
  return `$${monto.toLocaleString('es-AR')}`
}
