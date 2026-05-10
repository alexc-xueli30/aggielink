"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Truck, FileText, ShieldCheck, Package, CheckCircle2, ChevronRight, X, Printer } from "lucide-react";
import { aggregatedOrder, farmsById } from "@/lib/mockData";
import { useState } from "react";
import clsx from "clsx";

const categoryColors: Record<string, string> = {
  Roots: "#9c7327",
  Greens: "#458c55",
  Brassicas: "#286c3c",
  Alliums: "#74ad7e",
  Nightshades: "#cd7d5e",
  Squash: "#dbab5d",
  Fruit: "#b86244",
  Other: "#a9ccae",
};

export default function AggregatedOrder() {
  const o = aggregatedOrder;
  const [expanded, setExpanded] = useState<string | null>(o.lines[0]?.crop ?? null);
  const [poOpen, setPoOpen] = useState(false);

  return (
    <div>
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.16em] text-forest-600">Institution Workspace</span>
          <h1 className="mt-1.5 font-display text-3xl md:text-4xl text-forest-900 leading-tight">
            Aggregated Order
          </h1>
          <p className="mt-2 text-ink-muted max-w-xl text-pretty">
            {o.weekOf} · {o.buyer}. {o.contributingFarms} farms have contributed to one combined supply pool, ready
            for a single dispatch.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-100 text-forest-700 text-xs">
            <CheckCircle2 className="size-3.5" />
            {o.status}
          </span>
          <button
            onClick={() => setPoOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-50 text-xs font-medium transition shadow-soft"
          >
            <FileText className="size-3.5" />
            Generate Institutional PO
          </button>
        </div>
      </header>

      {/* PO Generator Modal */}
      <POGeneratorModal open={poOpen} onClose={() => setPoOpen(false)} order={o} />

      {/* Stat strip */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        <BigStat big={o.totalLb.toLocaleString()} unit="lb" label="Combined weight" icon={Package} />
        <BigStat big={o.lineCount.toString()} label="Line items" icon={FileText} />
        <BigStat big={o.contributingFarms.toString()} label="Contributing farms" icon={Truck} />
        <BigStat big="1" label="Food-safety packet" icon={ShieldCheck} />
      </div>

      {/* Delivery card */}
      <div className="mt-6 rounded-2xl bg-forest-900 text-cream-50 p-6 md:p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 size-72 rounded-full bg-forest-700/40 blur-3xl" />
        <div className="relative grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-forest-200">Delivery</div>
            <div className="font-display text-2xl mt-1.5 leading-tight">{o.delivery}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-forest-200">Buyer</div>
            <div className="font-display text-2xl mt-1.5 leading-tight">{o.buyer}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-forest-200">Invoice</div>
            <div className="font-display text-2xl mt-1.5 leading-tight">{o.invoiceId}</div>
          </div>
        </div>
      </div>

      {/* Order lines */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl text-forest-900">Line items</h2>
          <span className="text-xs text-ink-subtle">Click a row to see contributing farms</span>
        </div>

        <div className="rounded-2xl border border-forest-100 bg-cream-50 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-cream-100/50 border-b border-forest-100 text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
            <div className="col-span-4">Crop</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Pack</div>
            <div className="col-span-2">Contributors</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>

          {o.lines.map((line, i) => {
            const isOpen = expanded === line.crop;
            return (
              <motion.div
                key={line.crop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(i, 12) * 0.025 }}
                className={clsx(
                  "border-b border-forest-100/70 last:border-b-0",
                  isOpen ? "bg-cream-100/40" : "bg-cream-50 hover:bg-cream-100/30 transition"
                )}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : line.crop)}
                  className="w-full text-left px-5 py-4 grid grid-cols-2 md:grid-cols-12 gap-4 items-center"
                >
                  <div className="md:col-span-4 flex items-center gap-3">
                    <ChevronRight
                      className={clsx(
                        "size-4 text-ink-subtle transition shrink-0",
                        isOpen && "rotate-90 text-forest-600"
                      )}
                    />
                    <span className="font-medium text-forest-900">{line.crop}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span
                      className="inline-flex items-center gap-1.5 text-[11px] text-ink-muted"
                      style={{ color: categoryColors[line.category] }}
                    >
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: categoryColors[line.category] }}
                      />
                      {line.category}
                    </span>
                  </div>
                  <div className="md:col-span-2 text-xs text-ink-muted">{line.packedAs}</div>
                  <div className="md:col-span-2 text-xs text-ink-muted">{line.contributors.length} farms</div>
                  <div className="md:col-span-2 text-right">
                    <span className="font-display text-lg text-forest-900">
                      {line.amountLb}
                      <span className="text-xs text-ink-subtle font-sans font-normal ml-1">lb</span>
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5"
                  >
                    <div className="rounded-xl bg-cream-50 border border-forest-100 p-4">
                      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mb-3">
                        Contributing farms for this line
                      </div>
                      <ContributorBar contributors={line.contributors} total={line.amountLb} />
                      <div className="mt-4 grid sm:grid-cols-2 gap-2">
                        {line.contributors.map((c) => {
                          const f = farmsById[c.farmId];
                          if (!f) return null;
                          const pct = Math.round((c.lb / line.amountLb) * 100);
                          return (
                            <div
                              key={c.farmId}
                              className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-cream-100/60 border border-forest-100/70"
                            >
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-forest-900 truncate">{f.name}</div>
                                <div className="text-[11px] text-ink-subtle">{f.county} · {f.steward}</div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="font-display text-base text-forest-900 leading-none">
                                  {c.lb}<span className="text-[10px] text-ink-subtle font-sans font-normal ml-0.5">lb</span>
                                </div>
                                <div className="text-[10px] text-ink-subtle mt-0.5">{pct}%</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-xs text-ink-subtle">
        Allocation across contributing farms is determined by AggieLink&rsquo;s internal balancing system, which
        considers each farm&rsquo;s available supply, recent participation, and standing commitments.
      </div>
    </div>
  );
}

function BigStat({
  big,
  unit,
  label,
  icon: Icon,
}: {
  big: string;
  unit?: string;
  label: string;
  icon: typeof Truck;
}) {
  return (
    <div className="rounded-2xl bg-cream-100/60 border border-forest-100 p-5">
      <Icon className="size-4 text-forest-600 mb-3" strokeWidth={1.75} />
      <div className="font-display text-3xl text-forest-900 leading-none">
        {big}
        {unit && <span className="text-sm text-ink-subtle font-sans font-normal ml-1">{unit}</span>}
      </div>
      <div className="text-[11px] uppercase tracking-[0.14em] text-ink-subtle mt-2">{label}</div>
    </div>
  );
}

function ContributorBar({
  contributors,
  total,
}: {
  contributors: { farmId: string; lb: number }[];
  total: number;
}) {
  const palette = ["#143f25", "#286c3c", "#458c55", "#74ad7e", "#a9ccae"];
  return (
    <div className="h-3 w-full rounded-full overflow-hidden flex bg-forest-50">
      {contributors.map((c, i) => {
        const pct = (c.lb / total) * 100;
        const f = farmsById[c.farmId];
        return (
          <div
            key={c.farmId}
            style={{ width: `${pct}%`, backgroundColor: palette[i % palette.length] }}
            title={`${f?.name}: ${c.lb} lb (${Math.round(pct)}%)`}
          />
        );
      })}
    </div>
  );
}

function POGeneratorModal({
  open,
  onClose,
  order,
}: {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order: any;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-forest-950/35 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-cream-50 rounded-3xl overflow-hidden border border-forest-100 shadow-lift">
              {/* PO Header */}
              <div className="bg-forest-900 text-cream-50 px-8 py-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-forest-200 mb-1">Purchase Order</div>
                    <div className="font-display text-2xl leading-tight">AL-2026-0511</div>
                    <div className="text-xs text-forest-200 mt-1">Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
                  </div>
                  <button onClick={onClose} className="text-forest-200 hover:text-cream-50 transition">
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              <div className="px-8 py-6 space-y-6">
                {/* Buyer / Delivery */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-cream-100/60 border border-forest-100 rounded-xl p-4">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mb-1.5">Buyer</div>
                    <div className="font-medium text-forest-900 text-sm">{order.buyer}</div>
                    <div className="text-xs text-ink-muted mt-0.5">UC Davis Dining Services</div>
                  </div>
                  <div className="bg-cream-100/60 border border-forest-100 rounded-xl p-4">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mb-1.5">Delivery</div>
                    <div className="font-medium text-forest-900 text-sm">{order.delivery}</div>
                    <div className="text-xs text-ink-muted mt-0.5">Invoice: {order.invoiceId}</div>
                  </div>
                </div>

                {/* Line items preview */}
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mb-3">
                    Aggregated Line Items ({order.lineCount})
                  </div>
                  <div className="rounded-xl border border-forest-100 overflow-hidden">
                    <div className="grid grid-cols-3 gap-4 px-4 py-2 bg-cream-100/60 border-b border-forest-100 text-[10px] uppercase tracking-[0.12em] text-ink-subtle">
                      <div>Crop</div>
                      <div className="text-right">Qty (lb)</div>
                      <div className="text-right">Farms</div>
                    </div>
                    {order.lines.slice(0, 6).map((line: { crop: string; amountLb: number; contributors: unknown[] }) => (
                      <div key={line.crop} className="grid grid-cols-3 gap-4 px-4 py-2.5 border-b border-forest-50 last:border-0 text-sm">
                        <div className="text-forest-900 font-medium">{line.crop}</div>
                        <div className="text-right text-ink">{line.amountLb} lb</div>
                        <div className="text-right text-ink-muted">{line.contributors.length}</div>
                      </div>
                    ))}
                    {order.lines.length > 6 && (
                      <div className="px-4 py-2 text-xs text-ink-subtle">
                        + {order.lines.length - 6} more line items
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-cream-100/60 border border-forest-100 rounded-xl p-3 text-center">
                    <div className="font-display text-2xl text-forest-900">{order.totalLb.toLocaleString()}</div>
                    <div className="text-[10px] uppercase tracking-[0.12em] text-ink-subtle mt-1">Total lb</div>
                  </div>
                  <div className="bg-cream-100/60 border border-forest-100 rounded-xl p-3 text-center">
                    <div className="font-display text-2xl text-forest-900">{order.contributingFarms}</div>
                    <div className="text-[10px] uppercase tracking-[0.12em] text-ink-subtle mt-1">Farms</div>
                  </div>
                  <div className="bg-cream-100/60 border border-forest-100 rounded-xl p-3 text-center">
                    <div className="font-display text-2xl text-forest-900">{order.lineCount}</div>
                    <div className="text-[10px] uppercase tracking-[0.12em] text-ink-subtle mt-1">Line items</div>
                  </div>
                </div>

                {/* Compliance */}
                <div className="bg-forest-50 border border-forest-200 rounded-xl p-4">
                  <div className="text-xs font-medium text-forest-800 mb-2.5">Compliance Packet</div>
                  <div className="space-y-1.5">
                    {["Food Safety Certifications", "Organic Certificates (11 farms)", "GAP Audit Reports", "Traceability to Farm", "Unified Insurance Certificate"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-forest-800">
                        <CheckCircle2 className="size-3.5 text-forest-600 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer note */}
                <div className="text-xs text-ink-subtle leading-relaxed border-t border-forest-100 pt-4">
                  Invoice will be generated upon delivery confirmation. Payment terms: Net 30.
                  Farms are compensated proportionally within 14 business days of delivery.
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-50 text-sm font-medium transition shadow-soft">
                    <Printer className="size-4" /> Download PO
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full border border-forest-200 hover:bg-forest-50 text-forest-800 text-sm transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
