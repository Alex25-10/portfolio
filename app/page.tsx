"use client"

import { useReducedMotion } from "framer-motion"
import { Preloader } from "@/components/preloader"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MarqueeStrip } from "@/components/marquee-strip"
import { Skills } from "@/components/skills"
import { Stats } from "@/components/stats"
import { Projects } from "@/components/projects"
import { CaseStudy } from "@/components/case-study"
import { Testimonials } from "@/components/testimonials"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { PlatformBadges } from "@/components/platform-badges"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Analytics } from "@vercel/analytics/react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"
import { MouseGlow } from "@/components/mouse-glow"
import { ScrollProgress } from "@/components/scroll-progress"
import { GlowDivider } from "@/components/scroll-reveal"

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Preloader />
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <Skills />
      <Stats />
      <GlowDivider />
      <Projects />
      <CaseStudy />
      <Pricing />
      <Testimonials />
      <HowItWorks />
      <GlowDivider />
      <PlatformBadges />
      <GlowDivider />
      <About />
      <FAQ />
      <GlowDivider />
      <Contact />
      <Footer />
      <WhatsAppFloat />
      <CustomCursor />
      <MouseGlow />
      <div className="vignette" />
      <div className="grain-overlay" />
      <Analytics />
    </SmoothScroll>
  )
}
