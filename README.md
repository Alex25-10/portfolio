# Portfolio

Portfolio personal de Alex Vélez, construida para showcases de trabajo freelance.

**Producción:** https://portafolio-next-psi.vercel.app

## Stack

| Capa | Elección |
|---|---|
| Framework | Next.js 16.2 (App Router, React 19.2) |
| Build | Turbopack |
| Estilos | Tailwind CSS v4 |
| Animación | Motion 12 + Lenis 1.3 (scroll suave) |
| 3D | Three.js 0.184 + React Three Fiber 9 + drei |
| UI | Radix Slot, Base UI, Floating UI, shadcn/ui, CVA |
| Íconos | lucide-react |
| Analytics | Vercel Analytics |
| Deploy | Vercel |

## Funcionalidad

- **Bilingüe** `es-AR` / `en` con sincronización de `document.documentElement.lang`, persistida en `localStorage`.
- **Casos de estudio** con modal accesible (focus trap) y navegación por teclado.
- **Hero 3D** con escena Three.js en desktop, desactivada en touch.
- **Contacto por WhatsApp** como vía principal de conversión, con `wa.me` links.
- Preloader, cursor custom, marquee, tilt magnético, scroll progress.
- `prefers-reduced-motion` respetado en toda la capa de motion.
- SEO: `sitemap.xml`, `robots.txt`, Open Graph image, `not-found` propio.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run lint    # eslint
```

## Verificación responsive

El layout se validó con Playwright en 10 viewports (320 a 1920 px):
`scrollWidth === viewportWidth` y `pageErrors === 0` en todos.

```bash
npx playwright install chromium
node scripts/screenshots.mjs        # captura evidencia
node scripts/convert-to-webp.mjs    # optimiza imágenes a WebP
```

## Estructura

```
app/            rutas, layout, sitemap, metadata
components/     secciones de página, componentes de UI, escena 3D
hooks/          use-scroll-y, use-mouse-position, use-focus-trap
lib/            i18n (contexto + diccionario), utilidades
public/         webp de proyectos, diplomas y screenshots
```

## Nota

`.omo/` y los `*.BACKUP` quedan fuera del repo por `.gitignore`: son rollback
local, nunca código de deploy. `.vercelignore` replica esa regla para que Vercel
no los suba.

## Licencia

Privado. Todos los derechos reservados.
