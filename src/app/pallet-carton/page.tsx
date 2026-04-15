import type { Metadata } from 'next'
import Script from 'next/script'
import CarpalletHero from '@/components/sections/carpallet/CarpalletHero'
import CarpalletWhy from '@/components/sections/carpallet/CarpalletWhy'
import CarpalletSpecs from '@/components/sections/carpallet/CarpalletSpecs'
import CarpalletComparison from '@/components/sections/carpallet/CarpalletComparison'
import CarpalletCTA from '@/components/sections/carpallet/CarpalletCTA'
import CarpalletModal from '@/components/sections/carpallet/CarpalletModal'

export const metadata: Metadata = {
  title: 'Pallet de Cartón — CarPallet | Alternativa Ecológica a la Madera | Wood Pallet',
  description:
    'Pallets de cartón corrugado de alta resistencia. Alternativa liviana, ecológica y económica al pallet de madera. Ideal para exportación aérea y productos de consumo masivo. Cotizá con Wood Pallet en Tigre, Buenos Aires.',
  keywords: [
    'pallet carton',
    'pallet corrugado',
    'carpallet',
    'pallet ecologico',
    'pallet liviano exportacion',
    'alternativa pallet madera Argentina',
    'pallet cartón Buenos Aires',
    'pallet exportacion aerea',
  ],
}

const schemaProduct = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'CarPallet — Pallet de Cartón',
  description:
    'Pallet de cartón corrugado de alta densidad. Liviano, 100% reciclable, apto para exportación aérea e industria alimentaria. Sin requerimiento NIMF-15.',
  brand: { '@type': 'Brand', name: 'Wood Pallet' },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'Wood Pallet' },
  },
}

export default function PalletCartonPage() {
  return (
    <>
      <CarpalletModal />
      <Script
        id="schema-carpallet"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
      />
      <CarpalletHero />
      <CarpalletWhy />
      <CarpalletSpecs />
      <CarpalletComparison />
      <CarpalletCTA />
    </>
  )
}
