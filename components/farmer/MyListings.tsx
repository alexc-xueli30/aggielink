"use client";

import { motion } from "framer-motion";
import { Award, MapPin, Sprout, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import type { Farm } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Roots: "#9c7327",
  Greens: "#458c55",
  Brassicas: "#286c3c",
  Alliums: "#74ad7e",
  Nightshades: "#cd7d5e",
  Squash: "#dbab5d",
  Fruit: "#b86244",
  Other: "#a9ccae",
};

function getCropCategory(crop: string): string {
  const c = crop.toLowerCase();
  if (["carrot", "beet", "radish", "turnip", "parsnip"].some((x) => c.includes(x))) return "Roots";
  if (["lettuce", "kale", "chard", "greens", "spinach", "arugula", "salad", "microgreen", "bok choy"].some((x) => c.includes(x))) return "Greens";
  if (["broccoli", "cauliflower", "cabbage", "brussels"].some((x) => c.includes(x))) return "Brassicas";
  if (["onion", "garlic", "leek", "shallot"].some((x) => c.includes(x))) return "Alliums";
  if (["tomato", "pepper", "eggplant"].some((x) => c.includes(x))) return "Nightshades";
  if (["squash", "zucchini", "pumpkin"].some((x) => c.includes(x))) return "Squash";
  if (["apple", "pear", "strawberr", "peach", "plum", "cherry", "berry", "melon"].some((x) => c.includes(x))) return "Fruit";
  return "Other";
}

function Stat({ big, unit, label }: { big: string; unit?: string; label: string }) {
  return (
    <div className="px-4 py-2.5 rounded-xl bg-cream-100/70 border border-forest-100">
      <div className="font-display text-xl text-forest-900 leading-none">
        {big}
        {unit && <span className="text-xs text-ink-subtle font-sans font-normal ml-0.5">{unit}</span>}
      </div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mt-1">{label}</div>
    </div>
  );
}

export default function MyListings({ farm }: { farm: Farm }) {
  const perCrop = Math.round(farm.weeklyCapacityLb / farm.topCrops.length);
  const [statuses, setStatuses] = useState<Record<string, boolean>>(
    Object.fromEntries(farm.topCrops.map((c) => [c, true]))
  );

  return (
    <div>
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.16em] text-forest-600">Section · 1 of 3</span>
          <h1 className="mt-1.5 font-display text-3xl md:text-4xl text-forest-900 leading-tight">
            My Crops
          </h1>
          <p className="mt-2 text-ink-muted max-w-xl text-pretty">
            {farm.name} · {farm.county} County. Manage your listed crops and weekly availability below.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Stat big={farm.weeklyCapacityLb.toString()} unit="lb" label="Total / week" />
          <Stat big={farm.certifications.length.toString()} label="Certs held" />
          <Stat big={`${farm.distanceMi} mi`} label="Delivery radius" />
        </div>
      </header>

      <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {farm.topCrops.map((crop, i) => {
          const category = getCropCategory(crop);
          const color = categoryColors[category] ?? categoryColors.Other;
          const isActive = statuses[crop];
          const initials = crop.slice(0, 2).toUpperCase();

          return (
            <motion.article
              key={crop}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="bg-cream-50 border border-forest-100 hover:border-forest-200 rounded-2xl p-5 shadow-soft transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="size-11 rounded-xl grid place-items-center text-cream-50 font-display text-base shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {initials}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-forest-900 leading-tight">{crop}</h3>
                    <span
                      className="inline-flex items-center gap-1 text-[11px] mt-0.5"
                      style={{ color }}
                    >
                      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
                      {category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setStatuses((s) => ({ ...s, [crop]: !s[crop] }))}
                  className="shrink-0 text-ink-subtle hover:text-forest-700 transition mt-1"
                  title={isActive ? "Mark as paused" : "Mark as available"}
                >
                  {isActive ? (
                    <ToggleRight className="size-6 text-forest-600" />
                  ) : (
                    <ToggleLeft className="size-6 text-ink-subtle" />
                  )}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <Sprout className="size-3 text-forest-600" />
                  {perCrop} lb / week
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3 text-forest-600" />
                  {farm.distanceMi} mi radius
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

              <div className="mt-4 pt-4 border-t border-forest-100/70 flex items-center justify-between">
                <span
                  className={`text-[11px] uppercase tracking-[0.14em] font-medium ${
                    isActive ? "text-forest-600" : "text-ink-subtle"
                  }`}
                >
                  {isActive ? "Available" : "Paused"}
                </span>
                <span className="text-[10px] text-ink-subtle">
                  {farm.practices.slice(0, 2).join(" · ")}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-forest-100 bg-cream-100/40 p-6">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mb-3 flex items-center gap-2">
          <Award className="size-3" />
          Certifications on file
        </div>
        <div className="flex flex-wrap gap-2">
          {farm.certifications.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-100 text-sm text-forest-800"
            >
              <Award className="size-3.5 text-forest-600" />
              {c}
            </span>
          ))}
        </div>
        <div className="mt-4 text-xs text-ink-subtle">
          Certifications are verified by AggieLink on your behalf. Contact support to update or add certifications.
        </div>
      </div>
    </div>
  );
}
