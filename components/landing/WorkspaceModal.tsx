"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Building2, ArrowRight, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const workspaces = [
  {
    id: "farmer" as const,
    label: "Farmer Workspace",
    description: "Manage your farm supply, certifications, and institutional opportunities.",
    icon: Sprout,
    features: ["My Crops & Volume", "Demand Opportunities", "Seasonal Planning", "Gemini Assistant"],
    route: "/farmer",
    accent: "from-forest-800 to-forest-900",
    chipBg: "bg-forest-700/40",
    chipText: "text-forest-100",
  },
  {
    id: "institution" as const,
    label: "Institution Workspace",
    description: "Coordinate procurement, aggregate supplier pools, and generate purchase orders.",
    icon: Building2,
    features: ["Post Demand", "Supplier Pool", "Generate PO", "Gemini Procurement Assistant"],
    route: "/dashboard",
    accent: "from-forest-700 to-forest-800",
    chipBg: "bg-wheat-500/30",
    chipText: "text-wheat-200",
  },
];

export default function WorkspaceModal({ open, onClose }: Props) {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const go = (route: string) => {
    onClose();
    router.push(route);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="ws-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-forest-950/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 flex items-center gap-1.5 text-cream-50/70 hover:text-cream-50 text-sm transition"
            >
              <X className="size-4" /> Close
            </button>

            <div className="bg-cream-50 rounded-3xl overflow-hidden shadow-lift border border-forest-100">
              {/* Header */}
              <div className="px-8 pt-8 pb-6 border-b border-forest-100">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="size-7 rounded-full bg-forest-800 grid place-items-center">
                    <Sprout className="size-3.5 text-cream-50" strokeWidth={2.25} />
                  </div>
                  <span className="font-display text-lg text-forest-900 tracking-tight">AggieLink</span>
                </div>
                <p className="text-ink-muted text-sm mt-2">Choose your workspace to continue into the demo.</p>
              </div>

              {/* Workspace cards */}
              <div className="p-4 grid sm:grid-cols-2 gap-3">
                {workspaces.map((ws) => {
                  const Icon = ws.icon;
                  return (
                    <button
                      key={ws.id}
                      onClick={() => go(ws.route)}
                      className={`group relative rounded-2xl bg-gradient-to-br ${ws.accent} text-cream-50 p-6 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lift`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="size-10 rounded-xl bg-cream-50/10 grid place-items-center shrink-0">
                          <Icon className="size-5" strokeWidth={1.75} />
                        </div>
                        <ArrowRight className="size-4 text-cream-50/50 group-hover:text-cream-50 group-hover:translate-x-1 transition-all mt-0.5 shrink-0" />
                      </div>

                      <div className="mt-4">
                        <div className="font-display text-lg leading-tight tracking-tight">{ws.label}</div>
                        <p className="mt-1.5 text-sm text-cream-50/70 leading-relaxed">{ws.description}</p>
                      </div>

                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {ws.features.map((f) => (
                          <li
                            key={f}
                            className={`inline-flex px-2.5 py-1 rounded-full text-[11px] tracking-tight ${ws.chipBg} ${ws.chipText}`}
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>

              <div className="px-8 pb-5 text-xs text-ink-subtle text-center">
                Demo mode — all data is illustrative of a real AggieLink supplier network.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
