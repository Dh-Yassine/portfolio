import type { ReactNode } from "react";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${jetbrainsMono.variable} ${sora.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
