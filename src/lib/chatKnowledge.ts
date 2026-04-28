import "server-only";

import { experience, leadership, professionalProjects, type Locale } from "@/content/site-content";
import { siteConfig } from "@/config/site";

type KnowledgeDocument = {
  id: string;
  text: string;
};

const CV_STATIC_TEXT = `
Yassine Dhouibi
Tunisia | +216 2626 0995 | yassinedhouibi@gmail.com | linkedin.com/in/yassine-dhouibi
Software engineering student specializing in applied AI and computer vision, building practical systems for inspection, monitoring, and intelligent automation with real-world impact in Tunisia.

Education
ISIMM - Engineering Cycle in Software Engineering (2024-present), Monastir, Tunisia.
ISIMM - Integrated Preparatory Cycle in Computer Science (2022-2024), Monastir, Tunisia.

Research & Field Experience
Lab-TIM (Faculty of Medicine of Monastir) & Fattouma Bourguiba Hospital - AI & Deep Learning Research Intern (Jun 2025-present), Monastir, Tunisia:
- Multiple sclerosis (SEP) detection web app for neurologists using MRI DICOM scans, in active clinical use.
- Wrist fracture detection pipeline with DICOM preprocessing and segmentation using U-Net / ResNet, with Django + React visualization.
- Medical data-quality initiative resolving duplicate patient records in RIS/IRS.
UXIFY - UI/UX Intern (Jun 2024-Sep 2024), Remote: designed user-centered interfaces in Figma.
Tunisie Telecom - Technical Intern (Aug 2024), Tunisia: router configuration and network testing.
STEG – Tunisian Company of Electricity and Gas (Aug 2023), Tunisia — Technical Intern – Energy Monitoring & Green Engineering: visited operational sites to observe and track energy consumption on-site; documented data from monitoring systems, logged infrastructure readings, and supported reporting workflows within Tunisia’s national electricity and gas network.

Selected Projects
- Cartouch (cartouch.tn): vehicle inspection and verification platform for Tunisia's used-car market, built full-stack independently, reached 1,000+ organic users on launch day.
- YOLO CV Security System: real-time CCTV monitoring with YOLOv5 + OpenCV for fire, smoke, and people detection.
- FMEDA Automation Tool: automates FMEDA workflows used in IEC 61508 / ISO 26262 functional safety contexts.
- AI Data-Mining Agent (Tunisian Customs): transforms complex PDF tariff listings into a structured, photo-enriched web interface.

Leadership & Extracurricular
- Winner - Nuit de l'Info (University of Cote d'Opale Prize, $250).
- AIESEC (Oct 2023-Oct 2025): Outgoing Global Volunteer Team Leader and OGT Team Member.
- PEEMO entrepreneurship program candidate.
- Microsoft Tech Club: HR Manager, founding member, workshop lead.
- Arcane's Clash organizer (Codeforces contest).
- edX Campus Ambassador - Protected Consulting.

Certifications & Languages
- English: onSET 75.63% (B2)
- French: native / near-native
- Arabic: native
- NVIDIA DLI: Fundamentals of Deep Learning, AI for Visual Inspection, NLP with Transformers, AI for Anomaly Detection, AI for Predictive Maintenance.

Technical Skills
- Languages: Python (expert), SQL, C++, C, Java, JavaScript, HTML/CSS
- Deep Learning & CV: PyTorch, TensorFlow, Keras, YOLOv5, GANs, Diffusion Models
- Medical Imaging: DICOM processing, U-Net, image segmentation, OpenCV, radiographic analysis
- Data & Research: Jupyter, NumPy, Pandas, Matplotlib, Scikit-learn
- Web & Deployment: React, Django, Flask, REST APIs, PostgreSQL, MySQL
- Infrastructure: Git, Linux, Docker (basic), Figma
`.trim();

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "to",
  "for",
  "of",
  "in",
  "on",
  "at",
  "with",
  "is",
  "are",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "my",
  "me",
  "your",
  "from",
  "about",
  "who",
  "what",
  "when",
  "where",
  "how",
  "why",
]);

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(" ")
    .map((token) => {
      if (token.length > 4 && token.endsWith("s")) {
        return token.slice(0, -1);
      }
      return token;
    })
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function expandQueryTokens(query: string) {
  const baseTokens = tokenize(query);
  const expanded = new Set(baseTokens);

  for (const token of baseTokens) {
    if (token === "internship" || token === "intern" || token === "stage" || token === "stagiaire") {
      expanded.add("intern");
      expanded.add("internship");
      expanded.add("stagiaire");
      expanded.add("stage");
      expanded.add("experience");
    }
    if (token === "project" || token === "projet") {
      expanded.add("project");
      expanded.add("projet");
      expanded.add("work");
    }
    if (token === "skill" || token === "competence") {
      expanded.add("skill");
      expanded.add("skills");
      expanded.add("technologies");
      expanded.add("language");
      expanded.add("languages");
    }
  }

  return [...expanded];
}

