"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

type Phase = "idle" | "farmLines" | "hubPulse" | "institutionLines" | "complete";

const farmNodes = [
  { x: 90,  y: 70,  label: "Putah Creek",      labelBelow: true  },
  { x: 320, y: 40,  label: "Capay Hills",       labelBelow: true  },
  { x: 640, y: 50,  label: "Knight's Landing",  labelBelow: true  },
  { x: 880, y: 80,  label: "Solano Heritage",   labelBelow: true  },
  { x: 60,  y: 300, label: "Yolo Greenway",     labelBelow: true  },
  { x: 900, y: 270, label: "Winters Mesa",      labelBelow: true  },
  { x: 130, y: 450, label: "Coyote Hill",       labelBelow: false },
  { x: 820, y: 430, label: "Russell Blvd.",     labelBelow: false },
];

const farmPaths = [
  "M 90 70 Q 270 100 480 260",
  "M 320 40 Q 380 80 480 260",
  "M 640 50 Q 600 80 480 260",
  "M 880 80 Q 720 100 480 260",
  "M 60 300 Q 230 250 480 260",
  "M 900 270 Q 730 250 480 260",
  "M 130 450 Q 270 380 480 260",
  "M 820 430 Q 700 370 480 260",
];

const institutionNodes = [
  { x: 240, y: 200, label: "UC Davis Dining" },
  { x: 700, y: 170, label: "Sutter Davis"    },
  { x: 480, y: 440, label: "DJUSD"           },
];

const institutionPaths = [
  "M 480 260 Q 360 220 240 200",
  "M 480 260 Q 600 210 700 170",
  "M 480 260 Q 480 350 480 440",
];

