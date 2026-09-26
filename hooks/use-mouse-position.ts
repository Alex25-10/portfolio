"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition(
  ref: RefObject<HTMLElement | null>,
  throttleMs: number = 16
): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const lastCallRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastCallRef.current < throttleMs) return
      lastCallRef.current = now

      const element = ref.current
      if (element) {
        const rect = element.getBoundingClientRect()
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      } else {
        setPosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [ref, throttleMs])

  return position
}
