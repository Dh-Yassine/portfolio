import { getTranslations } from "next-intl/server";
import { leadership } from "@/content/site-content";
import type { Locale } from "@/content/site-content";
import { MediaCarousel } from "@/components/MediaCarousel";
import { resolveMedia } from "@/lib/mediaCatalog";

type Props = {
  locale: Locale;
};

export async function LeadershipSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "leadership" });

  return (
    <section
      id="leadership"
      className="scroll-mt-24 border-b border-border bg-bg py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-3xl space-y-2">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            {t("title")}
          </h2>
          <p className="text-sm text-muted sm:text-base">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {leadership.map((item) => {
            const media = resolveMedia(item.mediaFolder, item.media);
            return (
              <article
                key={item.id}
                className="hover-float rounded-3xl border border-border bg-card p-6 transition hover:border-accent/25 hover:bg-card-hover sm:p-7"
              >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
                  {item.title[locale]}
                </h3>
                <p className="text-xs font-medium uppercase tracking-wide text-accent">
                  {item.period}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.caption[locale]}
              </p>
              <MediaCarousel
                items={media}
                className="mt-5"
                itemClassName="h-48 w-[78%] sm:h-52 sm:w-[460px]"
              />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

