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
    id: 'euro',
    nombre: 'Pallet Euro',
    medida: '1200 × 800 mm',
    carga: '1.300 kg',
    uso: 'Consumo masivo',
    descripcion:
      'Medida estándar europea, ampliamente utilizada en supermercados, retail y logística internacional. Compatible con la mayoría de los equipos de manipulación del mercado.',
    imagen: '/images/productos/pallet-euro.jpg',
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
    imagen: '/images/productos/pallet-estandar.jpg',
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
    imagen: '/images/productos/pallet-estandar-liviano.jpg',
    wa: WHATSAPP_LINKS.liviano,
    badge: null,
    nimf: true,
  },
  {
    id: 'usados',
    nombre: 'Pallets Usados',
    medida: '1200 × 1000 mm',
    carga: '1.800 kg',
    uso: 'Consumo masivo',
    descripcion:
      'Pallets recuperados y revisados en excelente estado. La opción más económica para operaciones internas donde el aspecto visual es secundario a la funcionalidad.',
    imagen: '/images/productos/pallet-usados.jpg',
    wa: WHATSAPP_LINKS.usados,
    badge: 'Económico',
    nimf: 'consultar',
  },
  {
    id: 'tirante',
    nombre: 'Pallet con Tirante',
    medida: 'Personalizada',
    carga: 'Según medida',
    uso: 'Industria cementera',
    descripcion:
      'Diseñado específicamente para la industria cementera y construcción. La viga central (tirante) permite la manipulación con zorras y montacargas en condiciones de peso extremo.',
    imagen: '/images/productos/pallet-tirante.jpg',
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
    imagen: '/images/productos/pallet-doble-faz.jpg',
    wa: WHATSAPP_LINKS.dobleFaz,
    badge: 'Alta resistencia',
    nimf: true,
  },
  {
    id: 'especiales',
    nombre: 'Medidas Especiales',
    medida: 'A pedido',
    carga: 'Según diseño',
    uso: 'Uso general',
    descripcion:
      'Fabricamos pallets a medida para cualquier necesidad específica. Dimensiones, tipo de madera, cantidad de tablas y refuerzos según los requerimientos del cliente.',
    imagen: '/images/productos/pallet-especiales.jpg',
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
