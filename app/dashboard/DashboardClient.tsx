"use client";

import { useState } from "react";
import Sidebar, { type Section } from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import FarmNetwork from "@/components/dashboard/FarmNetwork";
import AggregatedOrder from "@/components/dashboard/AggregatedOrder";
import ImpactInsights from "@/components/dashboard/ImpactInsights";
import PostDemand from "@/components/dashboard/PostDemand";
import DeliveryCoord from "@/components/dashboard/DeliveryCoord";
import Forecast from "@/components/dashboard/Forecast";
import AssistantCard from "@/components/dashboard/AssistantCard";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardClient() {
  const [section, setSection] = useState<Section>("network");

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <TopBar portal="institution" />
      <div className="flex-1 flex flex-col lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0 lg:border-r border-forest-100/70 bg-cream-100/40 flex flex-col">
          <Sidebar active={section} onChange={setSection} />
        </aside>

        <main className="flex-1 px-5 sm:px-8 lg:px-10 py-8 lg:py-10 max-w-[1400px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {section === "network"     && <FarmNetwork />}
              {section === "order"       && <AggregatedOrder />}
              {section === "impact"      && <ImpactInsights />}
              {section === "post-demand" && <PostDemand />}
              {section === "delivery"    && <DeliveryCoord />}
              {section === "forecast"    && <Forecast />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AssistantCard active={section} portal="institution" floating />
    </div>
  );
}
