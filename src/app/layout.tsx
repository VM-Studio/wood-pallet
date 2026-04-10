import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import SchemaOrg from '@/components/SchemaOrg'
import './globals.css'

const geistSans = localFont({
  src: [
    { path: '../fonts/GeistVF.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-geist-sans',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  display: 'swap',
})

const geistMono = localFont({
  src: [
    { path: '../fonts/GeistMonoVF.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-geist-mono',
  fallback: ['ui-monospace', 'monospace'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.madererajj.com'),
  title: {
    default: 'Wood Pallet — Fabricación y Venta de Pallets de Madera | Tigre, Buenos Aires',
    template: '%s | Wood Pallet',
  },
  description:
    'Fabricamos y vendemos pallets de madera nuevos y usados en Tigre, Buenos Aires. ' +
    'Más de 10 años de trayectoria. Pallets Euro, Estándar, Doble Faz y medidas especiales. ' +
    'Tratamiento NIMF-15 para exportación. Stock permanente. Solo venta mayorista.',
  keywords: [
    'pallets madera', 'pallets Tigre', 'pallets Buenos Aires',
    'pallets exportación', 'NIMF 15', 'pallets euro', 'pallets estandar',
    'pallets doble faz', 'pallet carton', 'maderera JJ', 'pallets mayorista',
  ],
  authors: [{ name: 'Wood Pallet' }],
  creator: 'Wood Pallet',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://www.madererajj.com',
    siteName: 'Wood Pallet',
    title: 'Wood Pallet — Líderes en Pallets de Madera',
    description:
      'Fabricación y venta de pallets de madera en Tigre, Buenos Aires. ' +
      'Más de 10 años en el mercado. Tratamiento NIMF-15. Stock permanente.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wood Pallet — Pallets de Madera Tigre Buenos Aires',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wood Pallet — Líderes en Pallets de Madera',
    description: 'Fabricación y venta de pallets de madera en Tigre, Buenos Aires.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`${geistSans.className} bg-wood-cream antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <SchemaOrg />
      </body>
    </html>
  )
}
