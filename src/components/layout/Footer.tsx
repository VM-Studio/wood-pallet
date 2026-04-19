import Link from 'next/link'
import Image from 'next/image'
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { NAV_LINKS, EMPRESA, WHATSAPP_LINKS } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="bg-brand-dark text-brand-cream relative"
      style={{
        backgroundImage: 'url(/footer.png?v=2)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay oscuro para que el texto sea legible */}
      <div className="absolute inset-0 bg-brand-dark/60" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

          {/* Columna 1 — Marca */}
          <div className="flex flex-col gap-5">
              <Link href="/" className="flex items-center gap-2.5 group w-fit">
                <Image
                  src="/logo.webp"
                  alt="Wood Pallet"
                  width={36}
                  height={36}
                  className="object-contain"
                  style={{ width: 36, height: 36, minWidth: 36 }}
                />
                <div className="flex flex-col leading-none">
                  <span
                    className="font-serif italic text-lg leading-none"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C 0%, #B8814A 50%, #8B5E3C 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Wood Pallet
                  </span>
                  <span className="text-brand-tan text-[9px] tracking-[0.2em] uppercase">
                    Tigre · Buenos Aires
                  </span>
                </div>
              </Link>

            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Empresa familiar con más de 20 años de trayectoria en la fabricación
              y comercialización de pallets de madera.
            </p>

            <div className="flex items-center gap-2.5 mt-1">
              <a href={EMPRESA.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-8 h-8 bg-white/5 hover:bg-accent-gold/20 flex items-center justify-center text-brand-sand/50 hover:text-accent-gold transition-all duration-200">
                <FaInstagram className="text-sm" />
              </a>
              <a href={EMPRESA.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-8 h-8 bg-white/5 hover:bg-accent-gold/20 flex items-center justify-center text-brand-sand/50 hover:text-accent-gold transition-all duration-200">
                <FaFacebook className="text-sm" />
              </a>
              <a href={WHATSAPP_LINKS.general} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-8 h-8 bg-white/5 hover:bg-accent-green/30 flex items-center justify-center text-brand-sand/50 hover:text-green-400 transition-all duration-200">
                <FaWhatsapp className="text-sm" />
              </a>
            </div>
          </div>

          {/* Columna 2 — Navegación */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brand-cream text-[10px] uppercase tracking-[0.2em] font-medium">
              Navegación
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Links del footer">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-white/80 hover:text-accent-gold text-sm transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-px h-3 bg-white/30 group-hover:bg-accent-gold transition-colors" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Columna 3 — Contacto */}
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-4">
              <a href={`tel:${EMPRESA.telefono.replace(/\s/g, '')}`}
                className="flex items-start gap-3 text-sm text-white/80 hover:text-accent-gold transition-colors group">
                <div className="w-7 h-7 bg-white/5 group-hover:bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  <FaPhone className="text-xs" />
                </div>
                <div>
                  <p className="text-brand-cream text-[9px] uppercase tracking-wider mb-0.5">Teléfono</p>
                  <p>{EMPRESA.telefono}</p>
                </div>
              </a>

              <a href={WHATSAPP_LINKS.general} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/80 hover:text-green-400 transition-colors group">
                <div className="w-7 h-7 bg-white/5 group-hover:bg-accent-green/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  <FaWhatsapp className="text-xs" />
                </div>
                <div>
                  <p className="text-brand-cream text-[9px] uppercase tracking-wider mb-0.5">WhatsApp</p>
                  <p>+54 9 11 6623-1866</p>
                </div>
              </a>

              <a href={`mailto:${EMPRESA.email}`}
                className="flex items-start gap-3 text-sm text-white/80 hover:text-accent-gold transition-colors group">
                <div className="w-7 h-7 bg-white/5 group-hover:bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  <FaEnvelope className="text-xs" />
                </div>
                <div>
                  <p className="text-brand-cream text-[9px] uppercase tracking-wider mb-0.5">Email</p>
                  <p className="break-all">{EMPRESA.email}</p>
                </div>
              </a>

              <a href={EMPRESA.maps} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/80 hover:text-accent-gold transition-colors group">
                <div className="w-7 h-7 bg-white/5 group-hover:bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  <FaMapMarkerAlt className="text-xs" />
                </div>
                <div>
                  <p className="text-brand-cream text-[9px] uppercase tracking-wider mb-0.5">Dirección</p>
                  <p className="leading-relaxed">{EMPRESA.direccion}</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Franja inferior */}
      <div className="relative z-10 border-t border-white/8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-xs text-center sm:text-left">
            © {currentYear} Wood Pallet — Todos los derechos reservados. Tigre, Buenos Aires, Argentina.
          </p>
          <p className="text-white/50 text-xs">
            Fabricación y venta de pallets de madera · NIMF-15
          </p>
        </div>
      </div>

    </footer>
  )
}
