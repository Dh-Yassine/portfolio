import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { buildKnowledgeContext } from "@/lib/chatKnowledge";
import type { Locale } from "@/content/site-content";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  locale: Locale;
  messages: ChatMessage[];
};

function getApiErrorMessage(locale: Locale, details?: string) {
  if (locale === "fr") {
    return details
      ? `Le service IA n'a pas répondu correctement. Détail: ${details}`
      : "Le service IA n'a pas répondu correctement. Vérifiez GEMINI_API_KEY et redémarrez le serveur.";
  }
  return details
    ? `AI service did not respond correctly. Detail: ${details}`
    : "AI service did not respond correctly. Check GEMINI_API_KEY and restart the server.";
}

export async function POST(request: Request) {
  let locale: Locale = "en";
  let sources: string[] = [];
  let contextText = "";

  try {
    const body = (await request.json()) as ChatRequestBody;
    locale = body.locale === "fr" ? "fr" : "en";
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    const latestUserMessage = [...messages].reverse().find((msg) => msg.role === "user");

    if (!latestUserMessage?.content?.trim()) {
      return NextResponse.json({ error: "Missing user message." }, { status: 400 });
    }

    const knowledge = await buildKnowledgeContext(latestUserMessage.content, locale);
    contextText = knowledge.contextText;
    sources = knowledge.sources;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: getApiErrorMessage(locale, "GEMINI_API_KEY is missing in server environment."),
          sources,
        },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });
    const systemInstruction =
      locale === "fr"
        ? "Tu es l'assistant portfolio de Yassine Dhouibi. Tu dois répondre uniquement avec les informations présentes dans le CONTEXTE fourni (site + CV). Si l'information n'existe pas dans le contexte, réponds que tu ne sais pas et invite l'utilisateur à contacter Yassine directement. N'invente aucun fait."
        : "You are Yassine Dhouibi's portfolio assistant. You must answer only using facts from the provided CONTEXT (site + CV). If the information is missing from context, say you don't know and suggest contacting Yassine directly. Never invent facts.";
    const transcript = messages
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n");

    const result = await model.generateContent({
      generationConfig: {
        temperature: 0.2,
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemInstruction}\n\nCONTEXT:\n${contextText}\n\nCONVERSATION:\n${transcript}\n\nAnswer the user's latest question.`,
            },
          ],
        },
      ],
    });

    const answer = result.response.text().trim();
    if (!answer) {
      return NextResponse.json(
        {
          error: locale === "fr" ? "Réponse vide du modèle." : "Empty model response.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer, sources });
  } catch (error) {
    console.error("chat api error", error);
    const details =
      typeof error === "object" && error !== null && "message" in error && typeof error.message === "string"
        ? error.message
        : undefined;
    return NextResponse.json(
      {
        error: getApiErrorMessage(locale, details),
        sources,
      },
      { status: 502 },
    );
  }
}
