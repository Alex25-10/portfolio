"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface MagneticProps {
  children: React.ReactNode
  className?: string
  as?: "a" | "button"
  href?: string
  target?: string
  rel?: string
  onClick?: (e: React.MouseEvent) => void
}

export function Magnetic({
  children,
  className = "",
  as = "a",
  href,
  target,
  rel,
  onClick,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPos({ x: x * 0.3, y: y * 0.3 })
  }

  function onLeave() {
    setPos({ x: 0, y: 0 })
    setHovering(false)
  }

  const Tag = as
  const isLink = as === "a"

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={onLeave}
      animate={{
        x: pos.x,
        y: pos.y,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {isLink ? (
        <a href={href} target={target} rel={rel} onClick={onClick} className={className}>
          {children}
        </a>
      ) : (
        <button className={className}>{children}</button>
      )}
    </motion.div>
  )
}
