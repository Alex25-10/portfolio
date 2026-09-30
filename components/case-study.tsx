"use client"

import { useState, useRef } from "react"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { ExternalLink, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { track } from "@vercel/analytics"

export function CaseStudy() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { translations: t } = useLanguage()
  const c = t.casestudy

  const [activeId, setActiveId] = useState(c.projects[0]?.id ?? "")
  const [dir, setDir] = useState(1)
  const activeIdx = c.projects.findIndex((p: { id: string }) => p.id === activeId)

  function selectTab(id: string, i: number) {
    setDir(i >= activeIdx ? 1 : -1)
    setActiveId(id)
  }

  const project = c.projects.find((p: { id: string }) => p.id === activeId)
  if (!project) return null

  return (
    <section ref={ref} className="border-t border-border py-24 md:py-32">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.p
            className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {c.label}
          </motion.p>

          <motion.div
            className="flex gap-1 rounded-full border border-border bg-secondary/30 p-0.5"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {c.projects.map((p: { id: string; title: string }, i: number) => (
              <button
                key={p.id}
                onClick={() => selectTab(p.id, i)}
                className={`relative rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] transition-colors ${
                  activeId === p.id
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeId === p.id && (
                  <motion.span
                    layoutId="case-tab-bg"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{p.title}</span>
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            className="mt-8 grid gap-12 md:grid-cols-5 md:gap-16"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 48 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -48 * dir }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
          >
            {/* Left: title + meta */}
            <div className="md:col-span-2">
              <motion.h2
                className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
              >
                {project.title}
              </motion.h2>
              <motion.p
                className="mt-2 text-sm text-muted-foreground/70"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                {project.subtitle}
              </motion.p>

              <motion.div
                className="mt-8"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className="text-xs uppercase tracking-[0.15em] text-warm">
                  {project.tech_stack}
                </p>
                <ul className="mt-4 space-y-2">
                  {project.tech_items.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warm/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {project.url && project.url !== "#" && (
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("case_cta", { id: project.id })}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-background transition-all hover:opacity-80"
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  <ExternalLink className="h-3 w-3" /> {project.cta}
                </motion.a>
              )}
            </div>

            {/* Right: challenge, solution, results */}
            <div className="space-y-10 md:col-span-3">
              <motion.div
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className="text-xs uppercase tracking-[0.15em] text-warm">{project.challenge}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.challenge_desc}
                </p>
              </motion.div>

              <motion.div
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p className="text-xs uppercase tracking-[0.15em] text-warm">{project.solution}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.solution_desc}
                </p>
              </motion.div>

              <motion.div
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p className="text-xs uppercase tracking-[0.15em] text-warm">{project.results}</p>
                <ul className="mt-3 space-y-2">
                  {project.result_items.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90 md:text-base">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-warm" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.p
                className="border-t border-border/30 pt-6 text-[11px] uppercase tracking-[0.15em] text-muted-foreground/50"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {project.note}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
