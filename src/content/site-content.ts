export type Locale = "en" | "fr";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

export function getHeroCopy(locale: Locale) {
  const copy = {
    en: "Software engineering student specializing in applied AI and computer vision, building practical systems for inspection, monitoring, and intelligent automation with real-world impact in Tunisia.",
    fr: "Étudiant en ingénierie logicielle spécialisé en IA appliquée et vision par ordinateur, je construis des systèmes concrets d’inspection, de monitoring et d’automatisation intelligente avec un impact réel en Tunisie.",
  } as const;
  return copy[locale];
}

export const techStack = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Keras",
  "YOLOv5",
  "OpenCV",
  "DICOM",
  "React",
  "Django",
  "Flask",
  "PostgreSQL",
  "MySQL",
  "SQL",
  "Git",
  "Linux",
  "JavaScript",
  "HTML",
  "CSS",
  "C++",
  "Java",
  "Figma",
];

export type ExperienceItem = {
  id: string;
  org: string;
  role: Record<Locale, string>;
  period: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
  mediaFolder?: string;
  media: MediaItem[];
};

export const experience: ExperienceItem[] = [
  {
    id: "lab-tim",
    org: "Lab-TIM · Faculty of Medicine & Fattouma Bourguiba Hospital",
    role: {
      en: "AI & Deep Learning Research Intern",
      fr: "Stagiaire — recherche IA & deep learning",
    },
    period: { en: "Jun 2025 — Present", fr: "juin 2025 — présent" },
    bullets: {
      en: [
        "SEP / multiple sclerosis project: built and deployed a web app that processes MRI DICOM files and supports neurologists in detection workflows at Fattouma Bourguiba Hospital.",
        "Wrist fracture project (in progress): co-developing an AI-assisted radiograph analysis app with a radiologist, including DICOM preprocessing and U-Net / ResNet segmentation.",
        "Voluntary data-quality support: helped radiology teams identify and resolve duplicate patient entries in the RIS/IRS, reducing confusion caused by multiple records for the same person.",
      ],
      fr: [
        "Projet SEP / sclérose en plaques : conception et déploiement d’une application web qui traite des fichiers IRM DICOM et assiste les neurologues dans les workflows de détection à l’hôpital Fattouma Bourguiba.",
        "Projet détection de fracture du poignet (en cours) : co-développement d’une application d’analyse de radiographies assistée par IA avec un radiologue, incluant prétraitement DICOM et segmentation U-Net / ResNet.",
        "Contribution volontaire à la qualité des données : aide aux équipes de radiologie pour identifier et corriger les doublons de patients dans le RIS/IRS, afin d’éviter la confusion liée à des dossiers multiples pour une même personne.",
      ],
    },
    mediaFolder: "stroke_detection",
    media: [
      { type: "image", src: "/stroke_detection/1754044196102.jpg" },
      { type: "image", src: "/stroke_detection/Capture%20d%27%C3%A9cran%202025-06-20%20033632.png" },
      { type: "image", src: "/stroke_detection/Capture%20d%27%C3%A9cran%202025-06-20%20034006.png" },
      { type: "image", src: "/stroke_detection/Capture%20d%27%C3%A9cran%202025-10-14%20123304.png" }
    ],
  },
  {
    id: "uxify",
    org: "UXIFY",
    role: { en: "UI/UX Intern (Remote)", fr: "Stagiaire UI/UX (remote)" },
    period: { en: "Jun — Sept 2024", fr: "juin — sept. 2024" },
    bullets: {
      en: [
        "Designed interfaces and high-fidelity prototypes in Figma for product discovery handoffs.",
      ],
      fr: [
        "Conception d’interfaces et de prototypes haute fidélité dans Figma pour les handoffs produit.",
      ],
    },
    mediaFolder: "ui-ux-internship",
    media: [],
  },
  {
    id: "tt",
    org: "Tunisie Telecom",
    role: { en: "Technical Intern", fr: "Stagiaire technique" },
    period: { en: "Aug 2024", fr: "août 2024" },
    bullets: {
      en: [
        "Router configuration and network performance testing in an operations context.",
      ],
      fr: [
        "Configuration de routeurs et tests de performance réseau en contexte opérationnel.",
      ],
    },
    media: [],
  },
  {
    id: "steg",
    org: "STEG",
    role: { en: "Technical Intern", fr: "Stagiaire technique" },
    period: { en: "Aug 2023", fr: "août 2023" },
    bullets: {
      en: [
        "Documented internal energy consumption tracking and management tooling.",
      ],
      fr: [
        "Documentation d’outils internes de suivi et de gestion de la consommation d’énergie.",
      ],
    },
    media: [],
  },
];

