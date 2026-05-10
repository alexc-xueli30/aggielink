"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { week: "May 11", supply: 1620, demand: 1480 },
  { week: "May 18", supply: 1700, demand: 1560 },
  { week: "May 25", supply: 1840, demand: 1700 },
  { week: "Jun 1",  supply: 1920, demand: 1820 },
  { week: "Jun 8",  supply: 2050, demand: 1950 },
  { week: "Jun 15", supply: 2180, demand: 2100 },
  { week: "Jun 22", supply: 2340, demand: 2280 },
  { week: "Jun 29", supply: 2400, demand: 2450 },
  { week: "Jul 6",  supply: 2280, demand: 2520 },
  { week: "Jul 13", supply: 2150, demand: 2580 },
  { week: "Jul 20", supply: 2090, demand: 2620 },
  { week: "Aug 3",  supply: 1980, demand: 2700 },
];

const cropOutlook = [
  { crop: "Brassicas",   thisWeek: "480 lb", plusFour: "610 lb", trend: "↑",  risk: "Under",    riskClass: "text-wheat-700 bg-wheat-400/10 border-wheat-400/30" },
  { crop: "Stone Fruit", thisWeek: "320 lb", plusFour: "890 lb", trend: "↑↑", risk: "OK",       riskClass: "text-forest-700 bg-forest-50 border-forest-200" },
  { crop: "Roots",       thisWeek: "335 lb", plusFour: "310 lb", trend: "→",  risk: "OK",       riskClass: "text-forest-700 bg-forest-50 border-forest-200" },
  { crop: "Greens",      thisWeek: "290 lb", plusFour: "260 lb", trend: "↓",  risk: "Low risk", riskClass: "text-ink-subtle bg-cream-100 border-forest-100" },
  { crop: "Nightshades", thisWeek: "270 lb", plusFour: "420 lb", trend: "↑",  risk: "OK",       riskClass: "text-forest-700 bg-forest-50 border-forest-200" },
  { crop: "Squash",      thisWeek: "190 lb", plusFour: "350 lb", trend: "↑↑", risk: "OK",       riskClass: "text-forest-700 bg-forest-50 border-forest-200" },
];

const rfpWindows = [
  {
    buyer: "UC Davis Dining",
    deadline: "Jun 1",
    type: "12-month contract",
    value: "~$180K",
    action: "Submit interest",
    actionClass: "bg-forest-800 text-cream-50 hover:bg-forest-700",
  },
  {
    buyer: "Woodland Unified",
    deadline: "Jun 15",
    type: "Produce only",
    value: "—",
    action: "Planning",
    actionClass: "bg-cream-100 text-ink-muted border border-forest-100",
  },
  {
    buyer: "Sutter Health",
    deadline: "Jul 1",
    type: "Multi-county PO",
    value: "~$240K",
    action: "Requires pooled fulfillment",
    actionClass: "bg-wheat-400/10 text-wheat-700 border border-wheat-400/30",
  },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-cream-50 border border-forest-100 rounded-xl p-3 shadow-lift text-sm">
      <div className="font-medium text-forest-900 mb-1">{label}</div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs text-ink-muted">
          <span className="size-2 rounded-full" style={{ background: p.name === "supply" ? "#286c3c" : "#c9a84c" }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-medium text-forest-900">{p.value.toLocaleString()} lb</span>
        </div>
      ))}
    </div>
  );
}

export default function Forecast() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-forest-900 leading-tight">Forward Demand Forecasting</h1>
        <p className="mt-1.5 text-ink-muted">
          Projected supply, seasonal availability, and upcoming procurement windows.
        </p>
      </div>

      {/* Supply vs Demand Chart */}
      <div className="rounded-2xl bg-cream-50 border border-forest-100 p-6 shadow-soft">
        <div className="mb-5">
          <h2 className="font-display text-lg text-forest-900">Projected supply vs. demand — next 12 weeks</h2>
          <div className="flex items-center gap-5 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <span className="size-2.5 rounded-full bg-forest-600" />
              Projected supply
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <span className="size-2.5 rounded-full bg-wheat-500" />
              Projected demand
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={weeklyData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="supplyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#286c3c" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#286c3c" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#c9a84c" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e0d0" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 10, fill: "#9a8f82" }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#9a8f82" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="supply"
              stroke="#286c3c"
              strokeWidth={2}
              fill="url(#supplyGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="demand"
              stroke="#c9a84c"
              strokeWidth={2}
              strokeDasharray="5 3"
              fill="url(#demandGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="mt-3 text-xs text-ink-subtle text-center">
          Supply shortfall begins week of Jun 29 — pooled sourcing recommended.
        </p>
      </div>

      {/* Crop Category Outlook */}
      <div>
        <h2 className="font-display text-xl text-forest-900 mb-4">Crop category outlook</h2>
        <div className="rounded-2xl border border-forest-100 overflow-hidden shadow-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-forest-50 border-b border-forest-100">
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-ink-subtle font-medium">Crop</th>
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-ink-subtle font-medium">This week</th>
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-ink-subtle font-medium">+4 weeks</th>
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-ink-subtle font-medium">Trend</th>
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-ink-subtle font-medium">Supply risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-50">
              {cropOutlook.map((row) => (
                <tr key={row.crop} className="bg-cream-50 hover:bg-forest-50/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-forest-900">{row.crop}</td>
                  <td className="px-4 py-3 text-ink-muted">{row.thisWeek}</td>
                  <td className="px-4 py-3 text-ink-muted">{row.plusFour}</td>
                  <td className="px-4 py-3 font-medium text-forest-700">{row.trend}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-[0.1em] border ${row.riskClass}`}>
                      {row.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming RFP Windows */}
      <div>
        <h2 className="font-display text-xl text-forest-900 mb-4">Upcoming RFP windows</h2>
        <div className="space-y-3">
          {rfpWindows.map((rfp) => (
            <div key={rfp.buyer} className="rounded-2xl bg-cream-50 border border-forest-100 p-5 shadow-soft flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-forest-900">{rfp.buyer}</div>
                <div className="text-xs text-ink-muted mt-0.5">{rfp.type}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] uppercase tracking-[0.12em] text-ink-subtle">Deadline</div>
                <div className="font-display text-sm text-forest-900">{rfp.deadline}</div>
              </div>
              {rfp.value !== "—" && (
                <div className="text-right shrink-0">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-ink-subtle">Est. value</div>
                  <div className="font-display text-sm text-forest-700">{rfp.value}</div>
                </div>
              )}
              <button className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${rfp.actionClass}`}>
                {rfp.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
