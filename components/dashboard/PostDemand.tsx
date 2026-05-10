"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle, Plus, Clock, ShieldCheck, X, Sprout, MapPin, Award, Zap } from "lucide-react";
import { farms } from "@/lib/mockData";

const CERT_OPTIONS = ["USDA Organic", "GAP Certified", "CCOF", "Real Organic", "SQF Certified"];

const PIPELINE_STEPS = ["Open", "Matched", "In Pool", "Delivered"] as const;

const existingPosts = [
  {
    id: 1,
    crop: "Baby Spinach",
    quantity: 120,
    neededBy: "2026-05-25",
    certifications: ["USDA Organic"],
    status: "open",
    responses: 3,
    pipelineStep: 1, // Matched
  },
  {
    id: 2,
    crop: "Heirloom Tomatoes",
    quantity: 200,
    neededBy: "2026-06-01",
    certifications: ["GAP Certified"],
    status: "open",
    responses: 7,
    pipelineStep: 2, // In Pool
  },
  {
    id: 3,
    crop: "Broccoli Crown",
    quantity: 300,
    neededBy: "2026-05-18",
    certifications: [],
    status: "filled",
    responses: 12,
    pipelineStep: 3, // Delivered
  },
];

function findMatchedFarms(crop: string, certifications: string[]) {
  const cropWords = crop.toLowerCase().split(/\s+/);
  return farms
    .filter((f) => f.topCrops.some((c) => cropWords.some((w) => c.toLowerCase().includes(w))))
    .map((f) => {
      const certsMatch = certifications.length === 0 || certifications.every((req) =>
        f.certifications.some((c) => c.toLowerCase().includes(req.toLowerCase().replace(" certified", "")))
      );
      return { farm: f, certsMatch };
    })
    .sort((a, b) => (b.certsMatch ? 1 : 0) - (a.certsMatch ? 1 : 0))
    .slice(0, 4);
}

