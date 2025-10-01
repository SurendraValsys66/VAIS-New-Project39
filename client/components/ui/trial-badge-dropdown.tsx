import React, { useEffect, useMemo, useState } from "react";
import TrialBadge from "@/components/ui/trial-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export type TrialUsage = {
  searchesToday: number;
  creditsToday: number;
  searchesTotal: number;
  creditsTotal: number;
  date: string; // YYYY-MM-DD for daily reset
};

const DAILY_SEARCH_LIMIT = 10;
const DAILY_CREDIT_LIMIT = 200;
const TRIAL_SEARCH_LIMIT = 50; // for 5 days
const TRIAL_CREDIT_LIMIT = 1000; // for 5 days

function todayKey() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export default function TrialBadgeDropdown({
  className,
}: {
  className?: string;
}) {
  const [usage, setUsage] = useState<TrialUsage | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("trialUsage");
      const today = todayKey();
      if (raw) {
        const parsed = JSON.parse(raw) as TrialUsage;
        if (parsed.date !== today) {
          // New day: reset daily counters
          setUsage({
            searchesToday: 0,
            creditsToday: 0,
            searchesTotal: parsed.searchesTotal || 0,
            creditsTotal: parsed.creditsTotal || 0,
            date: today,
          });
        } else {
          setUsage(parsed);
        }
      } else {
        setUsage({
          searchesToday: 10,
          creditsToday: 150,
          searchesTotal: 10,
          creditsTotal: 150,
          date: today,
        });
      }
    } catch {
      setUsage({
        searchesToday: 0,
        creditsToday: 0,
        searchesTotal: 0,
        creditsTotal: 0,
        date: todayKey(),
      });
    }
  }, []);

  const dailySearchPct = useMemo(
    () => clamp(((usage?.searchesToday || 0) / DAILY_SEARCH_LIMIT) * 100),
    [usage],
  );
  const dailyCreditPct = useMemo(
    () => clamp(((usage?.creditsToday || 0) / DAILY_CREDIT_LIMIT) * 100),
    [usage],
  );
  const totalSearchPct = useMemo(
    () => clamp(((usage?.searchesTotal || 0) / TRIAL_SEARCH_LIMIT) * 100),
    [usage],
  );
  const totalCreditPct = useMemo(
    () => clamp(((usage?.creditsTotal || 0) / TRIAL_CREDIT_LIMIT) * 100),
    [usage],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn("cursor-pointer select-none", className)}>
          <TrialBadge caret />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="center"
        sideOffset={8}
        avoidCollisions
        collisionPadding={{ left: 280, right: 16, top: 16, bottom: 16 }}
        className="z-[60] w-80 p-3"
      >
        <DropdownMenuLabel className="text-xs tracking-wide text-valasys-gray-500">
          Free Trial Usage
        </DropdownMenuLabel>
        <div className="space-y-3 py-1">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium text-valasys-gray-700">
                Search progress
              </span>
              <span className="text-valasys-gray-500">
                {usage?.searchesToday || 0}/{DAILY_SEARCH_LIMIT} today •{" "}
                {usage?.searchesTotal || 0}/{TRIAL_SEARCH_LIMIT} total
              </span>
            </div>
            <Progress
              value={dailySearchPct}
              className="h-2 bg-valasys-gray-100"
            />
            <div className="mt-1 text-[10px] text-valasys-gray-500">
              Daily limit: {DAILY_SEARCH_LIMIT} | Trial limit:{" "}
              {TRIAL_SEARCH_LIMIT}
            </div>
          </div>
          <DropdownMenuSeparator />
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium text-valasys-gray-700">
                Credit progress
              </span>
              <span className="text-valasys-gray-500">
                {usage?.creditsToday || 0}/{DAILY_CREDIT_LIMIT} today •{" "}
                {usage?.creditsTotal || 0}/{TRIAL_CREDIT_LIMIT} total
              </span>
            </div>
            <Progress value={dailyCreditPct} className="h-2" />
            <div className="mt-1 text-[10px] text-valasys-gray-500">
              Daily limit: {DAILY_CREDIT_LIMIT} | Trial limit:{" "}
              {TRIAL_CREDIT_LIMIT}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
