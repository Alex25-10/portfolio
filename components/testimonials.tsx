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
          className="text-sm uppercase tracking-[0.2em] text-muted-foreground"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t.testimonials.label}
        </motion.p>

        <motion.blockquote
          className="relative mt-12 overflow-hidden rounded-md border border-warm/40 bg-card/60 p-8 backdrop-blur-sm md:p-12"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
        >
          <span aria-hidden="true" className="absolute right-8 top-4 font-display text-8xl leading-none text-warm/20 select-none">”</span>
          <p role="img" aria-label="5 de 5 estrellas" className="flex gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, s) => (
              <svg key={s} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" /></svg>
            ))}
          </p>
          <p className="mt-4 max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
            &ldquo;{items[0].quote}&rdquo;
          </p>
          <footer className="mt-6 flex items-center gap-3">
            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warm/20 text-sm font-bold text-warm">
              {items[0].author.charAt(0)}
            </span>
            <span>
              <strong className="block text-sm font-semibold text-foreground">
                {items[0].author}
              </strong>
              <span className="block text-sm uppercase tracking-[0.1em] text-muted-foreground">
                {items[0].role} · Cliente verificado
              </span>
            </span>
          </footer>
        </motion.blockquote>

        <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8">
          {items.slice(1).map((item, i) => {
            return (
            <motion.blockquote
              key={item.author}
              className="relative flex h-full flex-col justify-between rounded-md border border-border/80 bg-card/60 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: (i + 1) * 0.1, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
            >
              <span aria-hidden="true" className="absolute right-6 top-4 font-display text-6xl leading-none text-warm/20 select-none">”</span>
              <p role="img" aria-label="5 de 5 estrellas" className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" /></svg>
                ))}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3 border-t border-border/40 pt-5">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warm/20 text-sm font-bold text-warm">
                  {item.author.charAt(0)}
                </span>
                <span>
                  <strong className="block text-sm font-semibold text-foreground">
                    {item.author}
                  </strong>
                  <span className="block text-sm uppercase tracking-[0.1em] text-muted-foreground">
                    {item.role} · Cliente verificado
                  </span>
                </span>
              </footer>
            </motion.blockquote>
            )
          })}
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
