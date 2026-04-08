import type { Metadata } from 'next'
import ContactHero from '@/components/sections/contacto/ContactHero'
import ContactMain from '@/components/sections/contacto/ContactMain'
import ContactMap from '@/components/sections/contacto/ContactMap'
import ContactFAQ from '@/components/sections/contacto/ContactFAQ'

export const metadata: Metadata = {
  title: 'Contacto — Cotizá tus Pallets por WhatsApp | PalletsJJ Tigre',
  description:
    'Contactá a PalletsJJ para cotizar pallets de madera en Tigre, Buenos Aires. ' +
    'Respondemos al instante por WhatsApp. Teléfono: 11 3005-8664. ' +
    'Email: ventasmadererajj32@gmail.com. Solo venta mayorista.',
  keywords: [
    'contacto pallets Tigre',
    'cotizar pallets Buenos Aires',
    'pallets mayorista contacto',
    'PalletsJJ telefono',
    'pallets whatsapp',
  ],
  alternates: {
    canonical: '/contacto',
  },
  openGraph: {
    title: 'Contacto — Cotizá tus Pallets por WhatsApp | PalletsJJ',
    description:
      'Contactá a PalletsJJ para cotizar pallets de madera en Tigre, Buenos Aires. Respondemos al instante por WhatsApp.',
    url: 'https://www.madererajj.com/contacto',
  },
}

export default function ContactoPage() {
  return (
    <>
      <ContactHero />
      <ContactMain />
      <ContactMap />
      <ContactFAQ />
    </>
  )
}
