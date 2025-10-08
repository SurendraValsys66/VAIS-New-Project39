import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Coins } from "lucide-react";
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
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const toggleHint = (key: string) => setOpenHints((s) => ({ ...s, [key]: !s[key] }));

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

  const doneAll = useMemo(
    () =>
      !!(
        state.onboardingCompleted &&
        state.vaisResultsGenerated &&
        state.accountsDownloaded &&
        state.prospectSearchGenerated &&
        state.prospectDetailsDownloaded
      ),
    [state],
  );

  const steps = useMemo(() => {
    const list: Array<{
      key: string;
      label: string;
      completed: boolean;
      type?: "reward";
    }> = [
      { key: "signUp", label: "Sign up to VAIS", completed: true },
      {
        key: "onboardingCompleted",
        label:
          "Complete the onboarding questions — Hint: Complete your onboarding process and get free credits 🎉",
        completed: !!state.onboardingCompleted,
      },
      {
        key: "vaisResultsGenerated",
        label: "Generate your VAIS Results",
        completed: !!state.vaisResultsGenerated,
      },
      {
        key: "accountsDownloaded",
        label: "Download the Accounts from the VAIS Results page",
        completed: !!state.accountsDownloaded,
      },
      {
        key: "prospectSearchGenerated",
        label: "Generate the Prospect Search",
        completed: !!state.prospectSearchGenerated,
      },
      {
        key: "prospectDetailsDownloaded",
        label: "Download the Prospect Details",
        completed: !!state.prospectDetailsDownloaded,
      },
    ];

    // Always include the reward badge as the last step; it becomes enabled only when all steps are completed
    list.push({
      key: "reward",
      label: "Congratulation! you earn the extra credits",
      completed: doneAll,
      type: "reward",
    });

    return list;
  }, [doneAll, state]);

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
              {steps.map((s) => (
                <li key={s.key} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AnimatePresence initial={false}>
                      {s.type === "reward" ? (
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
                          <Coins className="w-5 h-5 text-amber-500" />
                        </motion.div>
                      ) : s.completed ? (
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
                    {s.type === "reward" ? (
                      s.completed ? (
                        <Badge className="inline-flex items-center gap-1.5 bg-valasys-green text-white border-transparent px-2.5 py-1 text-[11px] font-semibold">
                          <Coins className="w-3.5 h-3.5" />
                          {s.label}
                        </Badge>
                      ) : (
                        <Badge
                          className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 border-gray-200 px-2.5 py-1 text-[11px] font-semibold cursor-not-allowed select-none"
                          aria-disabled="true"
                        >
                          <Coins className="w-3.5 h-3.5" />
                          {s.label}
                        </Badge>
                      )
                    ) : s.key === "onboardingCompleted" ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleHint(s.key)}
                          className="flex items-center gap-2 text-sm text-[#333333] font-medium"
                          aria-expanded={!!openHints[s.key]}
                        >
                          <span>{s.label}</span>
                          <span className="ml-2 text-xs text-[#666]">{openHints[s.key] ? "Hide hint" : "Show hint"}</span>
                        </button>
                        {openHints[s.key] && (
                          <div className="mt-2 text-xs text-[#555] bg-gray-50 border border-gray-100 p-2 rounded">
                            Hint: Complete your onboarding by selecting the role and filling in the basic info. This unlocks free credits.
                          </div>
                        )}
                      </div>
                    ) : (
                      s.label
                    )}
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
