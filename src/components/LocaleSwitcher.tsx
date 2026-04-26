"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/content/site-content";

const labels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "fr" : "en";

  return (
    <div className="flex items-center rounded-full border border-border bg-card p-0.5 text-xs font-medium text-muted">
      <span
        className="rounded-full bg-white/10 px-2.5 py-1 text-fg"
        aria-current="true"
      >
        {labels[locale]}
      </span>
      <Link
        href={pathname}
        locale={other}
        className="rounded-full px-2.5 py-1 transition-colors hover:text-fg"
      >
        {labels[other]}
      </Link>
    </div>
  );
}
