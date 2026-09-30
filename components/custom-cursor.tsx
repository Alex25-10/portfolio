"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0

    function onMove(e: MouseEvent) {
      if (!dot || !ring) return
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`

      const target = e.target as HTMLElement
      const isClickable = target.closest("a, button, [role='button'], [tabindex]")
      ring.classList.toggle("scale-[1.6]", !!isClickable)
    }

    let rafId = 0

    function raf() {
      if (!ring) return
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate(${rx - 12}px, ${ry - 12}px)`
      rafId = requestAnimationFrame(raf)
    }

    const style = document.createElement("style")
    style.textContent = "* { cursor: none !important }"
    document.head.appendChild(style)

    window.addEventListener("mousemove", onMove, { passive: true })
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      style.remove()
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-white mix-blend-difference md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-6 w-6 rounded-full border border-white/70 transition-[width,height] duration-150 md:block"
      />
    </>
  )
}
