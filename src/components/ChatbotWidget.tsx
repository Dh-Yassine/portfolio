"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/content/site-content";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatbotWidgetProps = {
  locale: Locale;
};

const COPY = {
  en: {
    title: "Ask about Yassine",
    subtitle: "Answers from CV + portfolio data only",
    placeholder: "Ask a question...",
    send: "Send",
    clear: "Clear history",
    open: "Open chat",
    bubble: "Chat",
    close: "Close chat",
    intro:
      "Hi! I answer questions only from Yassine's CV and portfolio information. Ask about experience, projects, skills, or contact details.",
    thinking: "Thinking...",
    error: "I could not answer right now. Please try again.",
  },
  fr: {
    title: "Poser une question",
    subtitle: "Réponses basées uniquement sur CV + portfolio",
    placeholder: "Posez une question...",
    send: "Envoyer",
    clear: "Effacer l'historique",
    open: "Ouvrir le chat",
    bubble: "Assistant",
    close: "Fermer le chat",
    intro:
      "Bonjour ! Je réponds uniquement à partir du CV et des informations du portfolio de Yassine. Vous pouvez demander expérience, projets, compétences ou contact.",
    thinking: "Réflexion...",
    error: "Je ne peux pas répondre pour le moment. Réessayez.",
  },
} as const;

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ChatbotWidget({ locale }: ChatbotWidgetProps) {
  const t = COPY[locale];
  const storageKey = useMemo(() => `portfolio-chat-history-${locale}`, [locale]);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const starter = [{ id: createId(), role: "assistant" as const, content: COPY[locale].intro }];
    if (typeof window === "undefined") {
      return starter;
    }

    try {
      const raw = window.localStorage.getItem(`portfolio-chat-history-${locale}`);
      if (!raw) {
        return starter;
      }
      const parsed = JSON.parse(raw) as Message[];
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : starter;
    } catch {
      return starter;
    }
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }
    window.localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || isLoading) {
      return;
    }

    const nextMessages = [...messages, { id: createId(), role: "user" as const, content: question }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error?.trim() || "Request failed");
      }

      const answer = data.answer?.trim() || t.error;
      setMessages((prev) => [...prev, { id: createId(), role: "assistant", content: answer }]);
    } catch (error) {
      const errorMessage = error instanceof Error && error.message ? error.message : t.error;
      setMessages((prev) => [...prev, { id: createId(), role: "assistant", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  }

  function clearHistory() {
    const starter = { id: createId(), role: "assistant" as const, content: t.intro };
    setMessages([starter]);
    window.localStorage.setItem(storageKey, JSON.stringify([starter]));
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 top-0 z-[60] flex items-end justify-end p-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:p-6 md:pb-[calc(6rem+env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        {isOpen ? (
          <section className="flex h-[min(72vh,calc(100dvh-7rem))] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_80px_rgba(0,0,0,.45)] ring-1 ring-white/[0.06] backdrop-blur-md dark:shadow-[0_24px_80px_rgba(0,0,0,.55)]">
            <header className="flex shrink-0 items-center justify-between border-b border-border bg-bg-elevated/80 px-4 py-3">
              <div>
                <h2 className="font-display text-sm font-semibold text-fg">{t.title}</h2>
                <p className="text-xs text-muted">{t.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted transition hover:border-accent hover:text-fg"
                aria-label={t.close}
              >
                ✕
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "ml-auto border border-accent/35 bg-accent-soft text-fg"
                        : "mr-auto border border-border bg-bg-elevated text-fg"
                    }`}
                  >
                    {message.content}
                  </article>
                ))}

                {isLoading ? (
                  <article className="mr-auto rounded-2xl border border-border bg-bg-elevated px-3 py-2 text-sm text-muted">
                    {t.thinking}
                  </article>
                ) : null}
              </div>
            </div>

            <footer className="shrink-0 border-t border-border bg-bg-elevated/80 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex items-stretch gap-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={t.placeholder}
                    className="min-h-[44px] flex-1 rounded-xl border border-border bg-card px-3 py-2 text-sm text-fg outline-none transition placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent/30"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="shrink-0 rounded-xl border border-accent/40 bg-accent px-4 py-2 text-sm font-medium text-white shadow-inner transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t.send}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={clearHistory}
                  className="w-full rounded-xl border border-border bg-card py-2.5 text-center text-xs font-medium text-muted transition hover:border-accent/40 hover:bg-bg-elevated hover:text-fg"
                >
                  {t.clear}
                </button>
              </form>
            </footer>
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={t.open}
          aria-expanded={isOpen}
          className="group flex h-[3.75rem] min-w-[3.75rem] items-center justify-center gap-2 rounded-full border-2 border-accent/50 bg-card px-4 text-accent shadow-[0_12px_40px_rgba(37,99,235,.25)] ring-2 ring-accent/15 transition hover:border-accent hover:bg-accent-soft hover:shadow-[0_14px_44px_rgba(37,99,235,.35)] dark:shadow-[0_12px_40px_rgba(0,0,0,.5)] dark:ring-accent/25"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 text-accent"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 10.5h10M7 7.5h10M7 13.5h6m-9 6 2.9-2H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9.5a2 2 0 0 0 2 2h.5L4 19.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="max-w-[6rem] truncate text-left text-xs font-semibold leading-tight text-fg">
            {t.bubble}
          </span>
        </button>
      </div>
    </div>
  );
}
