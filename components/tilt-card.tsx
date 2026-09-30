"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"

export function TiltCard({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 200, damping: 22 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 200, damping: 22 })
  const glareX = useTransform(mx, (v) => v * 100)
  const glareY = useTransform(my, (v) => v * 100)
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), transparent 65%)`

  function onMove(e: MouseEvent) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  function onLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  if (reduce) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={`tilt-card ${className ?? ""}`} style={{ perspective: 1100 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative h-full">
        {children}
        <motion.div className="tilt-glare pointer-events-none absolute inset-0 z-10 rounded-[inherit]" style={{ background: glare }} aria-hidden="true" />
      </motion.div>
    </div>
  )
}
