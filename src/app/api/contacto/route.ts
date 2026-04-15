import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactoPayload {
  empresa: string
  nombre: string
  email: string
  telefono: string
  tipo: string
  mensaje: string
}

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

  let body: Partial<ContactoPayload>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  const { empresa, nombre, email, telefono, tipo, mensaje } = body

  if (!empresa?.trim() || !nombre?.trim() || !email?.trim() || !telefono?.trim() || !tipo?.trim() || !mensaje?.trim()) {
    return NextResponse.json({ success: false, error: 'Faltan campos requeridos' }, { status: 400 })
  }

  if (!validarEmail(email)) {
    return NextResponse.json({ success: false, error: 'Email inválido' }, { status: 400 })
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? 'vaalendelatorre@gmail.com'
  const fromAddress = process.env.FROM_EMAIL ?? 'onboarding@resend.dev'
  const now = new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const whatsappMsg = encodeURIComponent(
    `Hola ${nombre}, vi tu consulta sobre ${tipo}. Te quiero responder.`
  )
  const whatsappLink = `https://api.whatsapp.com/send/?phone=${telefono.replace(/\D/g, '')}&text=${whatsappMsg}&type=phone_number&app_absent=0`

  const htmlAdmin = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Nueva consulta — Wood Pallet</title></head>
<body style="margin:0;padding:0;background-color:#F0EDE8;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0EDE8;padding:24px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <tr>
        <td style="background-color:#1C1208;padding:24px 32px;">
          <div style="font-size:11px;color:#B8814A;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">Nueva consulta de contacto</div>
          <div style="font-family:Georgia,serif;font-style:italic;font-size:22px;color:#C9A84C;">${empresa}</div>
          <div style="font-size:11px;color:#B8814A;margin-top:6px;">${now}</div>
        </td>
      </tr>

      <tr>
        <td style="background-color:#FAFAF9;padding:24px 32px 0;">
          <div style="font-size:11px;color:#B8814A;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Datos del contacto</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8D5BC;">
            <tr style="background-color:#F7F3EE;">
              <td style="padding:10px 16px;color:#B8814A;font-size:13px;width:130px;">Empresa</td>
              <td style="padding:10px 16px;color:#1C1208;font-size:13px;font-weight:500;">${empresa}</td>
            </tr>
            <tr style="border-top:1px solid #E8D5BC;">
              <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Nombre</td>
              <td style="padding:10px 16px;color:#1C1208;font-size:13px;">${nombre}</td>
            </tr>
            <tr style="border-top:1px solid #E8D5BC;background-color:#F7F3EE;">
              <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Email</td>
              <td style="padding:10px 16px;color:#1C1208;font-size:13px;"><a href="mailto:${email}" style="color:#C9A84C;">${email}</a></td>
            </tr>
            <tr style="border-top:1px solid #E8D5BC;">
              <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Teléfono</td>
              <td style="padding:10px 16px;color:#1C1208;font-size:13px;">${telefono}</td>
            </tr>
            <tr style="border-top:1px solid #E8D5BC;background-color:#F7F3EE;">
              <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Tipo de pallet</td>
              <td style="padding:10px 16px;color:#1C1208;font-size:13px;">${tipo}</td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="background-color:#FAFAF9;padding:20px 32px 0;">
          <div style="font-size:11px;color:#B8814A;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Mensaje</div>
          <div style="border-left:3px solid #C9A84C;background-color:#F7F3EE;padding:16px 20px;">
            <p style="margin:0;font-size:13px;color:#1C1208;line-height:1.6;">${mensaje}</p>
          </div>
        </td>
      </tr>

      <tr>
        <td style="background-color:#FAFAF9;padding:24px 32px 32px;text-align:center;">
          <a href="${whatsappLink}" style="display:inline-block;background-color:#128C7E;color:#ffffff;text-decoration:none;padding:12px 28px;font-size:13px;font-weight:500;border-radius:0;">
            Responder por WhatsApp
          </a>
        </td>
      </tr>

      <tr>
        <td style="background-color:#1C1208;padding:16px 32px;text-align:center;">
          <div style="font-size:10px;color:#B8814A;">Formulario de contacto · Wood Pallet · ${now}</div>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: `Contacto Wood Pallet <${fromAddress}>`,
      to: [adminEmail],
      replyTo: email,
      subject: `📩 Nueva consulta — ${empresa} — ${tipo}`,
      html: htmlAdmin,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API contacto] Error al enviar email:', error)
    return NextResponse.json(
      { success: false, error: 'Error al enviar. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
