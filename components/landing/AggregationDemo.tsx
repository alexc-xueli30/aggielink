"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sprout, Truck, ShieldCheck, FileText, CheckCircle2, ArrowRight } from "lucide-react";

type Phase = "idle" | "animating" | "pooled" | "po-shown";

interface FarmNode {
  name: string;
  crop: string;
  lb: number;
  left: string;
  top: string;
  anim: { x: number; y: number };
  pool: { x: number; y: number };
}

// Each card's center-to-container-center delta, at 65% and 100% of journey.
// Calculated for a conceptual 800×440 canvas with center at (400, 220).
const farmNodes: FarmNode[] = [
  {
    name: "Putah Creek", crop: "Carrots", lb: 240,
    left: "6%", top: "8%",
    anim: { x: 182, y: 102 },
    pool: { x: 280, y: 157 },
  },
  {
    name: "Capay Hills", crop: "Tomatoes", lb: 320,
    left: "70%", top: "4%",
    anim: { x: -151, y: 113 },
    pool: { x: -232, y: 174 },
  },
  {
    name: "Yolo Greenway", crop: "Greens", lb: 110,
    left: "2%", top: "48%",
    anim: { x: 203, y: -12 },
    pool: { x: 312, y: -19 },
  },
  {
    name: "Solano Heritage", crop: "Apples", lb: 410,
    left: "76%", top: "46%",
    anim: { x: -182, y: -6 },
    pool: { x: -280, y: -10 },
  },
  {
    name: "Coyote Hill", crop: "Berries", lb: 90,
    left: "7%", top: "82%",
    anim: { x: 177, y: -110 },
    pool: { x: 272, y: -169 },
  },
  {
    name: "Madison Acre", crop: "Beets", lb: 95,
    left: "68%", top: "79%",
    anim: { x: -140, y: -101 },
    pool: { x: -216, y: -156 },
  },
];

// Quadratic bezier paths from each card's center to canvas center (400, 220).
// viewBox: "0 0 800 440"
const linePaths = [
  "M 120 63 Q 260 141 400 220",
  "M 632 46 Q 516 133 400 220",
  "M 88 239 Q 244 229 400 220",
  "M 680 230 Q 540 225 400 220",
  "M 128 389 Q 264 304 400 220",
  "M 616 376 Q 508 298 400 220",
];

const steps = ["Farms list supply", "Demand posted", "AggieLink aggregates", "PO generated"];
const phaseOrder: Phase[] = ["idle", "animating", "pooled", "po-shown"];

function getPhaseIdx(phase: Phase) {
  return phaseOrder.indexOf(phase);
}

function getFarmAnimate(node: FarmNode, phase: Phase) {
  if (phase === "idle") return { x: 0, y: 0, opacity: 1, scale: 1 };
  if (phase === "animating") return { x: node.anim.x, y: node.anim.y, opacity: 0.6, scale: 0.84 };
  return { x: node.pool.x, y: node.pool.y, opacity: 0, scale: 0.2 };
}

