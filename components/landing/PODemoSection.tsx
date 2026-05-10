"use client";

import { motion } from "framer-motion";
import AggregationDemo from "./AggregationDemo";

export default function PODemoSection() {
  return (
    <section className="py-28 px-6 lg:px-10 border-t border-forest-100/60 bg-cream-100/40">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="text-xs uppercase tracking-[0.18em] text-forest-600"
          >
            See it in action
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display font-medium text-4xl md:text-5xl text-forest-900 leading-[1.02] text-balance"
          >
            Watch a purchase order
            <span className="block italic text-forest-600 mt-1">come together.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="mt-5 text-base text-ink-muted leading-relaxed text-pretty"
          >
            Farms list supply. Institutions post demand. AggieLink aggregates both into one
            coordinated order — then generates a single institutional PO, ready for your procurement system.
          </motion.p>
        </div>
        <AggregationDemo />
      </div>
    </section>
  );
}
