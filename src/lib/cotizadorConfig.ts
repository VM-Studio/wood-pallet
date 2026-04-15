// ============================================================
// CONFIGURACIÓN CENTRALIZADA DEL COTIZADOR
// ============================================================

export type TipoPallet = {
  id: string
  nombre: string
  descripcion: string
  medida: string
  cargaMax: string
}

export const TIPOS_PALLET: TipoPallet[] = [
  {
    id: 'seminuevo-reforzado',
    nombre: 'Pallet Seminuevo Reforzado',
    descripcion: 'Alta resistencia, ideal para logística interna',
    medida: '1200 × 1000 mm',
    cargaMax: '1.500 kg',
  },
  {
    id: 'seminuevo-descartable',
    nombre: 'Pallet Seminuevo Descartable',
    descripcion: 'Económico, para un solo viaje o uso puntual',
    medida: '1200 × 1000 mm',
    cargaMax: '1.000 kg',
  },
  {
    id: 'euro',
    nombre: 'Pallet Euro',
    descripcion: 'El más utilizado en Europa y para exportación',
    medida: '1200 × 800 mm',
    cargaMax: '1.800 kg',
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
    nombre: 'Pallets a Medida',
    descripcion: 'Fabricación a medida según tus necesidades',
    medida: 'A pedido',
    cargaMax: 'Según diseño',
  },
]

export type DatosCotizacion = {
  tipoPallet: string
  cantidad: number
  esExportacion: boolean
  urgencia: string
  requiereEnvio: boolean
  zonaEntrega: string
  direccionEntrega: string
  empresa: string
  nombre: string
  email: string
  telefono: string
  mensaje: string
}