export default function AggregationDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const canvasRef = useRef<HTMLDivElement>(null);
  const inView = useInView(canvasRef, { once: true, margin: "-80px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    setPhase("animating");
    const t = setTimeout(() => setPhase("pooled"), 1900);
    return () => clearTimeout(t);
  }, [inView]);

  const phaseIdx = getPhaseIdx(phase);

  return (
    <section className="py-28 px-6 lg:px-10 border-t border-forest-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.18em] text-forest-600">The aggregation engine</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-forest-900 leading-[1.05] text-balance">
              Watch the supply pool{" "}
              <span className="italic text-forest-600">form in real time.</span>
            </h2>
            <p className="mt-5 text-ink-muted leading-relaxed text-pretty">
              Six farms. One institutional order. AggieLink combines individual supply into a single
              coordinated fulfillment — no farm carries the full load alone.
            </p>
          </div>

          {/* Step progress pills */}
          <div className="flex flex-wrap lg:flex-col gap-2 lg:items-end">
            {steps.map((label, i) => (
              <div
                key={label}
                className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs transition-all duration-500 ${
                  phaseIdx >= i
                    ? "bg-forest-800 text-cream-50 border-forest-800"
                    : "bg-transparent text-ink-subtle border-forest-100"
                }`}
              >
                <span
                  className={`size-5 rounded-full grid place-items-center text-[10px] font-semibold shrink-0 transition-all duration-300 ${
                    phaseIdx > i
                      ? "bg-forest-600 text-cream-50"
                      : phaseIdx === i
                      ? "bg-cream-50/20 text-cream-50"
                      : "bg-forest-50 text-forest-700"
                  }`}
                >
                  {phaseIdx > i ? "✓" : i + 1}
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Animation canvas */}
        <div
          ref={canvasRef}
          className="relative h-[380px] md:h-[440px] max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-cream-100/80 via-cream-50/60 to-cream-200/50 border border-forest-100 overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 rounded-full bg-forest-400/5 blur-3xl pointer-events-none" />

          {/* SVG lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 440"
            fill="none"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="agg-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#286c3c" stopOpacity="0" />
                <stop offset="45%" stopColor="#286c3c" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#286c3c" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            {linePaths.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="url(#agg-line)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: phase !== "idle" ? 1 : 0,
                  opacity: phase === "animating" ? 1 : 0,
                }}
                transition={{
                  pathLength: { duration: 0.65, delay: phase !== "idle" ? i * 0.07 : 0, ease: "easeOut" },
                  opacity: { duration: 0.35 },
                }}
              />
            ))}
          </svg>

          {/* Farm cards */}
          {farmNodes.map((node, i) => (
            <motion.div
              key={node.name}
              className="absolute bg-cream-50 border border-forest-100 rounded-xl px-3 py-2.5 shadow-soft"
              style={{ left: node.left, top: node.top, width: "9rem", zIndex: 10 }}
              animate={getFarmAnimate(node, phase)}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
            >
              <div className="font-medium text-forest-900 text-xs leading-tight truncate">{node.name}</div>
              <div className="text-[10px] text-ink-subtle mt-0.5">
                {node.crop} · {node.lb} lb
              </div>
              <div className="mt-2 h-1 w-full rounded-full bg-forest-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-forest-500"
                  animate={{ width: phase !== "idle" ? "100%" : "55%" }}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}

          {/* Pulsing rings — only while animating */}
          <AnimatePresence>
            {phase === "animating" && (
              <>
                <motion.div
                  key="ring-1"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest-400/40"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  style={{ width: 56, height: 56, zIndex: 15 }}
                />
                <motion.div
                  key="ring-2"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest-400/25"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.45 }}
                  style={{ width: 56, height: 56, zIndex: 15 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Center hub */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 20 }}
            animate={{ opacity: phase === "pooled" || phase === "po-shown" ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="size-14 rounded-full grid place-items-center"
              style={{
                background: "rgba(15, 44, 26, 0.10)",
                border: "2px solid rgba(116, 173, 126, 0.45)",
              }}
              animate={{
                scale: phase === "animating" ? [1, 1.18, 1] : 1,
              }}
              transition={{
                scale: {
                  duration: 1.2,
                  repeat: phase === "animating" ? Infinity : 0,
                  ease: "easeInOut",
                },
              }}
            >
              <Sprout className="size-5 text-forest-600" strokeWidth={1.75} />
            </motion.div>
          </motion.div>

          {/* Supplier pool card */}
          <AnimatePresence>
            {(phase === "pooled" || phase === "po-shown") && (
              <motion.div
                key="pool-card"
                initial={{ opacity: 0, scale: 0.78, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ type: "spring", stiffness: 270, damping: 22 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-forest-800 text-cream-50 rounded-2xl p-5 shadow-lift"
                style={{ zIndex: 30 }}
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-forest-200 mb-2">
                  AggieLink Supplier Pool
                </div>
                <div className="font-display text-4xl leading-none">
                  2,840{" "}
                  <span className="text-base text-forest-200 font-sans font-normal">lb</span>
                </div>
                <div className="text-sm text-forest-200 mt-1.5">18 farms · Week of May 11, 2026</div>

                <div className="my-4 h-px bg-forest-600/60" />

                <div className="space-y-2.5">
                  {[
                    { Icon: CheckCircle2, label: "Fulfillment confidence", value: "97%" },
                    { Icon: Truck, label: "Delivery coordination", value: "Confirmed" },
                    { Icon: ShieldCheck, label: "Compliance packet", value: "Ready" },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-forest-200">
                        <Icon className="size-3.5 shrink-0" />
                        {label}
                      </span>
                      <span className="font-medium text-cream-50">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Below canvas: Generate PO button → PO card */}
        <div className="mt-8 max-w-5xl mx-auto flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            {phase === "pooled" && (
              <motion.button
                key="po-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                transition={{ delay: 0.5, duration: 0.4 }}
                onClick={() => setPhase("po-shown")}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-forest-800 text-cream-50 text-sm font-medium hover:bg-forest-700 transition shadow-lift"
              >
                <FileText className="size-4" />
                Generate Institutional PO
                <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === "po-shown" && (
              <motion.div
                key="po-card"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-2xl bg-cream-50 border border-forest-200 rounded-3xl p-7 md:p-9 shadow-lift"
              >
                {/* PO header row */}
                <div className="flex items-start justify-between gap-4 mb-7">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-forest-600 mb-2">
                      Purchase Order
                    </div>
                    <div className="font-display text-3xl text-forest-900 leading-none">
                      AL-2026-W19-UCD
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-xs text-forest-700">
                    <CheckCircle2 className="size-3.5 text-forest-600" />
                    Invoice Ready
                  </span>
                </div>

                {/* PO fields */}
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-7">
                  {[
                    { label: "Buyer", value: "UC Davis Dining Services" },
                    { label: "Supplier", value: "AggieLink Pool · 18 farms" },
                    { label: "Delivery", value: "Tuesday, May 14, 2026 · 6:00 AM" },
                    { label: "Compliance packet", value: "Attached · GAP + Organic" },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mb-1">
                        {f.label}
                      </div>
                      <div className="text-sm font-medium text-forest-900">{f.value}</div>
                    </div>
                  ))}
                </div>

                {/* Bottom summary strip */}
                <div className="rounded-2xl bg-forest-900 text-cream-50 px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                  {[
                    { big: "2,840", unit: "lb", label: "Total weight" },
                    { big: "14", unit: null, label: "Line items" },
                    { big: "1", unit: null, label: "Invoice" },
                    { big: "18", unit: null, label: "Farms" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-2xl leading-none">
                        {s.big}
                        {s.unit && (
                          <span className="text-sm text-forest-300 font-sans font-normal ml-1">
                            {s.unit}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-forest-300 mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
