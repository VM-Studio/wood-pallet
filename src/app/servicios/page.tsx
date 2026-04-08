import type { Metadata } from 'next'
import Script from 'next/script'
import ServicesHero from '@/components/sections/servicios/ServicesHero'
import ServicesMain from '@/components/sections/servicios/ServicesMain'
import NimfSection from '@/components/sections/servicios/NimfSection'
import PalletTypesInfo from '@/components/sections/servicios/PalletTypesInfo'
import ServicesCTA from '@/components/sections/servicios/ServicesCTA'

export const metadata: Metadata = {
  title: 'Servicios — Logística, Stock y Tratamiento NIMF-15 | Wood Pallet',
  description:
    'Wood Pallet ofrece logística de entrega, stock permanente de pallets y tratamiento fitosanitario NIMF-15 para exportación. Conocé nuestros servicios en Tigre, Buenos Aires.',
  keywords: [
    'logistica pallets',
    'NIMF-15 Argentina',
    'stock pallets Buenos Aires',
    'tratamiento fitosanitario pallets',
    'pallets exportacion Tigre',
    'pallet madera exportacion Argentina',
  ],
}

const schemaServices = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'Logística de entrega de pallets',
      description:
        'Servicio de logística propio con cobertura en toda la Provincia de Buenos Aires. Entregas programadas y urgentes.',
      provider: { '@type': 'Organization', name: 'Wood Pallet' },
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Stock permanente de pallets',
      description:
        'Inventario disponible los 365 días del año. Todos los tipos de pallets en stock sin tiempos de espera.',
      provider: { '@type': 'Organization', name: 'Wood Pallet' },
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'Tratamiento fitosanitario NIMF-15',
      description:
        'Tratamiento de calor (HT) certificado que habilita la exportación de pallets a cualquier destino del mundo.',
      provider: { '@type': 'Organization', name: 'Wood Pallet' },
    },
  ],
}

export default function ServiciosPage() {
  return (
    <>
      <Script
        id="schema-servicios"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaServices) }}
      />
      <ServicesHero />
      <ServicesMain />
      <NimfSection />
      <PalletTypesInfo />
      <ServicesCTA />
    </>
  )
}
