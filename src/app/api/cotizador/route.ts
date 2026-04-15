import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import type { DatosCotizacion } from '@/lib/cotizadorConfig'
import { generarEmailCliente, generarEmailAdmin, generarAsuntoAdmin } from '@/lib/emailTemplates'

const CAMPOS_REQUERIDOS: (keyof DatosCotizacion)[] = [
  'tipoPallet',
  'cantidad',
  'urgencia',
  'empresa',
  'nombre',
  'email',
  'telefono',
]

function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const origin = req.headers.get('origin') ?? ''
  const allowed = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
    'https://wood-pallet.vercel.app',
  ].filter(Boolean).map((u) => u!.replace(/\/$/, ''))

  if (origin && !allowed.some((u) => origin.startsWith(u))) {
    return NextResponse.json({ success: false, error: 'Origen no permitido' }, { status: 403 })
  }

  let body: Partial<DatosCotizacion>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  for (const campo of CAMPOS_REQUERIDOS) {
    if (!body[campo] && body[campo] !== 0) {
      return NextResponse.json(
        { success: false, error: `Campo requerido faltante: ${campo}` },
        { status: 400 }
      )
    }
  }

  if (!validarEmail(body.email ?? '')) {
    return NextResponse.json({ success: false, error: 'Email inválido' }, { status: 400 })
  }

  const datos = body as DatosCotizacion

  const adminEmail = process.env.ADMIN_EMAIL ?? 'vaalendelatorre@gmail.com'
  // Una vez verificado el dominio en Resend, cambiar a: 'cotizador@tudominio.com.ar'
  const fromAddress = process.env.FROM_EMAIL ?? 'onboarding@resend.dev'

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    // Email al ADMIN (siempre se envía — debe ser el mismo email con el que te registraste en Resend)
    await resend.emails.send({
      from: `Cotizador Wood Pallet <${fromAddress}>`,
      to: [adminEmail],
      subject: generarAsuntoAdmin(datos),
      html: generarEmailAdmin(datos),
    })

    // Email al CLIENTE — solo se envía si hay dominio verificado en Resend
    // Sin dominio propio, Resend solo permite enviar al email registrado en la cuenta
    if (process.env.DOMINIO_VERIFICADO === 'true') {
      await resend.emails.send({
        from: `Wood Pallet <${fromAddress}>`,
        to: [datos.email],
        subject: `Tu consulta de pallets — Wood Pallet`,
        html: generarEmailCliente(datos),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API cotizador] Error al enviar emails:', error)
    return NextResponse.json(
      { success: false, error: 'Error al enviar el email. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
