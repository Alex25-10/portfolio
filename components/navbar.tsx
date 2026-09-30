"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent } from "framer-motion"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { useFocusTrap } from "@/hooks/use-focus-trap"
import { track } from "@vercel/analytics"

const NAV_HREFS = ["#work", "#pricing", "#about", "#contact"] as const

const NAV_LABEL_KEYS = {
  "#work": "work",
  "#pricing": "pricing",
  "#about": "about",
  "#contact": "contact",
} as const

export function Navbar() {
  const { lang, setLang, translations: t } = useLanguage()
  const NAV_ITEMS = NAV_HREFS.map((href) => ({
    href,
    label: t.nav[NAV_LABEL_KEYS[href]],
  }))
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const [hidden, setHidden] = useState(false)
  const prefersReduced = useReducedMotion()
  const menuRef = useFocusTrap(open)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (y) => {
    if (open) return
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 150)
  })
  const navBlur = useTransform(scrollY, [0, 120], [0, 12])
  const navBg = useTransform(scrollY, [0, 120], [0, 0.6])
  const navFilter = useMotionTemplate`blur(${navBlur}px)`
  const navBgColor = useMotionTemplate`rgba(10,10,10,${navBg})`
  const headerStyle = prefersReduced ? {} : { backdropFilter: navFilter, backgroundColor: navBgColor }

  useEffect(() => {
    function handleScroll() {
      const sections = NAV_ITEMS.map((item) => document.querySelector(item.href))
      let current = ""
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.4) {
            current = NAV_ITEMS[i].href
            break
          }
        }
      }
      setActive(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
  }, [prefersReduced])

  return (
    <>
      <motion.header className="fixed top-0 right-0 left-0 z-50" style={headerStyle} aria-hidden={open || undefined} animate={prefersReduced ? {} : { y: hidden && !open ? "-100%" : "0%" }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#"
            onClick={scrollToTop}
            className="font-display text-sm font-bold tracking-tight text-foreground transition-opacity hover:opacity-60 cursor-pointer"
            aria-label="Volver al inicio"
          >
            AV
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-warm"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </a>
              )
            })}
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="ml-6 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              aria-label="Toggle language"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
            <a
              href="https://wa.me/543571578382"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_nav")}
              className="ml-2 rounded-full bg-foreground px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-80 cursor-pointer"
            >
              WhatsApp
            </a>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="flex h-8 w-8 items-center justify-center text-foreground transition-opacity hover:opacity-60 cursor-pointer md:hidden"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-3 bg-foreground" />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-12 bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center text-foreground transition-opacity hover:opacity-60 cursor-pointer md:top-10 md:right-10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="group relative font-display text-5xl font-bold tracking-tight text-foreground transition-colors hover:text-warm md:text-7xl cursor-pointer"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReduced ? { duration: 0 } : { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
                onClick={() => setOpen(false)}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-warm/50 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}

            <motion.div
              className="absolute bottom-10 flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="https://wa.me/543571578382"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-foreground px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-background cursor-pointer"
                onClick={() => { track("whatsapp_nav"); setOpen(false) }}
              >
                WhatsApp
              </a>
              <button
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors hover:text-foreground cursor-pointer"
              >
                {lang === "es" ? "Switch to English" : "Cambiar a Español"}
              </button>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/40">
                Alex Vélez — Diseño & Desarrollo Web
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
