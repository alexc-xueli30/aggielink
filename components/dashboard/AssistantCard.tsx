"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw, Send, X, Minimize2 } from "lucide-react";
import type { Section } from "./Sidebar";

type FarmerSection = "listings" | "demand" | "season" | "certifications" | "matches";
type AnySection = Section | FarmerSection;

type Suggestion = { q: string; a: string };

interface Props {
  active: AnySection;
  portal: "institution" | "farmer";
  floating?: boolean;
}

const institutionSuggestions: Record<Section, Suggestion[]> = {
  "post-demand": [
    {
      q: "What crops are most undersupplied right now?",
      a: "Brassicas (broccoli, cauliflower) and winter squash are currently undersupplied at a 2:1 demand-to-supply ratio. Root vegetables are also running short heading into late spring.",
    },
    {
      q: "How long until my demand post gets fulfilled?",
      a: "Most open posts receive at least 3 farm responses within 48 hours. Posts with clear certification requirements and flexible delivery windows fill 40% faster on average.",
    },
    {
      q: "What's the minimum lead time I should allow?",
      a: "AggieLink recommends 7–10 days lead time for produce orders and 14+ days for specialty items or certified-organic requirements. Posts with under 5 days rarely fill from the network.",
    },
  ],
  delivery: [
    {
      q: "Is my delivery on track for this week?",
      a: "4 of 5 farm pickups are confirmed for this week's route. Solano Heritage is pending — their GAP paperwork renewal is still processing. AggieLink logistics is monitoring and will substitute if needed.",
    },
    {
      q: "What's the expected delivery window?",
      a: "This week's consolidated delivery is routed for 10:00 AM – 11:30 AM on Tuesday. The driver departs Knights Landing at 8:20 AM after the final pickup.",
    },
    {
      q: "How does AggieLink handle delivery exceptions?",
      a: "If a farm cannot fulfill on the scheduled date, AggieLink automatically reallocates their line item to the next closest network farm with available supply — maintaining order continuity.",
    },
  ],
  forecast: [
    {
      q: "What should we expect from the network next quarter?",
      a: "Q3 supply looks strong for stone fruit, summer brassicas, and tomatoes. Winter squash is forecast to peak in late September. Total network capacity is projected to grow 18% as 4 new farms complete onboarding.",
    },
    {
      q: "Are there supply risks I should plan for?",
      a: "Drought conditions in Solano County may reduce apple yields by 15–20% in July. AggieLink recommends posting forward demand now for apples and stone fruit to lock in Yolo County alternatives.",
    },
    {
      q: "How accurate are the weekly volume forecasts?",
      a: "AggieLink's weekly forecasts have a historical accuracy of ±12% at the network level. Individual farm-level forecasts vary more — the aggregation model smooths farm-level variability significantly.",
    },
  ],
  network: [
    {
      q: "Which farms could supply 200 lb of carrots next week?",
      a: "Three farms in the network have flagged carrot availability for next week: Putah Creek (90 lb), Madison Acre (60 lb), and Three Sisters Heritage (50 lb). Combined that's 200 lb — exactly your target.",
    },
    {
      q: "Show me only the certified-organic growers.",
      a: "11 farms hold a USDA Organic, CCOF, or Real Organic certification. Together they represent 234 weekly capacity-pounds across roots, greens, brassicas, and squash.",
    },
    {
      q: "Any new farms onboarded recently?",
      a: "Four farms joined this season: Yolo Greenway Acres, Suisun Marsh Gardens, Russell Boulevard Greens, and Coyote Hill Produce — all under 12 acres.",
    },
  ],
  order: [
    {
      q: "How does this week compare to last week?",
      a: "This week's combined order is 220 lb larger than last week's, mostly from a stronger broccoli flush and one new line item (mixed salad greens) coming online.",
    },
    {
      q: "What's our heaviest line item?",
      a: "Apples, at 360 lb, drawn from three orchards (Solano Heritage, Esparto Hill, Buckhorn Ranch). It's the largest single line in this week's order.",
    },
    {
      q: "Which farms contributed to multiple lines?",
      a: "Capay Hills covered three lines (tomatoes, peppers, zucchini). Putah Creek, Madison Acre, and West Plainfield Co-op each covered two. The rest are single-line contributors this week.",
    },
  ],
  impact: [
    {
      q: "Summarize this season in one sentence.",
      a: "Across 12 weeks, AggieLink combined supply from 22 small farms into roughly 38,400 pounds of food delivered to four institutional buyers — without any single farm needing to grow beyond what it already does.",
    },
    {
      q: "What's our largest crop category?",
      a: "Fruit leads at about 9,200 lb this season, driven mostly by stone-fruit and apple orchards in Solano and northern Yolo counties.",
    },
    {
      q: "How spread out is our farm network?",
      a: "Twelve farms in Yolo, seven in Solano, three in Sacramento. The geographic concentration is intentional — it keeps deliveries efficient and trucks short-haul.",
    },
  ],
};

