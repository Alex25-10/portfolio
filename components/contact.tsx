"use client"

import { useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { MessageCircle, Mail, MapPin, Send } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { track } from "@vercel/analytics"

const WHATSAPP_URL = "https://wa.me/543571578382"

export function Contact() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { translations: t } = useLanguage()
  const [name, setName] = useState("")
  const [business, setBusiness] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    track("contact_submit")
    const text = `Hola Alex, soy ${name || "—"} (${business || "—"}). ${message}`.trim()
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank", "noopener")
  }

  const inputClass =
    "w-full border border-border/50 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/40 focus:outline-none"

  const linkClass =
    "group inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"

  return (
    <section id="contact" ref={ref} className="py-24 md:py-40">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <motion.p
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {t.contact.label}
          </motion.p>

          <div className="space-y-10">
            <motion.h2
              className="font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-6xl"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
            >
              {t.contact.title_1}
              <br />
              <span className="text-warm">{t.contact.title_2}</span>
            </motion.h2>

            <motion.p
              className="max-w-xs text-sm leading-relaxed text-muted-foreground"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              {t.contact.text}
            </motion.p>

            <motion.div
              className="space-y-5"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_contact")} className={linkClass}>
                <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
                +54 3571 578382
              </a>
              <br />
              <a href="mailto:alex.dev2510@gmail.com" className={linkClass}>
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
                alex.dev2510@gmail.com
              </a>
              <br />
              <span className="inline-flex items-center gap-3 text-sm text-muted-foreground/50">
                <MapPin className="h-4 w-4" />
                {t.contact.location}
              </span>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-3 border border-border/40 bg-card/10 p-5 md:p-6"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.contact.form_title}
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contact.form_name}
                className={inputClass}
                aria-label={t.contact.form_name}
              />
              <input
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder={t.contact.form_business}
                className={inputClass}
                aria-label={t.contact.form_business}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.contact.form_msg}
                rows={3}
                className={`${inputClass} resize-none`}
                aria-label={t.contact.form_msg}
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-background transition-all hover:opacity-80 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                {t.contact.form_send}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
}
