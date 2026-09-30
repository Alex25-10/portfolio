"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

interface SmoothScrollProps {
  children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReduced = useReducedMotion()
  const [ready, setReady] = useState(true)
  const lenisRef = useRef<{ destroy: () => void } | null>(null)

  useEffect(() => {
    if (prefersReduced) return

    let cancelled = false
    let rafId = 0

    async function init() {
      try {
        const Lenis = (await import("lenis")).default
        if (cancelled) return

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1 - Math.pow(1 - t, 3)),
          orientation: "vertical",
          smoothWheel: typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        })

        lenisRef.current = lenis

        function raf(time: number) {
          lenis.raf(time)
          if (cancelled) return
          rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)
        setReady(true)
      } catch {
        console.warn(
          "[SmoothScroll] Lenis no disponible, usando scroll nativo"
        )
        setReady(true)
      }
    }

    init()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [prefersReduced])

  return <>{children}</>
}
