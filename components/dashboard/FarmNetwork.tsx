"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Award, Sprout, RotateCcw, MapIcon, Package, CheckCircle } from "lucide-react";
import clsx from "clsx";
import { farms, type Farm } from "@/lib/mockData";

const filters = [
  { id: "all",     label: "All farms"       },
  { id: "organic", label: "Certified Organic" },
  { id: "local",   label: "Within 15 mi"   },
  { id: "newest",  label: "Joined recently" },
] as const;

type FilterId = (typeof filters)[number]["id"];

function filterFarms(list: Farm[], id: FilterId, q: string) {
  let out = list;
  if (id === "organic") {
    out = out.filter((f) =>
      f.certifications.some((c) => c === "USDA Organic" || c === "CCOF" || c === "Real Organic")
    );
  } else if (id === "local") {
    out = out.filter((f) => f.distanceMi <= 15);
  } else if (id === "newest") {
    out = out.filter((f) => f.joinedYear >= 2025);
  }
  if (q.trim()) {
    const needle = q.toLowerCase();
    out = out.filter(
      (f) =>
        f.name.toLowerCase().includes(needle) ||
        f.steward.toLowerCase().includes(needle) ||
        f.county.toLowerCase().includes(needle) ||
        f.topCrops.some((c) => c.toLowerCase().includes(needle))
    );
  }
  return out;
}

// Deterministic seasonality based on farm's top crop
const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function getSeasonality(farm: Farm): ("high" | "partial" | "low" | "off")[] {
  const crop = farm.topCrops[0]?.toLowerCase() ?? "";
  if (crop.includes("apple") || crop.includes("pear") || crop.includes("stone")) {
    return ["off","off","off","low","partial","partial","high","high","high","partial","low","off"];
  }
  if (crop.includes("tomato") || crop.includes("pepper") || crop.includes("squash")) {
    return ["off","off","off","off","low","high","high","high","partial","low","off","off"];
  }
  if (crop.includes("carrot") || crop.includes("beet") || crop.includes("root")) {
    return ["partial","low","low","partial","high","high","partial","partial","high","high","partial","partial"];
  }
  if (crop.includes("green") || crop.includes("kale") || crop.includes("lettuce") || crop.includes("chard")) {
    return ["high","high","high","partial","partial","low","off","off","partial","high","high","high"];
  }
  return ["partial","partial","partial","partial","high","high","high","high","partial","partial","partial","partial"];
}

const seasonColor: Record<string, string> = {
  high:    "bg-forest-700",
  partial: "bg-forest-300",
  low:     "bg-forest-100",
  off:     "bg-cream-100",
};

export default function FarmNetwork() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [q, setQ] = useState("");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [inPool, setInPool] = useState<Record<string, boolean>>({});

  const list = useMemo(() => filterFarms(farms, filter, q), [filter, q]);

  const toggleFlip = (id: string) => setFlipped((p) => ({ ...p, [id]: !p[id] }));
  const togglePool = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setInPool((p) => ({ ...p, [id]: !p[id] }));
  };

  return (
    <div>
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.16em] text-forest-600">Institution Workspace</span>
          <h1 className="mt-1.5 font-display text-3xl md:text-4xl text-forest-900 leading-tight">
            Farm Network
          </h1>
          <p className="mt-2 text-ink-muted max-w-xl text-pretty">
            {farms.length} small farms across {new Set(farms.map((f) => f.county)).size} counties currently in the pool.
            Each one supplies what they can, when they can.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Stat big={farms.length.toString()} label="Farms" />
          <Stat big={farms.reduce((s, f) => s + f.acres, 0).toString()} label="Acres" />
          <Stat
            big={Math.round(farms.reduce((s, f) => s + f.acres, 0) / farms.length).toString()}
            label="Avg acres"
          />
        </div>
      </header>

      <div className="mt-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-subtle" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search farms, stewards, crops…"
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-forest-100 bg-cream-50 focus:bg-white focus:border-forest-300 outline-none text-sm placeholder:text-ink-subtle transition"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={clsx(
                "px-3.5 py-1.5 rounded-full text-xs transition border",
                filter === f.id
                  ? "bg-forest-800 text-cream-50 border-forest-800"
                  : "bg-cream-50 text-ink border-forest-100 hover:border-forest-300"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-ink-subtle">
        <span>Showing {list.length} of {farms.length} farms</span>
        <span>·</span>
        <span className="flex items-center gap-1"><RotateCcw className="size-3" /> Click a card to flip</span>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((f, i) => (
          <FarmCard
            key={f.id}
            farm={f}
            index={i}
            isFlipped={!!flipped[f.id]}
            isInPool={!!inPool[f.id]}
            onFlip={() => toggleFlip(f.id)}
            onPool={(e) => togglePool(f.id, e)}
          />
        ))}
        {list.length === 0 && (
          <div className="col-span-full py-16 text-center text-ink-subtle text-sm">
            No farms match that filter. Try a different combination.
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ big, label }: { big: string; label: string }) {
  return (
    <div className="px-4 py-2 rounded-xl bg-cream-100/70 border border-forest-100">
      <div className="font-display text-xl text-forest-900 leading-none">{big}</div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mt-1">{label}</div>
    </div>
  );
}

