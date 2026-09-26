# Portfolio — Estado Final

## URL
https://portafolio-next-psi.vercel.app

## Stack
Next.js 16, Tailwind v4, framer-motion 12, Three.js (R3F), Lenis, lucide-react

## Secciones (en orden)
1. **ScrollProgress** — barra fina en top, fade al inicio/fin
2. **Preloader** — "AV" letter reveal, ~1.2s
3. **Navbar** — "AV" + links desktop (Proyectos, Precios, Sobre mí, Contacto), CTA WhatsApp, hamburger en mobile con overlay big type. Indicador activo con dot warm animado (layoutId)
4. **Hero** — nombre con staggered letters (1s total), dot grid SVG bg + Three.js (desktop) / solo dot grid (mobile). Botones magnéticos: "Ver proyectos", "Agendar por WhatsApp" (mensaje prellenado)
5. **MarqueeStrip** — tech stack scrolleando, gradient fade edges
6. **Skills** — 4 servicios con número, icono en círculo, copy concreto con mini-CTAs
7. **Stats** — 10+ sitios publicados, 2 países, 1-4 semanas entrega
9. **Projects** — reales (Begin Again, Edurne) separados arriba, demos por rubro abajo. Clip-path reveal, parallax Y, 3D tilt (mouse+touch), browser frame. Modal con focus trap. CTA "¿Querés tu proyecto acá?"
10. **Testimonials** — 3 tarjetas con hover lift (contenido en `lib/i18n.ts`, ES+EN). CTA "El próximo testimonio puede ser el tuyo →"
11. **About** — foto circular (grayscale→color), bio con mención a WordPress, CTA "Trabajemos juntos →"
12. **Contact** — mini-form (nombre/negocio/mensaje) que abre WhatsApp + WhatsApp + Email + ubicación
13. **Footer** — iconos SVG (IG, GH, LI, WA) en círculos hover, back-to-top
14. **CustomCursor** — dot + ring, escala en hover, desactivado en touch y con `prefers-reduced-motion`
15. **Vignette + grain overlay**

## Accesibilidad
- Focus trap en modals (proyectos, diplomas)
- aria-modal, aria-label, aria-hidden
- prefers-reduced-motion respetado globalmente
- Custom cursor oculto en touch (md:block / hidden)

## Responsive
- Three.js desactivado en touch
- Hamburguesa en mobile, links en desktop
- Grids con breakpoints md:
- Touch tilt en proyectos
- Carrusel diplomas con scroll táctil
- Lenis touchMultiplier: 1.5

## Redes (verificar)
- IG: https://instagram.com/alexvelez.dev
- GH: https://github.com/Alex25-10
- LI: https://www.linkedin.com/in/alex-velez-a20152396/
- WA: https://wa.me/543571578382
