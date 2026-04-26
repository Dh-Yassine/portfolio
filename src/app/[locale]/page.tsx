import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { LeadershipSection } from "@/components/LeadershipSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SocialDock } from "@/components/SocialDock";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import type { Locale } from "@/content/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <Hero locale={locale} />
        <TechMarquee locale={locale} />
        <ExperienceSection locale={locale} />
        <ProjectsSection locale={locale} />
        <LeadershipSection locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <SocialDock />
      <ChatbotWidget locale={locale} />
    </>
  );
}
