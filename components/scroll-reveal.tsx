"use client"

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform, useInView } from "framer-motion"

export function BlurReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxOrb({ className = "", speed = 60 }: { className?: string; speed?: number }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-x-clip" aria-hidden="true">
      <motion.div className={`glow-orb ${className}`} style={prefersReduced ? {} : { y }} />
    </div>
  )
}

export function GlowDivider({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <div ref={ref} className={`container ${className}`} aria-hidden="true">
      <motion.div
        className="hairline-glow"
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scaleX: 0.6 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
      />
    </div>
  )
}
