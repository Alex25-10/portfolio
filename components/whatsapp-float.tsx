"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { track } from "@vercel/analytics"

const WHATSAPP_URL = "https://wa.me/543571578382"

export function WhatsAppFloat() {
  const prefersReduced = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_float")}
          className="fixed bottom-20 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:bg-[#22c35e] hover:scale-110 cursor-pointer md:bottom-6 md:left-auto md:right-6"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