export default function PostDemand() {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [neededBy, setNeededBy] = useState("");
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(existingPosts);

  const topOpenPost = useMemo(() => posts.find((p) => p.status === "open"), [posts]);
  const matchedFarms = useMemo(
    () => (topOpenPost ? findMatchedFarms(topOpenPost.crop, topOpenPost.certifications) : []),
    [topOpenPost]
  );

  const toggleCert = (cert: string) => {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName || !quantity || !neededBy) return;
    setLoading(true);
    try {
      await fetch("/api/demand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: cropName,
          quantityLb: Number(quantity),
          neededBy,
          certifications: selectedCerts,
          buyer: "UC Davis Dining",
          status: "open",
        }),
      });
    } catch {
      // fall through — show confirmation regardless in demo
    }
    setPosts((prev) => [
      {
        id: Date.now(),
        crop: cropName,
        quantity: Number(quantity),
        neededBy,
        certifications: selectedCerts,
        status: "open",
        responses: 0,
        pipelineStep: 0,
      },
      ...prev,
    ]);
    setSubmitted(true);
    setLoading(false);
    setCropName("");
    setQuantity("");
    setNeededBy("");
    setSelectedCerts([]);
  };

  const removePost = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-forest-900 leading-tight">Post Demand</h1>
        <p className="mt-1.5 text-ink-muted">
          Broadcast supply requests to the AggieLink farm network. Farms matching your spec will respond.
        </p>
      </div>

      {/* Form card */}
      <div className="bg-cream-50 border border-forest-100 rounded-2xl p-6 shadow-soft">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="size-8 rounded-full bg-forest-800 grid place-items-center">
            <Plus className="size-4 text-cream-50" strokeWidth={2.5} />
          </div>
          <h2 className="font-display text-lg text-forest-900">New demand request</h2>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-forest-50 border border-forest-200"
            >
              <CheckCircle className="size-5 text-forest-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-forest-900 text-sm">Demand post submitted</div>
                <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                  AggieLink will match your request against available farm supply and notify matching growers.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-forest-700 hover:text-forest-900 underline transition"
                >
                  Post another request
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.12em] text-ink-subtle mb-1.5">
                    Crop / Product
                  </label>
                  <input
                    type="text"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    placeholder="e.g. Heirloom Tomatoes"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-forest-100 bg-cream-50 text-sm text-forest-900 placeholder:text-ink-subtle focus:outline-none focus:border-forest-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.12em] text-ink-subtle mb-1.5">
                    Quantity (lb / week)
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 200"
                    required
                    min={1}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-forest-100 bg-cream-50 text-sm text-forest-900 placeholder:text-ink-subtle focus:outline-none focus:border-forest-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.12em] text-ink-subtle mb-1.5">
                  Needed By
                </label>
                <input
                  type="date"
                  value={neededBy}
                  onChange={(e) => setNeededBy(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-100 bg-cream-50 text-sm text-forest-900 focus:outline-none focus:border-forest-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.12em] text-ink-subtle mb-2">
                  Required Certifications
                </label>
                <div className="flex flex-wrap gap-2">
                  {CERT_OPTIONS.map((cert) => {
                    const active = selectedCerts.includes(cert);
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => toggleCert(cert)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                          active
                            ? "bg-forest-800 text-cream-50"
                            : "bg-forest-50 border border-forest-100 text-forest-700 hover:bg-forest-100"
                        }`}
                      >
                        {active && <ShieldCheck className="size-3" />}
                        {cert}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-50 text-sm font-medium transition shadow-soft disabled:opacity-60"
                >
                  <FileText className="size-4" />
                  {loading ? "Posting…" : "Post Demand Request"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Active requests */}
      <div>
        <h2 className="font-display text-xl text-forest-900 mb-4">Your active requests</h2>
        <div className="space-y-3">
          {posts.map((post) => {
            const step = post.pipelineStep ?? 0;
            const responsePct = Math.min(100, Math.round((post.responses / 10) * 100));
            return (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-cream-50 border border-forest-100 rounded-2xl p-5 shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-display text-lg text-forest-900">{post.crop}</span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.12em] font-medium ${
                          post.status === "filled"
                            ? "bg-wheat-400/20 text-wheat-600"
                            : "bg-forest-50 border border-forest-200 text-forest-700"
                        }`}
                      >
                        {post.status === "filled" ? "Filled" : "Open"}
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
                      <span>{post.quantity} lb/week</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        By {new Date(post.neededBy).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span>{post.responses} farm {post.responses === 1 ? "response" : "responses"}</span>
                    </div>
                    {post.certifications.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {post.certifications.map((c) => (
                          <span key={c} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-50 border border-forest-100 text-[10px] text-forest-700">
                            <ShieldCheck className="size-2.5" />
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pipeline progress */}
                    <div className="mt-4 pt-3 border-t border-forest-50">
                      <div className="flex items-center gap-0">
                        {PIPELINE_STEPS.map((label, i) => {
                          const done = i < step;
                          const current = i === step;
                          return (
                            <div key={label} className="flex items-center flex-1">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`size-5 rounded-full flex items-center justify-center text-[9px] font-medium transition-all ${
                                    done
                                      ? "bg-forest-700 text-cream-50"
                                      : current
                                      ? "bg-forest-800 text-cream-50 ring-2 ring-forest-800/20"
                                      : "bg-cream-200 text-ink-subtle"
                                  }`}
                                >
                                  {done ? "✓" : i + 1}
                                </div>
                                <span
                                  className={`mt-1 text-[9px] uppercase tracking-[0.1em] whitespace-nowrap ${
                                    current ? "text-forest-800 font-medium" : done ? "text-forest-600" : "text-ink-subtle"
                                  }`}
                                >
                                  {label}
                                </span>
                              </div>
                              {i < PIPELINE_STEPS.length - 1 && (
                                <div
                                  className={`flex-1 h-px mx-1 mt-[-10px] ${
                                    i < step ? "bg-forest-600" : "bg-forest-100"
                                  }`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Response readiness bar */}
                      {post.status === "open" && (
                        <div className="mt-3 flex items-center gap-3">
                          <div className="text-[10px] text-ink-subtle uppercase tracking-[0.1em] shrink-0">
                            Network response
                          </div>
                          <div className="flex-1 h-1.5 rounded-full bg-forest-50 border border-forest-100 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-forest-600"
                              initial={{ width: 0 }}
                              animate={{ width: `${responsePct}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                          <div className="text-[10px] text-ink-subtle shrink-0">{post.responses} farms</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => removePost(post.id)}
                    className="text-ink-subtle hover:text-ink transition shrink-0 mt-0.5"
                    aria-label="Remove post"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Demand Intelligence — matched farms for top open post */}
      {topOpenPost && matchedFarms.length > 0 && (
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="size-7 rounded-full bg-wheat-400/20 border border-wheat-400/30 grid place-items-center">
              <Zap className="size-3.5 text-wheat-700" />
            </div>
            <div>
              <h2 className="font-display text-xl text-forest-900 leading-tight">Demand Intelligence</h2>
              <p className="text-xs text-ink-muted mt-0.5">
                Best-matched farms for your <span className="font-medium text-forest-800">{topOpenPost.crop}</span> request
              </p>
            </div>
          </div>

          <div className="bg-cream-50 border border-forest-100 rounded-2xl overflow-hidden shadow-soft">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-cream-100/60 border-b border-forest-100 text-[10px] uppercase tracking-[0.13em] text-ink-subtle">
              <div className="col-span-4">Farm</div>
              <div className="col-span-3">Top crops</div>
              <div className="col-span-2 text-right">Capacity</div>
              <div className="col-span-2">Certifications</div>
              <div className="col-span-1 text-right">Distance</div>
            </div>

            {matchedFarms.map(({ farm, certsMatch }, i) => (
              <motion.div
                key={farm.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.06 }}
                className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-forest-50 last:border-0 items-center"
              >
                <div className="col-span-12 sm:col-span-4 flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-forest-800 grid place-items-center text-cream-50 font-display text-xs shrink-0">
                    {farm.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-forest-900 truncate">{farm.name}</div>
                    <div className="text-[11px] text-ink-muted">{farm.steward}</div>
                  </div>
                </div>
                <div className="hidden sm:block col-span-3 text-xs text-ink truncate">
                  {farm.topCrops.slice(0, 2).join(", ")}
                </div>
                <div className="hidden sm:block col-span-2 text-right">
                  <span className="font-display text-sm text-forest-900">{farm.weeklyCapacityLb}</span>
                  <span className="text-[10px] text-ink-subtle ml-0.5">lb</span>
                </div>
                <div className="hidden sm:flex col-span-2 flex-wrap gap-1">
                  {farm.certifications.slice(0, 2).map((c) => (
                    <span
                      key={c}
                      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] border ${
                        certsMatch
                          ? "bg-forest-50 border-forest-200 text-forest-700"
                          : "bg-cream-100 border-forest-100 text-ink-subtle"
                      }`}
                    >
                      <Award className="size-2" />
                      {c.split(" ")[0]}
                    </span>
                  ))}
                </div>
                <div className="hidden sm:flex col-span-1 justify-end items-center gap-1 text-xs text-ink-muted">
                  <MapPin className="size-3 text-forest-500" />
                  {farm.distanceMi} mi
                </div>
                {certsMatch && (
                  <div className="col-span-12 sm:hidden">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-50 border border-forest-200 text-[10px] text-forest-700">
                      <CheckCircle className="size-2.5" /> Certs match
                    </span>
                  </div>
                )}
              </motion.div>
            ))}

            <div className="px-5 py-3 bg-cream-100/40 border-t border-forest-100 flex items-center gap-2 text-xs text-ink-subtle">
              <Sprout className="size-3.5 text-forest-500 shrink-0" />
              Farms are ranked by crop overlap and certification match with your demand spec.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
