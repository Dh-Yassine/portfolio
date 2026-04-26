import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  professionalProjects,
  type ProjectCard,
} from "@/content/site-content";
import type { Locale } from "@/content/site-content";
import { MediaCarousel } from "@/components/MediaCarousel";
import { resolveMedia } from "@/lib/mediaCatalog";

type Props = {
  locale: Locale;
};

export async function ProjectsSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <section className="border-b border-border bg-bg-elevated py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="work" className="scroll-mt-24 space-y-8">
          <ProjectGroup
            title={t("workTitle")}
            subtitle={t("workSubtitle")}
            projects={professionalProjects}
            locale={locale}
            tagsLabel={t("tagsLabel")}
            learnMore={t("learnMore")}
          />
        </div>
      </div>
    </section>
  );
}

function ProjectGroup({
  title,
  subtitle,
  projects,
  locale,
  tagsLabel,
  learnMore,
}: {
  title: string;
  subtitle: string;
  projects: ProjectCard[];
  locale: Locale;
  tagsLabel: string;
  learnMore: string;
}) {
  return (
    <>
      <div className="max-w-2xl space-y-2">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {title}
        </h2>
        <p className="text-sm text-muted sm:text-base">{subtitle}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const media = resolveMedia(project.mediaFolder, project.media);
          return (
            <article
              key={project.id}
              className="group hover-float flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-card-hover hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)]"
            >
            {media.length > 0 ? (
              <MediaCarousel
                items={media}
                className="border-b border-border p-3"
                itemClassName="h-44 w-full sm:h-52 sm:w-[450px]"
              />
            ) : (
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                  sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="text-lg font-semibold tracking-tight text-fg">
                {project.title[locale]}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {project.description[locale]}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted/80">
                {tagsLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-bg-elevated px-2.5 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-2">
                <a
                  href={project.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent transition group-hover:gap-2"
                >
                  {learnMore}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
