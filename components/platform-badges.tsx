"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { useLanguage } from "@/lib/i18n-context"

const platforms = [
  {
    name: "Fiverr",
    rating: "5★",
    label: "Fiverr",
    url: "https://www.fiverr.com/gaston2510",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M7.27 2.94v3.62H4.89v1.82h2.38v7.37c0 2.8 1.4 4.31 4.31 4.31h2.14v-1.82h-1.4c-1.4 0-2.14-.74-2.14-2.14V8.38h3.54V6.56H9.09V2.94Z" />
      </svg>
    ),
  },
  {
    name: "Upwork",
    rating: "Top Rated",
    label: "Upwork",
    url: "https://www.upwork.com/freelancers/~01d6dbf9c288a51d3b",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M18.56 13.24c-.75 0-1.44-.3-2.04-.79l.04-.15.25-.93c.42-1.56 1.04-3.1 1.84-4.52l.02-.01c.23-.42.54-.8.9-1.12.57-.5 1.28-.8 2.04-.8 1.04 0 1.96.44 2.56 1.16.54.65.83 1.48.83 2.37 0 .9-.29 1.73-.83 2.38-.6.72-1.52 1.16-2.56 1.16h-.05zM18.56 2C15.6 2 13.1 3.76 12 6.37 10.9 3.76 8.4 2 5.44 2 2.56 2 0 4.38 0 7.78v10.54h3.6V7.78c0-1.78 1.46-3.22 3.26-3.22 1.8 0 3.26 1.44 3.26 3.22v5.1h3.6v-5.1c0-1.78 1.46-3.22 3.26-3.22 1.8 0 3.26 1.44 3.26 3.22v10.54H24V7.78C24 4.38 21.44 2 18.56 2z" />
      </svg>
    ),
  },
  {
    name: "Workana",
    rating: "Top Freelancer",
    label: "Workana",
    url: "https://www.workana.com/freelancer/alexvelezweb",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
      </svg>
    ),
  },
]

export function PlatformBadges() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const { translations: t } = useLanguage()

  return (
    <section ref={ref} className="py-12 md:py-16">
      <div className="container">
        <motion.p
          className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/50"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t.badges.title}
        </motion.p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border/30 bg-card/50 px-4 py-2 text-xs uppercase tracking-[0.1em] text-muted-foreground transition-all duration-300 hover:border-warm/30 hover:text-warm hover:-translate-y-0.5 cursor-pointer"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">{p.icon}</span>
              <span>{p.label}</span>
              <span className="text-[10px] text-warm/60">{p.rating}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
