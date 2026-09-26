"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

export function Preloader() {
  const [done, setDone] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      setDone(true)
      return
    }
    const timer = setTimeout(() => setDone(true), 1200)
    return () => clearTimeout(timer)
  }, [prefersReduced])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
        >
          <div className="flex items-center gap-1 overflow-hidden">
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
          </div>

          <motion.div
            className="absolute bottom-1/3 h-px w-24 bg-border"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1], delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
