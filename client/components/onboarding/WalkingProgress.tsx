import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface WalkingProgressProps {
  value: number; // 0 - 100
  fromValue?: number; // optional starting value (used on first mount)
  className?: string;
  height?: number; // px height for the bar area
  animateOnChange?: boolean; // when value increases, animate man + slow fill
}

// Simple inline SVG gift with subtle animated sparkle (no external assets)
function GiftIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      <svg
        viewBox="0 0 64 64"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="8" y="24" width="48" height="32" rx="6" fill="#FF6A00" />
        <rect x="12" y="28" width="40" height="24" rx="4" fill="#F5A243" />
        <rect x="30" y="24" width="4" height="32" fill="#ffffff" opacity="0.9" />
        <rect x="8" y="24" width="48" height="8" fill="#FF8C33" />
        <path d="M24 24c-3-3-4-9 2-10 4-1 6 3 6 5 0-2 2-6 6-5 6 1 5 7 2 10" fill="#FF6A00" />
        <path d="M24 24c-2-2-3-6 1-7 3-1 5 2 5 3" fill="#FCE0C7" />
        <path d="M40 24c2-2 3-6-1-7-3-1-5 2-5 3" fill="#FCE0C7" />
      </svg>
      <span className="absolute -top-2 -right-1 h-2 w-2 rounded-full bg-white/80 shadow animate-ping" />
    </div>
  );
}

// Minimal “person” built with CSS, with optional bobbing animation when walking
function Walker({ walking }: { walking: boolean }) {
  return (
    <div
      className={cn(
        "relative h-6 w-6",
        walking ? "animate-[walkerBob_0.8s_ease-in-out_infinite]" : undefined,
      )}
      aria-label={walking ? "Walking" : "Standing"}
    >
      <style>
        {`
        @keyframes walkerBob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
        `}
      </style>
      {/* Head */}
      <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-valasys-gray-800" />
      {/* Body */}
      <div className="absolute left-1/2 top-[10px] h-3.5 w-1 -translate-x-1/2 rounded bg-valasys-gray-700" />
      {/* Arms */}
      <div className="absolute left-1/2 top-[11px] h-1 w-4 -translate-x-1/2 rounded bg-valasys-gray-600" />
      {/* Legs */}
      <div className="absolute left-[10px] top-[18px] h-3 w-1 rotate-[15deg] rounded bg-valasys-gray-700" />
      <div className="absolute left-[14px] top-[18px] h-3 w-1 -rotate-[10deg] rounded bg-valasys-gray-700" />
    </div>
  );
}

export default function WalkingProgress({
  value,
  className,
  height = 12,
  animateOnChange = true,
}: WalkingProgressProps) {
  const clamped = Math.min(100, Math.max(0, value ?? 0));
  const [displayValue, setDisplayValue] = useState(clamped);
  const [walking, setWalking] = useState(false);
  const prevRef = useRef(clamped);

  useEffect(() => {
    if (!animateOnChange) {
      setDisplayValue(clamped);
      setWalking(false);
      prevRef.current = clamped;
      return;
    }

    const prev = prevRef.current;
    if (clamped === prev) return;

    const durationMs = 1200; // slow, as requested
    const start = performance.now();
    const delta = clamped - prev;

    setWalking(delta > 0);

    let raf = 0;
    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(1, Math.max(0, elapsed / durationMs));
      const eased = 0.2 + 0.8 * (1 - Math.pow(1 - p, 2)); // easeOutQuad, slightly delayed start
      const next = prev + delta * eased;
      setDisplayValue(next);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setWalking(false);
        prevRef.current = clamped;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clamped, animateOnChange]);

  // Position (in %) for the walker, stay within bar (0-100)
  const walkerLeftPct = useMemo(() => {
    const pad = 1.5; // keep inside bar edges
    return Math.min(100 - pad, Math.max(pad, displayValue));
  }, [displayValue]);

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-2">
        {/* The bar with fill */}
        <div className="relative flex-1" style={{ height }}>
          <Progress value={displayValue} className="h-full" />

          {/* Walker overlay */}
          <motion.div
            className="absolute -top-3"
            style={{ left: `${walkerLeftPct}%`, transform: "translateX(-50%)" }}
            animate={{ left: `${walkerLeftPct}%` }}
            transition={{ type: "tween", duration: 0.6 }}
          >
            <Walker walking={walking} />
          </motion.div>

          {/* Gift at the end (goal) */}
          <div className="absolute -top-4 right-0 h-8 w-8">
            <GiftIcon className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
