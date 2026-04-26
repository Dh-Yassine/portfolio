import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getHeroCopy } from "@/content/site-content";
import type { Locale } from "@/content/site-content";

type Props = {
  locale: Locale;
};

export async function Hero({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const summary = getHeroCopy(locale);
  const location = siteConfig.location[locale];

  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-hidden border-b border-border bg-bg"
    >
      <div
        className="pointer-events-none absolute -right-20 top-12 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center lg:gap-10 lg:py-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="text-lg text-muted sm:text-xl">
              <span className="text-fg/90">{t("role")}</span>
              <span className="mx-2 text-border">·</span>
              <span>{t("focus")}</span>
            </p>
          </div>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {summary}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-wide">
              {t("locationLabel")}
            </span>
            <span>{location}</span>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-fg px-6 text-sm font-medium text-bg transition hover:bg-white"
              href={siteConfig.resumePath}
              download
            >
              {t("ctaResume")}
            </a>
            <a
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-transparent px-6 text-sm font-medium text-fg transition hover:border-accent/50 hover:bg-card"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
            <a
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-transparent px-6 text-sm font-medium text-fg transition hover:border-accent/50 hover:bg-card"
              href={siteConfig.linkedIn}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {locale === "fr" ? "Formation" : "Education"}
              </p>
              <p className="mt-2 text-sm font-semibold text-fg">
                ISIMM — Engineering cycle in software engineering
              </p>
              <p className="mt-1 text-xs text-muted">
                {locale === "fr" ? "2024 — présent" : "2024 — present"}
              </p>
              <p className="mt-2 text-sm font-semibold text-fg">
                {locale === "fr"
                  ? "ISIMM — Cycle préparatoire en informatique"
                  : "ISIMM — Integrated preparatory cycle in computer science"}
              </p>
              <p className="mt-1 text-xs text-muted">2022 — 2024</p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {locale === "fr" ? "Langues" : "Languages"}
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted">
                <li>
                  <span className="font-semibold text-fg">
                    {locale === "fr" ? "Anglais" : "English"}:
                  </span>{" "}
                  onSET 75.63% (B2)
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    {locale === "fr" ? "Français" : "French"}:
                  </span>{" "}
                  {locale === "fr"
                    ? "natif / quasi-natif"
                    : "native / near-native"}
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    {locale === "fr" ? "Arabe" : "Arabic"}:
                  </span>{" "}
                  {locale === "fr" ? "natif" : "native"}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hover-float overflow-hidden rounded-3xl border border-border bg-card/95 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition hover:border-accent/30 hover:bg-card-hover">
          <div className="p-3 sm:p-4">
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-2xl border border-border bg-bg-elevated">
              <video
                className="h-full w-full object-cover"
                src="/video_job_fair/b44d11dd-7a66-43e7-bff1-99c8988b37db.mp4"
                muted
                playsInline
                autoPlay
                loop
                controls
                preload="metadata"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
