"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import type { Locale } from "@/content/site-content";
import { siteConfig } from "@/config/site";

const nav = [
  { href: "#stack", key: "stack" as const },
  { href: "#experience", key: "experience" as const },
  { href: "#work", key: "work" as const },
  { href: "#leadership", key: "leadership" as const },
];

type Props = {
  locale: Locale;
};

export function SiteHeader({ locale }: Props) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const location = siteConfig.location[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="group flex flex-col leading-tight transition-opacity hover:opacity-90"
        >
          <span className="font-display text-sm font-semibold tracking-tight text-fg">
            {siteConfig.name}
          </span>
          <span className="text-[11px] text-muted">{location}</span>
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? t("closeMenu") : t("openMenu")}
            </span>
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span
                className={`block h-0.5 w-5 origin-center rounded bg-fg transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-fg transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 origin-center rounded bg-fg transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-border bg-bg md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
          {nav.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-card hover:text-fg"
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
