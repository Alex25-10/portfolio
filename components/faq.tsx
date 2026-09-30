"use client"

import { useRef, useState } from "react"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"

export function FAQ() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { translations: t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="border-t border-border py-24 md:py-32">
      <div className="container">
        <motion.p
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t.faq.label}
        </motion.p>

        <div className="mt-12 mx-auto max-w-2xl divide-y divide-border/40">
          {t.faq.items.map((item: { q: string; a: string }, i: number) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium transition-colors cursor-pointer md:text-base ${isOpen ? "text-warm" : "text-foreground hover:text-warm"}`}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={prefersReduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0, filter: "blur(4px)" }}
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={prefersReduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