export type ProjectCard = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  tags: string[];
  /** Swap to your screenshot (e.g. `/projects/fracture-xray.jpg`) under `public/projects/`. */
  image: string;
  href: string;
  mediaFolder?: string;
  media: MediaItem[];
};

export const professionalProjects: ProjectCard[] = [
  {
    id: "stroke-detection",
    title: {
      en: "Clinical stroke / MS detection web app",
      fr: "Application clinique de détection AVC / SEP",
    },
    description: {
      en: "MRI DICOM workflow with AI inference and clinician-facing interface deployed in a real hospital context.",
      fr: "Workflow IRM DICOM avec inférence IA et interface orientée cliniciens, déployé en contexte hospitalier réel.",
    },
    tags: ["DICOM", "PyTorch", "Django", "React"],
    image: "/stroke_detection/1754044196102.jpg",
    href: "#contact",
    mediaFolder: "stroke_detection",
    media: [
      { type: "image", src: "/stroke_detection/1754044196102.jpg" },
      { type: "image", src: "/stroke_detection/Capture%20d%27%C3%A9cran%202025-10-14%20123304.png" },
      { type: "image", src: "/stroke_detection/Capture%20d%27%C3%A9cran%202025-06-20%20034006.png" }
    ],
  },
  {
    id: "cartouch",
    title: { en: "Cartouch (cartouch.tn)", fr: "Cartouch (cartouch.tn)" },
    description: {
      en: "Vehicle inspection and verification platform for Tunisia’s used-car market, built solo and launched to 1,000+ organic users on day one.",
      fr: "Plateforme d’inspection et de vérification de véhicules pour le marché tunisien de l’occasion, conçue en solo et lancée avec plus de 1 000 utilisateurs organiques le premier jour.",
    },
    tags: ["Full-stack", "Product", "Startup"],
    image: "/projects/cartouch-cover.svg",
    href: "#contact",
    mediaFolder: "cartouch",
    media: [],
  },
  {
    id: "yolo-hazard",
    title: {
      en: "Real-time hazard detection (YOLOv5)",
      fr: "Détection de dangers en temps réel (YOLOv5)",
    },
    description: {
      en: "Real-time CCTV monitoring for fire, smoke, and people detection with YOLOv5 + OpenCV, tuned for low-cost hardware.",
      fr: "Monitoring CCTV temps réel pour la détection de feu, fumée et personnes avec YOLOv5 + OpenCV, optimisé pour du matériel à faible coût.",
    },
    tags: ["YOLOv5", "OpenCV", "Computer vision"],
    image: "/stroke_detection/Capture%20d%27%C3%A9cran%202025-10-14%20123304.png",
    href: "#contact",
    mediaFolder: "yolo_hazard",
    media: [
      { type: "image", src: "/stroke_detection/Capture%20d%27%C3%A9cran%202025-10-14%20123304.png" },
      { type: "image", src: "/stroke_detection/Capture%20d%27%C3%A9cran%202025-06-20%20033632.png" }
    ],
  },
  {
    id: "wrist-fracture",
    title: {
      en: "Wrist fracture detection app (in progress)",
      fr: "Application de détection de fractures du poignet (en cours)",
    },
    description: {
      en: "Co-developing an AI-assisted radiograph analysis app with a radiologist, including DICOM preprocessing and U-Net / ResNet segmentation.",
      fr: "Co-développement d’une application d’analyse de radiographies assistée par IA avec un radiologue, incluant prétraitement DICOM et segmentation U-Net / ResNet.",
    },
    tags: ["DICOM", "U-Net", "ResNet", "Radiology"],
    image: "/projects/customs-cover.svg",
    href: "#contact",
    mediaFolder: "wrist_fracture",
    media: [],
  },
  {
    id: "ris-irs-quality",
    title: {
      en: "RIS/IRS duplicate-record data quality support",
      fr: "Support qualité des données RIS/IRS (doublons patients)",
    },
    description: {
      en: "Voluntary data-quality work helping radiology teams identify and resolve duplicate patient entries to reduce confusion caused by multiple records for the same person.",
      fr: "Travail volontaire de qualité des données aidant les équipes de radiologie à identifier et corriger les doublons de patients pour réduire la confusion liée à des dossiers multiples pour une même personne.",
    },
    tags: ["Healthcare data", "RIS/IRS", "Quality"],
    image: "/projects/fmeda-cover.svg",
    href: "#contact",
    mediaFolder: "ris_irs_quality",
    media: [],
  },
  {
    id: "fmeda",
    title: {
      en: "FMEDA automation tool",
      fr: "Outil d’automatisation FMEDA",
    },
    description: {
      en: "Automates FMEDA workflows for functional safety teams (IEC 61508 / ISO 26262) and reduces manual processing time.",
      fr: "Automatise les workflows FMEDA pour les équipes sûreté de fonctionnement (IEC 61508 / ISO 26262) et réduit fortement le travail manuel.",
    },
    tags: ["Python", "Safety", "Automation"],
    image: "/projects/fmeda-cover.svg",
    href: "#contact",
    mediaFolder: "fmeda",
    media: [],
  },
  {
    id: "customs-ai-agent",
    title: { en: "AI data-mining agent for Tunisian Customs", fr: "Agent IA de data-mining pour la Douane tunisienne" },
    description: {
      en: "Transforms complex PDF tariff listings into structured, photo-enriched interfaces for better operational accessibility.",
      fr: "Transforme des listings tarifaires PDF complexes en interfaces structurées enrichies en photos pour une meilleure accessibilité opérationnelle.",
    },
    tags: ["Parsing", "Python", "Web"],
    image: "/projects/customs-cover.svg",
    href: "#contact",
    mediaFolder: "customs_ai_agent",
    media: [],
  },
];

