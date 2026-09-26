"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const winHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = winHeight > 0 ? (window.scrollY / winHeight) * 100 : 0
      setProgress(p)
      setVisible(p > 1 && p < 99)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] h-px bg-border transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="h-full bg-foreground/60 transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
