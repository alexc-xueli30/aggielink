"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Truck, FileText, ShieldCheck, Sprout } from "lucide-react";
import WorkspaceModal from "./WorkspaceModal";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative pt-36 pb-24 px-6 lg:px-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 -z-10 size-[560px] rounded-full bg-forest-100/50 blur-3xl" />
        <div className="absolute top-40 -left-40 -z-10 size-[440px] rounded-full bg-wheat-400/15 blur-3xl" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-100 text-forest-700 text-xs uppercase tracking-[0.14em] mb-7"
            >
              <span className="size-1.5 rounded-full bg-forest-500 animate-pulse" />
              Climate-tech for institutional procurement
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-display font-medium text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-forest-900 text-balance"
            >
              Many small farms.
              <span className="block italic text-forest-600 mt-1">One institutional supply.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 text-lg md:text-xl text-ink-muted max-w-xl leading-relaxed text-pretty"
            >
              Hospitals, schools, and universities want local food. Small farms can&rsquo;t fill those orders alone.
              AggieLink aggregates dozens of growers into one weekly delivery — with one invoice and one food-safety packet.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-50 transition shadow-lift"
              >
                See the live demo
                <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.14em] text-ink-subtle"
            >
              <span className="flex items-center gap-2"><Truck className="size-3.5 text-forest-600" /> One delivery</span>
              <span className="flex items-center gap-2"><FileText className="size-3.5 text-forest-600" /> One invoice</span>
              <span className="flex items-center gap-2"><ShieldCheck className="size-3.5 text-forest-600" /> One safety packet</span>
              <span className="flex items-center gap-2"><Sprout className="size-3.5 text-forest-600" /> One supply pool</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <HeroVisual onDemoClick={() => setModalOpen(true)} />
          </motion.div>
        </div>
      </section>

      <WorkspaceModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

function HeroVisual({ onDemoClick }: { onDemoClick: () => void }) {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/5]">
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full -z-0" viewBox="0 0 400 500" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#286c3c" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#286c3c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#286c3c" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {[
          "M 60 80 C 140 130, 180 200, 200 250",
          "M 320 60 C 280 140, 240 200, 220 250",
          "M 40 280 C 100 260, 160 250, 200 250",
          "M 340 300 C 280 280, 240 260, 220 250",
          "M 90 440 C 140 380, 180 300, 200 270",
          "M 310 430 C 270 370, 240 310, 220 260",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#line-grad)"
            strokeWidth="1.25"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6 + i * 0.1, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Center: aggregated order card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-56 bg-forest-800 text-cream-50 rounded-2xl p-5 shadow-lift rotate-[1.5deg]"
      >
        <div className="text-[10px] uppercase tracking-[0.2em] text-forest-200">This week&rsquo;s order</div>
        <div className="font-display text-4xl mt-1.5 leading-none">2,840 <span className="text-base text-forest-200 font-sans font-normal">lb</span></div>
        <div className="text-sm text-forest-100 mt-1">UC Davis Dining</div>
        <div className="my-3 h-px bg-forest-600/60" />
        <div className="text-[11px] text-forest-200 leading-relaxed">
          14 line items · 18 farms<br />
          1 invoice · 1 delivery
        </div>
        <button
          onClick={onDemoClick}
          className="mt-3 w-full text-center text-[10px] uppercase tracking-[0.14em] text-forest-200 hover:text-cream-50 transition py-1 border border-forest-600/50 rounded-lg hover:border-forest-400/60"
        >
          Enter demo →
        </button>
      </motion.div>

      {/* Surrounding farm chips */}
      {chips.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
          className="absolute bg-cream-50 border border-forest-100 rounded-xl px-3 py-2 shadow-soft text-xs z-10"
          style={{ left: c.x, top: c.y, transform: `rotate(${c.rotate}deg)` }}
        >
          <div className="font-medium text-forest-900 leading-tight">{c.name}</div>
          <div className="text-ink-subtle text-[10px] mt-0.5">{c.crop}</div>
        </motion.div>
      ))}
    </div>
  );
}

const chips = [
  { name: "Putah Creek", crop: "Carrots · 240 lb", x: "0%", y: "8%", rotate: -5 },
  { name: "Capay Hills", crop: "Tomatoes · 320 lb", x: "62%", y: "2%", rotate: 4 },
  { name: "Yolo Greenway", crop: "Greens · 110 lb", x: "-4%", y: "48%", rotate: 2 },
  { name: "Solano Heritage", crop: "Apples · 410 lb", x: "70%", y: "52%", rotate: -3 },
  { name: "Coyote Hill", crop: "Berries · 90 lb", x: "8%", y: "84%", rotate: 3 },
  { name: "Madison Acre", crop: "Beets · 95 lb", x: "62%", y: "82%", rotate: -2 },
];