export const personalProjects: ProjectCard[] = [
  // Intentionally empty: projects are consolidated into `professionalProjects`.
];

export type LeadershipItem = {
  id: string;
  title: Record<Locale, string>;
  caption: Record<Locale, string>;
  period: string;
  mediaFolder?: string;
  media: MediaItem[];
};

export const leadership: LeadershipItem[] = [
  {
    id: "nuit-info-organizing",
    title: {
      en: "Organizing Committee — Nuit Info 2K24",
      fr: "Comité d’organisation — Nuit Info 2K24",
    },
    caption: {
      en: "Part of the organizing committee supporting event logistics, coordination, and participant experience.",
      fr: "Membre du comité d’organisation, avec contribution à la logistique, la coordination et l’expérience des participants.",
    },
    period: "2024",
    mediaFolder: "organizing_comitee_nuit_info_2024",
    media: [],
  },
  {
    id: "nuit-info",
    title: { en: "Nuit de l’Info — Winner (Assatir)", fr: "Nuit de l’Info — Lauréat (Assatir)" },
    caption: {
      en: "Built and deployed a full-stack solution overnight in a Franco-Tunisian team under tight constraints.",
      fr: "Développement et déploiement d’une solution full-stack en une nuit dans une équipe franco-tunisienne, sous fortes contraintes.",
    },
    period: "2025",
    mediaFolder: "assatir_hackathon",
    media: [
      { type: "image", src: "/assatir_hackathon/1770241148070.jpg" },
      { type: "image", src: "/assatir_hackathon/1770241148163.jpg" },
      { type: "image", src: "/assatir_hackathon/1770241148340.jpg" }
    ],
  },
  {
    id: "workshops",
    title: { en: "Microsoft Tech Club — Workshops", fr: "Microsoft Tech Club — Workshops" },
    caption: {
      en: "Led workshops on algorithms and competitive programming; co-founded the club and shaped teams and recruiting.",
      fr: "Animation de workshops en algorithmique et programmation compétitive ; co-fondation du club et structuration des équipes.",
    },
    period: "2024 — 2025",
    mediaFolder: "workshops_mtc",
    media: [{ type: "video", src: "/workshops_mtc/9b74c137-57be-4311-9d32-7f3174e60370.mp4" }],
  },
  {
    id: "arcane",
    title: { en: "Arcane’s Clash — Organizer", fr: "Arcane’s Clash — Organisation" },
    caption: {
      en: "Organized one of Tunisia’s major competitive programming contests hosted on Codeforces.",
      fr: "Organisation d’un des principaux concours tunisiens de programmation compétitive hébergé sur Codeforces.",
    },
    period: "2025",
    mediaFolder: "arcane_clash",
    media: [
      { type: "image", src: "/arcane_clash/1745354880247.jpg" },
      { type: "image", src: "/arcane_clash/1745354882156.jpg" },
      { type: "image", src: "/arcane_clash/1745354883715.jpg" }
    ],
  },
  {
    id: "job-fair",
    title: { en: "Talk — Job fair teaser", fr: "Talk — teaser forum" },
    caption: {
      en: "Short teaser from a public talk about practical AI deployment constraints and impact.",
      fr: "Teaser d’une intervention publique sur les contraintes et l’impact du déploiement IA.",
    },
    period: "2024",
    mediaFolder: "video_job_fair",
    media: [{ type: "video", src: "/video_job_fair/b44d11dd-7a66-43e7-bff1-99c8988b37db.mp4" }],
  },
  {
    id: "edx-ambassador",
    title: {
      en: "edX Campus Ambassador — Protected Consulting",
      fr: "edX Campus Ambassador — Protected Consulting",
    },
    caption: {
      en: "Represented edX on campus through learning advocacy, student outreach, and community-facing academic promotion.",
      fr: "Représentation d’edX sur le campus via la promotion de l’apprentissage, la sensibilisation des étudiants et des actions communautaires académiques.",
    },
    period: "2025",
    mediaFolder: "edx ambassador",
    media: [],
  },
  {
    id: "nvidia",
    title: { en: "NVIDIA DLI certifications", fr: "Certifications NVIDIA DLI" },
    caption: {
      en: "Deep learning, visual inspection, NLP, anomaly detection, and predictive maintenance tracks.",
      fr: "Deep learning, inspection visuelle, NLP, détection d’anomalies et maintenance prédictive.",
    },
    period: "2024 — 2026",
    mediaFolder: "nvidia_certifs",
    media: [
      { type: "image", src: "/nvidia_certifs/1745702863829.jpg" },
      { type: "image", src: "/nvidia_certifs/1745702863068.jpg" },
      { type: "image", src: "/nvidia_certifs/1745702863831.jpg" }
    ],
  },
];

