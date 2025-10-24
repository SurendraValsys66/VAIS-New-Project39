import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  calculateMasteryPercentage,
  getMastery,
  MasterySteps,
  MASTERY_EVENT,
} from "@/lib/masteryStorage";

export default function MasteryProgressBadge() {
  const [state, setState] = useState<MasterySteps>({});
  const [prevPercent, setPrevPercent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setState(getMastery());
    const onUpdate = (e: Event) => {
      setState((e as CustomEvent).detail as MasterySteps);
    };
    window.addEventListener(MASTERY_EVENT, onUpdate as EventListener);
    const id = setInterval(() => setState(getMastery()), 3000);
    return () => {
      window.removeEventListener(MASTERY_EVENT, onUpdate as EventListener);
      clearInterval(id);
    };
  }, []);

  const percent = calculateMasteryPercentage(state);

  useEffect(() => {
    if (percent > prevPercent) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevPercent(percent);
  }, [percent, prevPercent]);


  return (
    <motion.button
      animate={isAnimating ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative inline-flex h-[41px] items-center gap-1.5 rounded-full",
        "bg-red-500 text-white",
        "px-3 sm:px-4 py-1.5 font-semibold text-xs sm:text-sm",
        "shadow-lg border-2 border-red-700 hover:shadow-xl",
        "transition-all duration-300 hover:-translate-y-0.5",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
        isAnimating && "ring-2 ring-red-500 ring-opacity-50"
      )}
      title={`Your VAIS Mastery: ${percent}%`}
    >
      {/* Pulsing ring when animating */}
      {isAnimating && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-valasys-orange"
          animate={{ scale: [1, 1.15, 1], opacity: [1, 0, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}

      {/* Progress circle indicator */}
      <div className="relative w-5 h-5 flex-shrink-0">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="2"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="100 100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 100 - percent }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">
          {percent}
        </span>
      </div>

      {/* Label */}
      <span className="hidden sm:inline whitespace-nowrap">
        VAIS {percent}%
      </span>
      <span className="sm:hidden">
        {percent}%
      </span>
    </motion.button>
  );
}
