"use client";

import { motion } from "framer-motion";

// rx values for 12 concentric crop-row ellipses (innermost → outermost)
const rxValues = [24, 42, 62, 84, 108, 132, 156, 178, 200, 220, 238, 252];

const stats = [
  { chip: "< 4%", label: "of CA institutional food is locally sourced" },
  { chip: "$50K+", label: "annual minimum most institutional buyers require" },
  { chip: "10+", label: "compliance documents per supplier per year" },
];

export default function FarmScaleSection() {
  return (
    <section className="relative py-28 px-6 lg:px-10 overflow-hidden bg-cream-50">
      {/* Subtle gradient bridge from dark hero above */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050c07]/6 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left — Topographic farm geometry */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[420px] mx-auto lg:mx-0"
        >
          <svg viewBox="0 0 480 480" fill="none" className="w-full" aria-hidden="true">
            <defs>
              <radialGradient id="farm-origin-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#286c3c" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#286c3c" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Faint reference axes — data-grid feel */}
            <line x1="0" y1="240" x2="480" y2="240" stroke="#143f25" strokeOpacity="0.045" strokeWidth="0.5" />
            <line x1="240" y1="0" x2="240" y2="480" stroke="#143f25" strokeOpacity="0.045" strokeWidth="0.5" />

            {/* Concentric crop-row ellipses — oblique perspective, innermost first */}
            {rxValues.map((rx, i) => {
              const ry = Math.round(rx * 0.42);
              // Inner rings darker, outer rings fade out
              const opacity = 0.55 - (i / 11) * 0.44;
              return (
                <motion.ellipse
                  key={i}
                  cx="240"
                  cy="240"
                  rx={rx}
                  ry={ry}
                  transform="rotate(-12 240 240)"
                  stroke="#143f25"
                  strokeWidth="0.75"
                  strokeOpacity={opacity}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, delay: 0.08 + i * 0.055, ease: "easeOut" }}
                />
              );
            })}

            {/* Origin glow — farm center point */}
            <motion.circle
              cx="240"
              cy="240"
              r="30"
              fill="url(#farm-origin-glow)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
              style={{ transformOrigin: "240px 240px" }}
            />
            <motion.circle
              cx="240"
              cy="240"
              r="5"
              fill="#286c3c"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.88 }}
              style={{ transformOrigin: "240px 240px" }}
            />

            {/* Outer dashed boundary */}
            <motion.circle
              cx="240"
              cy="240"
              r="252"
              stroke="#a9ccae"
              strokeWidth="0.7"
              strokeOpacity="0.22"
              strokeDasharray="3 9"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.3, delay: 0.9, ease: "easeOut" }}
            />

            {/* Metadata label */}
            <motion.text
              x="240"
              y="200"
              fontSize="8"
              textAnchor="middle"
              fill="#143f25"
              fillOpacity="0.25"
              fontFamily="ui-mono, ui-sans-serif, system-ui"
              letterSpacing="0.12em"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              28 ACRES · YOLO COUNTY
            </motion.text>
          </svg>
        </motion.div>

        {/* Right — Headline + data stats */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-100 text-forest-700 text-xs uppercase tracking-[0.14em] mb-8"
          >
            Farm-level reality
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium text-4xl md:text-5xl leading-[0.97] tracking-tight text-forest-900 text-balance"
          >
            Small farms rarely reach
            <span className="block italic text-forest-600 mt-2">
              institutional buyers alone.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-7 text-lg text-ink-muted leading-relaxed max-w-lg text-pretty"
          >
            Most Sacramento Valley farms operate under 30 acres. Institutional minimums and compliance costs make pooled fulfillment the only viable path to procurement.
          </motion.p>

          {/* Data-terminal stats */}
          <div className="mt-12 flex flex-col gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.chip}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <span className="font-mono text-sm font-medium px-2.5 py-1 rounded-md bg-forest-50 border border-forest-100/80 text-forest-800 shrink-0 min-w-[68px] text-center tabular-nums">
                  {s.chip}
                </span>
                <span className="text-sm text-ink-muted leading-snug">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
