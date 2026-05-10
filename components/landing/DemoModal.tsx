"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Building2, X, ArrowRight } from "lucide-react";

export default function DemoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("aggielink:demo", handler);
    return () => window.removeEventListener("aggielink:demo", handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-forest-900/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-cream-50 rounded-3xl shadow-lift max-w-2xl w-full p-8 relative pointer-events-auto">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 text-ink-subtle hover:text-ink transition"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>

              <h2 className="font-display text-3xl text-forest-900 text-center mb-2">
                Choose your portal
              </h2>
              <p className="text-ink-muted text-center mb-8 text-sm">
                AggieLink serves both sides of the supply chain. Pick one to explore.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/farmer"
                  className="group flex flex-col gap-4 p-6 rounded-2xl bg-forest-50 border border-forest-100 hover:border-forest-300 hover:shadow-soft transition"
                  onClick={() => setOpen(false)}
                >
                  <Sprout className="size-10 text-forest-700" strokeWidth={1.75} />
                  <div>
                    <p className="font-display text-xl text-forest-900">Farmer Portal</p>
                    <p className="text-sm text-ink-muted mt-1">
                      List your crops, see institution demand, get matched to pooled orders, and ask the AI advisor.
                    </p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 group-hover:gap-2.5 transition-all">
                    Open Farmer Portal
                    <ArrowRight className="size-4" />
                  </span>
                </Link>

                <Link
                  href="/dashboard"
                  className="group flex flex-col gap-4 p-6 rounded-2xl bg-forest-900 hover:bg-forest-800 transition"
                  onClick={() => setOpen(false)}
                >
                  <Building2 className="size-10 text-forest-300" strokeWidth={1.75} />
                  <div>
                    <p className="font-display text-xl text-cream-50">Institution Portal</p>
                    <p className="text-sm text-forest-200 mt-1">
                      Browse supplier networks, post demand, generate POs, and consult the AI procurement advisor.
                    </p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-forest-300 group-hover:gap-2.5 transition-all">
                    Open Institution Portal
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
