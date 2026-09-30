"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion, animate } from "framer-motion"
import { useLanguage } from "@/lib/i18n-context"

const stats = [
  { num: 10, suffix: "+", key: "projects" },
  { num: 2, suffix: "", key: "countries" },
  { num: null, suffix: "", key: "delivery" },
]

function CountUp({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const prefersReduced = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!start) return
    if (prefersReduced) {
      setVal(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.25, 0.1, 0, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [start, to, prefersReduced])

  return (
    <span>
      {val}
      {suffix}
    </span>
  )
}

export function Stats() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const { translations: t } = useLanguage()

  return (
    <section ref={ref} className="border-t border-border py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-3 gap-8 md:gap-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.key}
              className="text-center"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              <span className="block font-display text-3xl font-bold text-foreground md:text-4xl">
                {s.num === null ? "1-4" : <CountUp to={s.num} suffix={s.suffix} start={isInView} />}
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.15em] text-muted-foreground/60">
                {t.stats[s.key as keyof typeof t.stats]}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}