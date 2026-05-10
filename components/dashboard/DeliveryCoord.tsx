"use client";

import { motion } from "framer-motion";
import { Truck, MapPin, Clock, CheckCircle, Package, AlertCircle, ShieldCheck, FileText, AlertTriangle } from "lucide-react";

const stops = [
  {
    farm: "Putah Creek Organics",
    county: "Yolo",
    address: "4821 Putah Creek Rd, Winters, CA",
    items: ["Carrots — 240 lb", "Beets — 95 lb"],
    eta: "6:15 AM",
    status: "confirmed",
  },
  {
    farm: "Capay Hills Farm",
    county: "Yolo",
    address: "2200 Capay Rd, Brooks, CA",
    items: ["Tomatoes — 320 lb", "Peppers — 140 lb"],
    eta: "6:45 AM",
    status: "confirmed",
  },
  {
    farm: "Yolo Greenway Acres",
    county: "Yolo",
    address: "900 County Road 98, Woodland, CA",
    items: ["Salad Mix — 110 lb"],
    eta: "7:10 AM",
    status: "confirmed",
  },
  {
    farm: "Solano Heritage Ranch",
    county: "Solano",
    address: "3100 Suisun Valley Rd, Fairfield, CA",
    items: ["Apples — 410 lb"],
    eta: "7:55 AM",
    status: "pending",
  },
  {
    farm: "Knight's Landing Produce",
    county: "Yolo",
    address: "1200 Main St, Knights Landing, CA",
    items: ["Squash — 190 lb", "Zucchini — 130 lb"],
    eta: "8:20 AM",
    status: "confirmed",
  },
];

const delivery = {
  destination: "UC Davis Dining — Segundo Services Building",
  address: "1 Shields Ave, Davis, CA 95616",
  arrivalWindow: "10:00 AM – 11:30 AM",
  invoiceId: "AL-INV-2026-0511",
  driver: "Routes Logistics Co.",
  totalStops: stops.length,
  totalLb: 2840,
};

const statusColor: Record<string, string> = {
  confirmed: "text-forest-700 bg-forest-50 border-forest-200",
  pending:   "text-wheat-700 bg-wheat-400/10 border-wheat-400/30",
};

