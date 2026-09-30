"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

export function Preloader() {
  const [done, setDone] = useState(false)
  const [count, setCount] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      setDone(true)
      return
    }
    document.body.style.overflow = "hidden"
    let raf = 0
    const start = performance.now()
    const DUR = 1600
    function tick(now: number) {
      const p = Math.min(1, (now - start) / DUR)
      setCount(Math.round(p * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ""
    }
  }, [prefersReduced])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            className="flex items-center gap-1 overflow-hidden"
          >
            {"AV".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="absolute bottom-1/3 h-px w-24 bg-border"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-full w-full origin-left bg-warm"
              style={{ scaleX: count / 100 }}
            />
          </motion.div>

          <motion.span
            className="absolute bottom-8 right-8 font-display text-sm tabular-nums tracking-[0.2em] text-muted-foreground"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {count}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
