import type { Metadata } from 'next'
import ProductsHero from '@/components/sections/productos/ProductsHero'
import ProductsGrid from '@/components/sections/productos/ProductsGrid'
import ComparisonTable from '@/components/sections/productos/ComparisonTable'
import ProductsCTA from '@/components/sections/productos/ProductsCTA'

export const metadata: Metadata = {
  title: 'Productos — Pallets Seminuevos, Euro, Estándar y Especiales | Wood Pallet',
  description:
    'Catálogo completo de pallets de madera en Tigre, Buenos Aires. Pallets Seminuevos Reforzado (1.500 kg) y Descartable (1.000 kg), Pallet Euro 1200x800, Estándar 1200x1000, Doble Faz, con Tirante y medidas especiales. Tratamiento NIMF-15 para exportación. Solo mayorista.',
  keywords: [
    'pallets de madera',
    'pallets seminuevos',
    'pallet seminuevo reforzado',
    'pallet seminuevo descartable',
    'pallet euro',
    'pallet estándar',
    'pallet doble faz',
    'pallet con tirante',
    'pallets usados',
    'pallets a medida',
    'NIMF-15',
    'exportación',
    'Tigre',
    'Buenos Aires',
    'mayorista',
  ],
}

export default function ProductosPage() {
  return (
    <>
      <ProductsHero />
      <ProductsGrid />
      <ComparisonTable />
      <ProductsCTA />
    </>
  )
}
