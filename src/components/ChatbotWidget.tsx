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
    <div className="fixed right-5 bottom-6 z-50 md:right-7 md:bottom-7">
      {isOpen ? (
        <section className="h-[72vh] w-[min(92vw,380px)] overflow-hidden rounded-3xl border border-border bg-card/95 shadow-2xl backdrop-blur">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h2 className="font-display text-sm font-semibold text-fg">{t.title}</h2>
              <p className="text-xs text-muted">{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted transition hover:border-accent hover:text-fg"
              aria-label={t.close}
            >
              ✕
            </button>
          </header>

          <div className="flex h-[calc(72vh-130px)] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto border border-accent/30 bg-accent-soft text-fg"
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

          <footer className="border-t border-border px-4 py-3">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={t.placeholder}
                  className="w-full rounded-xl border border-border bg-bg-elevated px-3 py-2 text-sm text-fg outline-none transition placeholder:text-muted focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-xl bg-accent px-3 py-2 text-sm font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.send}
                </button>
              </div>
              <button
                type="button"
                onClick={clearHistory}
                className="text-xs text-muted transition hover:text-fg"
              >
                {t.clear}
              </button>
            </form>
          </footer>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={t.open}
          className="accent-pulse flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent text-white shadow-lg transition hover:scale-[1.03]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            <path
              d="M7 10.5h10M7 7.5h10M7 13.5h6m-9 6 2.9-2H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9.5a2 2 0 0 0 2 2h.5L4 19.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
