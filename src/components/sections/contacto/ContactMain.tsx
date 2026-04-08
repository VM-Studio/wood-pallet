import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
} from 'react-icons/fa'
import { EMPRESA, WHATSAPP_LINKS } from '@/lib/constants'
import ContactForm from './ContactForm'

export default function ContactMain() {
  const contactItems = [
    {
      icon: <FaPhone className="text-accent-gold" />,
      label: 'Teléfono',
      value: EMPRESA.telefono,
      href: `tel:${EMPRESA.telefono.replace(/\s|-/g, '')}`,
      target: undefined as string | undefined,
      sub: 'Lunes a viernes de 8 a 18hs',
    },
    {
      icon: <FaWhatsapp className="text-accent-green" />,
      label: 'WhatsApp',
      value: '+54 9 11 6623-1866',
      href: WHATSAPP_LINKS.general,
      target: '_blank',
      sub: 'Respuesta inmediata en horario comercial',
    },
    {
      icon: <FaEnvelope className="text-accent-gold" />,
      label: 'Email',
      value: EMPRESA.email,
      href: `mailto:${EMPRESA.email}`,
      target: undefined,
      sub: 'Respondemos en menos de 24 horas',
    },
    {
      icon: <FaMapMarkerAlt className="text-brand-tan" />,
      label: 'Dirección',
      value: EMPRESA.direccion,
      href: EMPRESA.maps,
      target: '_blank',
      sub: 'Ver en Google Maps →',
      subGold: true,
    },
  ]

  return (
    <section className="bg-brand-cream py-20 md:py-28 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Grid: mobile stacks form first, desktop 40/60 */}
        <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-12 md:gap-16">

          {/* ── Formulario (col 2 en desktop, primero en mobile) ── */}
          <div className="order-1 md:order-2">
            <h2 className="section-title mb-2">
              Completá el <em>formulario</em>
            </h2>
            <span className="deco-line mb-8" style={{ display: 'block' }} />
            <ContactForm />
          </div>

          {/* ── Información de contacto (col 1 en desktop, segundo en mobile) ── */}
          <div className="order-2 md:order-1">
            <h2 className="section-title mb-2">
              Toda la información que <em>necesitás</em>
            </h2>
            <span className="deco-line mb-8" style={{ display: 'block' }} />

            {/* Contact items */}
            <div className="flex flex-col">
              {contactItems.map((item, idx) => (
                <div
                  key={item.label}
                  className={`flex items-start gap-4 py-5 ${
                    idx < contactItems.length - 1 ? 'border-b border-brand-sand' : ''
                  }`}
                >
                  {/* Icon box */}
                  <div className="w-8 h-8 flex items-center justify-center bg-brand-sand shrink-0">
                    <span className="text-sm">{item.icon}</span>
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.15em] text-brand-tan mb-0.5">
                      {item.label}
                    </span>
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="block text-sm font-medium text-brand-dark hover:text-brand-brown transition-colors duration-200 wrap-break-word"
                    >
                      {item.value}
                    </a>
                    <span
                      className={`block text-xs mt-0.5 ${
                        item.subGold ? 'text-accent-gold' : 'text-brand-tan'
                      }`}
                    >
                      {item.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="py-5 border-b border-brand-sand">
              <span className="block text-[10px] uppercase tracking-[0.15em] text-brand-tan mb-3">
                Seguinos
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={EMPRESA.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 flex items-center justify-center border border-brand-sand hover:border-accent-gold bg-brand-white text-brand-tan hover:text-accent-gold transition-all duration-200"
                >
                  <FaInstagram className="text-base" />
                </a>
                <a
                  href={EMPRESA.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 flex items-center justify-center border border-brand-sand hover:border-accent-gold bg-brand-white text-brand-tan hover:text-accent-gold transition-all duration-200"
                >
                  <FaFacebook className="text-base" />
                </a>
              </div>
            </div>

            {/* Nota de venta mayorista */}
            <div className="bg-brand-dark p-6 mt-8">
              <span className="block text-accent-gold text-[10px] uppercase tracking-wide mb-2">
                Importante
              </span>
              <p className="text-brand-cream text-sm leading-relaxed">
                PalletsJJ solo trabaja con empresas y pedidos mayoristas.
                No realizamos ventas al por menor bajo ninguna circunstancia.
                Para cotizaciones individuales no podremos ayudarte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
