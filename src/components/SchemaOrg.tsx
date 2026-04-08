const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.madererajj.com',
  name: 'PalletsJJ',
  alternateName: 'Maderera JJ',
  description:
    'Fabricación y venta de pallets de madera nuevos y usados en Tigre, Buenos Aires. Más de 10 años de trayectoria.',
  url: 'https://www.madererajj.com',
  telephone: '+541130058664',
  email: 'ventasmadererajj32@gmail.com',
  foundingDate: '2012',
  priceRange: '$$',
  currenciesAccepted: 'ARS',
  paymentAccepted: 'Transferencia bancaria, efectivo',
  areaServed: {
    '@type': 'State',
    name: 'Buenos Aires',
    containedInPlace: {
      '@type': 'Country',
      name: 'Argentina',
    },
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Benito Lynch & Don Orione',
    addressLocality: 'Los Troncos del Talar',
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.4412301,
    longitude: -58.592896,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://instagram.com/madererajj',
    'https://www.facebook.com/profile.php?id=100068290073960',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Catálogo de pallets PalletsJJ',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Pallet Euro',
          description: '1200x800mm, carga 1300kg',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Pallet Estándar',
          description: '1200x1000mm, carga 1800kg',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Pallet Doble Faz',
          description: '1200x1000mm, carga +2000kg',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Pallet de Cartón CarPallet',
          description: 'Liviano y reciclable',
        },
      },
    ],
  },
}

export default function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
