import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, CheckCircle, Circle, Coins } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  calculateMasteryPercentage,
  getMastery,
  MasterySteps,
  MASTERY_EVENT,
} from "@/lib/masteryStorage";
import { AnimatePresence, motion } from "framer-motion";
import { toast as sonnerToast } from "sonner";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function MasteryBottomBar() {
  const [state, setState] = useState<MasterySteps>({});
  const [hidden, setHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const prevRef = useRef<MasterySteps>({});

  useEffect(() => {
    setState(getMastery());
    const onUpdate = (e: Event) =>
      setState((e as CustomEvent).detail as MasterySteps);
    window.addEventListener(MASTERY_EVENT, onUpdate as EventListener);
    const id = setInterval(() => setState(getMastery()), 3000);
    return () => {
      window.removeEventListener(MASTERY_EVENT, onUpdate as EventListener);
      clearInterval(id);
    };
  }, []);

  // Show encouragement toasts when steps are newly completed
  useEffect(() => {
    const prev = prevRef.current;
    const now = state;
    const newlyCompleted: Array<{ key: keyof MasterySteps; label: string }> =
      [];

    if (!prev.onboardingCompleted && now.onboardingCompleted)
      newlyCompleted.push({
        key: "onboardingCompleted",
        label: "Onboarding completed",
      });
    if (!prev.vaisResultsGenerated && now.vaisResultsGenerated)
      newlyCompleted.push({
        key: "vaisResultsGenerated",
        label: "VAIS Results generated",
      });
    if (!prev.accountsDownloaded && now.accountsDownloaded)
      newlyCompleted.push({
        key: "accountsDownloaded",
        label: "Accounts downloaded",
      });
    if (!prev.prospectSearchGenerated && now.prospectSearchGenerated)
      newlyCompleted.push({
        key: "prospectSearchGenerated",
        label: "Prospect Search generated",
      });
    if (!prev.prospectDetailsDownloaded && now.prospectDetailsDownloaded)
      newlyCompleted.push({
        key: "prospectDetailsDownloaded",
        label: "Prospect Details downloaded",
      });

    newlyCompleted.forEach((s) => {
      sonnerToast.success(`Credits added for: ${s.label}`, {
        description: "Keep going to unlock your bonus",
        icon: <Coins className="w-5 h-5 text-amber-500" />,
        duration: 3500,
      });
    });

    const prevPct = calculateMasteryPercentage(prev);
    const currPct = calculateMasteryPercentage(now);
    if (prevPct < 100 && currPct >= 100) {
      sonnerToast("Bonus unlocked! You completed all mastery steps.");
    }

    prevRef.current = state;
  }, [state]);

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

    if (doneAll) {
      list.push({
        key: "reward",
        label: "Congratulation! You earn extra credits",
        completed: true,
        type: "reward",
      });
    }

    return list;
  }, [doneAll, state]);

  const next = useMemo(() => {
    if (!state.onboardingCompleted)
      return { label: "Complete onboarding", to: "/onboarding/role" };
    if (!state.vaisResultsGenerated)
      return { label: "Generate VAIS Results", to: "/build-vais" };
    if (!state.accountsDownloaded)
      return { label: "Download Accounts", to: "/vais-results" };
    if (!state.prospectSearchGenerated)
      return { label: "Generate Prospect Search", to: "/find-prospect" };
    if (!state.prospectDetailsDownloaded)
      return { label: "Download Prospect Details", to: "/prospect-results" };
    return null;
  }, [state]);

  const percent = calculateMasteryPercentage(state);
  if (hidden) return null;

  const manPos = Math.max(0, Math.min(100, percent));
  const handleOpenGuide = useCallback(() => setExpanded(true), []);
  const handleGuideKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setExpanded(true);
    }
  }, []);

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
                  {steps.map((s) => (
                    <li key={s.key} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {s.type === "reward" ? (
                          <Coins className="w-5 h-5 text-amber-500" />
                        ) : s.completed ? (
                          <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="text-sm text-[#333333] leading-5">
                        {s.type === "reward" ? (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 px-2.5 py-1 text-[11px] font-semibold cursor-not-allowed select-none"
                            aria-disabled="true"
                          >
                            <Coins className="w-3.5 h-3.5" />
                            {s.label}
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>{s.label}</span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next up suggestion (shown when collapsed) */}
        {!expanded && next && (
          <div className="mb-2 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-white rounded-xl shadow-md p-1">
                    <img
                      src="https://cdn.builder.io/o/assets%2F1d0d3cbc213245beba3786aa1a6f12a3%2F515d18c2065f4103840ed7e794f0f02f?alt=media&token=b6ff5c54-de26-42ea-960d-cf00e42191cf&apiKey=1d0d3cbc213245beba3786aa1a6f12a3"
                      alt="Mastery progress"
                      className="h-6 w-6 rounded"
                      loading="lazy"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-[260px] text-center"
                >
                  <div>Complete all steps to unlock your bonus.</div>
                </TooltipContent>
              </Tooltip>
              <div className="text-[13px]">
                <span className="font-semibold text-[#FF7A00]">Next up: </span>
                <span className="text-[#333]">{next.label}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-xs font-semibold text-[#FF7A00] hover:underline"
                onClick={() => setExpanded(true)}
                title="Open guide"
              >
                Details
              </button>
              <Link
                to={next.to}
                className="inline-flex items-center rounded-md bg-valasys-orange hover:bg-valasys-orange-light px-2 py-1 text-xs font-semibold text-white"
                title="Go"
              >
                Go
              </Link>
            </div>
          </div>
        )}

        {/* Bottom orange bar */}
        <div
          className="relative flex flex-col gap-1 rounded-xl shadow-lg px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-valasys-orange to-valasys-orange-light text-white cursor-pointer"
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          onClick={handleOpenGuide}
          onKeyDown={handleGuideKeyDown}
        >
          {/* Top row: avatar, progress, chevron, close */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 hidden sm:block">
              <Avatar className="h-7 w-7">
                <AvatarImage src="" alt="VAIS" />
                <AvatarFallback className="bg-white/30 text-white text-[10px]">
                  VA
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 text-left">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Progress value={percent} className="h-[14px] bg-[#F1F1F1]" />
                  <img
                    src="https://cdn.builder.io/o/assets%2F1d0d3cbc213245beba3786aa1a6f12a3%2F56aede21efb849a7aa049e8e2f87be99?alt=media&token=e4598e27-8e81-4e91-8d2c-e890a2c118e8&apiKey=1d0d3cbc213245beba3786aa1a6f12a3"
                    alt="Walking progress"
                    className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-6 w-6 sm:h-7 sm:w-7 drop-shadow"
                    style={{ left: `${manPos}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              aria-label="Hide for now"
              onClick={(event) => {
                event.stopPropagation();
                setHidden(true);
              }}
              className="ml-1 rounded-md hover:opacity-90"
              title="Hide for now"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Bottom text */}
          <div className="text-center text-[12px] font-semibold">
            Your VAIS mastery: {percent}%
          </div>
        </div>
      </div>
    </div>
  );
}
