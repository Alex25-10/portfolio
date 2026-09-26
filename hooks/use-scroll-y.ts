"use client"

import { useState, useEffect, useRef } from "react"

export function useScrollY(throttleMs: number = 100): number {
  const [scrollY, setScrollY] = useState(0)
  const lastCallRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastCallRef.current < throttleMs) return
      lastCallRef.current = now
      setScrollY(window.scrollY)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [throttleMs])

  return scrollY
}
