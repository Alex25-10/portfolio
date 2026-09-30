"use client"

import { useRef, useState, useEffect } from "react"
import { useReducedMotion } from "framer-motion"
import { useMousePosition } from "@/hooks/use-mouse-position"

export function MouseGlow() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement | null>(null)
  const pos = useMousePosition(ref, 32)
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(typeof window !== "undefined" && "ontouchstart" in window)
  }, [])

  if (isTouch || prefersReduced) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2]"
      aria-hidden="true"
      style={{ background: `radial-gradient(640px circle at ${pos.x}px ${pos.y}px, rgba(196,181,165,0.06), transparent 70%)` }}
    />
  )
}
