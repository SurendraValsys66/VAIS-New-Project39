import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type TrialInfo = {
  daysUsed: number;
  totalDays: number;
  active: boolean;
};

export type TrialProgressBarProps = {
  className?: string;
  daysUsed?: number;
  totalDays?: number;
  active?: boolean;
  trialStartDate?: string | Date;
  trialLengthDays?: number;
  fetcher?: () => Promise<TrialInfo>;
};

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function diffDays(from: Date, to: Date) {
  const ms = to.getTime() - from.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

export function TrialProgressBar(props: TrialProgressBarProps) {
  const [trial, setTrial] = useState<TrialInfo | null>(null);
  const [animatedWidth, setAnimatedWidth] = useState(0);

  // Resolve trial data from priority order
  useEffect(() => {
    let done = false;
    (async () => {
      try {
        if (props.fetcher) {
          const t = await props.fetcher();
          if (!done) setTrial(t);
          return;
        }
        if (
          typeof props.daysUsed === "number" &&
          typeof props.totalDays === "number"
        ) {
          setTrial({
            daysUsed: props.daysUsed,
            totalDays: props.totalDays,
            active:
              typeof props.active === "boolean"
                ? props.active
                : props.daysUsed < props.totalDays,
          });
          return;
        }
        if (props.trialStartDate && props.trialLengthDays) {
          const start = new Date(props.trialStartDate);
          const used = diffDays(start, new Date());
          setTrial({
            daysUsed: Math.min(used, props.trialLengthDays),
            totalDays: props.trialLengthDays,
            active: used < props.trialLengthDays,
          });
          return;
        }
        // Fallback: localStorage "trialInfo" { startISO, totalDays }
        const ls =
          typeof window !== "undefined"
            ? localStorage.getItem("trialInfo")
            : null;
        if (ls) {
          try {
            const parsed = JSON.parse(ls) as {
              startISO: string;
              totalDays: number;
            };
            const start = new Date(parsed.startISO);
            const used = diffDays(start, new Date());
            setTrial({
              daysUsed: Math.min(used, parsed.totalDays),
              totalDays: parsed.totalDays,
              active: used < parsed.totalDays,
            });
            return;
          } catch {}
        }
        setTrial(null);
      } catch {
        setTrial(null);
      }
    })();
    return () => {
      done = true;
    };
  }, [
    props.fetcher,
    props.daysUsed,
    props.totalDays,
    props.active,
    props.trialStartDate,
    props.trialLengthDays,
  ]);

  const progress = useMemo(() => {
    if (!trial) return 0;
    if (!trial.active) return 0;
    if (!trial.totalDays) return 0;
    return clamp((trial.daysUsed / trial.totalDays) * 100);
  }, [trial]);

  useEffect(() => {
    const id = window.setTimeout(() => setAnimatedWidth(progress), 150);
    return () => window.clearTimeout(id);
  }, [progress]);

  if (!trial || !trial.active || progress <= 0) return null;

  const ariaLabel = `Trial progress: ${Math.round(progress)}% complete`;
  const tooltipMsg = `This is your trial period duration (${trial.daysUsed}/${trial.totalDays} days completed). To continue using the platform without interruption, upgrade your plan.`;

  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            role="progressbar"
            aria-label={ariaLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            className={cn(
              "relative w-full h-[3px] hover:h-[6px] focus-visible:h-[6px] transition-[height] duration-200 ease-out cursor-pointer",
              props.className,
            )}
          >
            <div className="absolute inset-0 bg-[var(--neutral-light,_#E0E0E0)] transition-[height] duration-200 ease-out"></div>
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-valasys-orange to-valasys-orange-light transition-[width,height] duration-700 ease-out"
              style={{ width: `${animatedWidth}%` }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="center"
          className="bg-[var(--tooltip-bg,#333)] text-[var(--tooltip-text,#FFF)] border-none text-xs rounded-md"
        >
          {tooltipMsg}
          <span className="sr-only">{ariaLabel}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TrialProgressBar;
