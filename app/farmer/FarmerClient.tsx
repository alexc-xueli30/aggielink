"use client";

import { useState } from "react";
import TopBar from "@/components/dashboard/TopBar";
import FarmerSidebar, { type FarmerSection } from "@/components/farmer/FarmerSidebar";
import MyListings from "@/components/farmer/MyListings";
import DemandFeed from "@/components/farmer/DemandFeed";
import SeasonCalendar from "@/components/farmer/SeasonCalendar";
import Certifications from "@/components/farmer/Certifications";
import MatchedOpportunities from "@/components/farmer/MatchedOpportunities";
import AssistantCard from "@/components/dashboard/AssistantCard";
import { AnimatePresence, motion } from "framer-motion";
import type { Farm, DemandPost } from "@/lib/data";

interface Props {
  myFarm: Farm;
  farms: Farm[];
  demandPosts: DemandPost[];
}

export default function FarmerClient({ myFarm, farms, demandPosts }: Props) {
  const [section, setSection] = useState<FarmerSection>("listings");

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <TopBar portal="farmer" />
      <div className="flex-1 flex flex-col lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0 lg:border-r border-forest-100/70 bg-cream-100/40 flex flex-col">
          <FarmerSidebar active={section} onChange={setSection} />

          {/* Farm identity card */}
          <div className="hidden lg:block p-4 mt-auto">
            <div className="rounded-2xl border border-forest-200/60 bg-gradient-to-br from-forest-900 to-forest-800 text-cream-50 p-5">
              <div className="text-[10px] uppercase tracking-[0.14em] text-forest-200 mb-3">Your farm</div>
              <div className="font-display text-lg leading-tight">{myFarm.name}</div>
              <div className="text-xs text-forest-200 mt-1">{myFarm.steward} · {myFarm.county} County</div>
              <div className="mt-4 pt-4 border-t border-cream-50/10 grid grid-cols-2 gap-3">
                <div>
                  <div className="font-display text-xl text-cream-50">{myFarm.weeklyCapacityLb}</div>
                  <div className="text-[10px] text-forest-200 uppercase tracking-[0.12em]">lb/week</div>
                </div>
                <div>
                  <div className="font-display text-xl text-cream-50">{myFarm.distanceMi} mi</div>
                  <div className="text-[10px] text-forest-200 uppercase tracking-[0.12em]">radius</div>
                </div>
              </div>
            </div>
          </div>
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
              {section === "listings"       && <MyListings farm={myFarm} />}
              {section === "demand"         && <DemandFeed posts={demandPosts} farm={myFarm} />}
              {section === "season"         && <SeasonCalendar farm={myFarm} />}
              {section === "certifications" && <Certifications farm={myFarm} />}
              {section === "matches"        && <MatchedOpportunities farm={myFarm} posts={demandPosts} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AssistantCard active={section} portal="farmer" floating />
    </div>
  );
}