export default function DeliveryCoord() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-forest-900 leading-tight">Delivery Coordination</h1>
        <p className="mt-1.5 text-ink-muted">
          This week&rsquo;s pickup route and institutional drop-off schedule.
        </p>
      </div>

      {/* Delivery summary card */}
      <div className="rounded-2xl bg-forest-900 text-cream-50 p-6 shadow-lift">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-[0.16em] text-forest-200 mb-1">Final destination</div>
            <div className="font-display text-xl leading-tight">{delivery.destination}</div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-forest-200">
              <MapPin className="size-3.5 shrink-0" />
              {delivery.address}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-right shrink-0">
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-forest-200">Arrival window</div>
              <div className="font-display text-sm mt-0.5 flex items-center gap-1 justify-end">
                <Clock className="size-3.5 text-forest-300" />
                {delivery.arrivalWindow}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-forest-200">Total load</div>
              <div className="font-display text-sm mt-0.5">{delivery.totalLb.toLocaleString()} lb</div>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-forest-700/60 flex flex-wrap gap-x-6 gap-y-1 text-xs text-forest-200">
          <span>Invoice: {delivery.invoiceId}</span>
          <span>Carrier: {delivery.driver}</span>
          <span>{delivery.totalStops} farm pickups</span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "On-time rate", value: "94%", sub: "last 12 deliveries" },
          { label: "Deliveries this season", value: "11", sub: "since Jan 2026" },
          { label: "Farms this delivery", value: "5", sub: "Yolo + Solano counties" },
          { label: "Total load", value: "2,840 lb", sub: "across 6 product lines" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-cream-50 border border-forest-100 p-4 shadow-soft">
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mb-1">{stat.label}</div>
            <div className="font-display text-2xl text-forest-900">{stat.value}</div>
            <div className="text-[11px] text-ink-muted mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Route stops */}
      <div>
        <h2 className="font-display text-xl text-forest-900 mb-4">Pickup route</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-forest-100" />

          <div className="space-y-3">
            {stops.map((stop, i) => (
              <motion.div
                key={stop.farm}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="relative flex gap-5"
              >
                {/* Stop indicator */}
                <div className="relative z-10 shrink-0 size-10 rounded-full bg-cream-50 border-2 border-forest-200 grid place-items-center">
                  {stop.status === "confirmed" ? (
                    <CheckCircle className="size-4 text-forest-600" />
                  ) : (
                    <AlertCircle className="size-4 text-wheat-600" />
                  )}
                </div>

                {/* Card */}
                <div className="flex-1 bg-cream-50 border border-forest-100 rounded-2xl p-4 shadow-soft mb-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-forest-900 text-sm">{stop.farm}</span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.1em] border ${statusColor[stop.status]}`}
                        >
                          {stop.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-ink-subtle">
                        <MapPin className="size-3" />
                        {stop.address}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] uppercase tracking-[0.1em] text-ink-subtle">ETA</div>
                      <div className="font-display text-sm text-forest-900">{stop.eta}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {stop.items.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-forest-50 border border-forest-100 text-xs text-forest-800">
                        <Package className="size-3" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Final destination marker */}
            <div className="relative flex gap-5">
              <div className="relative z-10 shrink-0 size-10 rounded-full bg-forest-800 grid place-items-center">
                <Truck className="size-4 text-cream-50" />
              </div>
              <div className="flex-1 bg-forest-50 border border-forest-200 rounded-2xl p-4">
                <div className="font-medium text-forest-900 text-sm">{delivery.destination}</div>
                <div className="text-xs text-ink-muted mt-0.5">{delivery.address} · {delivery.arrivalWindow}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Compliance & Documentation */}
      <div className="rounded-2xl bg-cream-50 border border-forest-100 p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="size-4 text-forest-600" />
          <h2 className="font-display text-lg text-forest-900">Food Safety &amp; Compliance</h2>
        </div>
        <div className="space-y-2.5">
          {[
            { label: "Unified Food Safety Packet (all 5 farms)", ok: true },
            { label: "USDA Organic Certificates (3 farms)", ok: true },
            { label: "GAP Audit Reports (2 farms)", ok: true },
            { label: "Recall & Traceability Plan", ok: true },
            { label: "Certificate of Insurance (carrier)", ok: true },
          ].map((doc) => (
            <div key={doc.label} className="flex items-center gap-2.5">
              <CheckCircle className="size-4 text-forest-500 shrink-0" />
              <span className="text-sm text-forest-800">{doc.label}</span>
              <span className="ml-auto">
                <FileText className="size-3.5 text-ink-subtle" />
              </span>
            </div>
          ))}
          {/* Amber warning */}
          <div className="flex items-center gap-2.5 mt-1 rounded-lg bg-wheat-400/10 border border-wheat-400/30 px-3 py-2">
            <AlertTriangle className="size-4 text-wheat-600 shrink-0" />
            <span className="text-sm text-wheat-700">
              Solano Heritage Ranch — GAP renewal pending
            </span>
            <span className="ml-auto text-xs text-wheat-600 font-medium shrink-0">2 days remaining</span>
          </div>
        </div>
      </div>

      {/* Upcoming Deliveries */}
      <div>
        <h2 className="font-display text-xl text-forest-900 mb-4">Upcoming deliveries</h2>
        <div className="rounded-2xl border border-forest-100 overflow-hidden shadow-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-forest-50 border-b border-forest-100">
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-ink-subtle font-medium">Week of</th>
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-ink-subtle font-medium">Buyer</th>
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-ink-subtle font-medium">Est. volume</th>
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-ink-subtle font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-50">
              {[
                { week: "May 18", buyer: "UC Davis Dining", volume: "~2,900 lb", status: "On track", statusClass: "text-forest-700 bg-forest-50 border-forest-200" },
                { week: "May 25", buyer: "UC Davis Dining", volume: "~2,750 lb", status: "Supply risk (brassicas)", statusClass: "text-wheat-700 bg-wheat-400/10 border-wheat-400/30" },
                { week: "Jun 1",  buyer: "Sutter Davis",    volume: "~1,200 lb", status: "Planning", statusClass: "text-ink-subtle bg-cream-100 border-forest-100" },
              ].map((row) => (
                <tr key={row.week} className="bg-cream-50 hover:bg-forest-50/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-forest-900">{row.week}</td>
                  <td className="px-4 py-3 text-ink-muted">{row.buyer}</td>
                  <td className="px-4 py-3 text-ink-muted">{row.volume}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-[0.1em] border ${row.statusClass}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
