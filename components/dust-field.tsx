import { useMemo } from "react"

function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const SIZES = ["dust-xs", "dust-sm", "", ""] as const
const ANIMS = ["", "", "dust-twinkle", "dust-drift"] as const

export function DustField({
  count = 10,
  seed = 7,
  emerald = false,
  className = "",
}: {
  count?: number
  seed?: number
  emerald?: boolean
  className?: string
}) {
  const dots = useMemo(() => {
    const rand = mulberry32(seed)
    return Array.from({ length: count }, (_, i) => ({
      left: `${(rand() * 100).toFixed(1)}%`,
      top: `${(rand() * 100).toFixed(1)}%`,
      cls: `${SIZES[Math.floor(rand() * SIZES.length)]} ${ANIMS[Math.floor(rand() * ANIMS.length)]}`.trim(),
      delay: `${(rand() * 6).toFixed(1)}s`,
      duration: `${(6 + rand() * 5).toFixed(1)}s`,
      key: i,
    }))
  }, [count, seed])

  return (
    <div className={`pointer-events-none absolute inset-0 hidden overflow-hidden md:block motion-reduce:hidden ${className}`} aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.key}
          className={`dust-dot ${emerald ? "dust-emerald" : ""} ${d.cls}`.trim()}
          style={{ left: d.left, top: d.top, animationDelay: d.delay, animationDuration: d.duration }}
        />
      ))}
    </div>
  )
}
