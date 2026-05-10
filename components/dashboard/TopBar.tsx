"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, Calendar, ChevronDown } from "lucide-react";
import clsx from "clsx";

interface Props {
  portal?: "institution" | "farmer";
}

export default function TopBar({ portal = "institution" }: Props) {
  const router = useRouter();

  return (
    <header className="h-16 border-b border-forest-100 bg-cream-50 px-5 sm:px-8 lg:px-10 flex items-center justify-between sticky top-0 z-40 backdrop-blur">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="size-8 rounded-full bg-forest-800 grid place-items-center text-cream-50">
            <Sprout className="size-4" strokeWidth={2.25} />
          </div>
          <span className="font-display text-xl tracking-tight text-forest-900">AggieLink</span>
        </Link>

        {/* Workspace toggle */}
        <div className="hidden sm:flex items-center gap-1 bg-forest-50 border border-forest-100 rounded-full p-1">
          <button
            onClick={() => router.push("/farmer")}
            className={clsx(
              "px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200",
              portal === "farmer"
                ? "bg-forest-800 text-cream-50 shadow-soft"
                : "text-forest-700 hover:text-forest-900 hover:bg-forest-100/60"
            )}
          >
            Farmer Workspace
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className={clsx(
              "px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200",
              portal === "institution"
                ? "bg-forest-800 text-cream-50 shadow-soft"
                : "text-forest-700 hover:text-forest-900 hover:bg-forest-100/60"
            )}
          >
            Institution Workspace
          </button>
        </div>

        <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-50 border border-forest-100 text-[11px] uppercase tracking-[0.14em] text-forest-700">
          Demo
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-forest-100 hover:bg-forest-50 text-sm text-ink transition">
          <Calendar className="size-3.5 text-forest-600" />
          Week of May 11, 2026
          <ChevronDown className="size-3.5 text-ink-subtle" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-forest-100">
          <div className="size-8 rounded-full bg-wheat-400 grid place-items-center text-forest-900 font-display text-sm shrink-0">
            {portal === "farmer" ? "F" : "A"}
          </div>
          <div className="hidden sm:block leading-tight">
            {portal === "farmer" ? (
              <>
                <div className="text-sm font-medium text-forest-900">Demo Farm</div>
                <div className="text-xs text-ink-subtle">Putah Creek · Farmer Portal</div>
              </>
            ) : (
              <>
                <div className="text-sm font-medium text-forest-900">Alex Rivera</div>
                <div className="text-xs text-ink-subtle">Procurement · UC Davis Dining</div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
