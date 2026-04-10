import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { EMPRESA, WHATSAPP_LINKS } from '@/lib/constants'

export default function ContactHero() {
  const channels = [
    {
      icon: <FaPhone className="text-brand-tan" />,
      label: 'Teléfono',
      value: EMPRESA.telefono,
      href: `tel:${EMPRESA.telefono.replace(/\s|-/g, '')}`,
      target: undefined as string | undefined,
    },
    {
      icon: <FaWhatsapp className="text-accent-green" />,
      label: 'WhatsApp',
      value: '+54 9 11 6623-1866',
      href: WHATSAPP_LINKS.general,
      target: '_blank',
    },
    {
      icon: <FaEnvelope className="text-brand-tan" />,
      label: 'Email',
      value: EMPRESA.email,
      href: `mailto:${EMPRESA.email}`,
      target: undefined,
    },
  ]

  return (
    <section className="bg-brand-white py-12 md:py-20 px-5 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        {/* Label */}
        <span className="section-label mb-4">Estamos para ayudarte</span>

        {/* H1 */}
        <h1 className="section-title text-4xl md:text-5xl font-light text-center mt-3">
          Hablemos de tu <em>pedido</em>
        </h1>

        {/* Línea dorada */}
        <span
          className="deco-line mx-auto mt-5 mb-10"
          style={{ display: 'block' }}
        />

        {/* Canales de contacto rápido */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3">
          {channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              target={ch.target}
              rel={ch.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 border border-brand-sand hover:border-brand-tan bg-brand-white px-5 py-3.5 transition-all duration-200 group min-h-14"
            >
              <span className="text-base shrink-0">{ch.icon}</span>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-[0.15em] text-brand-tan">
                  {ch.label}
                </span>
                <span className="block text-sm font-medium text-brand-dark">
                  {ch.value}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
