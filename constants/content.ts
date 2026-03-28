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
    /** ACTUALIZA TU INFO AQUÍ */
    headlinePrefix: "Controla la esfera con",
    headlineAccent: "tus manos",
    headlineSuffix: "y tu cámara.",
    subtitle:
      "Una demo técnica que combina MediaPipe, detección de manos en el navegador y Three.js. Ideal para quienes quieren ver el flujo completo antes de entrar al sandbox interactivo.",
    primaryCta: "Abrir experiencia interactiva",
    secondaryCta: "Ver qué incluye",
    secondaryHref: "#valor",
  },

  about: {
    id: "mision",
    title: "De la gestualidad al producto",
    /** ACTUALIZA TU INFO AQUÍ */
    paragraphs: [
      "Sphere Control es una vitrina ligera: aquí entiendes al instante qué hace la herramienta (separar o juntar las manos para escalar una esfera en tiempo real) y por qué importa para prototipos, instalaciones o UX sin contacto.",
      "Está pensado para desarrolladores, makers y curiosos de la visión por computadora que prefieren probar antes de leer un README largo. El flujo es simple: permisos de cámara, modelo en el dispositivo y WebGL para la escena 3D.",
    ],
  },

  valueGrid: {
    id: "valor",
    title: "Lo que ves en la demo",
    subtitle:
      "Todo ocurre en el navegador: sin instalar apps, con enfoque en latencia y claridad visual.",
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
 * PÁGINA PRINCIPAL (/) — taller + demo Sphere Control
 * ACTUALIZA TU INFO AQUÍ
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const homePageContent = {
  stickyNav: {
    brand: "Cursor Quito",
    links: [
      { label: "Features", href: "#features" },
      { label: "Demo en vivo", href: "/manos" },
      { label: "Sphere Control", href: "/sphere-control" },
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
    secondaryCta: { label: "Landing del producto", href: "/sphere-control" },
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
    "Dos manos frente a la cámara: al separarlas la esfera crece; al acercarlas, se encoge. Todo el procesamiento es local en tu equipo.",
  stackPills: ["Next.js", "MediaPipe Tasks", "Three.js · R3F"] as const,
} as const;
