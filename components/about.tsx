"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { useLanguage } from "@/lib/i18n-context"

export function About() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { translations: t } = useLanguage()

  return (
    <section id="about" ref={ref} className="py-24 md:py-40">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-2">
            <motion.div
              className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full border border-border/60 shadow-[0_0_30px_-10px_rgba(245,245,245,0.08)] md:w-full md:max-w-xs"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
            >
              <img
                src="/profile.webp"
                alt="Alex Vélez"
                className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-border/50" />
            </motion.div>
          </div>

          <div className="md:col-span-3">
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {t.about.label}
              </motion.p>

              <div className="mt-8 space-y-8">
                <motion.h2
                  className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl"
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
                >
                  {t.about.title_1}
                  <br />
                  <span className="text-warm">{t.about.title_2}</span>
                </motion.h2>

                <motion.div
                  className="max-w-md space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base"
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                >
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              >
                <span className="h-px w-8 bg-warm/30" />
                <span className="text-xs text-muted-foreground/50">{t.about.location}</span>
              </motion.div>

              <motion.a
                href="#contact"
                className="group inline-flex items-center gap-2 text-sm font-medium text-warm transition-all hover:text-warm/80"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              >
                {t.about.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </motion.a>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
