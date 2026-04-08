import { clsx } from 'clsx'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  bg?: 'white' | 'cream' | 'dark' | 'wood'
}

const bgs = {
  white: 'bg-white',
  cream: 'bg-wood-cream',
  dark:  'bg-logistics-dark text-white',
  wood:  'bg-wood-pale',
}

export default function SectionWrapper({
  children,
  className,
  id,
  bg = 'cream',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={clsx('py-16 md:py-24 px-4 md:px-8', bgs[bg], className)}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
