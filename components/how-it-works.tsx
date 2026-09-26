"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { useLanguage } from "@/lib/i18n-context"

export function HowItWorks() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { translations: t } = useLanguage()

  return (
    <section ref={ref} className="border-t border-border py-24 md:py-32">
      <div className="container">
        <motion.p
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t.howitworks.label}
        </motion.p>

        <motion.h2
          className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
        >
          {t.howitworks.title}
        </motion.h2>

        <div className="relative mt-16 md:mt-24">
          <div className="absolute left-[21px] top-0 bottom-0 hidden w-px bg-border/60 md:block" />

          <div className="space-y-16 md:space-y-24">
            {t.howitworks.steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.num}
                  className="relative md:flex md:items-start md:gap-12"
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
                >
                  <div className="hidden md:flex md:w-1/2 md:justify-end" />

                  <div className="relative z-10 flex items-start gap-4 md:w-1/2 md:gap-6">
                    <div className="relative flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-warm/30 bg-background md:h-[50px] md:w-[50px]">
                      <span className="font-display text-sm font-bold text-warm md:text-base">
                        {step.num}
                      </span>
                      <div className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-warm/10 md:h-10 md:w-10" />
                    </div>

                    <div className={isLeft ? "md:text-right" : ""}>
                      <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
