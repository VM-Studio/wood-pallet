'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { GiWoodBeam } from 'react-icons/gi'
import { clsx } from 'clsx'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => setIsOpen(false), 50)
    return () => clearTimeout(timeout)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-brand-white shadow-sm border-b border-brand-sand'
            : 'bg-brand-white/95 backdrop-blur-sm'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-20">

            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Wood Pallet">
              <div className="w-9 h-9 bg-brand-dark flex items-center justify-center group-hover:bg-brand-brown transition-colors duration-200">
                <GiWoodBeam className="text-brand-sand text-lg" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-brand-dark font-medium text-base tracking-tight">
                  Pallets<span className="text-accent-gold">JJ</span>
                </span>
                <span className="text-brand-tan text-[9px] font-normal tracking-[0.2em] uppercase hidden sm:block">
                  Tigre · Buenos Aires
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-0.5 ml-auto">
              <nav className="flex items-center gap-0.5 mr-4" aria-label="Navegación principal">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                const isCotizador = link.href === '/cotizador'
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      'relative px-4 py-2 text-sm transition-all duration-200',
                      isActive
                        ? 'text-brand-dark font-medium'
                        : isCotizador
                          ? 'text-accent-gold font-medium hover:text-brand-dark'
                          : 'text-brand-tan hover:text-brand-dark font-normal'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px bg-accent-gold"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

              <a
                href="/contacto"
                className="btn-whatsapp text-xs px-5 py-2.5"
              >
                Contacto
              </a>
            </div>

            <button
              className="md:hidden p-2.5 text-brand-dark hover:text-brand-brown transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
            >
              {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-brand-dark/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed top-14 left-0 right-0 z-40 bg-brand-white border-b border-brand-sand shadow-lg md:hidden overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 56px)' }}
            >
              <nav className="px-4 py-6 flex flex-col gap-0.5" aria-label="Menú móvil">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href
                  const isCotizador = link.href === '/cotizador'
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={clsx(
                          'flex items-center justify-between px-4 py-3.5 text-sm transition-all',
                          isActive
                            ? 'text-brand-dark font-medium bg-brand-cream'
                            : isCotizador
                              ? 'text-accent-gold font-medium hover:text-brand-dark hover:bg-brand-cream'
                              : 'text-brand-tan hover:text-brand-dark hover:bg-brand-cream'
                        )}
                      >
                        {link.label}
                        {isActive && <span className="w-1.5 h-1.5 bg-accent-gold" />}
                      </Link>
                    </motion.div>
                  )
                })}
                <div className="mt-4 pt-4 border-t border-brand-sand flex flex-col gap-3">
                  <a
                    href="/contacto"
                    className="btn-whatsapp w-full justify-center text-center"
                  >
                    Contacto
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-14 md:h-20" />
    </>
  )
}
