"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Handshake, Clock, ShieldCheck, CheckCircle, Building2, ArrowRight } from "lucide-react";
import type { Farm, DemandPost } from "@/lib/data";

function matchScore(farm: Farm, post: DemandPost): number {
  let score = 0;
  // Crop match
  const cropWords = post.crop.toLowerCase().split(/\s+/);
  if (farm.topCrops.some((c) => cropWords.some((w) => c.toLowerCase().includes(w)))) score += 3;
  // Certification match
  const certMet = post.certificationRequirements.every((req) =>
    farm.certifications.some((c) => c.toLowerCase().includes(req.toLowerCase()))
  );
  if (post.certificationRequirements.length === 0 || certMet) score += 2;
  // Distance check (within 35 mi)
  if (farm.distanceMi <= 35) score += 1;
  return score;
}

const urgencyDays = (neededBy: string) => {
  const diff = Math.ceil((new Date(neededBy).getTime() - Date.now()) / 86_400_000);
  return diff;
};

export default function MatchedOpportunities({
  farm,
  posts,
}: {
  farm: Farm;
  posts: DemandPost[];
}) {
  const [expressed, setExpressed] = useState<Set<number>>(new Set());

  const sorted = [...posts]
    .map((p) => ({ post: p, score: matchScore(farm, p) }))
    .filter(({ score }) => score >= 2)
    .sort((a, b) => b.score - a.score);

  const toggle = (id: number) => {
    setExpressed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-forest-900 leading-tight">Suggested Matches</h1>
        <p className="mt-1.5 text-ink-muted">
          Institutional demand posts that align with your crops, certifications, and delivery radius.
        </p>
      </div>

      {/* Match quality legend */}
      <div className="flex flex-wrap gap-3 text-xs text-ink-muted">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-forest-600 inline-block" /> Strong match (crops + certifications)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-wheat-500 inline-block" /> Partial match (crops only)
        </span>
      </div>

      {sorted.length === 0 ? (
        <div className="bg-cream-100/60 border border-forest-100 rounded-2xl p-6 text-ink-muted text-sm">
          No strong matches found right now. Check back as new demand posts are added each week.
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map(({ post, score }, i) => {
            const days = urgencyDays(post.neededBy);
            const isExpressed = expressed.has(post.id);
            const isStrong = score >= 4;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="bg-cream-50 border border-forest-100 rounded-2xl p-5 shadow-soft"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-display text-lg text-forest-900">{post.crop}</span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.1em] ${
                          isStrong
                            ? "bg-forest-50 border border-forest-200 text-forest-700"
                            : "bg-wheat-400/10 border border-wheat-400/20 text-wheat-700"
                        }`}
                      >
                        {isStrong ? "Strong match" : "Partial match"}
                      </span>
                      {days <= 7 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-clay-400/15 border border-clay-400/20 text-clay-500 text-[10px] uppercase tracking-[0.1em]">
                          <Clock className="size-2.5" /> Urgent
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-1">
                      <Building2 className="size-3.5 shrink-0" />
                      {post.buyer}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
                      <span>{post.quantityLb} lb / week</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        By {new Date(post.neededBy).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        {days > 0 ? ` (${days}d)` : " — urgent"}
                      </span>
                      {post.deliverySchedule && <span>{post.deliverySchedule}</span>}
                    </div>

                    {post.certificationRequirements.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {post.certificationRequirements.map((cert) => {
                          const farmHas = farm.certifications.some((c) =>
                            c.toLowerCase().includes(cert.toLowerCase())
                          );
                          return (
                            <span
                              key={cert}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${
                                farmHas
                                  ? "bg-forest-50 border-forest-200 text-forest-700"
                                  : "bg-cream-100 border-forest-100 text-ink-subtle"
                              }`}
                            >
                              <ShieldCheck className="size-2.5" />
                              {cert}
                              {farmHas && " ✓"}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {post.notes && (
                      <p className="mt-2 text-xs text-ink-subtle italic">{post.notes}</p>
                    )}
                  </div>

                  <button
                    onClick={() => toggle(post.id)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition ${
                      isExpressed
                        ? "bg-forest-50 border border-forest-200 text-forest-700"
                        : "bg-forest-800 hover:bg-forest-700 text-cream-50 shadow-soft"
                    }`}
                  >
                    {isExpressed ? (
                      <>
                        <CheckCircle className="size-3.5" /> Interest sent
                      </>
                    ) : (
                      <>
                        Express interest <ArrowRight className="size-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Why it matched */}
                <div className="mt-3 pt-3 border-t border-forest-50 flex items-center gap-2">
                  <Handshake className="size-3.5 text-forest-500 shrink-0" />
                  <span className="text-[11px] text-ink-subtle">
                    {score >= 5
                      ? "Your crops, certifications, and delivery radius all align with this request."
                      : score >= 3
                      ? "Your crops match this request. Certifications may be required — check details."
                      : "Partial match based on delivery area. Crop or certification adjustments may help."}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
