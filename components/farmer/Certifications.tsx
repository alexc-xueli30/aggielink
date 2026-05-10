"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Leaf, Award, Check } from "lucide-react";
import type { Farm } from "@/lib/data";

const certDetails: Record<string, { color: string; bg: string; border: string; unlocks: string }> = {
  "USDA Organic": {
    color: "text-forest-800",
    bg: "bg-forest-50",
    border: "border-forest-200",
    unlocks: "Access to 8 of 9 institutional buyers; 12–18% price premium over conventional",
  },
  "CCOF": {
    color: "text-forest-700",
    bg: "bg-forest-50",
    border: "border-forest-200",
    unlocks: "California-specific organic certification accepted by all UC and CSU dining programs",
  },
  "Real Organic": {
    color: "text-wheat-800",
    bg: "bg-wheat-400/10",
    border: "border-wheat-400/30",
    unlocks: "Premium label recognized by farm-direct buyers; differentiates from USDA on soil standards",
  },
  "GAP": {
    color: "text-forest-800",
    bg: "bg-forest-50",
    border: "border-forest-200",
    unlocks: "Required by 3 of 4 current hospital accounts; mandatory for school district contracts",
  },
  "Certified Naturally Grown": {
    color: "text-ink",
    bg: "bg-cream-100",
    border: "border-forest-100",
    unlocks: "Recognized by co-ops and natural food buyers; lower cost than USDA Organic certification",
  },
};

const suggestedCerts: { cert: string; reason: string; priority: "high" | "medium" }[] = [
  { cert: "GAP Certified", reason: "Required by 3 active hospital accounts in the network.", priority: "high" },
  { cert: "USDA Organic", reason: "Opens 8 additional buyer relationships and 12–18% price premium.", priority: "medium" },
];

export default function Certifications({ farm }: { farm: Farm }) {
  const heldCerts = farm.certifications;

  const radiusPercent = Math.min(100, (farm.distanceMi / 50) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-forest-900 leading-tight">Certifications</h1>
        <p className="mt-1.5 text-ink-muted">
          Your compliance credentials and delivery coverage.
        </p>
      </div>

      {/* Certification badges */}
      <div>
        <h2 className="font-display text-xl text-forest-900 mb-4">Your certifications</h2>
        {heldCerts.length === 0 ? (
          <div className="bg-cream-100/60 border border-forest-100 rounded-2xl p-6 text-ink-muted text-sm">
            No certifications on file yet. Adding certifications significantly increases buyer access.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {heldCerts.map((cert, i) => {
              const details = certDetails[cert] ?? {
                color: "text-ink",
                bg: "bg-cream-100",
                border: "border-forest-100",
                unlocks: "Accepted by AggieLink network buyers.",
              };
              return (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className={`rounded-2xl border p-5 shadow-soft ${details.bg} ${details.border}`}
                >
                  <div className={`flex items-center gap-2.5 mb-3`}>
                    <div className="size-8 rounded-full bg-forest-800 grid place-items-center">
                      <ShieldCheck className="size-4 text-cream-50" strokeWidth={2} />
                    </div>
                    <span className={`font-medium text-sm ${details.color}`}>{cert}</span>
                    <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-800/10 text-forest-800 text-[10px] uppercase tracking-[0.12em]">
                      <Check className="size-2.5" strokeWidth={2.5} /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{details.unlocks}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delivery radius */}
      <div className="bg-cream-50 border border-forest-100 rounded-2xl p-6 shadow-soft">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="size-8 rounded-full bg-forest-50 border border-forest-200 grid place-items-center">
            <MapPin className="size-4 text-forest-700" />
          </div>
          <h2 className="font-display text-xl text-forest-900">Delivery Radius</h2>
        </div>

        <div className="flex items-end gap-4">
          <div>
            <div className="font-display text-5xl text-forest-900 leading-none">{farm.distanceMi}</div>
            <div className="text-sm text-ink-muted mt-1">miles from {farm.county} County</div>
          </div>
          <div className="flex-1 pb-1">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.12em] text-ink-subtle mb-1.5">
              <span>0 mi</span>
              <span>50 mi</span>
            </div>
            <div className="h-2.5 rounded-full bg-forest-50 border border-forest-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-forest-700"
                style={{ width: `${radiusPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          {[
            { label: "Demand zones covered", value: "4 of 5" },
            { label: "Active buyers in radius", value: "3" },
            { label: "Drive time (approx)", value: `${Math.round(farm.distanceMi * 1.3)} min` },
          ].map((s) => (
            <div key={s.label} className="bg-cream-100/60 border border-forest-100 rounded-xl p-3">
              <div className="font-display text-xl text-forest-900">{s.value}</div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-ink-subtle mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested certifications */}
      <div>
        <h2 className="font-display text-xl text-forest-900 mb-2">Certifications to consider</h2>
        <p className="text-sm text-ink-muted mb-4">
          Based on your current crop profile and active buyer demand in the network.
        </p>
        <div className="space-y-3">
          {suggestedCerts.map((s) => (
            <div
              key={s.cert}
              className="flex items-start gap-4 p-4 rounded-2xl bg-cream-50 border border-forest-100 shadow-soft"
            >
              <div className="size-8 rounded-full bg-wheat-400/20 border border-wheat-400/30 grid place-items-center shrink-0">
                <Award className="size-4 text-wheat-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-forest-900 text-sm">{s.cert}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.1em] ${
                      s.priority === "high"
                        ? "bg-clay-400/15 text-clay-500 border border-clay-400/30"
                        : "bg-wheat-400/10 text-wheat-700 border border-wheat-400/20"
                    }`}
                  >
                    {s.priority === "high" ? "High impact" : "Recommended"}
                  </span>
                </div>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">{s.reason}</p>
              </div>
              <Leaf className="size-4 text-forest-400 shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
