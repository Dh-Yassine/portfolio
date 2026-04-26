import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/content/site-content";

type Props = {
  locale: Locale;
};

export async function SiteFooter({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const location = siteConfig.location[locale];
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-border bg-bg py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold text-fg">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted">{location}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a
              className="text-muted transition hover:text-accent"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
            <a
              className="text-muted transition hover:text-accent"
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            >
              {siteConfig.phone}
            </a>
            <a
              className="text-muted transition hover:text-accent"
              href={siteConfig.linkedIn}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              className="text-muted transition hover:text-accent"
              href={siteConfig.resumePath}
              download
            >
              CV (PDF)
            </a>
          </div>
        </div>
        <div className="text-xs text-muted sm:text-right">
          <p>
            © {year} {siteConfig.name}. {t("rights")}
          </p>
          <p className="mt-1">{t("builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
