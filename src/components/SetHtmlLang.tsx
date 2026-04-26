"use client";

import { useLayoutEffect } from "react";

type Props = {
  locale: string;
};

/** Root layout owns `<html>`; sync `lang` with the active `[locale]` segment. */
export function SetHtmlLang({ locale }: Props) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
