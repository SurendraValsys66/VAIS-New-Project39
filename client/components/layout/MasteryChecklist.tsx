import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  calculateMasteryPercentage,
  getMastery,
  MASTERY_EVENT,
  MasterySteps,
  setMasteryDismissed,
} from "@/lib/masteryStorage";

export default function MasteryChecklist({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  const [state, setState] = useState<MasterySteps>({});

  useEffect(() => {
    setState(getMastery());
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail as MasterySteps;
      setState(detail);
    };
    window.addEventListener(MASTERY_EVENT, onUpdate as EventListener);
    return () =>
      window.removeEventListener(MASTERY_EVENT, onUpdate as EventListener);
  }, []);

  const percent = useMemo(() => calculateMasteryPercentage(state), [state]);

  const steps = [
    { label: "Sign up to VAIS", completed: true },
    {
      label:
        "Complete the onboarding questions — Hint: Complete your onboarding process and get free credits 🎉",
      completed: !!state.onboardingCompleted,
    },
    {
      label: "Generate your VAIS Results",
      completed: !!state.vaisResultsGenerated,
    },
    {
      label: "Download the Accounts from the VAIS Results page",
      completed: !!state.accountsDownloaded,
    },
    {
      label: "Generate the Prospect Search",
      completed: !!state.prospectSearchGenerated,
    },
    {
      label: "Download the Prospect Details",
      completed: !!state.prospectDetailsDownloaded,
    },
  ];

  const handleOpenChange = (v: boolean) => {
    // Do not mark dismissed automatically on close; only via explicit close button
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[500px] p-0 overflow-hidden">
        <DialogTitle className="sr-only">VAIS Mastery Steps Guide</DialogTitle>
        <DialogDescription className="sr-only">
          Complete these steps to unlock your full VAIS potential
        </DialogDescription>
        <div className="bg-white rounded-lg shadow-xl max-h-[540px]">
          {/* Header */}
          <div className="px-6 pt-5 pb-4 relative">
            <h2 className="text-xl font-semibold text-[#333333]">
              VAIS Mastery Steps Guide
            </h2>
            <p className="text-sm text-[#666] mt-1">
              Complete these steps to unlock your full VAIS potential 🚀
            </p>
            <button
              aria-label="Close"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              onClick={() => {
                onOpenChange(false);
              }}
              title="Close"
            >
              ✕
            </button>
            <div className="mt-4 h-px bg-gray-200" />
          </div>

          {/* Steps */}
          <div className="px-6 pb-4 overflow-y-auto max-h-[360px]">
            <ul className="space-y-3">
              {steps.map((s, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AnimatePresence initial={false}>
                      {s.completed ? (
                        <motion.div
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
                        </motion.div>
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="text-sm text-[#333333] leading-5">
                    {s.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer progress */}
          <div className="px-6 pb-6">
            <div className="relative">
              <Progress value={percent} className="h-4 bg-[#F1F1F1]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-white drop-shadow-sm">
                  Your VAIS mastery: {percent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
