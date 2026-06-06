import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Consulta recibida',
  robots: { index: false, follow: false },
}

export default function AgradecimientoPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center py-20">

        {/* Ícono de check */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ backgroundColor: '#F0FAF8', border: '2px solid #1E4035' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E4035" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1
          className="font-light text-brand-dark mb-4"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '-0.02em' }}
        >
          ¡Consulta recibida!
        </h1>

        <p className="text-brand-tan mb-2 text-base">
          Recibimos tu solicitud de cotización correctamente.
        </p>
        <p className="text-brand-tan mb-10 text-base">
          Te vamos a contactar a la brevedad con el precio según tu pedido.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
          <Link href="/productos" className="btn-ghost">
            Ver productos
          </Link>
        </div>

      </div>
    </main>
  )
}
