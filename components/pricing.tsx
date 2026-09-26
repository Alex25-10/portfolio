"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"

export function Pricing() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { lang, translations: t } = useLanguage()
  const p = t.pricing

  function planUrl(title: string) {
    const msg =
      lang === "es"
        ? `Hola Alex, me interesa el plan ${title} que vi en tu portfolio.`
        : `Hi Alex, I'm interested in the ${title} plan I saw on your portfolio.`
    return `https://wa.me/543571578382?text=${encodeURIComponent(msg)}`
  }

  return (
    <section id="pricing" ref={ref} className="border-t border-border py-24 md:py-32">
      <div className="container">
        <motion.p
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {p.label}
        </motion.p>

        <motion.h2
          className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
        >
          {p.title}
        </motion.h2>

        <motion.p
          className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {p.desc}
        </motion.p>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {p.plans.map((plan, i) => {
            const isFeatured = i === 1
            return (
              <motion.div
                key={i}
                className={`group relative rounded-sm border p-6 transition-all duration-500 md:p-8 ${
                  isFeatured
                    ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                    : "border-border/40 bg-card/20"
                }`}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
                style={isFeatured && !prefersReduced ? {
                  boxShadow: "0 0 30px -10px rgba(16,185,129,0.15), 0 0 60px -20px rgba(16,185,129,0.1)",
                } : {}}
              >
                {isFeatured && (
                  <div className="pointer-events-none absolute inset-0 rounded-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
                    <div className="absolute inset-0 rounded-sm bg-[radial-gradient(ellipse_at_top,#10b981_0%,transparent_60%)] opacity-[0.06]" />
                  </div>
                )}

                <div className="relative z-10">
                  {isFeatured && (
                    <span className="inline-block rounded-full border border-emerald-500/30 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-emerald-400/80 mb-4">
                      Popular
                    </span>
                  )}

                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-foreground">{plan.title}</h3>
                  <p className={`mt-1 font-display text-2xl tracking-tight ${isFeatured ? "text-emerald-400" : "text-warm"}`}>
                    {plan.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.desc}</p>
                  <ul className="mt-6 space-y-2 border-t border-border/30 pt-6">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground/80">
                        <Check className={`h-3.5 w-3.5 shrink-0 ${isFeatured ? "text-emerald-400" : "text-warm"}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={planUrl(plan.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 block rounded-full px-5 py-2.5 text-center text-xs font-medium uppercase tracking-[0.1em] transition-all hover:opacity-80 cursor-pointer ${
                      isFeatured
                        ? "bg-emerald-500/90 text-black"
                        : "border border-border/50 text-foreground hover:border-foreground/40"
                    }`}
                  >
                    {p.plan_cta}
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            {p.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <p className="mt-3 text-[11px] text-muted-foreground/40">{p.note}</p>
        </motion.div>
      </div>
    </section>
  )
}