export default function NetworkConvergence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState<Phase>("idle");

  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const svgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  useEffect(() => {
    if (!isInView || phase !== "idle") return;
    const t1 = setTimeout(() => setPhase("farmLines"),        300);
    const t2 = setTimeout(() => setPhase("hubPulse"),        1900);
    const t3 = setTimeout(() => setPhase("institutionLines"), 2500);
    const t4 = setTimeout(() => setPhase("complete"),         3700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isInView, phase]);

  const showFarmLines  = phase !== "idle";
  const showHubPulse   = ["hubPulse", "institutionLines", "complete"].includes(phase);
  const showInstLines  = ["institutionLines", "complete"].includes(phase);
  const showCallout    = phase === "complete";

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 lg:px-10 bg-cream-50 overflow-hidden border-y border-forest-100/60"
    >
      {/* Subtle center radial bloom on light bg */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="size-[700px] rounded-full bg-forest-100/60 blur-[100px]" />
      </div>
      {/* Corner accent glows */}
      <div className="absolute -top-32 -left-32 size-[360px] rounded-full bg-wheat-400/10 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 size-[360px] rounded-full bg-forest-100/50 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest-700 text-xs uppercase tracking-[0.14em] mb-8"
          >
            The aggregation layer
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium text-4xl md:text-5xl leading-[0.97] tracking-tight text-forest-900 text-balance"
          >
            Watch the supply chain
            <span className="block italic text-forest-600 mt-2">
              form in real time.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-5 text-base text-ink-muted leading-relaxed text-pretty"
          >
            AggieLink resolves the coordination problem at the middle layer — so farms keep farming,
            and institutions keep buying, simply.
          </motion.p>
        </div>

        {/* Network SVG with parallax */}
        <motion.div
          className="w-full max-w-5xl mx-auto drop-shadow-sm"
          style={{ y: svgY }}
        >
          <svg
            viewBox="0 0 960 520"
            fill="none"
            className="w-full"
            aria-hidden="true"
          >
            <defs>
              {/* Hub glow filter */}
              <filter id="nc-hub-glow" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Farm node glow filter */}
              <filter id="nc-node-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Farm node radial glow — more visible on light bg */}
              <radialGradient id="nc-farm-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#286c3c" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#286c3c" stopOpacity="0" />
              </radialGradient>
              {/* Hub ambient glow */}
              <radialGradient id="nc-hub-ambient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#286c3c" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#286c3c" stopOpacity="0" />
              </radialGradient>
              {/* Institution node glow */}
              <radialGradient id="nc-inst-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#458c55" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#458c55" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Farm nodes */}
            {farmNodes.map((n, i) => (
              <motion.g
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.06 * i }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              >
                {/* Larger radial glow bloom */}
                <circle cx={n.x} cy={n.y} r="32" fill="url(#nc-farm-glow)" />
                {/* Outer ring (subtle) */}
                <motion.circle
                  cx={n.x} cy={n.y} r="9"
                  fill="none"
                  stroke="#286c3c"
                  strokeWidth="0.8"
                  strokeOpacity="0.25"
                  animate={isInView ? { scale: [1, 1.4], opacity: [0.25, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 + 0.2 * i }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                />
                {/* Core dot — darker for light bg */}
                <circle cx={n.x} cy={n.y} r="5.5" fill="#286c3c" fillOpacity="0.85" filter="url(#nc-node-glow)" />
                {/* Name label */}
                <text
                  x={n.x}
                  y={n.labelBelow ? n.y + 22 : n.y - 15}
                  fontSize="9"
                  textAnchor="middle"
                  fill="#286c3c"
                  fillOpacity="0.55"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  letterSpacing="0.05em"
                >
                  {n.label.toUpperCase()}
                </text>
              </motion.g>
            ))}

            {/* Farm → Hub: wire + draw-in + flow */}
            {farmPaths.map((d, i) => (
              <g key={i}>
                {/* Permanent wire */}
                <path d={d} stroke="#286c3c" strokeWidth="0.6" strokeOpacity="0.08" />
                {/* Draw-in */}
                {showFarmLines && (
                  <motion.path
                    d={d}
                    stroke="#286c3c"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.85, delay: i * 0.11, ease: "easeOut" }}
                  />
                )}
                {/* Flowing dash */}
                {showFarmLines && (
                  <motion.path
                    d={d}
                    stroke="#458c55"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="5 22"
                    fill="none"
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={{ strokeDashoffset: [0, -27], opacity: 0.6 }}
                    transition={{
                      strokeDashoffset: { duration: 1.1, repeat: Infinity, ease: "linear", delay: 0.9 + i * 0.11 },
                      opacity: { duration: 0.4, delay: 0.85 + i * 0.11 },
                    }}
                  />
                )}
              </g>
            ))}

            {/* Center AggieLink hub — larger, more layered */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
              style={{ transformOrigin: "480px 260px" }}
            >
              {/* Ambient glow */}
              <circle cx="480" cy="260" r="90" fill="url(#nc-hub-ambient)" />
              {/* Outer structural ring */}
              <circle cx="480" cy="260" r="54" fill="none" stroke="#286c3c" strokeWidth="0.6" strokeOpacity="0.18" />
              {/* Mid ring */}
              <circle cx="480" cy="260" r="40" fill="none" stroke="#286c3c" strokeWidth="0.9" strokeOpacity="0.28" />
              {/* Inner ring */}
              <circle cx="480" cy="260" r="28" fill="none" stroke="#286c3c" strokeWidth="1.2" strokeOpacity="0.4" />
              {/* Core */}
              <circle cx="480" cy="260" r="16" fill="#143f25" filter="url(#nc-hub-glow)" />
              <circle cx="480" cy="260" r="16" fill="#286c3c" />
              {/* Center dot */}
              <circle cx="480" cy="260" r="5" fill="#a9ccae" fillOpacity="0.9" />
              {/* Hub label */}
              <text
                x="480" y="286"
                fontSize="8"
                textAnchor="middle"
                fill="#286c3c"
                fillOpacity="0.45"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                letterSpacing="0.08em"
              >
                AGGIELINK
              </text>
            </motion.g>

            {/* Hub pulse rings */}
            {showHubPulse && (
              <>
                <motion.circle
                  cx="480" cy="260" r="40"
                  fill="none" stroke="#286c3c" strokeWidth="1.2" strokeOpacity="0.4"
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  style={{ transformOrigin: "480px 260px" }}
                />
                <motion.circle
                  cx="480" cy="260" r="40"
                  fill="none" stroke="#458c55" strokeWidth="0.8" strokeOpacity="0.25"
                  initial={{ scale: 1, opacity: 0.25 }}
                  animate={{ scale: [1, 1.9], opacity: [0.25, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
                  style={{ transformOrigin: "480px 260px" }}
                />
              </>
            )}

            {/* Institution nodes — larger, more prominent */}
            {institutionNodes.map((n, i) => (
              <motion.g
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={showInstLines ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.2 + i * 0.15 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              >
                <circle cx={n.x} cy={n.y} r="32" fill="url(#nc-inst-glow)" />
                <circle cx={n.x} cy={n.y} r="14" fill="#286c3c" fillOpacity="0.12" />
                <circle cx={n.x} cy={n.y} r="14" fill="none" stroke="#286c3c" strokeWidth="1.2" strokeOpacity="0.3" />
                <circle cx={n.x} cy={n.y} r="7"  fill="#286c3c" fillOpacity="0.8" filter="url(#nc-node-glow)" />
                <text
                  x={n.x}
                  y={n.y + 28}
                  fontSize="9"
                  textAnchor="middle"
                  fill="#286c3c"
                  fillOpacity="0.6"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  letterSpacing="0.05em"
                >
                  {n.label.toUpperCase()}
                </text>
              </motion.g>
            ))}

            {/* Hub → Institution: wire + draw-in + flow */}
            {institutionPaths.map((d, i) => (
              <g key={i}>
                <path d={d} stroke="#286c3c" strokeWidth="0.6" strokeOpacity="0.08" />
                {showInstLines && (
                  <>
                    <motion.path
                      d={d}
                      stroke="#286c3c"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeOpacity="0.7"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
                    />
                    <motion.path
                      d={d}
                      stroke="#74ad7e"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeDasharray="5 22"
                      strokeOpacity="0.55"
                      fill="none"
                      initial={{ strokeDashoffset: 0, opacity: 0 }}
                      animate={{ strokeDashoffset: [0, -27], opacity: 0.55 }}
                      transition={{
                        strokeDashoffset: { duration: 1.1, repeat: Infinity, ease: "linear", delay: 0.75 + i * 0.2 },
                        opacity: { duration: 0.4, delay: 0.7 + i * 0.2 },
                      }}
                    />
                  </>
                )}
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Callout card — light theme */}
        <AnimatePresence>
          {showCallout && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 mx-auto max-w-2xl rounded-3xl bg-cream-100/80 border border-forest-200/60 backdrop-blur-sm px-8 py-6 text-center shadow-soft"
            >
              <p className="font-display font-medium text-xl text-forest-900 tracking-tight">
                22 farms. 3 counties. 1 coordinated supply.
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 text-ink-muted">
                <svg viewBox="0 0 30 16" className="w-6 h-3.5 shrink-0" fill="none" aria-hidden="true">
                  <rect x="0" y="3" width="19" height="11" rx="1.5" stroke="currentColor" strokeWidth="0.9" />
                  <path d="M 19 5.5 L 19 3 L 27 3 Q 29 3 29 5 L 29 13 L 19 13 Z" stroke="currentColor" strokeWidth="0.9" />
                  <circle cx="6" cy="15" r="2.2" stroke="currentColor" strokeWidth="0.8" />
                  <circle cx="22.5" cy="15" r="2.2" stroke="currentColor" strokeWidth="0.8" />
                </svg>
                <span className="text-sm leading-relaxed">
                  18 farms contributed to last week&rsquo;s 2,840 lb order — without any single farm exceeding
                  what it can responsibly produce.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