interface FarmCardProps {
  farm: Farm;
  index: number;
  isFlipped: boolean;
  isInPool: boolean;
  onFlip: () => void;
  onPool: (e: React.MouseEvent) => void;
}

function FarmCard({ farm, index, isFlipped, isInPool, onFlip, onPool }: FarmCardProps) {
  const initials = farm.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const seasonality = getSeasonality(farm);
  const currentMonth = new Date().getMonth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 12) * 0.03 }}
      className="cursor-pointer"
      style={{ perspective: "1000px", height: "320px" }}
      onClick={onFlip}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* FRONT FACE */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 bg-cream-50 border border-forest-100 hover:border-forest-300 rounded-2xl p-5 shadow-soft hover:shadow-lift transition flex flex-col"
        >
          <div className="flex items-start gap-3">
            <div className="size-11 rounded-xl bg-forest-800 grid place-items-center text-cream-50 font-display text-base shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg text-forest-900 leading-tight truncate">{farm.name}</h3>
              <p className="text-xs text-ink-muted truncate">{farm.steward}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3 text-forest-600" />
              {farm.county} · {farm.distanceMi} mi
            </span>
            <span className="flex items-center gap-1.5">
              <Sprout className="size-3 text-forest-600" />
              {farm.acres} acres · {farm.yearsFarming} yrs
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-1">
            {farm.certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-50 border border-forest-100 text-[10px] text-forest-700"
              >
                <Award className="size-2.5" />
                {c}
              </span>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-forest-100/70">
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle">Top crops</div>
            <div className="mt-1.5 text-sm text-ink leading-snug">{farm.topCrops.join(" · ")}</div>
          </div>

          <div className="mt-auto pt-4 flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle">Weekly capacity</div>
              <div className="font-display text-xl text-forest-900 leading-none mt-0.5">
                {farm.weeklyCapacityLb}
                <span className="text-xs text-ink-subtle font-sans font-normal ml-1">lb</span>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.14em] text-forest-400 flex items-center gap-1">
              <RotateCcw className="size-3" /> flip
            </span>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 bg-cream-50 border border-forest-200 rounded-2xl p-5 shadow-soft flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base text-forest-900 leading-tight">{farm.name}</h3>
            <span className="text-[10px] uppercase tracking-[0.12em] text-ink-subtle flex items-center gap-1">
              <RotateCcw className="size-3" /> flip back
            </span>
          </div>

          {/* Seasonality heatmap */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-subtle mb-2">Seasonality</div>
            <div className="flex gap-0.5">
              {seasonality.map((level, mi) => (
                <div key={mi} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`h-5 w-full rounded-sm ${seasonColor[level]} ${mi === currentMonth ? "ring-1 ring-forest-700" : ""}`}
                    title={`${MONTH_ABBR[mi]}: ${level}`}
                  />
                  {mi % 3 === 0 && (
                    <span className="text-[8px] text-ink-subtle">{MONTH_ABBR[mi].slice(0, 1)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-cream-100/60 border border-forest-100 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-ink-subtle mb-1">
                <MapIcon className="size-3" /> Delivery radius
              </div>
              <div className="font-display text-xl text-forest-900">{farm.distanceMi} mi</div>
            </div>
            <div className="bg-cream-100/60 border border-forest-100 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-ink-subtle mb-1">
                <Package className="size-3" /> Avg fulfillment
              </div>
              <div className="font-display text-xl text-forest-900">
                {82 + (farm.yearsFarming % 15)}%
              </div>
            </div>
          </div>

          {/* Practices */}
          <div className="mt-3">
            <div className="text-[10px] uppercase tracking-[0.1em] text-ink-subtle mb-1.5">Practices</div>
            <div className="flex flex-wrap gap-1">
              {farm.practices.map((p) => (
                <span key={p} className="px-2 py-0.5 rounded-full bg-forest-50 border border-forest-100 text-[10px] text-forest-700">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Supplier pool action */}
          <div className="mt-auto pt-3">
            <button
              onClick={onPool}
              className={`w-full inline-flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium transition ${
                isInPool
                  ? "bg-forest-50 border border-forest-200 text-forest-700"
                  : "bg-forest-800 hover:bg-forest-700 text-cream-50 shadow-soft"
              }`}
            >
              {isInPool ? (
                <><CheckCircle className="size-3.5" /> In supplier pool</>
              ) : (
                <>Add to supplier pool</>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
