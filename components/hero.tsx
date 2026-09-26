"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import dynamic from "next/dynamic"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { Magnetic } from "@/components/magnetic"
import { useLanguage } from "@/lib/i18n-context"
import { track } from "@vercel/analytics"

const HeroScene = dynamic(() => import("@/components/hero-scene"), { ssr: false })

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const mouse = useMousePosition(ref)
  const prefersReduced = useReducedMotion()
  const { translations: t } = useLanguage()
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(typeof window !== "undefined" && "ontouchstart" in window)
  }, [])

  const waUrl = `https://wa.me/543571578382?text=${encodeURIComponent(t.hero.wa_msg)}`

  return (
    <section ref={ref} className="relative flex min-h-dvh items-center overflow-hidden">
      <svg className="absolute inset-0 z-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#f5f5f5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {!isTouch && (
        <div className="absolute inset-0 z-0">
          <HeroScene mouseX={mouse.x} mouseY={mouse.y} />
        </div>
      )}

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center text-center">
        <motion.h1
          className="font-display text-[clamp(3.5rem,15vw,9rem)] font-bold leading-[0.85] tracking-tight"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
        >
          Alex Vélez
        </motion.h1>
        <motion.p
          className="mt-6 max-w-md text-xs uppercase tracking-[0.3em] text-muted-foreground md:text-sm"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.div
          className="mt-10 flex items-center gap-6"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        >
          <Magnetic
            as="a"
            href="#work"
            onClick={() => track("view_projects")}
            className="rounded-full bg-foreground px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-background transition-all hover:opacity-90 cursor-pointer"
          >
            {t.hero.cta_work}
          </Magnetic>
          <Magnetic
            as="a"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_hero")}
            className="rounded-full px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            {t.hero.cta_contact}
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          className="h-14 w-px bg-gradient-to-b from-muted-foreground/50 to-transparent"
          animate={prefersReduced ? {} : { height: [56, 72, 56] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