function buildSiteKnowledge(locale: Locale): KnowledgeDocument[] {
  const docs: KnowledgeDocument[] = [
    {
      id: "profile",
      text: [
        `Name: ${siteConfig.name}`,
        `Email: ${siteConfig.email}`,
        `Phone: ${siteConfig.phone}`,
        `Location: ${siteConfig.location[locale]}`,
        `LinkedIn: ${siteConfig.linkedIn}`,
        `GitHub: ${siteConfig.github}`,
        `Facebook: ${siteConfig.facebook}`,
      ].join("\n"),
    },
  ];

  experience.forEach((item) => {
    docs.push({
      id: `experience-${item.id}`,
      text: [
        `Experience organization: ${item.org}`,
        `Role: ${item.role[locale]}`,
        `Period: ${item.period[locale]}`,
        "Details:",
        ...item.bullets[locale].map((bullet) => `- ${bullet}`),
      ].join("\n"),
    });
  });

  professionalProjects.forEach((project) => {
    docs.push({
      id: `project-${project.id}`,
      text: [
        `Project: ${project.title[locale]}`,
        `Description: ${project.description[locale]}`,
        `Technologies: ${project.tags.join(", ")}`,
      ].join("\n"),
    });
  });

  leadership.forEach((item) => {
    docs.push({
      id: `leadership-${item.id}`,
      text: [
        `Leadership: ${item.title[locale]}`,
        `Period: ${item.period}`,
        `Details: ${item.caption[locale]}`,
      ].join("\n"),
    });
  });

  return docs;
}

function splitTextIntoChunks(text: string, chunkSize = 600) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return [];
  }

  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }
  return chunks;
}

export async function buildKnowledgeContext(query: string, locale: Locale) {
  const siteDocs = buildSiteKnowledge(locale);
  const cvDocs = splitTextIntoChunks(CV_STATIC_TEXT, 160).map((chunk, idx) => ({
    id: `cv-${idx + 1}`,
    text: chunk,
  }));

  const allDocs = [...siteDocs, ...cvDocs];
  const queryTokens = expandQueryTokens(query);
  const normalizedQuery = normalizeText(query);
  const isInternshipQuery =
    normalizedQuery.includes("internship") ||
    normalizedQuery.includes("internships") ||
    normalizedQuery.includes("intern ") ||
    normalizedQuery.includes("stage") ||
    normalizedQuery.includes("stagiaire");

  const scored = allDocs
    .map((doc) => {
      const docTokens = tokenize(doc.text);
      const uniqueDocTokens = new Set(docTokens);
      const baseScore = queryTokens.reduce((acc, token) => acc + (uniqueDocTokens.has(token) ? 1 : 0), 0);
      const internshipBoost =
        isInternshipQuery && doc.id.startsWith("experience-") ? 3 : 0;
      const score = baseScore + internshipBoost;
      return { ...doc, score };
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  if (scored.length === 0) {
    const defaultDocs = isInternshipQuery
      ? siteDocs.filter((doc) => doc.id.startsWith("experience-")).slice(0, 5)
      : siteDocs.slice(0, 5);
    return {
      contextText: defaultDocs.map((doc) => doc.text).join("\n\n"),
      sources: defaultDocs.map((doc) => doc.id),
    };
  }

  return {
    contextText: scored.map((doc) => doc.text).join("\n\n"),
    sources: scored.map((doc) => doc.id),
  };
}