const farmerSuggestions: Record<FarmerSection, Suggestion[]> = {
  certifications: [
    {
      q: "What certifications would give me the most buyer access?",
      a: "GAP certification unlocks 3 hospital accounts immediately. USDA Organic opens 8 of 9 buyers in the network and typically commands a 12–18% price premium over conventional pricing.",
    },
    {
      q: "Which buyers require organic certification?",
      a: "UC Davis Dining requires USDA Organic or CCOF for their produce-only contract. Sutter Davis accepts Certified Naturally Grown for most categories. The DJUSD contract requires GAP but not organic.",
    },
    {
      q: "How far does my delivery radius reach?",
      a: "Your current radius covers 4 of 5 active AggieLink demand zones. The Sacramento County zone — home to 3 institutional buyers — falls just outside. Extending to 32 miles would bring all zones into reach.",
    },
  ],
  matches: [
    {
      q: "Which match should I prioritize?",
      a: "Based on your crop profile, the UC Davis Dining carrot request is your strongest match — your weekly capacity of 240 lb exactly meets their specification, and your USDA Organic cert satisfies their requirement.",
    },
    {
      q: "Can I fulfill multiple demand posts at once?",
      a: "Yes. AggieLink pools your supply across multiple buyers. If your weekly capacity is 240 lb, the system can split that across 2–3 demand posts simultaneously — you don't need to choose one.",
    },
    {
      q: "What happens after I express interest?",
      a: "AggieLink notifies the buyer's procurement team. If your supply fits their window, you'll be added to the aggregated order for that delivery week. No individual negotiation is required.",
    },
  ],
  listings: [
    {
      q: "What demand opportunities match my crops?",
      a: "Based on your listings, UC Davis Dining has an open demand post for 200 lb/wk of kale through July — your current capacity of 180 lb/wk is a strong match. Sutter Davis also posted for salad mix, which aligns with your greens rotation.",
    },
    {
      q: "How can I improve my listing visibility?",
      a: "Adding a delivery radius and a weekly availability window to each listing increases match rate by roughly 40%. Institutions filter heavily on delivery logistics before they look at price.",
    },
    {
      q: "What certifications would expand my buyer access?",
      a: "USDA Organic certification opens you to 8 additional buyers in the AggieLink network. GAP certification is required by 3 of the 4 current hospital accounts. Both pay 12–18% premium over conventional pricing.",
    },
  ],
  demand: [
    {
      q: "Which open demand posts fit my delivery radius?",
      a: "Three active posts are within your 25-mile delivery radius: UC Davis Dining (carrots, 320 lb/wk), Woodland Community College (salad mix, 60 lb/wk), and Davis Joint Unified (apples, 400 lb/wk). Your orchard varieties match the apple spec.",
    },
    {
      q: "What should I plant for next season based on current demand?",
      a: "The highest unmet demand in the network right now is for brassicas (broccoli, cauliflower) and winter squash. Demand posts for these outpace current supply by about 2:1. Root vegetables are also undersupplied heading into fall.",
    },
    {
      q: "Which institution is the best match for my capacity?",
      a: "Given your current output of ~180 lb/wk, Sutter Davis Hospital is your strongest match — their weekly demand is 80–120 lb across 3 crop types, and they prefer farms with 15–25 mi delivery radius. UC Davis Dining would require pooled fulfillment.",
    },
  ],
  season: [
    {
      q: "What crops have the strongest seasonal demand right now?",
      a: "Week 19 demand is strongest for summer brassicas (broccoli, kohlrabi) and stone fruit. Tomato demand ramps up in 3–4 weeks. If you have early-season peppers, three institutions have open posts that won't be filled until mid-June.",
    },
    {
      q: "How does my farm compare to others in the network?",
      a: "Your weekly capacity of 180 lb/wk puts you in the top third of the network by volume. Your certifications match 7 of 9 active institutional buyers. Your delivery radius covers 4 of 5 demand zones — only the Sacramento County zone falls outside.",
    },
    {
      q: "What are the upcoming institutional RFP windows?",
      a: "Three RFP windows open in the next 6 weeks: UC Davis Dining (June 1, 12-month contract, ~$180K), Woodland Unified (June 15, produce only), and Sutter Health system-wide (July 1, multi-county, requires pooled fulfillment through AggieLink).",
    },
  ],
};

const sectionLabels: Record<AnySection, string> = {
  network: "Farm Network",
  order: "Aggregated Order",
  impact: "Impact Insights",
  "post-demand": "Post Demand",
  delivery: "Delivery",
  forecast: "Forecast",
  listings: "My Listings",
  demand: "Demand Feed",
  season: "Season Calendar",
  certifications: "Certifications",
  matches: "Matched Opportunities",
};

