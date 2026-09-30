"use client"

import { useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion"
import { useLanguage } from "@/lib/i18n-context"

export function MarqueeStrip() {
  const prefersReduced = useReducedMotion()
  const { translations: t } = useLanguage()
  const items = t.marquee.tech.split(" · ")
  const doubled = [...items, ...items]

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 2000], [0, 10], { clamp: false })
  const directionFactor = useRef(-1)
  const x = useTransform(baseX, (v) => `${v}%`)

  useAnimationFrame((_, delta) => {
    if (prefersReduced) return
    const boost = Math.abs(velocityFactor.get())
    const moveBy = directionFactor.current * (delta / 1000) * (4 + boost * 2.5)
    let next = baseX.get() + moveBy
    if (next <= -50) next += 50
    baseX.set(next)
  })

  return (
    <div className="relative overflow-hidden border-t border-b border-border/30 py-5 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-20 before:bg-gradient-to-r before:from-background before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-20 after:bg-gradient-to-l after:from-background after:to-transparent">
      <motion.div className="flex w-max" style={prefersReduced ? {} : { x }}>
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center pr-10 whitespace-nowrap font-display text-sm uppercase tracking-[0.2em] text-muted-foreground/40 transition-colors duration-300 hover:text-warm/60"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
