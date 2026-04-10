import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { calcularPresupuesto, type DatosCotizacion } from '@/lib/cotizadorConfig'
import { generarEmailCliente, generarEmailAdmin, generarAsuntoAdmin } from '@/lib/emailTemplates'

// NOTA: Para desarrollo se usa onboarding@resend.dev como from (no requiere dominio verificado).
// En producción, verificar el dominio en https://resend.com/domains y cambiar el from a:
// cotizador@madererajj.com (o el dominio que corresponda)

const resend = new Resend(process.env.RESEND_API_KEY)

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
  // Rate limiting básico: verificar que la request viene del propio sitio
  const origin = req.headers.get('origin') ?? ''
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  if (origin && !origin.startsWith(siteUrl.replace(/\/$/, ''))) {
    return NextResponse.json({ success: false, error: 'Origen no permitido' }, { status: 403 })
  }

  let body: Partial<DatosCotizacion>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  // Validar campos requeridos
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

  // RECALCULAR en el servidor — nunca confiar en el cálculo del cliente
  const calculo = calcularPresupuesto({
    cantidad: Number(datos.cantidad),
    esExportacion: Boolean(datos.esExportacion),
    requiereEnvio: Boolean(datos.requiereEnvio),
  })

  const adminEmail = process.env.ADMIN_EMAIL ?? 'vaalendelatorre@gmail.com'
  const fromAddress = 'onboarding@resend.dev' // Cambiar a cotizador@madererajj.com en producción

  try {
    // Enviar email al CLIENTE
    await resend.emails.send({
      from: `Wood Pallet <${fromAddress}>`,
      to: [datos.email],
      subject: `Tu presupuesto de pallets — ${datos.cantidad} ${datos.tipoPallet}`,
      html: generarEmailCliente(datos, calculo),
    })

    // Enviar email al ADMIN
    await resend.emails.send({
      from: `Cotizador PalletsJJ <${fromAddress}>`,
      to: [adminEmail],
      subject: generarAsuntoAdmin(datos, calculo),
      html: generarEmailAdmin(datos, calculo),
    })

    return NextResponse.json({ success: true, total: calculo.total })
  } catch (error) {
    console.error('[API cotizador] Error al enviar emails:', error)
    return NextResponse.json(
      { success: false, error: 'Error al enviar el email. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
