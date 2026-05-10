import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function buildSystemPrompt(context: {
  farms: Array<{
    name: string;
    county: string;
    distanceMi: number;
    acres: number;
    weeklyCapacityLb: number;
    joinedYear: number;
    certifications: string[];
    topCrops: string[];
    steward: string;
  }>;
  order: {
    weekOf: string;
    buyer: string;
    totalLb: number;
    lineCount: number;
    contributingFarms: number;
    lines: Array<{ crop: string; amountLb: number; category: string }>;
  };
  impact: {
    poundsThisSeason: number;
    farmsSupported: number;
    institutionsServed: number;
    acresInNetwork: number;
    byCategory: Array<{ category: string; lb: number }>;
    byCounty: Array<{ county: string; farms: number }>;
    institutions: Array<{ name: string; since: number }>;
  };
}) {
  const { farms, order, impact } = context;

  const farmList = farms
    .map(
      (f) =>
        `- ${f.name} (steward: ${f.steward}, ${f.county} County, ${f.distanceMi} mi away): ` +
        `${f.acres} acres, ${f.weeklyCapacityLb} lb/week capacity, joined ${f.joinedYear}. ` +
        `Certifications: ${f.certifications.join(", ")}. Top crops: ${f.topCrops.join(", ")}.`
    )
    .join("\n");

  const lineItems = order.lines
    .map((l) => `${l.crop} (${l.category}): ${l.amountLb} lb`)
    .join(", ");

  const categoryBreakdown = impact.byCategory
    .map((c) => `${c.category}: ${c.lb.toLocaleString()} lb`)
    .join(", ");

  const countyBreakdown = impact.byCounty
    .map((c) => `${c.county} (${c.farms} farms)`)
    .join(", ");

  const institutionList = impact.institutions
    .map((i) => `${i.name} (since ${i.since})`)
    .join(", ");

  return `You are the AggieLink assistant helping staff understand their local farm supply network.
Be concise and specific — answer in 2-4 sentences maximum. Always use real numbers from the data below.
Do not make up any data that is not provided. If a question cannot be answered from the data, say so briefly.

FARM NETWORK (${farms.length} farms total):
${farmList}

CURRENT WEEKLY ORDER (${order.weekOf}):
Buyer: ${order.buyer}
Total: ${order.totalLb.toLocaleString()} lb across ${order.lineCount} line items from ${order.contributingFarms} farms
Line items: ${lineItems}

SEASON IMPACT:
Total supplied: ${impact.poundsThisSeason.toLocaleString()} lb
Farms in network: ${impact.farmsSupported}
Institutions served: ${institutionList}
Total acreage: ${impact.acresInNetwork} acres
By crop category: ${categoryBreakdown}
By county: ${countyBreakdown}`;
}

export async function POST(req: NextRequest) {
  try {
    const { message, section, context } = await req.json();

    if (!message || !context) {
      return NextResponse.json({ error: "Missing message or context" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: buildSystemPrompt(context),
    });

    const result = await model.generateContent(
      `The user is currently viewing the "${section}" section of the dashboard. Their question: ${message}`
    );

    const answer = result.response.text();
    return NextResponse.json({ answer });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
