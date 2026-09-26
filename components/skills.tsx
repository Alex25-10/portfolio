"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Palette, Globe, Sparkles, Smartphone } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"

const iconMap = [Palette, Globe, Sparkles, Smartphone] as const

export function Skills() {
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
          {t.skills.label}
        </motion.p>

        <div className="mt-16 space-y-12 md:space-y-16">
          {t.skills.items.map((service, i) => {
            const Icon = iconMap[i]
            return (
              <motion.div
                key={service.title}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
                className="group grid gap-4 md:grid-cols-12 md:gap-8"
              >
                <span className="hidden font-display text-5xl font-bold leading-none text-border transition-colors duration-300 group-hover:text-warm/30 md:col-span-2 md:block">
                  {service.num}
                </span>
                <div className="flex items-start gap-4 md:col-span-10 md:gap-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/40 transition-all duration-300 group-hover:border-warm/40 group-hover:bg-warm/10">
                    <Icon className="h-4 w-4 text-warm transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <div className="min-w-0 flex-1 border-b border-border/20 pb-8 transition-colors duration-300 group-hover:border-warm/20 md:pb-12">
                    <h3 className="font-display text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-warm md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80 md:text-base">
                      {service.desc}
                    </p>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-warm/70 transition-all duration-300 group-hover:text-warm"
                    >
                      {service.cta}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
