"use client";

import { motion } from "framer-motion";
import { Building2, Award, Calendar, Package, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import clsx from "clsx";
import type { DemandPost, Farm } from "@/lib/data";

type FilterId = "all" | "matching" | "open";

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All posts" },
  { id: "matching", label: "Matching my crops" },
  { id: "open", label: "Open only" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function DemandFeed({ posts, farm }: { posts: DemandPost[]; farm: Farm }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [expressed, setExpressed] = useState<Set<number>>(new Set());

  const myTopCrops = farm.topCrops.map((c) => c.toLowerCase());

  const isMatch = (post: DemandPost) =>
    myTopCrops.some(
      (c) =>
        post.crop.toLowerCase().includes(c) ||
        c.includes(post.crop.toLowerCase().split(" ")[0])
    );

  const filtered = useMemo(() => {
    if (filter === "matching") return posts.filter(isMatch);
    if (filter === "open") return posts.filter((p) => p.status === "open");
    return posts;
  }, [posts, filter]);

  return (
    <div>
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.16em] text-forest-600">Section · 2 of 3</span>
          <h1 className="mt-1.5 font-display text-3xl md:text-4xl text-forest-900 leading-tight">
            Demand Feed
          </h1>
          <p className="mt-2 text-ink-muted max-w-xl text-pretty">
            Active requests from institutional buyers. Express interest to let AggieLink know you can supply.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-4 py-2.5 rounded-xl bg-cream-100/70 border border-forest-100 text-center">
            <div className="font-display text-xl text-forest-900 leading-none">{posts.filter((p) => p.status === "open").length}</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mt-1">Open posts</div>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-cream-100/70 border border-forest-100 text-center">
            <div className="font-display text-xl text-forest-900 leading-none">{posts.filter(isMatch).length}</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle mt-1">Matching crops</div>
          </div>
        </div>
      </header>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={clsx(
              "px-3.5 py-1.5 rounded-full text-xs transition border",
              filter === f.id
                ? "bg-forest-800 text-cream-50 border-forest-800"
                : "bg-cream-50 text-ink border-forest-100 hover:border-forest-300"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-3 text-xs text-ink-subtle">
        Showing {filtered.length} of {posts.length} demand posts
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {filtered.map((post, i) => {
          const days = daysUntil(post.neededBy);
          const matches = isMatch(post);
          const hasExpressed = expressed.has(post.id);

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.04 }}
              className={clsx(
                "rounded-2xl border p-5 bg-cream-50 transition",
                matches ? "border-forest-200 shadow-soft" : "border-forest-100"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                      <Building2 className="size-3 text-forest-600" />
                      {post.buyer}
                    </div>
                    {matches && (
                      <span className="px-2 py-0.5 rounded-full bg-forest-50 border border-forest-200 text-[10px] text-forest-700 uppercase tracking-[0.12em]">
                        Matches your crops
                      </span>
                    )}
                    <span
                      className={clsx(
                        "px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.12em]",
                        post.status === "open"
                          ? "bg-wheat-400/20 text-wheat-600 border border-wheat-400/40"
                          : "bg-cream-100 text-ink-subtle border border-forest-100"
                      )}
                    >
                      {post.status}
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="font-display text-2xl text-forest-900">{post.crop}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-muted">
                    <span className="flex items-center gap-1.5">
                      <Package className="size-3 text-forest-600" />
                      {post.quantityLb.toLocaleString()} lb needed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3 text-forest-600" />
                      By {formatDate(post.neededBy)}
                      <span
                        className={clsx(
                          "ml-1 font-medium",
                          days <= 7 ? "text-clay-500" : "text-ink-muted"
                        )}
                      >
                        ({days}d)
                      </span>
                    </span>
                    {post.deliverySchedule && (
                      <span className="text-ink-subtle">{post.deliverySchedule}</span>
                    )}
                  </div>

                  {post.certificationRequirements.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {post.certificationRequirements.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-50 border border-forest-100 text-[10px] text-forest-700"
                        >
                          <Award className="size-2.5" />
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {post.notes && (
                    <p className="mt-3 text-xs text-ink-subtle italic">{post.notes}</p>
                  )}
                </div>

                <div className="shrink-0">
                  {post.status === "open" ? (
                    <button
                      onClick={() => setExpressed((s) => new Set(s).add(post.id))}
                      disabled={hasExpressed}
                      className={clsx(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition",
                        hasExpressed
                          ? "bg-forest-50 text-forest-600 border border-forest-200 cursor-default"
                          : "bg-forest-800 text-cream-50 hover:bg-forest-700"
                      )}
                    >
                      {hasExpressed ? "Interest sent" : (
                        <>Express interest <ArrowRight className="size-3.5" /></>
                      )}
                    </button>
                  ) : (
                    <span className="text-xs text-ink-subtle">Filled</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-16 text-center text-ink-subtle text-sm">
            No demand posts match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
