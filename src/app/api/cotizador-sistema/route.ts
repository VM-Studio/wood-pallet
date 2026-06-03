import { NextRequest, NextResponse } from 'next/server'
import type { DatosCotizacion } from '@/lib/cotizadorConfig'

/**
 * API route interno — recibe los datos del cotizador desde el cliente
 * y los reenvía al backend de WoodPallet Manager con la API key del servidor.
 * Nunca expone WP_API_KEY al navegador.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Partial<DatosCotizacion>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  const backendUrl = process.env.NEXT_PUBLIC_WP_MANAGER_URL
  const apiKey = process.env.WP_API_KEY

  if (!backendUrl || !apiKey) {
    console.warn('[cotizador-sistema] Variables de entorno no configuradas, skip.')
    return NextResponse.json({ success: false, error: 'Backend no configurado' }, { status: 503 })
  }

  // Mapeo del formulario al payload esperado por el backend
  const payload = {
    nombre: body.nombre ?? null,
    empresa: body.empresa ?? null,
    email: body.email ?? null,
    telefono: body.telefono ?? null,
    tipoPallet: body.tipoPallet ?? null,
    cantidad: body.cantidad ? Number(body.cantidad) : null,
    fechaNecesidad: null, // el formulario no lo pide
    tipoEntrega: body.requiereEnvio ? 'envio' : 'retira',
    localidadEntrega: body.requiereEnvio
      ? [body.zonaEntrega, body.direccionEntrega].filter(Boolean).join(' — ') || null
      : null,
    requiereSenasa: body.esExportacion === true,
    observaciones: body.mensaje?.trim() || null,
  }

  try {
    const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/cotizaciones-web/nueva`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(`[cotizador-sistema] Error del backend: ${res.status} — ${text}`)
      return NextResponse.json({ success: false, error: `Backend error: ${res.status}` }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[cotizador-sistema] Error de red al contactar el backend:', error)
    return NextResponse.json({ success: false, error: 'Error de red' }, { status: 502 })
  }
}
