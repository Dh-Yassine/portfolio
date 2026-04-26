"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

type ThemeMode = "dark" | "light";

export function SocialDock() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme-mode");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme-mode", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  const socialItems = [
    { href: siteConfig.github, label: "GitHub", icon: <GitHubIcon /> },
    { href: siteConfig.linkedIn, label: "LinkedIn", icon: <LinkedInIcon /> },
    { href: siteConfig.facebook, label: "Facebook", icon: <FacebookIcon /> },
  ];

  const styleForIndex = (index: number) => {
    if (activeIndex === null) return { transform: "translateY(0px) scale(1)" };
    const distance = Math.abs(index - activeIndex);
    const influence = Math.max(0, 1 - distance / 2.2);
    const scale = 1 + influence * 0.48;
    const lift = influence * 10;
    return { transform: `translateY(${-lift}px) scale(${scale})` };
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div
        onMouseLeave={() => {
          setActiveIndex(null);
          setHoveredLabel(null);
        }}
        className="relative flex items-end gap-2 rounded-full border border-border bg-card/90 px-3 py-2 shadow-xl backdrop-blur"
      >
        {socialItems.map((item, idx) => (
          <div key={item.label} className="relative">
            {hoveredLabel === item.label ? (
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-xl bg-fg px-2.5 py-1 text-xs font-medium text-bg shadow-lg">
                {item.label}
              </div>
            ) : null}
            <DockLink
              href={item.href}
              label={item.label}
              style={styleForIndex(idx)}
              onHoverChange={(active) => {
                setHoveredLabel(active ? item.label : null);
                setActiveIndex(active ? idx : null);
              }}
            >
              {item.icon}
            </DockLink>
          </div>
        ))}

        <div className="h-8 w-px bg-border/80" />

        <div className="relative">
          {hoveredLabel === "Theme" ? (
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-xl bg-fg px-2.5 py-1 text-xs font-medium text-bg shadow-lg">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </div>
          ) : null}
          <button
            type="button"
            onClick={toggleTheme}
            onMouseEnter={() => {
              setHoveredLabel("Theme");
              setActiveIndex(socialItems.length);
            }}
            onMouseLeave={() => {
              setHoveredLabel(null);
              setActiveIndex(null);
            }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg text-fg transition hover:border-accent/50 hover:text-accent"
            style={styleForIndex(socialItems.length)}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

function DockLink({
  href,
  label,
  children,
  style,
  onHoverChange,
}: {
  href: string;
  label: string;
  children: ReactNode;
  style: { transform: string };
  onHoverChange: (active: boolean) => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg text-fg transition hover:border-accent/50 hover:text-accent"
      style={style}
    >
      {children}
    </a>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.08.68-.21.68-.47v-1.66c-2.78.6-3.37-1.17-3.37-1.17a2.65 2.65 0 0 0-1.11-1.47c-.9-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.16 2.16 0 0 0 2.95.84 2.17 2.17 0 0 1 .64-1.36c-2.22-.25-4.56-1.11-4.56-4.95a3.88 3.88 0 0 1 1.03-2.7 3.6 3.6 0 0 1 .1-2.66s.84-.27 2.75 1.02a9.52 9.52 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02a3.6 3.6 0 0 1 .1 2.66 3.88 3.88 0 0 1 1.03 2.7c0 3.85-2.34 4.7-4.57 4.95a2.43 2.43 0 0 1 .69 1.89v2.8c0 .26.18.56.69.47A10 10 0 0 0 12 2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM8.5 10H5.4v9.6h3.1V10Zm5 0h-3v9.6h3v-5c0-2.8 3.6-3 3.6 0v5h3.1v-6.1c0-4.8-5.4-4.6-6.7-2.2V10Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H8v3h2.1v8h3.4Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16h1v3h-1V2Zm0 17h1v3h-1v-3ZM2 11h3v1H2v-1Zm17 0h3v1h-3v-1ZM4.2 4.9l.7-.7L7 6.3l-.7.7-2.1-2.1Zm12.8 12.8.7-.7 2.1 2.1-.7.7-2.1-2.1ZM17 6.3l2.1-2.1.7.7-2.1 2.1-.7-.7ZM4.2 19l2.1-2.1.7.7-2.1 2.1-.7-.7Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" />
    </svg>
  );
}

