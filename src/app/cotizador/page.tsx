import type { Metadata } from 'next'
import Script from 'next/script'
import CotizadorForm from '@/components/sections/cotizador/CotizadorForm'

export const metadata: Metadata = {
  title: 'Cotizador de Pallets Online | Presupuesto Instantáneo | PalletsJJ',
  description:
    'Calculá el precio de tus pallets en minutos. Elegí tipo, cantidad y si necesitás entrega. Recibí tu presupuesto por email al instante. PalletsJJ, Tigre.',
  alternates: {
    canonical: 'https://www.madererajj.com/cotizador',
  },
}

const schemaCotizador = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cotizador de Pallets — PalletsJJ',
  description:
    'Herramienta online para calcular presupuestos de pallets de madera y cartón. Completá el formulario y recibí el presupuesto por email al instante.',
  url: 'https://www.madererajj.com/cotizador',
  applicationCategory: 'BusinessApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'ARS',
    description: 'Cotización gratuita sin compromiso',
  },
  provider: {
    '@type': 'Organization',
    name: 'PalletsJJ',
    url: 'https://www.madererajj.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Troncos del Talar',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
  },
}

export default function CotizadorPage() {
  return (
    <>
      <Script
        id="schema-cotizador"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaCotizador) }}
      />

      {/* HERO */}
      <section className="bg-brand-white py-14 md:py-20 px-5 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="section-label">Presupuesto en minutos</span>
          <h1 className="section-title mt-2 mb-4">
            Cotizá tus pallets <em className="em-gradient">ahora</em>
          </h1>
          <span className="deco-line mb-6 mx-auto block" />
          <p className="text-brand-dark/60 max-w-md mx-auto">
            Completá el formulario y recibís el presupuesto detallado por email al instante.
            Sin llamadas, sin esperas.
          </p>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="bg-brand-cream py-14 md:py-20 lg:py-28 px-5 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div
            className="bg-brand-white p-8 md:p-12"
            style={{ border: '1px solid #E8D5BC', borderRadius: 0 }}
          >
            <CotizadorForm />
          </div>
        </div>
      </section>
    </>
  )
}
