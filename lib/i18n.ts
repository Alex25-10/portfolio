export type Language = "es" | "en"

export type TranslationSet = typeof t.es

export const t = {
  es: {
    nav: { work: "Proyectos", pricing: "Precios", about: "Sobre mí", contact: "Contacto" },
    hero: {
      subtitle: "Sitios web para negocios que necesitan más clientes",
      cta_work: "Ver proyectos",
      cta_contact: "Agendar por WhatsApp",
      wa_msg: "Hola Alex, vi tu portfolio y quiero consultar por una web para mi negocio.",
    },
    skills: {
      label: "Servicios",
      items: [
        {
          num: "01",
          title: "Diseño Web",
          desc: "Diseño y maquetación de sitios profesionales para clínicas, restaurantes, gimnasios y servicios. Tipografía cuidada, colores con propósito y micro-interacciones que hacen la diferencia.",
          cta: "¿Necesitás un sitio nuevo?",
        },
        {
          num: "02",
          title: "Desarrollo",
          desc: "Next.js, WordPress o la herramienta que mejor se adapte a tu proyecto. Sitios rápidos, seguros y optimizados para aparecer en Google.",
          cta: "¿Ya tenés dominio y hosting?",
        },
        {
          num: "03",
          title: "3D & Motion",
          desc: "Animaciones, parallax, transiciones y efectos visuales que sorprenden a tus clientes cuando entran a tu web.",
          cta: "¿Querés algo que impacte?",
        },
        {
          num: "04",
          title: "Responsive & SEO",
          desc: "Tu web se ve impecable en celular, tablet y computadora. Además la optimizo para que te encuentren en Google Maps y búsquedas locales.",
          cta: "¿Aparecés en Google?",
        },
      ],
    },
    stats: {
      projects: "Sitios publicados",
      countries: "Países con clientes",
      delivery: "Semanas de entrega",
    },
    projects: {
      label: "Proyectos",
      view_project: "Ver proyecto",
      close: "Cerrar",
      ctatext: "¿Querés tu proyecto acá?",
      featured_badge: "Proyecto real",
      real_title: "Proyectos reales",
      real_sub: "Sitios publicados para clientes de verdad.",
      demo_title: "Demos por rubro",
      demo_sub: "Ejemplos del nivel que puedo llevar a tu negocio.",
    },
    testimonials: {
      label: "Testimonios",
      cta: "El próximo testimonio puede ser el tuyo",
      items: [
        {
          quote:
            "Antes dependía del boca en boca. Ahora me escriben pacientes de Estados Unidos que me encontraron en Google y reservan directo en la web. La inversión se pagó sola.",
          author: "Dra. Susana Godoy",
          role: "Begin Again · Puerto Vallarta",
        },
        {
          quote:
            "Yo pensaba que con Instagram alcanzaba. El primer mes con la web entraron 14 consultas por WhatsApp. No tuve que explicar nada, la página vende sola.",
          author: "Carlos Martínez",
          role: "Titan Gym · Córdoba",
        },
        {
          quote:
            "Una paciente me dijo que nos eligió porque la web se veía seria. Eso no me había pasado nunca con el perfil de Instagram.",
          author: "Lucía Fernández",
          role: "DentiCare · Córdoba",
        },
      ],
    },
    about: {
      label: "About",
      title_1: "Transformo ideas en",
      title_2: "experiencias digitales",
      p1: "Soy Alex, de Córdoba. Hago páginas web para negocios como el tuyo — clínicas, restaurantes, gimnasios, servicios. Sitios que se ven bien en celular, aparecen en Google y atraen clientes nuevos.",
      p2: "Uso WordPress, Next.js o la herramienta justa para cada caso. Sin vueltas, sin sobreingeniería. Simple, profesional y pensado para vender. Garantía de 30 días y soporte por WhatsApp.",
      location: "Córdoba, Argentina",
      cta: "Trabajemos juntos",
    },
    contact: {
      label: "Contacto",
      title_1: "¿Un proyecto?",
      title_2: "Hablemos.",
      text: "Respondo en el día por WhatsApp, de lunes a viernes de 9 a 19h. También por email.",
      location: "Córdoba, Argentina",
      form_title: "Contame en 30 segundos",
      form_name: "Tu nombre",
      form_business: "Tu negocio (ej. clínica dental en Córdoba)",
      form_msg: "¿Qué necesitás? (ej. web con turnos online)",
      form_send: "Enviar por WhatsApp",
    },
    footer: {
      back_to_top: "Volver arriba",
    },
    howitworks: {
      label: "Cómo trabajo",
      title: "De la idea a tu web funcionando",
      steps: [
        {
          num: "01",
          title: "Contame tu idea",
          desc: "Charlamos por WhatsApp o videollamada. Me contás de tu negocio, qué necesitás y te recomiendo lo que mejor se adapta. Sin compromiso.",
        },
        {
          num: "02",
          title: "Diseño y desarrollo",
          desc: "Arranco con el diseño y el desarrollo. Te voy mostrando avances cada 2-3 días para que veas cómo queda. Ajustamos lo que haga falta.",
        },
        {
          num: "03",
          title: "Publicación y soporte",
          desc: "Subo tu web a internet, configuro el dominio y te explico cómo gestionarla. Y si después necesitas algo, estoy a un mensaje.",
        },
      ],
    },
    badges: {
      title: "Encontráme también en",
    },
    marquee: {
      tech: "Next.js · Tailwind · framer-motion · GSAP · Three.js · Lenis · WordPress · Elementor · TypeScript · React · Node.js · Stripe · SEO · Diseño UX/UI · Responsive",
    },
    casestudy: {
      label: "Casos de estudio",
      projects: [
        {
          id: "begin-again",
          title: "Begin Again by Dra. Susana",
          subtitle: "Clínica de medicina funcional · Puerto Vallarta, México",
          tech_stack: "Stack técnico",
          tech_items: [
            "WordPress con plugin PHP custom (3,200+ líneas)",
            "Bilingüe ES/EN con TranslatePress",
            "7 secciones médicas con diseño 100% custom",
            "SEO internacional + local (Google Maps MX)",
            "Calendly para agendar consultas",
            "Logo e identidad visual desde cero",
          ],
          challenge: "El desafío",
          challenge_desc: "La clínica no tenía presencia web. Los pacientes llegaban solo por referencias o whatsapp, no aparecían en Google y no había forma de mostrar los servicios de medicina regenerativa a potenciales pacientes internacionales. Había que construir todo desde cero.",
          solution: "La solución",
          solution_desc: "Construí un plugin WordPress desde cero con secciones diseñadas a medida para cada especialidad médica. Todo el contenido es bilingüe con detección automática de idioma. Los pacientes pueden agendar directamente desde la web vía Calendly. SEO optimizado para búsquedas en México y Estados Unidos.",
          results: "Resultados",
          result_items: [
            "Pacientes internacionales encuentran la clínica por Google",
            "Sitio bilingüe sin perder posicionamiento SEO",
            "Agenda online sin back-and-forth de WhatsApp",
            "Imagen profesional que compite con clínicas de US",
          ],
          cta: "Ver sitio real",
          url: "https://beginagainbydrasusana.com",
          note: "PHP · WordPress · SEO · Plugin custom · Bilingüe · Calendly · Identidad visual",
        },
        {
          id: "edurne-reyes",
          title: "Edurne Reyes",
          subtitle: "Coach Ontológica · Río Negro, Patagonia Argentina",
          tech_stack: "Stack técnico",
          tech_items: [
            "Next.js con App Router",
            "Tailwind CSS v4",
            "framer-motion para animaciones",
            "SEO local Patagonia Argentina",
            "Calendly para agendar sesiones",
            "Identidad visual cálida (coral / lila / hueso)",
          ],
          challenge: "El desafío",
          challenge_desc: "Edurne es coach ontológica en Río Negro. No tenía página web y sus clientes llegaban solo por recomendación en su pueblo. No aparecía en Google, no podía cobrar con tarjeta ni agendar online. Perdía clientes potenciales de toda la Patagonia porque no existía digitalmente.",
          solution: "La solución",
          solution_desc: "Creé una landing page profesional con identidad visual cálida que transmite confianza. SEO local optimizado para que aparezca en búsquedas de coaching ontológico en Río Negro y Patagonia. Calendly integrado para que las sesiones se agenden solas, sin tener que coordinar por WhatsApp.",
          results: "Resultados",
          result_items: [
            "Clientes de la Patagonia la encuentran por Google",
            "Agenda online 24/7 sin intervención manual",
            "Imagen profesional que compite con coaches de Buenos Aires",
            "Pudo cobrar con tarjeta vía link de pago integrado",
          ],
          cta: "Ver sitio real",
          url: "https://edurne-reyes.vercel.app",
          note: "Next.js · Tailwind · SEO local · Calendly · Brand identity · Animaciones",
        },
      ],
    },
    pricing: {
      label: "Inversión",
      title: "Planes transparentes, sin sorpresas",
      desc: "Precios para Argentina. Hosting año 1 incluido, cuotas en pesos a dólar del día, garantía 30 días.",
      plans: [
        {
          title: "Presencia",
          price: "USD 150 — 300",
          desc: "Web simple que te hace ver profesional y te trae consultas por WhatsApp.",
          features: ["Diseño responsive", "SEO básico", "Formulario + WhatsApp", "Hosting 1 año"],
        },
        {
          title: "Captación + Reservas",
          price: "USD 450 — 700",
          desc: "Web que capta y agenda sola. Para negocios que viven de turnos y consultas.",
          features: ["Todo lo de Presencia", "Reservas / Calendly", "SEO local + Maps", "Seguimiento básico"],
        },
        {
          title: "Sistema + CRM",
          price: "USD 900 — 1.500",
          desc: "Web + CRM con seguimiento automático. Ningún contacto se pierde.",
          features: ["Todo lo de Captación", "CRM + pipeline", "Automatizaciones WhatsApp", "Soporte mensual USD 50"],
        },
      ],
      cta: "¿Cuánto sale mi proyecto?",
      plan_cta: "Consultar este plan",
      popular: "Popular",
      promo_badge: "−15% con video · −10% con testimonio",
      promo_hint: "Pasame un video de 30s o un testimonio escrito y te lo descuento del plan que elijas.",
      note: "Precios Argentina en USD, pagás en pesos al cambio del día hasta en 9 cuotas. Afuera se cotiza aparte.",
    },
    faq: {
      label: "Preguntas frecuentes",
      items: [
        {
          q: "¿Cuánto tiempo lleva tener la página lista?",
          a: "Una landing page la tengo lista en 1 semana. Un sitio completo de 3 a 4 semanas, dependiendo de la complejidad y las revisiones.",
        },
        {
          q: "¿Necesito tener dominio y hosting?",
          a: "No, si no tenés yo me encargo de todo. El dominio y hosting los podemos gestionar juntos y te explico cada paso. El primer año suele ir incluido.",
        },
        {
          q: "¿Puedo actualizar el contenido yo mismo después?",
          a: "Si es WordPress, te dejo un panel sencillo donde podés cambiar textos, fotos y servicios sin saber de código. Si es Next.js, cualquier cambio me lo pedís a mí y lo resuelvo rápido.",
        },
        {
          q: "¿Qué pasa si necesito cambios después de terminada?",
          a: "Estoy a un mensaje. Los primeros 30 días después de publicar corrijo cualquier detalle sin costo. Después tengo planes de mantenimiento mensual si querés seguir actualizando.",
        },
        {
          q: "¿Qué tecnología usan?",
          a: "La que convenga a tu caso: web rápida a medida o administrable por vos. Incluye CRM con seguimiento y automatizaciones para que ningún contacto se pierda.",
        },
      ],
    },
  },
  en: {
    nav: { work: "Work", pricing: "Pricing", about: "About", contact: "Contact" },
    hero: {
      subtitle: "Websites for businesses that need more clients",
      cta_work: "View projects",
      cta_contact: "Book on WhatsApp",
      wa_msg: "Hi Alex, I saw your portfolio and I'd like to ask about a website for my business.",
    },
    skills: {
      label: "Services",
      items: [
        {
          num: "01",
          title: "Web Design",
          desc: "Professional website design for clinics, restaurants, gyms and services. Careful typography, purposeful colors, and micro-interactions that make the difference.",
          cta: "Need a new site?",
        },
        {
          num: "02",
          title: "Development",
          desc: "Next.js, WordPress or the right tool for your project. Fast, secure, and optimized to rank on Google.",
          cta: "Already have a domain?",
        },
        {
          num: "03",
          title: "3D & Motion",
          desc: "Animations, parallax, transitions and visual effects that impress your clients when they visit your site.",
          cta: "Want something impactful?",
        },
        {
          num: "04",
          title: "Responsive & SEO",
          desc: "Your site looks perfect on mobile, tablet and desktop. Plus I optimize it so clients find you on Google Maps and local searches.",
          cta: "Not on Google yet?",
        },
      ],
    },
    stats: {
      projects: "Sites shipped",
      countries: "Countries with clients",
      delivery: "Weeks to deliver",
    },
    projects: {
      label: "Selected Work",
      view_project: "View project",
      close: "Close",
      ctatext: "Want your project here?",
      featured_badge: "Real project",
      real_title: "Real projects",
      real_sub: "Live sites for paying clients.",
      demo_title: "Demos by niche",
      demo_sub: "The level I can bring to your business.",
    },
    testimonials: {
      label: "Testimonials",
      cta: "The next testimonial could be yours",
      items: [
        {
          quote:
            "I used to rely on word of mouth. Now patients from the US find me on Google and book straight from the site. It paid for itself.",
          author: "Dr. Susana Godoy",
          role: "Begin Again · Puerto Vallarta",
        },
        {
          quote:
            "I thought Instagram was enough. The first month with the site, 14 inquiries came in on WhatsApp. The page sells on its own.",
          author: "Carlos Martínez",
          role: "Titan Gym · Córdoba",
        },
        {
          quote:
            "One patient told me she picked us because the website looked serious. That never happened with the Instagram profile.",
          author: "Lucía Fernández",
          role: "DentiCare · Córdoba",
        },
      ],
    },
    about: {
      label: "About",
      title_1: "Turning ideas into",
      title_2: "digital experiences",
      p1: "I'm Alex, from Córdoba, Argentina. I build websites for businesses like yours — clinics, restaurants, gyms, services. Sites that look great on mobile, show up on Google, and bring in new clients.",
      p2: "I use WordPress, Next.js, or the right tool for each case. No fluff, no over-engineering. Simple, professional, and built to sell. 30-day guarantee and WhatsApp support.",
      location: "Córdoba, Argentina",
      cta: "Let's work together",
    },
    contact: {
      label: "Contact",
      title_1: "A project?",
      title_2: "Let's talk.",
      text: "I reply the same day on WhatsApp, Monday to Friday 9am to 7pm. Email works too.",
      location: "Córdoba, Argentina",
      form_title: "Tell me in 30 seconds",
      form_name: "Your name",
      form_business: "Your business (e.g. dental clinic in Córdoba)",
      form_msg: "What do you need? (e.g. site with online booking)",
      form_send: "Send via WhatsApp",
    },
    footer: {
      back_to_top: "Back to top",
    },
    howitworks: {
      label: "How I work",
      title: "From idea to a working website",
      steps: [
        {
          num: "01",
          title: "Tell me your idea",
          desc: "We chat on WhatsApp or video call. You tell me about your business and what you need, and I recommend the best approach. No obligation.",
        },
        {
          num: "02",
          title: "Design & development",
          desc: "I start designing and building. I share progress every 2-3 days so you can see how it's going. We adjust as needed.",
        },
        {
          num: "03",
          title: "Launch & support",
          desc: "I publish your site, set up the domain, and show you how to manage it. And if you need anything later, I'm just a message away.",
        },
      ],
    },
    badges: {
      title: "Find me also on",
    },
    marquee: {
      tech: "Next.js · Tailwind · framer-motion · GSAP · Three.js · Lenis · WordPress · Elementor · TypeScript · React · Node.js · Stripe · SEO · UX/UI Design · Responsive",
    },
    casestudy: {
      label: "Case studies",
      projects: [
        {
          id: "begin-again",
          title: "Begin Again by Dra. Susana",
          subtitle: "Functional Medicine Clinic · Puerto Vallarta, Mexico",
          tech_stack: "Tech stack",
          tech_items: [
            "WordPress with custom PHP plugin (3,200+ lines)",
            "Bilingual ES/EN via TranslatePress",
            "7 custom medical sections",
            "International + local SEO (Google Maps MX)",
            "Calendly for online booking",
            "Brand identity built from scratch",
          ],
          challenge: "The challenge",
          challenge_desc: "The clinic had zero web presence. Patients only came through referrals or WhatsApp, they didn't show up on Google, and there was no way to showcase regenerative medicine services to potential international patients. Everything had to be built from scratch.",
          solution: "The solution",
          solution_desc: "I built a custom WordPress plugin from scratch that replaces the homepage and therapies page with custom-designed sections. All content is bilingual with automatic language detection. Patients can book directly from the site via Calendly. SEO is optimized for searches in both Mexico and the US.",
          results: "Results",
          result_items: [
            "International patients finding the clinic through Google",
            "Bilingual site without losing SEO rankings",
            "Online booking eliminates WhatsApp back-and-forth",
            "Professional image competing with US clinics",
          ],
          cta: "View live site",
          url: "https://beginagainbydrasusana.com",
          note: "PHP · WordPress · SEO · Custom plugin · Bilingual · Calendly · Brand identity",
        },
        {
          id: "edurne-reyes",
          title: "Edurne Reyes",
          subtitle: "Ontological Coach · Río Negro, Patagonia Argentina",
          tech_stack: "Tech stack",
          tech_items: [
            "Next.js with App Router",
            "Tailwind CSS v4",
            "framer-motion for animations",
            "Local SEO (Patagonia Argentina)",
            "Calendly for online booking",
            "Warm brand identity (coral / lilac / bone)",
          ],
          challenge: "The challenge",
          challenge_desc: "Edurne is an ontological coach in Río Negro. She had no website, clients only came through word of mouth in her town. She wasn't on Google, couldn't accept card payments or schedule online. She was losing potential clients across Patagonia because she didn't exist digitally.",
          solution: "The solution",
          solution_desc: "I built a professional landing page with a warm brand identity that conveys trust. Local SEO optimized so she appears in searches for ontological coaching in Río Negro and Patagonia. Calendly integrated so sessions are booked automatically, without WhatsApp coordination.",
          results: "Results",
          result_items: [
            "Clients across Patagonia find her through Google",
            "24/7 online booking with no manual intervention",
            "Professional image competing with Buenos Aires coaches",
            "Card payments via integrated payment link",
          ],
          cta: "View live site",
          url: "https://edurne-reyes.vercel.app",
          note: "Next.js · Tailwind · Local SEO · Calendly · Brand identity · Animations",
        },
      ],
    },
    pricing: {
      label: "Investment",
      title: "Transparent plans, no surprises",
      desc: "International pricing. Hosting year 1 included, 30-day guarantee.",
      plans: [
        {
          title: "Presence",
          price: "USD 400 — 600",
          desc: "Simple site that looks professional and brings inquiries via WhatsApp.",
          features: ["Responsive design", "Basic SEO", "Form + WhatsApp", "1 year hosting"],
        },
        {
          title: "Capture + Bookings",
          price: "USD 800 — 1.200",
          desc: "Site that captures and books on its own. For appointment-based businesses.",
          features: ["Everything in Presence", "Bookings / Calendly", "Local SEO + Maps", "Basic follow-up"],
        },
        {
          title: "System + CRM",
          price: "USD 1.800 — 3.000",
          desc: "Site + CRM with automatic follow-up. No lead gets lost.",
          features: ["Everything in Capture", "CRM + pipeline", "WhatsApp automations", "Monthly support USD 100"],
        },
      ],
      cta: "What's my project cost?",
      plan_cta: "Ask about this plan",
      popular: "Popular",
      promo_badge: "−15% with video · −10% with testimonial",
      promo_hint: "Send a 30s video or a written testimonial and I discount it from your plan.",
      note: "International rates in USD. Scope may adjust the final quote.",
    },
    faq: {
      label: "FAQ",
      items: [
        {
          q: "How long does it take to have the site ready?",
          a: "A landing page takes about 1 week. A full website takes 3 to 4 weeks, depending on complexity and revisions.",
        },
        {
          q: "Do I need to have a domain and hosting?",
          a: "No, if you don't have them I'll handle everything. We can set up domain and hosting together and I'll walk you through each step. The first year is usually included.",
        },
        {
          q: "Can I update the content myself later?",
          a: "If it's WordPress, you get a simple panel where you can change texts, photos and services without knowing code. If it's Next.js, just ask me for changes and I'll handle them quickly.",
        },
        {
          q: "What if I need changes after the site is done?",
          a: "I'm just a message away. The first 30 days after launch I fix any details at no cost. After that I have monthly maintenance plans if you want to keep updating.",
        },
        {
          q: "What technology do you use?",
          a: "Whatever fits your case: fast custom build or self-manageable site. Includes CRM with follow-up and automations so no lead gets lost.",
        },
      ],
    },
  },
}
