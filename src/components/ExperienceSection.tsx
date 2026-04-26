import { getTranslations } from "next-intl/server";
import { experience } from "@/content/site-content";
import type { Locale } from "@/content/site-content";
import { MediaCarousel } from "@/components/MediaCarousel";
import { resolveMedia } from "@/lib/mediaCatalog";

type Props = {
  locale: Locale;
};

export async function ExperienceSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "experience" });

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-border bg-bg py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl space-y-2">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            {t("title")}
          </h2>
          <p className="text-sm text-muted sm:text-base">{t("subtitle")}</p>
        </div>

        <ol className="relative space-y-10 border-l border-border pl-8 sm:pl-10">
          {experience.map((item) => {
            const media = resolveMedia(item.mediaFolder, item.media);
            return (
              <li key={item.id} className="relative">
              <span
                className="absolute -left-[9px] top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border border-border bg-bg shadow-[0_0_0_4px_var(--bg-elevated)] sm:-left-[11px]"
                aria-hidden
              />
              <div className="hover-float rounded-3xl border border-border bg-card p-6 transition hover:border-accent/25 hover:bg-card-hover sm:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-fg">
                      {item.role[locale]}
                    </h3>
                    <p className="text-sm text-muted">{item.org}</p>
                  </div>
                  <p className="shrink-0 text-xs font-medium uppercase tracking-wide text-accent">
                    {item.period[locale]}
                  </p>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted marker:text-accent">
                  {item.bullets[locale].map((b, i) => (
                    <li key={`${item.id}-${i}`}>{b}</li>
                  ))}
                </ul>
                <MediaCarousel
                  items={media}
                  className="mt-6"
                  itemClassName="h-44 w-[78%] sm:h-48 sm:w-[420px]"
                />
              </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
