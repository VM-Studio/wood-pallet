import type { DatosCotizacion, ResultadoCotizacion } from './cotizadorConfig'
import { TIPOS_PALLET, ZONAS_ENTREGA } from './cotizadorConfig'
import { EMPRESA } from './constants'

function getNombreTipo(id: string): string {
  return TIPOS_PALLET.find((t) => t.id === id)?.nombre ?? id
}

function getNombreZona(id: string): string {
  return ZONAS_ENTREGA.find((z) => z.id === id)?.nombre ?? id
}

function formatPrecio(n: number): string {
  return `$${n.toLocaleString('es-AR')}`
}

// ============================================================
// TEMPLATE 1 — Email al CLIENTE (presupuesto elegante)
// ============================================================
export function generarEmailCliente(
  datos: DatosCotizacion,
  calculo: ResultadoCotizacion
): string {
  const nombreTipo = getNombreTipo(datos.tipoPallet)
  const nombreZona = datos.requiereEnvio ? getNombreZona(datos.zonaEntrega) : ''
  const whatsappMsg = encodeURIComponent(
    `Hola, recibí mi presupuesto de pallets. Quiero confirmar el pedido de ${datos.cantidad} ${nombreTipo}.`
  )
  const whatsappLink = `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+', '')}&text=${whatsappMsg}&type=phone_number&app_absent=0`

  const filasDesglose = calculo.desglose
    .map(
      (linea, i) => `
      <tr style="border-bottom:1px solid #E8D5BC;">
        <td style="padding:12px 20px;color:#4A5568;font-size:14px;font-family:Arial,sans-serif;">
          ${i === 0 ? `${datos.cantidad} × ${nombreTipo}` : linea.descripcion}
          ${i === 0 && datos.esExportacion ? '<br><span style="color:#B8814A;font-size:11px;">Exportación internacional</span>' : ''}
          ${linea.descripcion === 'Envío a domicilio' && nombreZona ? `<br><span style="color:#B8814A;font-size:11px;">${nombreZona}</span>` : ''}
        </td>
        <td style="padding:12px 20px;color:#1C1208;font-size:14px;font-weight:500;text-align:right;font-family:Arial,sans-serif;">
          ${formatPrecio(linea.monto)}
        </td>
      </tr>`
    )
    .join('')

  const detalleEntrega = datos.requiereEnvio
    ? `<tr><td style="padding:6px 0;color:#B8814A;font-size:13px;font-family:Arial,sans-serif;width:140px;">Entrega:</td><td style="padding:6px 0;color:#1C1208;font-size:13px;font-family:Arial,sans-serif;">A domicilio</td></tr>
       <tr><td style="padding:6px 0;color:#B8814A;font-size:13px;font-family:Arial,sans-serif;">Zona:</td><td style="padding:6px 0;color:#1C1208;font-size:13px;font-family:Arial,sans-serif;">${nombreZona}</td></tr>
       ${datos.fechaEntrega ? `<tr><td style="padding:6px 0;color:#B8814A;font-size:13px;font-family:Arial,sans-serif;">Fecha preferida:</td><td style="padding:6px 0;color:#1C1208;font-size:13px;font-family:Arial,sans-serif;">${datos.fechaEntrega}</td></tr>` : ''}`
    : `<tr><td style="padding:6px 0;color:#B8814A;font-size:13px;font-family:Arial,sans-serif;width:140px;">Entrega:</td><td style="padding:6px 0;color:#1C1208;font-size:13px;font-family:Arial,sans-serif;">Retiro en planta (sin costo)</td></tr>`

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Tu presupuesto de pallets — Wood Pallet</title></head>
<body style="margin:0;padding:0;background-color:#F0EDE8;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0EDE8;padding:32px 16px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background-color:#1C1208;padding:32px 40px;text-align:center;">
            <div style="font-family:Georgia,serif;font-style:italic;font-size:28px;color:#C9A84C;letter-spacing:1px;">Wood Pallet</div>
            <div style="font-family:Arial,sans-serif;font-size:11px;color:#B8814A;letter-spacing:3px;text-transform:uppercase;margin-top:6px;">Tigre · Buenos Aires</div>
          </td>
        </tr>

        <!-- SALUDO -->
        <tr>
          <td style="background-color:#FAFAF9;padding:40px 40px 24px;">
            <div style="font-size:18px;color:#1C1208;font-weight:300;margin-bottom:8px;">Hola, ${datos.nombre}</div>
            <div style="font-size:14px;color:#B8814A;">Aquí está tu presupuesto estimado:</div>
          </td>
        </tr>

        <!-- DESGLOSE -->
        <tr>
          <td style="background-color:#FAFAF9;padding:0 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8D5BC;">
              ${filasDesglose}
              <!-- TOTAL -->
              <tr>
                <td style="background-color:#1C1208;padding:20px;text-align:left;">
                  <div style="font-size:11px;color:#B8814A;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Total Estimado</div>
                  <div style="font-family:Georgia,serif;font-size:36px;color:#C9A84C;font-weight:300;">${formatPrecio(calculo.total)}</div>
                </td>
                <td style="background-color:#1C1208;padding:20px;vertical-align:bottom;text-align:right;">
                  <div style="font-size:11px;color:#B8814A;font-size:10px;">IVA no incluido</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- DETALLES DEL PEDIDO -->
        <tr>
          <td style="background-color:#FAFAF9;padding:24px 40px;">
            <div style="border-left:3px solid #C9A84C;background-color:#F7F3EE;padding:20px 24px;">
              <div style="font-size:11px;color:#B8814A;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;">Detalle del pedido</div>
              <table cellpadding="0" cellspacing="0">
                <tr><td style="padding:6px 0;color:#B8814A;font-size:13px;font-family:Arial,sans-serif;width:140px;">Tipo de pallet:</td><td style="padding:6px 0;color:#1C1208;font-size:13px;font-family:Arial,sans-serif;">${nombreTipo}</td></tr>
                <tr><td style="padding:6px 0;color:#B8814A;font-size:13px;font-family:Arial,sans-serif;">Cantidad:</td><td style="padding:6px 0;color:#1C1208;font-size:13px;font-family:Arial,sans-serif;">${datos.cantidad} unidades</td></tr>
                <tr><td style="padding:6px 0;color:#B8814A;font-size:13px;font-family:Arial,sans-serif;">Uso:</td><td style="padding:6px 0;color:#1C1208;font-size:13px;font-family:Arial,sans-serif;">${datos.esExportacion ? 'Exportación internacional (NIMF-15)' : 'Uso local'}</td></tr>
                ${detalleEntrega}
                <tr><td style="padding:6px 0;color:#B8814A;font-size:13px;font-family:Arial,sans-serif;">Urgencia:</td><td style="padding:6px 0;color:#1C1208;font-size:13px;font-family:Arial,sans-serif;">${datos.urgencia}</td></tr>
              </table>
            </div>
          </td>
        </tr>

        <!-- NOTA LEGAL -->
        <tr>
          <td style="background-color:#FAFAF9;padding:0 40px 24px;">
            <div style="background-color:#F7F3EE;padding:16px 20px;">
              <p style="margin:0;font-size:12px;color:#B8814A;font-style:italic;line-height:1.6;">
                * Este es un presupuesto estimado basado en los precios vigentes al momento de la consulta. El precio final puede variar según disponibilidad de stock y condiciones específicas del pedido. Válido por 7 días hábiles.
              </p>
            </div>
          </td>
        </tr>

        <!-- CTA WHATSAPP -->
        <tr>
          <td style="background-color:#FAFAF9;padding:0 40px 40px;text-align:center;">
            <a href="${whatsappLink}" style="display:inline-block;background-color:#128C7E;color:#ffffff;text-decoration:none;padding:14px 32px;font-size:14px;font-weight:500;border-radius:0;letter-spacing:0.5px;">
              ✓ Confirmar pedido por WhatsApp
            </a>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background-color:#1C1208;padding:24px 40px;text-align:center;">
            <div style="font-family:Georgia,serif;font-style:italic;font-size:14px;color:#C9A84C;margin-bottom:8px;">PalletsJJ</div>
            <div style="font-size:11px;color:#B8814A;margin-bottom:4px;">Los Troncos del Talar, Tigre, Buenos Aires</div>
            <div style="font-size:11px;color:#B8814A;margin-bottom:16px;">${EMPRESA.telefono} · ${EMPRESA.email}</div>
            <div style="height:1px;background-color:rgba(184,129,74,0.2);margin-bottom:16px;"></div>
            <div style="font-size:10px;color:#4A5568;">Este email fue generado automáticamente por el cotizador de PalletsJJ. Si no solicitaste este presupuesto, ignorá este mensaje.</div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

// ============================================================
// TEMPLATE 2 — Email al ADMIN (notificación interna)
// ============================================================
export function generarEmailAdmin(
  datos: DatosCotizacion,
  calculo: ResultadoCotizacion
): string {
  const nombreTipo = getNombreTipo(datos.tipoPallet)
  const nombreZona = datos.requiereEnvio ? getNombreZona(datos.zonaEntrega) : '—'
  const now = new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    dateStyle: 'full',
    timeStyle: 'short',
  })
  const whatsappMsg = encodeURIComponent(
    `Hola ${datos.nombre}, vi tu cotización de ${datos.cantidad} ${nombreTipo}. Te quiero responder sobre tu pedido.`
  )
  const whatsappLink = `https://api.whatsapp.com/send/?phone=${datos.telefono.replace(/\D/g, '')}&text=${whatsappMsg}&type=phone_number&app_absent=0`

  const filasDesglose = calculo.desglose
    .map(
      (linea, i) => `
      <tr style="border-bottom:1px solid #E8D5BC;">
        <td style="padding:10px 16px;color:#4A5568;font-size:13px;font-family:Arial,sans-serif;">
          ${i === 0 ? `${datos.cantidad} × ${nombreTipo}` : linea.descripcion}
        </td>
        <td style="padding:10px 16px;color:#1C1208;font-size:13px;font-weight:600;text-align:right;font-family:Arial,sans-serif;">
          ${formatPrecio(linea.monto)}
        </td>
      </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Nueva cotización — PalletsJJ</title></head>
<body style="margin:0;padding:0;background-color:#F0EDE8;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0EDE8;padding:24px 16px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background-color:#1C1208;padding:24px 32px;">
            <div style="font-size:11px;color:#B8814A;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">Nueva cotización recibida</div>
            <div style="font-family:Georgia,serif;font-style:italic;font-size:22px;color:#C9A84C;">${datos.empresa}</div>
            <div style="font-size:11px;color:#B8814A;margin-top:6px;">${now}</div>
          </td>
        </tr>

        <!-- DATOS DEL CLIENTE -->
        <tr>
          <td style="background-color:#FAFAF9;padding:24px 32px 0;">
            <div style="font-size:11px;color:#B8814A;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Datos del cliente</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8D5BC;">
              <tr style="background-color:#F7F3EE;">
                <td style="padding:10px 16px;color:#B8814A;font-size:13px;width:130px;">Empresa</td>
                <td style="padding:10px 16px;color:#1C1208;font-size:13px;font-weight:500;">${datos.empresa}</td>
              </tr>
              <tr style="border-top:1px solid #E8D5BC;">
                <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Nombre</td>
                <td style="padding:10px 16px;color:#1C1208;font-size:13px;">${datos.nombre}</td>
              </tr>
              <tr style="border-top:1px solid #E8D5BC;background-color:#F7F3EE;">
                <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Email</td>
                <td style="padding:10px 16px;color:#1C1208;font-size:13px;"><a href="mailto:${datos.email}" style="color:#C9A84C;">${datos.email}</a></td>
              </tr>
              <tr style="border-top:1px solid #E8D5BC;">
                <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Teléfono</td>
                <td style="padding:10px 16px;color:#1C1208;font-size:13px;">${datos.telefono}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- DATOS DEL PEDIDO -->
        <tr>
          <td style="background-color:#FAFAF9;padding:20px 32px 0;">
            <div style="font-size:11px;color:#B8814A;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Detalles del pedido</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8D5BC;">
              <tr style="background-color:#F7F3EE;">
                <td style="padding:10px 16px;color:#B8814A;font-size:13px;width:130px;">Tipo</td>
                <td style="padding:10px 16px;color:#1C1208;font-size:13px;font-weight:500;">${nombreTipo}</td>
              </tr>
              <tr style="border-top:1px solid #E8D5BC;">
                <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Cantidad</td>
                <td style="padding:10px 16px;color:#1C1208;font-size:13px;">${datos.cantidad} unidades</td>
              </tr>
              <tr style="border-top:1px solid #E8D5BC;background-color:#F7F3EE;">
                <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Uso</td>
                <td style="padding:10px 16px;color:#1C1208;font-size:13px;">${datos.esExportacion ? '🌍 Exportación (NIMF-15)' : '🏭 Uso local'}</td>
              </tr>
              <tr style="border-top:1px solid #E8D5BC;">
                <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Entrega</td>
                <td style="padding:10px 16px;color:#1C1208;font-size:13px;">${datos.requiereEnvio ? 'A domicilio' : 'Retiro en planta'}</td>
              </tr>
              <tr style="border-top:1px solid #E8D5BC;background-color:#F7F3EE;">
                <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Zona</td>
                <td style="padding:10px 16px;color:#1C1208;font-size:13px;">${nombreZona}</td>
              </tr>
              ${datos.fechaEntrega ? `<tr style="border-top:1px solid #E8D5BC;"><td style="padding:10px 16px;color:#B8814A;font-size:13px;">Fecha preferida</td><td style="padding:10px 16px;color:#1C1208;font-size:13px;">${datos.fechaEntrega}</td></tr>` : ''}
              <tr style="border-top:1px solid #E8D5BC;${!datos.fechaEntrega ? '' : 'background-color:#F7F3EE;'}">
                <td style="padding:10px 16px;color:#B8814A;font-size:13px;">Urgencia</td>
                <td style="padding:10px 16px;color:#1C1208;font-size:13px;">${datos.urgencia}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- PRESUPUESTO -->
        <tr>
          <td style="background-color:#FAFAF9;padding:20px 32px 0;">
            <div style="font-size:11px;color:#B8814A;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Presupuesto calculado</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8D5BC;">
              ${filasDesglose}
              <tr style="background-color:#1C1208;">
                <td style="padding:14px 16px;color:#B8814A;font-size:11px;letter-spacing:1px;text-transform:uppercase;">TOTAL</td>
                <td style="padding:14px 16px;color:#C9A84C;font-size:22px;font-weight:300;text-align:right;font-family:Georgia,serif;">${formatPrecio(calculo.total)}</td>
              </tr>
            </table>
          </td>
        </tr>

        ${datos.mensaje ? `
        <!-- MENSAJE ADICIONAL -->
        <tr>
          <td style="background-color:#FAFAF9;padding:20px 32px 0;">
            <div style="font-size:11px;color:#B8814A;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Mensaje adicional</div>
            <div style="border-left:3px solid #C9A84C;background-color:#F7F3EE;padding:16px 20px;">
              <p style="margin:0;font-size:13px;color:#1C1208;line-height:1.6;">${datos.mensaje}</p>
            </div>
          </td>
        </tr>` : ''}

        <!-- ACCIÓN RÁPIDA -->
        <tr>
          <td style="background-color:#FAFAF9;padding:24px 32px 32px;text-align:center;">
            <a href="${whatsappLink}" style="display:inline-block;background-color:#128C7E;color:#ffffff;text-decoration:none;padding:12px 28px;font-size:13px;font-weight:500;border-radius:0;">
              Responder por WhatsApp
            </a>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background-color:#1C1208;padding:16px 32px;text-align:center;">
            <div style="font-size:10px;color:#B8814A;">Cotizador PalletsJJ · ${now}</div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

export function generarAsuntoAdmin(datos: DatosCotizacion, calculo: ResultadoCotizacion): string {
  return `🪵 Nueva cotización — ${datos.empresa} — ${formatPrecio(calculo.total)}`
}
