import Link from 'next/link'
import { clsx } from 'clsx'

type Variant = 'primary' | 'outline' | 'whatsapp' | 'ghost'

interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  external?: boolean
}

const variants: Record<Variant, string> = {
  primary:  'bg-wood-dark text-white hover:bg-wood-darkest shadow-md hover:shadow-lg',
  outline:  'border-2 border-wood-dark text-wood-dark hover:bg-wood-dark hover:text-white',
  whatsapp: 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg',
  ghost:    'text-wood-dark hover:bg-wood-pale',
}

export default function Button({
  children, variant = 'primary', href, onClick,
  className, type = 'button', disabled, external,
}: ButtonProps) {
  const base = clsx(
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg',
    'font-medium text-sm md:text-base transition-all duration-200 active:scale-95',
    variants[variant],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
