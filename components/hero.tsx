"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion"
import dynamic from "next/dynamic"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { Magnetic } from "@/components/magnetic"
import { useLanguage } from "@/lib/i18n-context"
import { track } from "@vercel/analytics"

const HeroScene = dynamic(() => import("@/components/hero-scene"), { ssr: false })

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const mouse = useMousePosition(ref)
  const prefersReduced = useReducedMotion()
  const { translations: t } = useLanguage()
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(typeof window !== "undefined" && "ontouchstart" in window)
  }, [])

  const waUrl = `https://wa.me/543571578382?text=${encodeURIComponent(t.hero.wa_msg)}`

  const { scrollY } = useScroll()
  const fade = useTransform(scrollY, [0, 500], [1, 0])
  const rise = useTransform(scrollY, [0, 500], [0, -120])
  const scale = useTransform(scrollY, [0, 500], [1, 0.94])
  const blurV = useTransform(scrollY, [0, 500], [0, 10])
  const blurFilter = useMotionTemplate`blur(${blurV}px)`
  const contentStyle = prefersReduced ? {} : { opacity: fade, y: rise, scale, filter: blurFilter }

  const shineX = useMotionValue(50)
  const shinePos = useMotionTemplate`${shineX}% 0`
  const shimmer = !isTouch && !prefersReduced

  useEffect(() => {
    if (typeof window === "undefined" || !shimmer) return
    shineX.set(Math.min(100, Math.max(0, (mouse.x / window.innerWidth) * 100)))
  }, [mouse.x, shimmer, shineX])

  return (
    <section ref={ref} className="relative flex min-h-dvh items-center overflow-hidden">
      {!isTouch && !prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden="true"
          style={{ background: `radial-gradient(560px circle at ${mouse.x}px ${mouse.y}px, rgba(196,181,165,0.08), transparent 70%)` }}
        />
      )}
      <svg className="absolute inset-0 z-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#f5f5f5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {!isTouch && (
        <div className="absolute inset-0 z-0">
          <HeroScene mouseX={mouse.x} mouseY={mouse.y} />
        </div>
      )}

      <motion.div className="container relative z-10 mx-auto flex flex-col items-center justify-center text-center" style={contentStyle}>
        <motion.h1
          className={`font-display text-[clamp(3.5rem,15vw,9rem)] font-bold leading-[0.85] tracking-tight${shimmer ? " h1-shimmer" : ""}`}
          style={shimmer ? { backgroundPosition: shinePos } : {}}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 1.7 } } }}
          aria-label="Alex Vélez"
        >
          {"Alex Vélez".split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              aria-hidden="true"
              variants={{
                hidden: prefersReduced ? { opacity: 1 } : { opacity: 0, y: 70, rotateX: -50 },
                show: { opacity: 1, y: 0, rotateX: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-md text-xs uppercase tracking-[0.3em] text-muted-foreground md:text-sm"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.div
          className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        >
          <Magnetic
            as="a"
            href="#work"
            onClick={() => track("view_projects")}
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-foreground px-6 py-3.5 text-center text-xs font-medium uppercase tracking-[0.15em] text-background transition-all hover:opacity-90 cursor-pointer sm:w-auto sm:py-2.5"
          >
            {t.hero.cta_work}
          </Magnetic>
          <Magnetic
            as="a"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_hero")}
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full px-6 py-3.5 text-center text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground cursor-pointer sm:w-auto sm:py-2.5"
          >
            {t.hero.cta_contact}
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          className="h-14 w-px bg-gradient-to-b from-muted-foreground/50 to-transparent"
          animate={prefersReduced ? {} : { height: [56, 72, 56] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
