'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ModelViewer3DProps {
  open: boolean
  onClose: () => void
  src: string
  nombre: string
}

// Declaración del custom element para TypeScript
interface ModelViewerAttributes extends React.HTMLAttributes<HTMLElement> {
  src?: string
  alt?: string
  'auto-rotate'?: boolean | string
  'camera-controls'?: boolean | string
  'shadow-intensity'?: string
  ar?: boolean | string
  style?: React.CSSProperties
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<ModelViewerAttributes, HTMLElement>
    }
  }
}

export default function ModelViewer3D({ open, onClose, src, nombre }: ModelViewer3DProps) {
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (!open || scriptLoaded.current) return
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js'
    document.head.appendChild(script)
    scriptLoaded.current = true
  }, [open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="model-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(28,18,8,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-brand-dark"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-tan/20">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-brand-tan mb-0.5">Modelo 3D</p>
                <p className="text-brand-cream font-medium text-sm">{nombre}</p>
              </div>
              <button
                onClick={onClose}
                className="text-brand-tan hover:text-brand-cream transition-colors text-2xl leading-none px-1"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            {/* Viewer */}
            <div className="relative w-full" style={{ height: 420 }}>
              {/* @ts-expect-error model-viewer es un web component */}
              <model-viewer
                src={src}
                alt={`Modelo 3D ${nombre}`}
                auto-rotate
                camera-controls
                shadow-intensity="1"
                style={{ width: '100%', height: '100%', backgroundColor: '#1C1208' }}
              />
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 border-t border-brand-tan/20">
              <p className="text-[10px] text-brand-tan/60 text-center tracking-wide">
                Arrastrá para rotar · Pellizco para zoom
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
