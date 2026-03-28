/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SPHERE CONTROL — contenido central de la landing
 * ACTUALIZA TU INFO AQUÍ: textos, enlaces y metadatos en un solo lugar.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Identificadores de íconos (lucide-react) usados en la cuadrícula de valor. */
export type SphereValueIconId =
  | "camera"
  | "hand"
  | "sparkles"
  | "zap"
  | "shield"
  | "cpu";

export const sphereControlContent = {
  brand: {
    /** ACTUALIZA TU INFO AQUÍ */
    name: "Sphere Control",
    tagline: "Control con la cámara",
  },

  meta: {
    title: "Sphere Control | Demo de control por cámara",
    description:
      "Explora control de acciones con la webcam, visión por computadora y una esfera 3D reactiva. Pensado para tech entusiastas.",
  },

  routes: {
    /** CTA principal — vista dedicada de tracking de manos */
    demo: "/manos",
  },

  nav: {
    /** ACTUALIZA TU INFO AQUÍ — texto del botón superior */
    ctaLabel: "Probar demo",
    ctaHref: "/manos",
  },

  hero: {
    /** Imagen ancla — Tierra real, área oscura para tipografía */
    imageSrc:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=2400&q=82",
    imageAlt: "La Tierra vista desde el espacio, nubes y océano bajo luz tenue.",
    eyebrow: "Vitrina técnica en el navegador",
    /** ACTUALIZA TU INFO AQUÍ */
    headlinePrefix: "Controla la esfera con",
    headlineAccent: "tus manos",
    headlineSuffix: "y tu cámara.",
    subtitle:
      "MediaPipe, WebGL y una esfera que responde al gesto. Sin instalar nada: permiso de cámara y listo.",
    primaryCta: "Abrir experiencia interactiva",
    secondaryCta: "Ver el detalle",
    secondaryHref: "#valor",
  },

  about: {
    id: "mision",
    title: "De la gestualidad al producto",
    /** ACTUALIZA TU INFO AQUÍ */
    paragraphs: [
      "Una demo que encaja en charlas y portfolios: manos frente a la webcam, landmarks en tiempo real y una Tierra 3D que escala y gira con el gesto. Pensada para prototipos, instalaciones y UX sin contacto.",
      "Para quien prefiere ver el flujo antes del README: cámara en el navegador, modelo on-device y stack que reconoces (Next.js, Tasks Vision, R3F).",
    ],
  },

  valueGrid: {
    id: "valor",
    title: "Qué incluye",
    subtitle:
      "Un recorrido breve. Sin tarjetas: solo lo que importa.",
    items: [
      {
        icon: "camera" as const,
        title: "Entrada por webcam",
        description:
          "Captura en vivo con permisos explícitos del navegador y flujo explicado si algo falla.",
      },
      {
        icon: "hand" as const,
        title: "Landmarks de manos",
        description:
          "Detección manos con modelo embebido; distancia entre puntos clave mapeada a una señal estable.",
      },
      {
        icon: "sparkles" as const,
        title: "Esfera 3D reactiva",
        description:
          "Three.js + React Three Fiber: escala suavizada para una respuesta creíble al gesto.",
      },
      {
        icon: "zap" as const,
        title: "Baja fricción",
        description:
          "Un clic para iniciar: primero cámara, luego carga del modelo — menos sorpresas en desarrollo.",
      },
      {
        icon: "shield" as const,
        title: "Privacidad consciente",
        description:
          "El video se procesa localmente en tu equipo; ideal para explicar el enfoque edge / on-device.",
      },
      {
        icon: "cpu" as const,
        title: "Stack honesto",
        description:
          "Next.js, Tailwind, Tasks Vision y WASM: piezas que el público técnico reconoce al instante.",
      },
    ],
  },

  finalCta: {
    title: "¿Listo para probarlo?",
    description:
      "Salta a la vista dedicada, concede acceso a la cámara y mueve ambas manos. La esfera escala con tu gesto.",
    buttonLabel: "Ir a la demo de manos",
    buttonHref: "/manos",
  },

  footer: {
    /** ACTUALIZA TU INFO AQUÍ */
    email: "recaldecd@gmail.com",
    /** Número Ecuador; enlace wa.me sin espacios ni signos + en la URL */
    whatsappDisplay: "099 622 1950",
    whatsappHref: "https://wa.me/593996221950",
    /** Portfolio / sitio social principal */
    socialLabel: "cry.code",
    socialHref: "https://cry-code.vercel.app/",
    /** ACTUALIZA TU INFO AQUÍ — año del copyright */
    copyrightYear: 2026,
    copyrightHolder: "Sphere Control · Cristhian Recalde",
  },
} as const;

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * VISTA /taller — Cursor Quito + bloque demo / features (tema oscuro)
 * La landing global de producto es /. ACTUALIZA TU INFO AQUÍ
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const homePageContent = {
  stickyNav: {
    brand: "Cursor Quito",
    links: [
      { label: "Features", href: "#features" },
      { label: "Demo en vivo", href: "/manos" },
      { label: "Inicio Sphere Control", href: "/" },
    ],
  },
  workshop: {
    title: "Bienvenid@ a Cursor Quito",
    titleAriaLabel: "Bienvenida o bienvenido a Cursor Quito",
    description:
      "En unos minutos empezaremos a crear la página que vas a publicar. No necesitas experiencia previa: aquí aprenderás todo paso a paso.",
  },
  sphereHighlight: {
    eyebrow: "Sphere Control",
    title: "Demo técnica: manos + esfera 3D",
    description:
      "MediaPipe Hand Landmarker en tu navegador, señal suavizada y escena Three.js (React Three Fiber). Separa o junta las manos para escalar la esfera en tiempo real.",
    primaryCta: { label: "Abrir demo de manos", href: "/manos" },
    secondaryCta: { label: "Inicio Sphere Control", href: "/" },
  },
  featuresSection: {
    id: "features",
    title: "Qué incluye esta experiencia",
    subtitle:
      "Pensado para tech entusiastas que quieren ver arquitectura clara antes de tocar código.",
  },
  bottomNote:
    "Usa http://localhost en desarrollo para que el navegador pueda mostrar el permiso de cámara.",
} as const;

/** Textos de la vista dedicada /manos — ACTUALIZA TU INFO AQUÍ */
export const manosPageContent = {
  pageTitle: "Esfera con tus manos",
  titleGradientPart: "manos",
  subtitle:
    "Una o dos manos: escala al separar o juntar, y gira la Tierra rotando la palma o la muñeca. Textura del planeta y panel solo con puntos trackeados.",
  stackPills: ["Next.js", "MediaPipe Tasks", "Three.js · R3F"] as const,
} as const;
