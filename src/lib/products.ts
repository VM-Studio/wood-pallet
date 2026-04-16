import { WHATSAPP_LINKS } from './constants'

export interface Product {
  id: string
  nombre: string
  medida: string
  carga: string
  uso: string
  descripcion: string
  imagen: string
  wa: string
  badge: string | null
  nimf: boolean | 'consultar'
}

export const PRODUCTS: Product[] = [
  {
    id: 'seminuevo-reforzado',
    nombre: 'Pallet Seminuevo Reforzado',
    medida: '1200 × 1000 mm',
    carga: '1.500 kg',
    uso: 'Uso general',
    descripcion:
      'Pallet seminuevo de alta resistencia, reforzado con tablas extras para soportar cargas de hasta 1.500 kg. Ideal para operaciones de logística interna donde se necesita durabilidad a menor costo que el nuevo.',
    imagen: '/palletseminuevo.png',
    wa: WHATSAPP_LINKS.seminuevoReforzado,
    badge: 'Más vendido',
    nimf: 'consultar',
  },
  {
    id: 'seminuevo-descartable',
    nombre: 'Pallet Seminuevo Descartable',
    medida: '1200 × 1000 mm',
    carga: '1.000 kg',
    uso: 'Uso general',
    descripcion:
      'Pallet seminuevo económico para un solo viaje o uso de corto plazo. Capacidad de carga de hasta 1.000 kg. La opción más accesible para envíos, exportación liviana y distribución puntual.',
    imagen: '/palletdescartableseminuevo.png',
    wa: WHATSAPP_LINKS.seminuevoDescartable,
    badge: 'Económico',
    nimf: 'consultar',
  },
  {
    id: 'euro',
    nombre: 'Pallet Euro',
    medida: '1200 × 800 mm',
    carga: '1.800 kg',
    uso: 'Consumo masivo',
    descripcion:
      'Medida estándar europea, ampliamente utilizada en supermercados, retail y logística internacional. Compatible con la mayoría de los equipos de manipulación del mercado.',
    imagen: '/palleteuro.png',
    wa: WHATSAPP_LINKS.euro,
    badge: 'Más pedido',
    nimf: true,
  },
  {
    id: 'estandar',
    nombre: 'Pallet Estándar',
    medida: '1200 × 1000 mm',
    carga: '1.800 kg',
    uso: 'Consumo masivo',
    descripcion:
      'El pallet normalizado tipo ARLOG, preferido por empresas argentinas. Versátil y resistente, ideal para almacenes, distribución y transporte pesado.',
    imagen: '/palletstandard.png',
    wa: WHATSAPP_LINKS.estandar,
    badge: 'Tipo ARLOG',
    nimf: true,
  },
  {
    id: 'liviano',
    nombre: 'Pallet Estándar Liviano',
    medida: '1200 × 1000 mm',
    carga: '1.000 kg',
    uso: 'Consumo masivo',
    descripcion:
      'Versión optimizada del estándar con menor peso propio. Ideal para mercadería liviana donde se prioriza la reducción de costo por unidad sin sacrificar funcionalidad.',
    imagen: '/palletstandard.png',
    wa: WHATSAPP_LINKS.liviano,
    badge: null,
    nimf: true,
  },
  {
    id: 'tirante',
    nombre: 'Pallet con Tirante',
    medida: 'Personalizada',
    carga: 'Según medida',
    uso: 'Industria cementera',
    descripcion:
      'Diseñado específicamente para la industria cementera y construcción. La viga central (tirante) permite la manipulación con zorras y montacargas en condiciones de peso extremo.',
    imagen: '/tirante.png',
    wa: WHATSAPP_LINKS.tirante,
    badge: 'Industrial',
    nimf: true,
  },
  {
    id: 'doble-faz',
    nombre: 'Pallet Doble Faz',
    medida: '1200 × 1000 mm',
    carga: '+2.000 kg',
    uso: 'Cargas reforzadas',
    descripcion:
      'Construido con tablas en ambas caras para máxima resistencia y durabilidad. El preferido para cargas extremas, exportación y operaciones de alto tráfico.',
    imagen: '/palletdoblefaz.png',
    wa: WHATSAPP_LINKS.dobleFaz,
    badge: 'Alta resistencia',
    nimf: true,
  },
  {
    id: 'especiales',
    nombre: 'Pallets a Medida',
    medida: 'A pedido',
    carga: 'Según diseño',
    uso: 'Uso general',
    descripcion:
      'Fabricamos pallets a medida para cualquier necesidad específica. Dimensiones, tipo de madera, cantidad de tablas y refuerzos según los requerimientos del cliente.',
    imagen: '/amedida.png',
    wa: WHATSAPP_LINKS.especiales,
    badge: 'A medida',
    nimf: true,
  },
]

/** Tabla comparativa — mismos datos en formato de fila */
export const TABLE_ROWS = PRODUCTS.map((p) => ({
  nombre:  p.nombre,
  medida:  p.medida,
  carga:   p.carga,
  uso:     p.uso,
  nimf:    p.nimf,
  wa:      p.wa,
}))
