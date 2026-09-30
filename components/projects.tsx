"use client"

import { useRef, useState } from "react"
import { motion, useInView, useReducedMotion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ExternalLink, X, ArrowUpRight } from "lucide-react"
import { useFocusTrap } from "@/hooks/use-focus-trap"
import { TiltCard } from "@/components/tilt-card"
import { useLanguage } from "@/lib/i18n-context"
import { DustField } from "@/components/dust-field"
import { BlurReveal, ParallaxOrb } from "@/components/scroll-reveal"
import { track } from "@vercel/analytics"

interface Project {
  title: string
  category: string
  url: string
  image: string
  desc: string
  featured?: boolean
  badge?: string
}

const projects: Project[] = [
  {
    title: "Begin Again by Dra. Susana",
    category: "WordPress · Elementor · Bilingüe · SEO · Calendly",
    url: "https://beginagainbydrasusana.com",
    image: "/proyectos/Begin-Again.webp",
    desc: "Clínica de medicina funcional y regenerativa en Puerto Vallarta, México. Sitio bilingüe (ES/EN) con SEO para pacientes internacionales, agenda online con Calendly y programas de tratamiento especializados (células madre, detox, Long COVID).",
    featured: true,
    badge: "Proyecto real",
  },
  {
    title: "Edurne Reyes",
    category: "Next.js · Tailwind · SEO Local · Calendly",
    url: "https://edurne-reyes.vercel.app",
    image: "/proyectos/Edurne-Reyes.webp",
    desc: "Coach ontológica en Río Negro. Landing con SEO local para captar clientes en Patagonia, integración con Calendly para agendar sesiones, diseño cálido y profesional que transmite confianza.",
    featured: true,
    badge: "Proyecto real",
  },
  {
    title: "ONYX Estudio",
    category: "Next.js · Tailwind · Dark theme · E-commerce",
    url: "https://peluqueria-cordoba.vercel.app",
    image: "/proyectos/Peluqueria.webp",
    desc: "Landing moderna con galería interactiva, tienda online con carrito de compras, reservas de turnos online y tema oscuro premium. Diseñado para una experiencia de marca única en el rubro de la estética.",
  },
  {
    title: "DentiCare",
    category: "Next.js · Tailwind · framer-motion · Lenis",
    url: "https://dental-next-lyart.vercel.app",
    image: "/screenshots/dental-after.webp",
    desc: "Clínica dental premium en Córdoba. Hero split con tipografía editorial, About con columna sticky, servicios en bento grid, slider interactivo antes/después. Paleta azul clínico/dorado con fotos únicas por sección.",
  },
  {
    title: "Sabor Express",
    category: "Next.js · Tailwind · framer-motion · Lenis",
    url: "https://restaurante-next-zeta.vercel.app",
    image: "/screenshots/restaurante-after.webp",
    desc: "Landing editorial para restaurante en Córdoba. Hero split con parallax, menú interactivo con hover reveal, galería de platos con lazy loading y CTA directo a WhatsApp. Paleta terracotta/crema con tipografía Serif Display.",
  },
  {
    title: "Titan Gym",
    category: "Next.js · Tailwind · framer-motion · Lenis · GSAP",
    url: "https://gimnasio-next.vercel.app",
    image: "/screenshots/gimnasio-after.webp",
    desc: "Gimnasio premium en Córdoba con estética industrial oscura y acentos ember. Hero con marquee text multicapa, curtain reveal en imágenes, 3D tilt en cards, contador animado, cursor custom, testimoniales con auto-scroll infinito y WhatsApp float interactivo.",
  },
  {
    title: "Barquito Peruano",
    category: "Next.js · Animaciones · Interactivo",
    url: "https://barquito-peruano.vercel.app",
    image: "/proyectos/Barquito-Peruano.webp",
    desc: "Proyecto creativo con animaciones fluidas y micro-interacciones. Diseño lúdico y colorido que explora el motion design como herramienta de engagement. Experimentación visual con transiciones y scroll-driven animations.",
  },
  {
    title: "Veil",
    category: "Next.js · Stripe · E-commerce · Carrito",
    url: "https://veil-teal-six.vercel.app",
    image: "/proyectos/Veil.webp",
    desc: "E-commerce de moda con carrito de compras funcional, checkout integrado con Stripe, catálogo de productos con filtros y galería visual. Experiencia de compra completa sin backend propio.",
  },
  {
    title: "PsiConnection",
    category: "Next.js · Tailwind · framer-motion · Lenis",
    url: "https://psicologo-next.vercel.app",
    image: "/screenshots/psicologo-after.webp",
    desc: "Sitio premium para psicóloga clínica en Córdoba. Incluye terapia individual, de pareja y online. Diseño cálido y minimalista con paleta sage/cream. FAQ interactivo, testimonios carrusel y CTA sticky mobile.",
  },
  {
    title: "TERRA Propiedades",
    category: "Next.js · Tailwind · Inmobiliaria · SEO Local",
    url: "https://inmobiliaria-cordoba-gilt.vercel.app",
    image: "/proyectos/TERRA.webp",
    desc: "Landing premium para inmobiliaria con propiedades destacadas, galería por barrios, testimonios de clientes y WhatsApp integrado. Diseño Light Luxury con tipografía Cinzel y paleta neutra elegante.",
  },
]

