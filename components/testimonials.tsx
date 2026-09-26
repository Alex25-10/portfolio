"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { useLanguage } from "@/lib/i18n-context"

export function Testimonials() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { translations: t } = useLanguage()
  const items = t.testimonials.items

  return (
    <section ref={ref} className="border-t border-border py-24 md:py-32">
      <div className="container">
        <motion.p
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t.testimonials.label}
        </motion.p>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item, i) => (
            <motion.blockquote
              key={item.author}
              className="flex flex-col justify-between border border-border/40 bg-card/10 p-6 md:p-8"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
            >
              <p className="text-sm leading-relaxed italic text-muted-foreground/90 md:text-base">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-border/30 pt-4">
                <strong className="block text-sm font-semibold text-foreground">
                  {item.author}
                </strong>
                <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground/60">
                  {item.role}
                </span>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.testimonials.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
