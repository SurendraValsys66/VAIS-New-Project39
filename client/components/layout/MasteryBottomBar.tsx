import React, { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, CheckCircle, Circle, ChevronUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  calculateMasteryPercentage,
  getMastery,
  MasterySteps,
  MASTERY_EVENT,
} from "@/lib/masteryStorage";
import { AnimatePresence, motion } from "framer-motion";

export default function MasteryBottomBar() {
  const [state, setState] = useState<MasterySteps>({});
  const [hidden, setHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setState(getMastery());
    const onUpdate = (e: Event) => setState((e as CustomEvent).detail as MasterySteps);
    window.addEventListener(MASTERY_EVENT, onUpdate as EventListener);
    const id = setInterval(() => setState(getMastery()), 3000);
    return () => {
      window.removeEventListener(MASTERY_EVENT, onUpdate as EventListener);
      clearInterval(id);
    };
  }, []);

  const steps = useMemo(
    () => [
      { label: "Sign up to VAIS", completed: true },
      {
        label:
          "Complete the onboarding questions — Hint: Complete your onboarding process and get free credits 🎉",
        completed: !!state.onboardingCompleted,
      },
      { label: "Generate your VAIS Results", completed: !!state.vaisResultsGenerated },
      {
        label: "Download the Accounts from the VAIS Results page",
        completed: !!state.accountsDownloaded,
      },
      { label: "Generate the Prospect Search", completed: !!state.prospectSearchGenerated },
      { label: "Download the Prospect Details", completed: !!state.prospectDetailsDownloaded },
    ],
    [state],
  );

  const percent = calculateMasteryPercentage(state);
  if (hidden || percent >= 100) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 pointer-events-none">
      <div className="mx-auto w-[min(92vw,520px)] pointer-events-auto">
        {/* Slide-up panel */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mb-2 rounded-xl shadow-xl bg-white overflow-hidden"
            >
              <div className="px-5 pt-4 pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-[15px] font-semibold text-[#333333]">
                      VAIS Mastery Steps Guide
                    </h2>
                    <p className="text-xs text-[#666] mt-0.5">
                      Complete these steps to unlock your full VAIS potential 🚀
                    </p>
                  </div>
                  <button
                    aria-label="Close"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setExpanded(false)}
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 h-px bg-gray-200" />
              </div>

              <div className="px-5 pb-4 max-h-[360px] overflow-y-auto">
                <ul className="space-y-3">
                  {steps.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {s.completed ? (
                          <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="text-sm text-[#333333] leading-5">{s.label}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom orange bar */}
        <div className="relative flex items-center gap-3 rounded-xl shadow-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] text-white">
          {/* Avatar */}
          <div className="flex-shrink-0 hidden sm:block">
            <Avatar className="h-7 w-7">
              <AvatarImage src="" alt="VAIS" />
              <AvatarFallback className="bg-white/30 text-white text-[10px]">VA</AvatarFallback>
            </Avatar>
          </div>

          {/* Bar content */}
          <button onClick={() => setExpanded((v) => !v)} className="flex-1 text-left">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Progress value={percent} className="h-3 bg-[#F1F1F1]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[11px] font-semibold drop-shadow-sm">
                      Your VAIS mastery: {percent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Hide bottom bar for this session */}
          <button
            aria-label="Hide for now"
            onClick={() => setHidden(true)}
            className="ml-1 rounded-md hover:opacity-90"
            title="Hide for now"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
