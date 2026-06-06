import { NextRequest, NextResponse } from 'next/server'
import type { DatosCotizacion } from '@/lib/cotizadorConfig'
import { TIPOS_PALLET } from '@/lib/cotizadorConfig'

/**
 * API route interno — recibe los datos del cotizador desde el cliente
 * y los reenvía al backend de WoodPallet Manager con la API key del servidor.
 * Nunca expone WP_API_KEY al navegador.
 */

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_WP_MANAGER_URL ?? 'https://wood-pallet-manager-production.up.railway.app'
).replace(/\/$/, '')

const API_KEY = process.env.WP_API_KEY ?? 'wp_prod_k8x2mQnR7tLvP3aY'

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Partial<DatosCotizacion>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  // Mapear el ID del pallet al nombre de display (ej: 'euro' → 'Pallet Euro')
  const tipoPalletNombre =
    TIPOS_PALLET.find((t) => t.id === body.tipoPallet)?.nombre ?? body.tipoPallet ?? undefined

  const payload = {
    nombre:           body.nombre                || undefined,
    empresa:          body.empresa               || undefined,
    email:            body.email                 || undefined,
    telefono:         body.telefono              || undefined,
    tipoPallet:       tipoPalletNombre           || undefined,
    cantidad:         body.cantidad              ? Number(body.cantidad) : undefined,
    fechaNecesidad:   undefined,
    tipoEntrega:      body.requiereEnvio !== undefined
                        ? (body.requiereEnvio ? 'envio' : 'retira')
                        : undefined,
    localidadEntrega: body.requiereEnvio
                        ? [body.zonaEntrega, body.direccionEntrega].filter(Boolean).join(' — ') || undefined
                        : undefined,
    requiereSenasa:   body.esExportacion === true,
    observaciones:    body.mensaje?.trim()       || undefined,
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/cotizaciones-web/nueva`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(`[cotizador-sistema] Backend error: ${res.status} — ${text}`)
      return NextResponse.json({ success: false, error: `Backend error: ${res.status}` }, { status: 502 })
    }

    const data = await res.json().catch(() => ({ ok: true }))
    console.log('[cotizador-sistema] Cotización registrada, id:', data.id)
    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('[cotizador-sistema] Error de red al contactar el backend:', error)
    return NextResponse.json({ success: false, error: 'Error de red' }, { status: 502 })
  }
}