export default function AssistantCard({ active, portal, floating = false }: Props) {
  const [chosen, setChosen] = useState<Suggestion | null>(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [typed, setTyped] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setChosen(null);
    setPrompt("");
    setResponse("");
    setError("");
    setIsLoading(false);
    setTyped("");
  }, [active]);

  useEffect(() => {
    const answerText = response || chosen?.a || "";
    if (!answerText) {
      setTyped("");
      return;
    }
    setTyped("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(answerText.slice(0, i));
      if (i >= answerText.length) clearInterval(interval);
    }, 14);
    return () => clearInterval(interval);
  }, [chosen, response]);

  const submitPrompt = async (value: string) => {
    const question = value.trim();
    if (!question || isLoading) return;

    setIsLoading(true);
    setError("");
    setChosen({ q: question, a: "" });
    setResponse("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question, section: sectionLabels[active] }),
      });

      const data = (await res.json()) as { answer?: string; error?: string };

      if (!res.ok || !data.answer) {
        throw new Error(data.error || "Gemini request failed.");
      }

      setResponse(data.answer);
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reach Gemini right now.");
      setChosen(null);
    } finally {
      setIsLoading(false);
    }
  };

  const tips =
    portal === "farmer"
      ? farmerSuggestions[active as FarmerSection] ?? farmerSuggestions.listings
      : institutionSuggestions[active as Section] ?? institutionSuggestions.network;

  const cardContent = (
    <div className="rounded-2xl border border-forest-200/60 bg-gradient-to-br from-forest-900 to-forest-800 text-cream-50 p-5 shadow-lift relative overflow-hidden">
      <div className="absolute -top-16 -right-16 size-48 rounded-full bg-forest-600/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-12 size-44 rounded-full bg-wheat-500/10 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-full bg-cream-50/10 grid place-items-center">
              <Sparkles className="size-3.5 text-cream-50" />
            </div>
            <div>
              <div className="text-sm font-medium leading-tight">Ask AggieLink</div>
              <div className="text-[10px] text-forest-200 uppercase tracking-[0.14em]">
                {sectionLabels[active]}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {chosen && (
              <button
                onClick={() => {
                  setChosen(null);
                  setResponse("");
                  setError("");
                }}
                className="text-[10px] text-forest-200 hover:text-cream-50 inline-flex items-center gap-1 transition"
              >
                <RotateCcw className="size-3" /> reset
              </button>
            )}
            {floating && (
              <button
                onClick={() => setExpanded(false)}
                className="ml-1 text-forest-200 hover:text-cream-50 transition"
                aria-label="Minimize assistant"
              >
                <Minimize2 className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submitPrompt(prompt);
          }}
          className="mt-4 rounded-xl border border-cream-50/15 bg-black/15 p-2"
        >
          <label htmlFor="gemini-prompt" className="sr-only">
            Ask Gemini
          </label>
          <div className="flex items-center gap-2">
            <input
              id="gemini-prompt"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Ask about ${sectionLabels[active].toLowerCase()}…`}
              className="w-full bg-transparent text-sm text-cream-50 placeholder:text-forest-200/90 outline-none px-2 py-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="shrink-0 inline-flex items-center justify-center size-8 rounded-md bg-wheat-400 text-forest-900 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-wheat-300"
            >
              <Send className="size-4" />
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {!chosen && !error ? (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <p className="text-xs text-forest-100 leading-relaxed">
                Quick questions about this section:
              </p>
              <div className="mt-3 flex flex-col gap-1.5">
                {tips.map((t) => (
                  <button
                    key={t.q}
                    onClick={() => {
                      setPrompt(t.q);
                      void submitPrompt(t.q);
                    }}
                    className="group text-left text-xs px-3 py-2 rounded-lg bg-cream-50/5 hover:bg-cream-50/10 border border-cream-50/10 transition flex items-center gap-2"
                  >
                    <span className="flex-1 text-cream-50/95">{t.q}</span>
                    <ArrowRight className="size-3 text-forest-200 group-hover:translate-x-0.5 transition shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4"
            >
              <div className="rounded-lg border border-red-300/40 bg-red-900/20 p-3 text-xs text-red-100 leading-relaxed">
                {error}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4"
            >
              <div className="text-xs text-forest-200 italic leading-relaxed">&ldquo;{chosen!.q}&rdquo;</div>
              <div className="mt-3 text-sm leading-relaxed text-cream-50/95">
                {isLoading ? "Gemini is thinking…" : typed}
                {!isLoading && typed.length < (response || chosen!.a).length && (
                  <span className="inline-block w-1 h-4 align-middle bg-cream-50/70 ml-0.5 animate-pulse" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 pt-4 border-t border-cream-50/10 text-[10px] text-forest-200 leading-relaxed">
          Prompts are routed through Gemini to produce concise answers grounded in current network context.
        </div>
      </div>
    </div>
  );

  if (floating) {
    return (
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="floating-card"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-80"
            >
              {cardContent}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setExpanded((v) => !v)}
          className="size-12 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-50 shadow-lift flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          aria-label={expanded ? "Close Gemini assistant" : "Open Gemini assistant"}
        >
          {expanded ? <X className="size-4" /> : <Sparkles className="size-4" />}
        </motion.button>
      </div>
    );
  }

  return cardContent
}
