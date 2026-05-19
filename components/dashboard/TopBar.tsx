"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, Calendar, ChevronDown, User, Settings, LogOut } from "lucide-react";
import clsx from "clsx";

interface Props {
  portal?: "institution" | "farmer";
}

export default function TopBar({ portal = "institution" }: Props) {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

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
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2.5 pl-3 border-l border-forest-100 cursor-pointer hover:opacity-80 transition-opacity"
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            <div className="size-8 rounded-full bg-wheat-400 grid place-items-center text-forest-900 font-display text-sm shrink-0">
              {portal === "farmer" ? "F" : "A"}
            </div>
            <div className="hidden sm:block leading-tight text-left">
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
            <ChevronDown
              className={clsx(
                "size-3.5 text-ink-subtle transition-transform duration-200 hidden sm:block",
                profileOpen && "rotate-180"
              )}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-forest-100 bg-cream-50 shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-3 border-b border-forest-100/60">
                <div className="text-sm font-medium text-forest-900">
                  {portal === "farmer" ? "Demo Farm" : "Alex Rivera"}
                </div>
                <div className="text-xs text-ink-subtle mt-0.5">
                  {portal === "farmer" ? "farmer@aggielink.demo" : "alex.r@ucdavis.edu"}
                </div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { setProfileOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-forest-800 hover:bg-forest-50 transition-colors"
                >
                  <User className="size-4 text-forest-600" />
                  Profile
                </button>
                <button
                  onClick={() => { setProfileOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-forest-800 hover:bg-forest-50 transition-colors"
                >
                  <Settings className="size-4 text-forest-600" />
                  Settings
                </button>
              </div>
              <div className="border-t border-forest-100/60 py-1">
                <button
                  onClick={() => { setProfileOpen(false); router.push("/"); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
