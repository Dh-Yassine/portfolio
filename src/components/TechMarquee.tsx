import { getTranslations } from "next-intl/server";
import { techStack } from "@/content/site-content";
import type { Locale } from "@/content/site-content";

type Props = {
  locale: Locale;
};

export async function TechMarquee({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "stack" });
  const doubled = [...techStack, ...techStack];

  return (
    <section
      id="stack"
      className="scroll-mt-24 border-b border-border bg-bg-elevated py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl space-y-2">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            {t("title")}
          </h2>
          <p className="text-sm text-muted sm:text-base">{t("subtitle")}</p>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-elevated to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-elevated to-transparent" />
        <div className="flex w-max marquee-track gap-3 pr-3">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center rounded-2xl border border-border bg-card px-4 py-2 text-sm font-medium text-fg/90 shadow-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
