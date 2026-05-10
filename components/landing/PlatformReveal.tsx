"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sprout, Building2, Sparkles } from "lucide-react";

// Subtle 24px grid pattern — Stripe/Linear infrastructure aesthetic
const gridBg = `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 24 0 L 0 0 0 24' fill='none' stroke='%23286c3c' stroke-width='0.5' stroke-opacity='0.055'/%3E%3C/svg%3E")`;

const cards = [
  {
    badge: "Farmer Portal",
    icon: <Sprout className="size-4.5 text-cream-100" />,
    headerFrom: "from-forest-800",
    headerTo: "to-forest-900",
    title: "For growers in the network",
    body: (
      <div className="flex flex-col gap-2 mt-4">
        {[
          { label: "Weekly capacity", value: "180 lb/wk" },
          { label: "Region", value: "Yolo County" },
          { label: "Certification", value: "USDA Organic" },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between text-xs">
            <span className="text-ink-subtle">{r.label}</span>
            <span className="font-medium text-forest-800">{r.value}</span>
          </div>
        ))}
      </div>
    ),
    cta: "Open Farmer Portal",
    href: "/farmer",
  },
  {
    badge: "Institution Portal",
    icon: <Building2 className="size-4.5 text-cream-100" />,
    headerFrom: "from-forest-900",
    headerTo: "to-[#050c07]",
    title: "For procurement managers",
    body: (
      <div className="flex flex-col gap-2 mt-4">
        {[
          { label: "This week's order", value: "2,840 lb" },
          { label: "Contributing farms", value: "18 farms" },
          { label: "Line items", value: "14 crops" },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between text-xs">
            <span className="text-ink-subtle">{r.label}</span>
            <span className="font-medium text-forest-800">{r.value}</span>
          </div>
        ))}
      </div>
    ),
    cta: "Open Institution Portal",
    href: "/dashboard",
  },
  {
    badge: "AI Assistant",
    icon: <Sparkles className="size-4.5 text-cream-100" />,
    headerFrom: "from-forest-700",
    headerTo: "to-forest-800",
    title: "Gemini procurement assistant",
    body: (
      <div className="mt-4 rounded-xl bg-forest-50 border border-forest-100 p-3 text-xs space-y-2">
        <p className="text-ink-subtle italic">
          &ldquo;Which farms supply certified-organic carrots this week?&rdquo;
        </p>
        <p className="text-forest-800 leading-snug">
          3 farms match: Putah Creek (140 lb), Madison Acre (95 lb), and Three Sisters Heritage (50 lb). All USDA Organic.
        </p>
      </div>
    ),
    cta: "Try the Assistant",
    href: "/dashboard",
  },
];

export default function PlatformReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 lg:px-10 overflow-hidden bg-cream-50"
      style={{ backgroundImage: gridBg }}
    >
      <div className="absolute inset-0 bg-cream-50/80 pointer-events-none" />

      <motion.div className="relative z-10 max-w-7xl mx-auto" style={{ y }}>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-100 text-forest-700 text-xs uppercase tracking-[0.14em] mb-8"
          >
            See it in action
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium text-4xl md:text-5xl leading-[0.97] tracking-tight text-forest-900 text-balance"
          >
            One supplier network.
            <span className="block italic text-forest-600 mt-2">Institution ready.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-6 text-lg text-ink-muted leading-relaxed text-pretty"
          >
            AggieLink is live. Explore both portals, watch the aggregation engine in action, and generate a real institutional PO.
          </motion.p>
        </div>

        {/* Product preview cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.badge}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-cream-50 border border-forest-100 rounded-2xl overflow-hidden shadow-soft flex flex-col"
            >
              {/* Gradient header */}
              <div className={`bg-gradient-to-br ${card.headerFrom} ${card.headerTo} px-5 py-4 flex items-center gap-3`}>
                {card.icon}
                <span className="text-xs font-medium text-cream-100 tracking-wide">{card.badge}</span>
              </div>

              {/* Body */}
              <div className="px-5 pb-5 pt-4 flex flex-col flex-1">
                <p className="text-sm font-medium text-forest-900">{card.title}</p>
                {card.body}
                <div className="mt-auto pt-5">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-xs font-medium border border-forest-200 rounded-full px-4 py-2 text-forest-700 hover:bg-forest-50 transition"
                  >
                    {card.cta}
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="mt-14 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/farmer"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-forest-300 hover:bg-forest-50 text-forest-800 transition text-sm font-medium"
          >
            Open Farmer Portal
            <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
          </Link>
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-50 transition shadow-lift text-sm font-medium"
          >
            See the Institution Demo
            <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
