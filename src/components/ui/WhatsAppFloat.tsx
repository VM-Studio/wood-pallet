'use client'

import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_LINKS } from '@/lib/constants'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP_LINKS.general}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-accent-green hover:bg-[#075E54] text-white pl-4 pr-5 py-3 shadow-lg font-medium text-sm transition-colors duration-200"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <FaWhatsapp className="text-xl shrink-0" />
      <span className="hidden sm:inline">Cotizar por WhatsApp</span>
    </motion.a>
  )
}
