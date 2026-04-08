import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'wood' | 'yellow' | 'green' | 'rust' | 'steel'
  className?: string
}

const variants = {
  wood:   'bg-wood-pale text-wood-darkest border border-wood-light',
  yellow: 'bg-logistics-yellow/20 text-logistics-rust border border-logistics-yellow/40',
  green:  'bg-logistics-green/10 text-logistics-green border border-logistics-green/30',
  rust:   'bg-logistics-rust/10 text-logistics-rust border border-logistics-rust/30',
  steel:  'bg-logistics-steel/10 text-logistics-steel border border-logistics-steel/30',
}

export default function Badge({ children, variant = 'wood', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