export function Projects() {
  const prefersReduced = useReducedMotion()
  const [selected, setSelected] = useState<null | Project>(null)
  const modalRef = useFocusTrap(!!selected)
  const { translations: t } = useLanguage()
  const real = projects.filter((p) => p.featured)
  const demos = projects.filter((p) => !p.featured)

  return (
    <section id="work" className="relative py-24 md:py-40">
      <ParallaxOrb className="left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 bg-warm/[0.04]" speed={70} />
      <DustField count={8} seed={55} />
      <div className="container mb-12 md:mb-20">
        <motion.p
          className="text-sm uppercase tracking-[0.2em] text-muted-foreground"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t.projects.label}
        </motion.p>
      </div>

      <div className="container mb-10 md:mb-14">
        <BlurReveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {t.projects.real_title}
          </h2>
          <p className="mt-2 text-base text-muted-foreground">{t.projects.real_sub}</p>
        </BlurReveal>
      </div>

      <div className="container">
        <div className="space-y-16 md:space-y-24">
          {real.map((project, i) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={i}
              prefersReduced={prefersReduced}
              onSelect={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <div className="container mb-10 mt-24 md:mb-14 md:mt-32">
        <BlurReveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {t.projects.demo_title}
          </h2>
          <p className="mt-2 text-base text-muted-foreground">{t.projects.demo_sub}</p>
        </BlurReveal>
      </div>

      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {demos.map((project, j) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={real.length + j}
              prefersReduced={prefersReduced}
              onSelect={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              ref={modalRef}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-md bg-card"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
            >
              <div className="relative h-56 sm:h-64">
                <img src={selected.image} alt={selected.title} className="h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground">{selected.category}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">{selected.title}</h3>
                  </div>
                  <button type="button" onClick={() => setSelected(null)} className="flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground cursor-pointer" aria-label={t.projects.close}><X className="h-4 w-4" /></button>
                </div>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{selected.desc}</p>
                <a href={selected.url} target="_blank" rel="noopener noreferrer" onClick={() => track("project_view", { title: selected.title })} className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium uppercase tracking-[0.1em] text-background transition-all hover:opacity-80 cursor-pointer"><ExternalLink className="h-3 w-3" /> {t.projects.view_project}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mt-24 text-center md:mt-32">
        <motion.a
          href="#contact"
          className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t.projects.ctatext}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </motion.a>
      </div>
    </section>
  )
}

function ProjectRow({
  project,
  index,
  prefersReduced,
  onSelect,
}: {
  project: Project
  index: number
  prefersReduced: boolean | null
  onSelect: () => void
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: true, margin: "-80px" })
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])
  const isEven = index % 2 === 0
  const isFeatured = project.featured
  const { translations: t } = useLanguage()
  const [hovering, setHovering] = useState(false)

  return (
    <div
      ref={rowRef}
      className={`group relative grid cursor-pointer gap-4 transition-all duration-300 md:gap-8 ${
        isFeatured ? "md:grid-cols-1 rounded-md border border-warm/25 bg-card/60 p-4 shadow-[0_30px_80px_-30px_rgba(196,181,165,0.35)] md:p-6" : "md:grid-cols-12 rounded-md border border-border/60 bg-card/40 p-4 md:p-5 hover:border-border hover:bg-card/60"
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect() }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className={isFeatured ? "" : `overflow-hidden md:col-span-7 ${isEven ? "" : "md:col-start-6"}`}>
        <TiltCard max={6}>
        <motion.div
          className={`relative overflow-hidden rounded-md bg-muted border border-border ${
            isFeatured ? "aspect-[21/9] md:aspect-[21/8]" : "aspect-[16/10]"
          }`}
          initial={prefersReduced ? { opacity: 1 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={isInView ? { clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0, 1] }}
        >
          <div className="absolute top-0 left-0 right-0 z-10 flex h-7 items-center gap-1.5 border-b border-border bg-background/60 px-3 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-red-500/60" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
            <span className="h-2 w-2 rounded-full bg-green-500/60" />
            <span className="ml-2 truncate text-sm text-muted-foreground">{project.url.replace("https://", "")}</span>
          </div>
          <div className="h-full w-full pt-7">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover object-top"
              style={prefersReduced ? {} : { y: imgY }}
              animate={prefersReduced ? {} : hovering ? { scale: 1.18 } : { scale: 1.12 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>

          <div
            className={`absolute inset-0 ${isFeatured ? "bg-gradient-to-t from-background/70 via-background/20 to-transparent" : "bg-gradient-to-t from-background/40 via-transparent to-transparent"}`}
          />
          <div className="shine-sweep" aria-hidden="true" />

          <motion.div
            className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm border border-foreground/10"
            animate={hovering ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="h-4 w-4 text-foreground" />
          </motion.div>

          {isFeatured && (
            <div className="absolute top-12 left-3 rounded-full bg-warm/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-warm border border-warm/30">
              {project.badge || t.projects.featured_badge}
            </div>
          )}
        </motion.div>
        </TiltCard>
      </div>

      <div className={isFeatured ? "" : `flex flex-col justify-end pb-4 md:col-span-4 md:pb-10 ${isEven ? "" : "md:col-start-2 md:row-start-1"}`}>
        <motion.p
          className={`uppercase tracking-[0.15em] text-warm text-sm`}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.p>
        <motion.h3
          className={`mt-1 font-bold tracking-tight text-foreground ${
            isFeatured
              ? "font-display text-4xl md:text-5xl"
              : "font-display text-2xl md:text-3xl"
          }`}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className={`mt-3 leading-relaxed text-muted-foreground ${isFeatured ? "max-w-xl text-base md:text-lg" : "text-base line-clamp-2"}`}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          {project.desc}
        </motion.p>
        <motion.p
          className="mt-4 inline-block rounded-full border border-border/60 px-3 py-1 text-sm text-muted-foreground"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
        >
          {project.category}
        </motion.p>
        <motion.span
          className="mt-4 inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.15em] text-warm/70 transition-all duration-300 group-hover:text-warm"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        >
          {t.projects.view_project} →
        </motion.span>
      </div>
    </div>
  )
}
