# AggieLink


> One order. Many farms. Real impact.

A premium climate-tech SaaS frontend for a hackathon project that aggregates small local farms into one institution-ready supply pool.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with a custom climate-tech palette
- **Framer Motion** for refined motion design
- **Recharts** for impact visualizations
- **lucide-react** for icons
- **Fraunces + DM Sans** typography (Google Fonts via `next/font`)

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Routes

- `/` — landing page (hero, problem framing, how it works, audience pillars, CTA)
- `/dashboard` — interactive demo dashboard

## Dashboard sections

The dashboard is intentionally simple — three sections only, switched in-place:

1. **Farm Network** — 22 small farms across Yolo, Solano, and Sacramento counties, each with capacity, certifications, top crops, and a steward
2. **Aggregated Order** — this week&rsquo;s combined order for UC Davis Dining Services. 14 line items totaling 2,840 lb across 18 contributing farms. Click any line to see who contributed what
3. **Impact Insights** — plain-English narrative observations, weekly volume trend, and crop-category composition. No formulas exposed

A small **Ask AggieLink** AI assistant card lives in the sidebar (or below the content on mobile) and offers context-aware suggested questions for whichever section is active. Answers are written in plain English with mocked but realistic figures.

## Design notes

- Aesthetic: editorial climate-tech &mdash; cream paper background, deep forest green primary, warm wheat and clay accents
- Typography: Fraunces (display, italic emphasis) paired with DM Sans (body)
- All data is mocked in `lib/mockData.ts`
- Scoring logic, allocation formulas, and proprietary algorithms are intentionally not exposed in the UI

## Project structure

```
app/
  layout.tsx          Root layout with font setup
  page.tsx            Landing page composition
  globals.css         Paper backgrounds + custom scrollbar
  dashboard/
    page.tsx          Dashboard shell with section switcher
components/
  landing/            Navbar, Hero, Problem, HowItWorks, Pillars, CTA, Footer
  dashboard/          Sidebar, TopBar, FarmNetwork, AggregatedOrder, ImpactInsights, AssistantCard
lib/
  mockData.ts         All farms, the weekly order, impact figures
tailwind.config.ts    Custom palette + font tokens
```

## Contributors

- **Alex** — Developer
- **Lucas** — Developer
- **Joshua** — Developer

## Notes

- Alex was here
- Alex was here 2nd time
- alex was here 3rd time

---

*Last Updated: May 20, 2026*
