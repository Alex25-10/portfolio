import type { Metadata } from "next"
import { Archivo, Space_Grotesk } from "next/font/google"
import { I18nProvider } from "@/lib/i18n-context"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://portafolio-next-psi.vercel.app"),
  title: {
    default: "Alex Vélez, Diseñador Web y Desarrollador en Córdoba",
    template: "%s | Alex Vélez",
  },
  description:
    "Diseñador web en Córdoba. Creo sitios profesionales para negocios locales: clínicas, restaurantes, gimnasios, servicios. Next.js, WordPress, SEO, diseño responsivo.",
  keywords: [
    "diseñador web Córdoba",
    "páginas web profesionales",
    "desarrollo web Argentina",
    "WordPress Córdoba",
    "Next.js Argentina",
    "SEO local",
    "landing page",
    "diseño web para clínicas",
    "diseño web para restaurantes",
    "Alex Vélez",
  ],
  openGraph: {
    title: "Alex Vélez, Diseñador Web en Córdoba",
    description:
      "Diseñador web en Córdoba. Sitios profesionales para clínicas, restaurantes, gimnasios y servicios.",
    url: "https://portafolio-next-psi.vercel.app",
    locale: "es_AR",
    type: "website",
    siteName: "Alex Vélez, Diseño y Desarrollo Web",
    images: [{ url: "/og-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Vélez, Diseñador Web en Córdoba",
    description:
      "Diseñador web en Córdoba. Sitios profesionales para clínicas, restaurantes, gimnasios y servicios.",
    images: ["/og-image.webp"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://portafolio-next-psi.vercel.app",
    languages: {
      es: "https://portafolio-next-psi.vercel.app",
      en: "https://portafolio-next-psi.vercel.app",
    },
  },
  other: {
    "theme-color": "#0a0a0b",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Alex Vélez, Diseño y Desarrollo Web",
  description:
    "Diseñador web en Córdoba. Sitios profesionales para negocios locales. Next.js, WordPress, SEO y diseño responsivo.",
  url: "https://portafolio-next-psi.vercel.app",
  image: "https://portafolio-next-psi.vercel.app/og-image.webp",
  telephone: "+543571578382",
  email: "alex.dev2510@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Córdoba",
    addressRegion: "Córdoba",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -31.4167,
    longitude: -64.1833,
  },
  areaServed: ["Córdoba", "Argentina"],
  priceRange: "$$",
  makesOffer: [
    {
      "@type": "Offer",
      name: "Presencia",
      priceSpecification: { "@type": "PriceSpecification", price: "150-300", priceCurrency: "USD" },
    },
    {
      "@type": "Offer",
      name: "Captación + Reservas",
      priceSpecification: { "@type": "PriceSpecification", price: "450-700", priceCurrency: "USD" },
    },
    {
      "@type": "Offer",
      name: "Sistema + CRM",
      priceSpecification: { "@type": "PriceSpecification", price: "900-1500", priceCurrency: "USD" },
    },
  ],
  sameAs: [
    "https://instagram.com/alexvelez.dev",
    "https://github.com/Alex25-10",
    "https://www.linkedin.com/in/alex-velez-a20152396/",
    "https://www.fiverr.com/gaston2510",
    "https://www.upwork.com/freelancers/~01d6dbf9c288a51d3b",
    "https://www.workana.com/freelancer/alexvelezweb",
  ],
}

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto tiempo lleva tener la página lista?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Una landing page en 1 semana. Un sitio completo de 3 a 4 semanas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito tener dominio y hosting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, me encargo de todo. El primer año suele ir incluido.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué pasa si necesito cambios después de terminada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los primeros 30 días corrijo cualquier detalle sin costo.",
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" className={`${archivo.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
