import { NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY. Add it to your environment variables." },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as { prompt?: string; section?: string };
    const prompt = body.prompt?.trim();
    const section = body.section?.trim() || "Dashboard";

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const systemContext = [
      "You are AggieLink Assistant, an AI copilot for a premium climate-tech SaaS dashboard.",
      "AggieLink aggregates small local farms into institution-ready pooled supply.",
      "Keep answers concise, practical, and decision-oriented for institutional buyers and ops teams.",
      "Avoid speculation. If data is missing, clearly state assumptions and suggest next actions.",
      `Current section focus: ${section}.`,
    ].join(" ");

    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemContext}\n\nUser question: ${prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topP: 0.9,
          maxOutputTokens: 350,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorPayload = await geminiResponse.text();
      return NextResponse.json(
        { error: `Gemini API error: ${errorPayload}` },
        { status: geminiResponse.status }
      );
    }

    const data = (await geminiResponse.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!answer) {
      return NextResponse.json(
        { error: "Gemini did not return a text response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json(
      { error: "Failed to process the Gemini request." },
      { status: 500 }
    );
  }
}
