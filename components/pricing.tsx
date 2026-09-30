"use client"

import { useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import { DustField } from "@/components/dust-field"
import { useLanguage } from "@/lib/i18n-context"

export function Pricing() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { lang, translations: t } = useLanguage()
  const p = t.pricing
  const [active, setActive] = useState(1)

  function planUrl(title: string) {
    const msg =
      lang === "es"
        ? `Hola Alex, me interesa el plan ${title} que vi en tu portfolio.`
        : `Hi Alex, I'm interested in the ${title} plan I saw on your portfolio.`
    return `https://wa.me/543571578382?text=${encodeURIComponent(msg)}`
  }

  return (
    <section id="pricing" ref={ref} className="relative overflow-hidden border-t border-border py-24 md:py-32">
      <DustField count={12} seed={21} />
      <div className="glow-orb left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 bg-warm/[0.05]" aria-hidden="true" />
      <div className="container relative">
        <motion.p
          className="text-sm uppercase tracking-[0.2em] text-muted-foreground"
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
          className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {p.desc}
        </motion.p>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {p.plans.map((plan, i) => {
            const isMiddle = i === 1
            const isFeatured = i === active
            const showPopular = isMiddle && active === 1
            return (
              <motion.div
                key={plan.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const r = el.getBoundingClientRect()
                  el.style.setProperty("--mx", `${e.clientX - r.left}px`)
                  el.style.setProperty("--my", `${e.clientY - r.top}px`)
                }}
                className={`group relative rounded-md border p-8 transition-all duration-500 ${
                  isFeatured
                    ? "border-emerald-500/60 bg-emerald-500/[0.07] -translate-y-2 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.35)]"
                    : "border-border/80 bg-card/60 opacity-80 hover:opacity-100"
                }`}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
                style={isFeatured && !prefersReduced ? {
                  boxShadow: "0 20px 60px -15px rgba(16,185,129,0.35), 0 0 60px -20px rgba(16,185,129,0.2)",
                } : {}}
              >
                {isFeatured && (
                  <div className="spotlight" aria-hidden="true" />
                )}

                <div className="relative z-10">
                  {showPopular && (
                    <span className="inline-block rounded-full border border-emerald-500/30 px-3 py-1 text-sm uppercase tracking-[0.15em] text-emerald-400 mb-4">
                      {p.popular}
                    </span>
                  )}

                  <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-foreground">{plan.title}</h3>
                  <p className={`mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl ${isFeatured ? "price-shimmer" : "text-warm"}`}>
                    {plan.price}
                  </p>
                  <p className="mt-3 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                    {p.promo_badge}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{plan.desc}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-border/40 pt-6">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-base text-foreground/80">
                        <Check className={`h-4 w-4 shrink-0 ${isFeatured ? "text-emerald-400" : "text-warm"}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={planUrl(plan.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 block rounded-full px-5 py-3.5 text-center text-sm font-medium uppercase tracking-[0.1em] transition-all hover:opacity-80 active:scale-95 cursor-pointer ${
                      isFeatured
                        ? "bg-emerald-500/90 text-black"
                        : "border border-border/60 text-foreground hover:border-foreground/40"
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
                  <p className="mt-3 text-sm text-muted-foreground">{p.promo_hint}</p>
          <p className="mt-3 text-sm text-muted-foreground">{p.note}</p>
        </motion.div>
      </div>
    </section>
  )
}
