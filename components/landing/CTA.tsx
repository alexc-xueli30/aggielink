"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import WorkspaceModal from "./WorkspaceModal";

export default function CTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="impact" className="py-28 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-forest-900 text-cream-50 px-8 md:px-16 py-16 md:py-20"
          >
            <div className="absolute -top-32 -right-32 size-[400px] rounded-full bg-forest-700/40 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 size-[400px] rounded-full bg-wheat-500/15 blur-3xl" />

            <div className="relative">
              <span className="text-xs uppercase tracking-[0.18em] text-forest-200">A more honest supply chain</span>
              <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.0] text-balance">
                Local food, finally <span className="italic text-cream-200">at institutional scale.</span>
              </h2>
              <p className="mt-6 text-cream-100/80 text-lg max-w-xl leading-relaxed text-pretty">
                See exactly how AggieLink combines a network of small farms into a single, dispatch-ready weekly order.
                No formulas. No fluff. Just the product.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cream-50 hover:bg-white text-forest-900 transition shadow-lift"
                >
                  Open the demo dashboard
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <WorkspaceModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
