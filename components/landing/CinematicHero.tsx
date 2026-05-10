"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

// 22 farm nodes across Sacramento Valley — clustered by county
const farmNodes = [
  // Yolo County — left / center
  { x: 225, y: 285, name: "Putah Creek" },
  { x: 345, y: 220, name: "Cache Creek" },
  { x: 185, y: 385, name: "Capay Hills" },
  { x: 295, y: 345, name: "Yolo Greenway" },
  { x: 445, y: 265, name: "Knight's Landing" },
  { x: 175, y: 462, name: "Winters Mesa" },
  { x: 165, y: 202, name: "Esparto Hill" },
  { x: 382, y: 425, name: "Madison Acre" },
  { x: 315, y: 485, name: "Three Sisters" },
  { x: 485, y: 362, name: "Plainfield Pasture" },
  { x: 412, y: 312, name: "Russell Blvd." },
  { x: 242, y: 545, name: "Buckhorn Ranch" },
  { x: 534, y: 445, name: "West Plainfield" },
  // Solano County — center-right
  { x: 785, y: 252, name: "Solano Heritage" },
  { x: 865, y: 382, name: "Coyote Hill" },
  { x: 964, y: 472, name: "Suisun Marsh" },
  { x: 724, y: 422, name: "Vacaville Valley" },
  { x: 682, y: 312, name: "Dixon Sunrise" },
  { x: 904, y: 262, name: "Pleasant Valley" },
  // Sacramento County — right
  { x: 1122, y: 302, name: "Clarksburg Sun" },
  { x: 1162, y: 402, name: "River Bend" },
  { x: 1082, y: 482, name: "Sycamore Slough" },
];

// Topographic contour curves — slightly undulating horizontal paths
const contourPaths = [
  "M 0 180 Q 350 172 700 180 Q 1050 188 1400 175",
  "M 0 208 Q 350 216 700 205 Q 1050 198 1400 210",
  "M 0 236 Q 350 228 700 240 Q 1050 248 1400 234",
  "M 0 264 Q 350 272 700 258 Q 1050 250 1400 268",
  "M 0 292 Q 350 284 700 298 Q 1050 306 1400 290",
  "M 0 320 Q 350 328 700 316 Q 1050 308 1400 322",
  "M 0 348 Q 350 340 700 352 Q 1050 360 1400 346",
  "M 0 376 Q 350 384 700 372 Q 1050 364 1400 378",
  "M 0 404 Q 350 396 700 408 Q 1050 416 1400 402",
  "M 0 432 Q 350 440 700 428 Q 1050 420 1400 434",
  "M 0 460 Q 350 452 700 464 Q 1050 472 1400 458",
  "M 0 488 Q 350 496 700 484 Q 1050 476 1400 490",
  "M 0 516 Q 350 508 700 520 Q 1050 528 1400 514",
  "M 0 544 Q 350 552 700 540 Q 1050 532 1400 546",
  "M 0 572 Q 350 564 700 576 Q 1050 584 1400 570",
  "M 0 600 Q 350 608 700 596 Q 1050 588 1400 602",
];

// Fragmented cubic bezier arcs between nearby nodes — all partial (never complete)
const fragments = [
  { d: "M 165 202 C 220 208 290 215 345 220", pl: 0.48 },
  { d: "M 345 220 C 380 235 415 248 445 265", pl: 0.35 },
  { d: "M 225 285 C 248 308 272 328 295 345", pl: 0.52 },
  { d: "M 295 345 C 323 372 352 398 382 425", pl: 0.40 },
  { d: "M 175 462 C 220 468 268 475 315 485", pl: 0.62 },
  { d: "M 315 485 C 388 472 460 458 534 445", pl: 0.28 },
  { d: "M 682 312 C 714 290 748 272 785 252", pl: 0.45 },
  { d: "M 785 252 C 824 255 864 258 904 262", pl: 0.55 },
  { d: "M 865 382 C 898 413 930 442 964 472", pl: 0.38 },
  { d: "M 1122 302 C 1132 335 1145 368 1162 402", pl: 0.44 },
];

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const svgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#050c07]">
      {/* Atmospheric glow blobs */}
      <div className="absolute size-[1000px] -top-48 left-[8%] rounded-full bg-forest-900/50 blur-[180px] pointer-events-none" />
      <div className="absolute size-[500px] bottom-0 right-[5%] rounded-full bg-forest-900/30 blur-[100px] pointer-events-none" />

      {/* Full-bleed SVG with subtle scroll parallax */}
      <motion.div className="absolute inset-0" style={{ y: svgY }}>
        <svg
          viewBox="0 0 1400 800"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="hero-node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#74ad7e" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#74ad7e" stopOpacity="0" />
            </radialGradient>
            <filter id="hero-dot-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Topographic contour lines */}
          {contourPaths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="#458c55"
              strokeWidth="0.5"
              strokeOpacity={0.052 + (i % 4) * 0.013}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.95, delay: 0.04 + i * 0.028, ease: "easeOut" }}
            />
          ))}

          {/* Fragmented connection arcs — represent failed aggregation */}
          {fragments.map((f, i) => (
            <motion.path
              key={i}
              d={f.d}
              stroke="#458c55"
              strokeWidth="0.9"
              strokeDasharray="4 14"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: f.pl, opacity: 0.22 }}
              transition={{ duration: 1.1, delay: 0.5 + i * 0.09, ease: "easeOut" }}
            />
          ))}

          {/* Farm nodes — soft glowing points */}
          {farmNodes.map((n, i) => (
            <motion.g
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.22 + i * 0.048 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <circle cx={n.x} cy={n.y} r="18" fill="url(#hero-node-glow)" />
              <circle cx={n.x} cy={n.y} r="3.5" fill="#a9ccae" filter="url(#hero-dot-glow)" />
              <text
                x={n.x}
                y={n.y + 16}
                fontSize="8"
                textAnchor="middle"
                fill="#a9ccae"
                fillOpacity="0.35"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                letterSpacing="0.08em"
              >
                {n.name.toUpperCase()}
              </text>
            </motion.g>
          ))}
        </svg>
      </motion.div>

      {/* Gradient scrim — bottom for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-[420px] bg-gradient-to-t from-[#050c07] via-[#050c07]/80 to-transparent pointer-events-none" />
      {/* Gradient scrim — top for navbar contrast */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050c07]/55 to-transparent pointer-events-none" />

      {/* Text overlay — centered, bottom-anchored */}
      <div className="absolute inset-0 pt-16 flex flex-col items-center justify-end pb-20 px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-900/70 border border-forest-700/40 text-forest-300 text-xs uppercase tracking-[0.14em] mb-8"
        >
          <span className="size-1.5 rounded-full bg-forest-400 animate-pulse" />
          California scale · 22 farms · 3 counties
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-cream-50 text-center text-balance"
        >
          California grows the food.
          <span className="block italic text-forest-300 mt-3">
            But local supply remains fragmented.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-7 text-base md:text-lg text-forest-200/60 max-w-md text-center leading-relaxed"
        >
          Zero coordinated access to institutional buyers. AggieLink resolves the coordination layer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-700 hover:bg-forest-600 text-cream-50 text-sm font-medium transition shadow-lift"
          >
            See the platform
            <ArrowRight className="size-3.5 group-hover:translate-x-1 transition" />
          </Link>
          <a
            href="#aggregation"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-forest-700/50 hover:border-forest-600/70 text-forest-300 text-sm font-medium transition hover:text-forest-200"
          >
            How aggregation works
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          className="w-px h-9 mx-auto bg-gradient-to-b from-forest-500/0 via-forest-400/30 to-forest-500/0"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
