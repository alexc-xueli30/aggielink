"use client";

import { motion } from "framer-motion";

const institutions = [
  {
    x: 200,
    label: "UC Davis Dining",
    demands: ["Kale · 200 lb/wk", "Carrots · 300 lb/wk"],
    cert: "USDA Organic",
  },
  {
    x: 600,
    label: "Sutter Davis Hospital",
    demands: ["Salad Mix · 80 lb/wk", "Broccoli · 150 lb/wk"],
    cert: "Cert. Naturally Grown",
  },
  {
    x: 1000,
    label: "Davis Joint Unified",
    demands: ["Apples · 400 lb/wk"],
    cert: "GAP Certified",
  },
];

export default function DemandSection() {
  return (
    <section className="relative py-28 bg-forest-900 overflow-hidden">
      {/* Center ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="size-[700px] rounded-full bg-wheat-500/6 blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-800 border border-forest-700 text-forest-300 text-xs uppercase tracking-[0.14em] mb-8"
          >
            Institutional demand
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium text-4xl md:text-5xl leading-[0.97] tracking-tight text-cream-50 text-balance"
          >
            The demand exists.
            <span className="block italic text-forest-300 mt-2">
              The coordination doesn&rsquo;t.
            </span>
          </motion.h2>
        </div>

        {/* Institution node visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full"
        >
          <svg
            viewBox="0 0 1200 340"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            className="w-full max-w-5xl mx-auto"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="inst-node-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#dbab5d" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#dbab5d" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Broken gap line — left span (UC Davis toward Sutter) */}
            <motion.line
              x1="200" y1="155" x2="436" y2="155"
              stroke="#458c55" strokeWidth="0.85" strokeOpacity="0.28" strokeDasharray="5 12"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.5 }}
            />
            {/* Faint reaching tail — fades out mid-air */}
            <motion.line
              x1="436" y1="155" x2="512" y2="155"
              stroke="#458c55" strokeWidth="0.6" strokeOpacity="0.09"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 0.55, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.95 }}
            />

            {/* Broken gap line — right span (Sutter toward DJUSD) */}
            <motion.line
              x1="600" y1="155" x2="836" y2="155"
              stroke="#458c55" strokeWidth="0.85" strokeOpacity="0.28" strokeDasharray="5 12"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.65 }}
            />
            <motion.line
              x1="836" y1="155" x2="912" y2="155"
              stroke="#458c55" strokeWidth="0.6" strokeOpacity="0.09"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 0.55, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 1.1 }}
            />

            {/* Three institution nodes */}
            {institutions.map((inst, i) => (
              <motion.g
                key={inst.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.28 + i * 0.12 }}
                style={{ transformOrigin: `${inst.x}px 155px` }}
              >
                {/* Outer glow bloom */}
                <circle cx={inst.x} cy={155} r={44} fill="url(#inst-node-glow)" />
                {/* Mid ring */}
                <circle cx={inst.x} cy={155} r={28} fill="none" stroke="#dbab5d" strokeOpacity="0.18" strokeWidth="0.8" />
                {/* Core */}
                <circle cx={inst.x} cy={155} r={12} fill="#dbab5d" fillOpacity="0.1" stroke="#dbab5d" strokeOpacity="0.5" strokeWidth="0.9" />

                {/* Institution name above */}
                <text
                  x={inst.x}
                  y={155 - 56}
                  fontSize="9.5"
                  textAnchor="middle"
                  fill="#dbab5d"
                  fillOpacity="0.6"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  letterSpacing="0.06em"
                >
                  {inst.label.toUpperCase()}
                </text>

                {/* Demand specs below */}
                {inst.demands.map((d, j) => (
                  <text
                    key={j}
                    x={inst.x}
                    y={155 + 48 + j * 15}
                    fontSize="8.5"
                    textAnchor="middle"
                    fill="#a9ccae"
                    fillOpacity="0.52"
                    fontFamily="ui-mono, ui-sans-serif, system-ui"
                    letterSpacing="0.04em"
                  >
                    {d}
                  </text>
                ))}

                {/* Certification badge */}
                <rect
                  x={inst.x - 52}
                  y={155 + 48 + inst.demands.length * 15 + 6}
                  width={104}
                  height={14}
                  rx={3}
                  stroke="#dbab5d"
                  strokeOpacity="0.22"
                  fill="none"
                />
                <text
                  x={inst.x}
                  y={155 + 48 + inst.demands.length * 15 + 17}
                  fontSize="7"
                  textAnchor="middle"
                  fill="#dbab5d"
                  fillOpacity="0.42"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  letterSpacing="0.1em"
                >
                  {inst.cert.toUpperCase()}
                </text>

                {/* UNFULFILLED tag */}
                <rect
                  x={inst.x - 40}
                  y={155 + 48 + inst.demands.length * 15 + 28}
                  width={80}
                  height={14}
                  rx={3}
                  stroke="#dbab5d"
                  strokeOpacity="0.18"
                  fill="#dbab5d"
                  fillOpacity="0.04"
                />
                <text
                  x={inst.x}
                  y={155 + 48 + inst.demands.length * 15 + 39}
                  fontSize="7"
                  textAnchor="middle"
                  fill="#dbab5d"
                  fillOpacity="0.38"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  letterSpacing="0.12em"
                >
                  UNFULFILLED
                </text>
              </motion.g>
            ))}
          </svg>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-center mt-10 text-sm text-forest-300/50 max-w-lg mx-auto leading-relaxed"
        >
          Three institutions. Three separate RFPs. Three compliance packets.{" "}
          <span className="text-forest-300/70">Zero coordinated vendor.</span>
        </motion.p>
      </div>
    </section>
  );
}
