import ContactForm from './ContactForm'

export default function ContactMain() {
  return (
    <section className="bg-brand-cream py-14 md:py-20 lg:py-28 px-5 md:px-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="section-title mb-2 text-center">
          Completá el <em className="em-gradient">formulario</em>
        </h2>
        <span className="deco-line mb-8 mx-auto" style={{ display: 'block' }} />
        <ContactForm />
      </div>
    </section>
  )
}
