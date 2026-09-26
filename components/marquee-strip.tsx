"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useLanguage } from "@/lib/i18n-context"

export function MarqueeStrip() {
  const prefersReduced = useReducedMotion()
  const { translations: t } = useLanguage()
  const items = t.marquee.tech.split(" · ")
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-t border-b border-border/30 py-5 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-20 before:bg-gradient-to-r before:from-background before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-20 after:bg-gradient-to-l after:from-background after:to-transparent">
      <motion.div
        className="flex gap-10"
        animate={
          prefersReduced
            ? {}
            : { x: ["0%", "-50%"] }
        }
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap font-display text-sm uppercase tracking-[0.2em] text-muted-foreground/40 transition-colors duration-300 hover:text-warm/60"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
