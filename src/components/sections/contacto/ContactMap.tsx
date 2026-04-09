import { FaMapMarkerAlt } from 'react-icons/fa'
import { EMPRESA } from '@/lib/constants'

export default function ContactMap() {
  return (
    <section className="bg-brand-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-12">
        <span className="section-label mb-4">Dónde encontrarnos</span>
        <h2 className="section-title mt-3 mb-2">
          Nuestra <em>planta</em> en Tigre
        </h2>
        <span className="deco-line mb-5" style={{ display: 'block' }} />
        <div className="flex items-center gap-2 text-sm text-brand-tan">
          <FaMapMarkerAlt className="text-brand-tan shrink-0" />
          <span>{EMPRESA.direccion}</span>
        </div>
      </div>

      {/* Mapa full-width */}
      <div className="w-full h-64 md:h-80 lg:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3288.5!2d-58.5950847!3d-34.4412257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca506e77010ab%3A0x51b4961b20373d64!2sBenito%20Lynch%20%26%20Don%20Orione%2C%20Los%20Troncos%20del%20Talar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Wood Pallet — Los Troncos del Talar, Tigre, Buenos Aires"
        />
      </div>

      {/* Barra inferior */}
      <div className="bg-brand-dark py-4 px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-brand-cream text-sm">{EMPRESA.direccion}</span>
        <a
          href={EMPRESA.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-gold text-sm hover:text-brand-tan transition-colors duration-200 shrink-0"
        >
          Abrir en Google Maps →
        </a>
      </div>
    </section>
  )
}
