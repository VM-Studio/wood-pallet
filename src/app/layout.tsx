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
  metadataBase: new URL('https://www.woodpallet.com'),
  title: {
    default: 'Líderes en fabricación y venta de pallets',
    template: '%s | Wood Pallet',
  },
  description:
    'Venta de pallets nuevos y normalizados, descartables. Stock ilimitado y despacho rápido. ' +
    'Tratamiento NIMF‑15 para exportación. Venta mayorista. Cotizaciones ágiles y entrega programada.',
  keywords: [
    'pallets madera', 'pallets Buenos Aires',
    'pallets exportación', 'NIMF 15', 'pallets euro', 'pallets estandar',
    'pallets doble faz', 'pallet carton', 'pallets mayorista',
  ],
  authors: [{ name: 'Wood Pallet' }],
  creator: 'Wood Pallet',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://www.woodpallet.com',
    siteName: 'Wood Pallet',
    title: 'Wood Pallet — Líderes en Pallets de Madera',
    description:
      'Venta de pallets nuevos y normalizados, descartables. Stock ilimitado y despacho rápido. ' +
      'Tratamiento NIMF‑15 para exportación. Cotizaciones ágiles.',
    images: [
      {
        url: '/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Wood Pallet — Pallets de Madera Tigre Buenos Aires',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wood Pallet — Líderes en Pallets de Madera',
  description: 'Venta de pallets nuevos y normalizados, descartables. Stock ilimitado y despacho rápido.',
    images: ['/logo.webp'],
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
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
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
