"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { Farm } from "@/lib/data";

type Availability = "high" | "partial" | "low" | "off";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const CROP_SEASONS: Record<string, Availability[]> = {
  Lettuce:      ["high","high","high","high","high","partial","low","low","partial","high","high","high"],
  Kale:         ["high","high","high","high","high","partial","low","low","partial","high","high","high"],
  Chard:        ["high","high","high","high","high","partial","partial","partial","high","high","high","high"],
  Carrots:      ["high","high","high","high","partial","low","low","low","partial","high","high","high"],
  Beets:        ["high","high","high","high","partial","off","off","off","partial","high","high","high"],
  Tomatoes:     ["off","off","off","off","partial","high","high","high","high","partial","off","off"],
  Peppers:      ["off","off","off","off","partial","high","high","high","partial","off","off","off"],
  Squash:       ["off","off","off","partial","high","high","high","partial","off","off","off","off"],
  Apples:       ["off","off","off","off","off","off","partial","high","high","high","partial","off"],
  Strawberries: ["partial","partial","high","high","high","partial","off","off","off","off","partial","partial"],
  default:      ["partial","partial","partial","partial","partial","partial","partial","partial","partial","partial","partial","partial"],
};

function getAvailability(crop: string, monthIdx: number): Availability {
  const key = Object.keys(CROP_SEASONS).find((k) =>
    crop.toLowerCase().includes(k.toLowerCase())
  ) ?? "default";
  return CROP_SEASONS[key][monthIdx];
}

function blendAvailability(avs: Availability[]): Availability {
  if (avs.includes("high")) return "high";
  if (avs.includes("partial")) return "partial";
  if (avs.includes("low")) return "low";
  return "off";
}

const cfg: Record<Availability, { bg: string; label: string }> = {
  high:    { bg: "bg-forest-700",  label: "Peak" },
  partial: { bg: "bg-forest-200",  label: "Partial" },
  low:     { bg: "bg-cream-200",   label: "Low" },
  off:     { bg: "bg-cream-100",   label: "Off-season" },
};

function MonthBar({ crop, currentMonth }: { crop: string; currentMonth: number }) {
  return (
    <div className="flex gap-0.5 flex-1">
      {MONTHS.map((m, mIdx) => {
        const av = getAvailability(crop, mIdx);
        return (
          <div
            key={mIdx}
            className={clsx(
              "flex-1 h-7 rounded-sm transition",
              cfg[av].bg,
              mIdx === currentMonth && "ring-2 ring-forest-500 ring-offset-1"
            )}
            title={`${m}: ${cfg[av].label}`}
          />
        );
      })}
    </div>
  );
}

function CombinedBar({ crops, currentMonth }: { crops: string[]; currentMonth: number }) {
  return (
    <div className="flex gap-0.5 flex-1">
      {MONTHS.map((m, mIdx) => {
        const avs = crops.map((c) => getAvailability(c, mIdx));
        const blended = blendAvailability(avs);
        return (
          <div
            key={mIdx}
            className={clsx(
              "flex-1 h-7 rounded-sm",
              cfg[blended].bg,
              mIdx === currentMonth && "ring-2 ring-forest-500 ring-offset-1"
            )}
            title={`${m}: ${cfg[blended].label}`}
          />
        );
      })}
    </div>
  );
}

export default function SeasonCalendar({ farm }: { farm: Farm }) {
  const currentMonth = new Date().getMonth();

  return (
    <div>
      <header>
        <span className="text-xs uppercase tracking-[0.16em] text-forest-600">Section · 3 of 3</span>
        <h1 className="mt-1.5 font-display text-3xl md:text-4xl text-forest-900 leading-tight">
          My Season
        </h1>
        <p className="mt-2 text-ink-muted max-w-xl text-pretty">
          Seasonal availability forecast for {farm.name}. Buyers use this to plan demand in advance.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-3">
        {(Object.entries(cfg) as [Availability, typeof cfg[Availability]][]).map(([key, c]) => (
          <span key={key} className="inline-flex items-center gap-2 text-xs text-ink-muted">
            <span className={clsx("size-3 rounded-sm", c.bg)} />
            {c.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-2 text-xs text-ink-muted">
          <span className="size-3 rounded-sm bg-forest-200 ring-2 ring-forest-500 ring-offset-1" />
          Current month
        </span>
      </div>

      <div className="mt-6 rounded-2xl border border-forest-100 bg-cream-50 overflow-hidden">
        {/* Month header */}
        <div className="flex items-center gap-3 px-5 py-3 bg-cream-100/50 border-b border-forest-100">
          <div className="w-32 shrink-0 text-[10px] uppercase tracking-[0.14em] text-ink-subtle">Crop</div>
          <div className="flex gap-0.5 flex-1">
            {MONTHS.map((m, i) => (
              <div
                key={m}
                className={clsx(
                  "flex-1 text-center text-[9px] uppercase tracking-[0.08em]",
                  i === currentMonth ? "text-forest-700 font-semibold" : "text-ink-subtle"
                )}
              >
                {m}
              </div>
            ))}
          </div>
        </div>

        {farm.topCrops.map((crop, cropIdx) => (
          <motion.div
            key={crop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: cropIdx * 0.08 }}
            className="flex items-center gap-3 px-5 py-3 border-b border-forest-100/70 last:border-b-0"
          >
            <div className="w-32 shrink-0 text-sm font-medium text-forest-900 truncate">{crop}</div>
            <MonthBar crop={crop} currentMonth={currentMonth} />
          </motion.div>
        ))}

        <div className="flex items-center gap-3 px-5 py-3 border-t border-forest-200 bg-cream-100/40">
          <div className="w-32 shrink-0 text-[11px] uppercase tracking-[0.12em] text-ink-subtle">Combined</div>
          <CombinedBar crops={farm.topCrops} currentMonth={currentMonth} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-forest-100 bg-cream-100/40 p-6">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mb-3">
          Forward demand visibility
        </div>
        <p className="text-sm text-ink leading-relaxed">
          Institutions can see your seasonal forecast 3 months ahead. This lets buyers like UC Davis Dining
          plan their orders before your peak season — reducing last-minute gaps and improving order consistency.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink-muted">
          <span>Joined network: {farm.joinedYear}</span>
          <span>·</span>
          <span>{farm.yearsFarming} years farming</span>
          <span>·</span>
          <span>{farm.acres} acres</span>
        </div>
      </div>
    </div>
  );
}
