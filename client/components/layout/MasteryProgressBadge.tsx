import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  calculateMasteryPercentage,
  getMastery,
  MasterySteps,
  MASTERY_EVENT,
} from "@/lib/masteryStorage";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

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

  const isDismissed = (() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("valasys-mastery-dismissed") === "1";
    } catch {
      return false;
    }
  })();

  if (isDismissed) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              {/* Pulsing outer ring when animating */}
              {isAnimating && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-valasys-orange"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{
                    width: "32px",
                    height: "32px",
                    left: "-6px",
                    top: "-6px",
                  }}
                />
              )}

              {/* Main badge */}
              <motion.div
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-sm",
                  "bg-gradient-to-r from-valasys-orange via-orange-500 to-amber-400 text-white",
                  "shadow-lg border border-orange-600 hover:shadow-xl transition-all cursor-pointer",
                  isAnimating && "ring-2 ring-valasys-orange ring-opacity-50",
                )}
                animate={
                  isAnimating
                    ? {
                        backgroundColor: [
                          "rgb(255, 122, 0)",
                          "rgb(255, 200, 0)",
                          "rgb(255, 122, 0)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 0.6 }}
              >
                {/* Progress circle */}
                <div className="relative w-5 h-5">
                  <svg
                    viewBox="0 0 36 36"
                    className="w-full h-full transform -rotate-90"
                  >
                    {/* Background circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="3"
                    />
                    {/* Progress circle */}
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeDasharray={`${100} 100`}
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 100 - percent }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Center percentage text */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white"
                    animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    {percent}
                  </motion.span>
                </div>

                {/* Label */}
                <span className="hidden sm:inline">VAIS</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="bg-gray-900 text-white border-0">
        <div className="space-y-1">
          <div className="font-semibold">Your VAIS Mastery: {percent}%</div>
          <div className="text-xs text-gray-300">
            Complete all steps to unlock full potential
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