export type LinkedInPost = {
  id: string;
  date: string;
  image: string;
  description: Record<Locale, string>;
  postUrl: string;
};

/**
 * Keep this local for free Vercel hosting:
 * - Put post images in `public/linkedin/`
 * - Update `postUrl`, `date`, `description`, `image`
 */
export const linkedInPosts: LinkedInPost[] = [
  {
    id: "li-1",
    date: "2026-04-10",
    image: "/linkedin/post-placeholder.svg",
    description: {
      en: "Post summary placeholder. Paste the exact text/insight from your latest LinkedIn post here.",
      fr: "Résumé de publication (placeholder). Collez ici le texte ou l’idée clé de votre dernier post LinkedIn.",
    },
    postUrl: "https://www.linkedin.com/in/yassine-dhouibi/",
  },
  {
    id: "li-2",
    date: "2026-03-01",
    image: "/linkedin/post-placeholder.svg",
    description: {
      en: "Post summary placeholder. Add another recent LinkedIn update and attach its image.",
      fr: "Résumé de publication (placeholder). Ajoutez ici une autre actualité récente LinkedIn avec son image.",
    },
    postUrl: "https://www.linkedin.com/in/yassine-dhouibi/",
  },
  {
    id: "li-3",
    date: "2026-02-14",
    image: "/linkedin/post-placeholder.svg",
    description: {
      en: "Post summary placeholder. Use this slot for your third most recent LinkedIn publication.",
      fr: "Résumé de publication (placeholder). Utilisez cet espace pour votre troisième publication LinkedIn la plus récente.",
    },
    postUrl: "https://www.linkedin.com/in/yassine-dhouibi/",
  },
];
