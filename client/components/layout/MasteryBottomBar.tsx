import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  X,
  CheckCircle,
  Circle,
  Coins,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  calculateMasteryPercentage,
  getMastery,
  MasterySteps,
  MASTERY_EVENT,
} from "@/lib/masteryStorage";
import { AnimatePresence, motion } from "framer-motion";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConfettiCanvas from "@/components/onboarding/ConfettiCanvas";

const MASTERY_DISMISS_KEY = "valasys-mastery-dismissed";

type MasteryStepDefinition = {
  key: string;
  label: string;
  completed: boolean;
  hint: React.ReactNode;
  to: string;
  cta?: string;
  type?: "reward";
};

export default function MasteryBottomBar() {
  const [state, setState] = useState<MasterySteps>({});
  const [hidden, setHidden] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(MASTERY_DISMISS_KEY) === "1";
    } catch (error) {
      return false;
    }
  });
  const [expanded, setExpanded] = useState(false);
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [showDismissDialog, setShowDismissDialog] = useState(false);
  const toggleHint = (key: string) =>
    setOpenHints((s) => {
      const isOpen = !!s[key];
      if (isOpen) return {};
      return { [key]: true };
    });
  const prevRef = useRef<MasterySteps>({});
  const [showFinalDialog, setShowFinalDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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

  useEffect(() => {
    const prev = prevRef.current;
    const prevPct = calculateMasteryPercentage(prev);
    const currPct = calculateMasteryPercentage(state);

    if (prevPct < 100 && currPct >= 100) {
      let alreadyShown = false;
      try {
        alreadyShown = localStorage.getItem("valasys-mastery-complete") === "1";
      } catch {}
      if (!alreadyShown) {
        try {
          localStorage.setItem("valasys-mastery-complete", "1");
        } catch {}
        setShowConfetti(true);
        setShowFinalDialog(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
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

  const steps = useMemo<MasteryStepDefinition[]>(() => {
    const list: MasteryStepDefinition[] = [
      {
        key: "signUp",
        label: "Sign up to VAIS",
        completed: true,
        hint: null,
        to: "/free-trial",
        cta: "Invite a teammate",
      },
      {
        key: "onboardingCompleted",
        label: "Complete the onboarding questions",
        completed: !!state.onboardingCompleted,
        hint: (
          <>
            Answer a few quick questions about your goals so we can tailor VAIS
            to your workflow.{" "}
            <Link to="/onboarding/role" className="text-valasys-blue underline">
              Resume onboarding
            </Link>
            .
          </>
        ),
        to: "/onboarding/role",
        cta: "Resume onboarding",
      },
      {
        key: "vaisResultsGenerated",
        label: "Generate your VAIS Results",
        completed: !!state.vaisResultsGenerated,
        hint: (
          <>
            <Link to="/build-vais" className="text-valasys-blue underline">
              Build your VAIS
            </Link>{" "}
            model to unlock prioritized account and lead insights in just a
            couple of clicks.
          </>
        ),
        to: "/build-vais",
        cta: "Generate VAIS Results",
      },
      {
        key: "accountsDownloaded",
        label: "Download the Accounts from the VAIS Results page",
        completed: !!state.accountsDownloaded,
        hint: (
          <>
            Head to the VAIS Results page, apply any filters you need, then
            export the ready-to-use account list.
          </>
        ),
        to: "/vais-results",
        cta: "Open VAIS Results",
      },
      {
        key: "prospectSearchGenerated",
        label: "Generate the Prospect Search",
        completed: !!state.prospectSearchGenerated,
        hint: (
          <>
            Use{" "}
            <Link to="/find-prospect" className="text-valasys-blue underline">
              Find Prospect
            </Link>{" "}
            to build a targeted search—start with a few filters, generate the
            list, and refine as you go.
          </>
        ),
        to: "/find-prospect",
        cta: "Start a prospect search",
      },
      {
        key: "prospectDetailsDownloaded",
        label: "Download the Prospect Details",
        completed: !!state.prospectDetailsDownloaded,
        hint: (
          <>
            Open your Prospect Results, preview the contacts, and download the
            detailed CSV to share with your team.
          </>
        ),
        to: "/prospect-results",
        cta: "View prospect results",
      },
    ];

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

  const handleConfirmRemove = useCallback(() => {
    try {
      localStorage.setItem(MASTERY_DISMISS_KEY, "1");
    } catch (error) {}
    setHidden(true);
    setShowDismissDialog(false);
    setExpanded(false);
  }, []);

  const manPos = Math.max(0, Math.min(100, percent));
  const handleOpenGuide = useCallback(() => setExpanded(true), []);
  const handleCloseGuide = useCallback(() => setExpanded(false), []);
  const handleGuideKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setExpanded(true);
      }
    },
    [],
  );

  if (hidden && !showDismissDialog && !showFinalDialog) {
    return null;
  }

  useEffect(() => {
    try {
      const openOnce =
        localStorage.getItem("valasys-open-mastery-once") === "1";
      if (openOnce) {
        setHidden(false);
        setExpanded(true);
        localStorage.removeItem("valasys-open-mastery-once");
        try {
          localStorage.removeItem(MASTERY_DISMISS_KEY);
        } catch {}
      }
    } catch {}
  }, []);

  const shouldShowPanel = !hidden && !doneAll;

  return (
    <>
      {/* Confetti celebration */}
      {showConfetti && (
        <div className="fixed inset-0 z-[70] pointer-events-none">
          <ConfettiCanvas duration={2800} />
        </div>
      )}

      {shouldShowPanel && (
        <div className="fixed inset-x-0 bottom-4 z-50 pointer-events-none">
          <div
            className="mx-auto w-[min(92vw,520px)] pointer-events-auto"
            onMouseLeave={handleCloseGuide}
          >
            {/* Slide-up panel */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="panel"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="mb-2 rounded-xl border border-gray-200 shadow-xl bg-white overflow-hidden"
                >
                  <div className="px-5 pt-4 pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-[15px] font-semibold text-[#333333]">
                          VAIS Mastery Steps Guide
                        </h2>
                        <p className="text-xs text-[#666] mt-0.5">
                          Complete these steps to unlock your full VAIS
                          potential 🚀
                        </p>
                      </div>
                      <button
                        aria-label="Close"
                        className="text-gray-400 hover:text-gray-600"
                        onClick={handleCloseGuide}
                        title="Close"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 h-px bg-gray-200" />
                  </div>

                  <div className="px-5 pb-4 max-h-[360px] overflow-y-auto">
                    <ul className="space-y-3">
                      {steps.map((s) => {
                        const isOpen = !!openHints[s.key];
                        const isReward = s.type === "reward";

                        return (
                          <li key={s.key} className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {isReward ? (
                                <Coins className="w-5 h-5 text-amber-500" />
                              ) : s.completed ? (
                                <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-300" />
                              )}
                            </div>
                            <div className="flex-1 text-sm text-[#333333] leading-5">
                              <button
                                type="button"
                                onClick={() => toggleHint(s.key)}
                                className="relative flex items-center w-full gap-2 font-medium pr-6 text-left"
                                aria-expanded={isOpen}
                              >
                                {isReward ? (
                                  s.completed ? (
                                    <Badge className="inline-flex items-center gap-1.5 bg-valasys-green text-white border-transparent px-2.5 py-1 text-[11px] font-semibold">
                                      <Coins className="w-3.5 h-3.5" />
                                      {s.label}
                                    </Badge>
                                  ) : (
                                    <Badge
                                      className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 border-gray-200 px-2.5 py-1 text-[11px] font-semibold"
                                      aria-disabled="true"
                                    >
                                      <Coins className="w-3.5 h-3.5" />
                                      {s.label}
                                    </Badge>
                                  )
                                ) : (
                                  <span>{s.label}</span>
                                )}
                                {isOpen ? (
                                  <ChevronUp className="w-4 h-4 text-[#666] absolute right-0" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-[#666] absolute right-0" />
                                )}
                              </button>
                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                      duration: 0.2,
                                      ease: "easeOut",
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 space-y-2 rounded-md border border-orange-200 bg-orange-50 p-3 text-xs text-[#555]">
                                      <p>{s.hint}</p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </li>
                        );
                      })}
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
                      <div>Complete all steps to master VAIS.</div>
                    </TooltipContent>
                  </Tooltip>
                  <div className="text-[13px]">
                    <span className="font-semibold text-[#FF7A00]">
                      Next up:{" "}
                    </span>
                    <span className="text-[#333]">{next.label}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="text-xs font-semibold text-[#FF7A00] hover:underline"
                    onClick={handleOpenGuide}
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
              onMouseEnter={handleOpenGuide}
              onKeyDown={handleGuideKeyDown}
            >
              {/* Top row: progress, chevron, close */}
              <div className="flex items-center gap-3">
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Progress
                        value={percent}
                        className="h-[14px] bg-[#F1F1F1]"
                        indicatorClassName="bg-[#eab308]"
                      />
                      <img
                        src="https://cdn.builder.io/o/assets%2F1d0d3cbc213245beba3786aa1a6f12a3%2F56aede21efb849a7aa049e8e2f87be99?alt=media&token=e4598e27-8e81-4e91-8d2c-e890a2c118e8&apiKey=1d0d3cbc213245beba3786aa1a6f12a3"
                        alt="Walking progress"
                        className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-6 w-6 sm:h-7 sm:w-7 drop-shadow"
                        style={{ left: `${manPos}%` }}
                      />
                    </div>
                  </div>
                </div>

                <img
                  src="https://cdn.builder.io/o/assets%2F1d0d3cbc213245beba3786aa1a6f12a3%2F515d18c2065f4103840ed7e794f0f02f?alt=media&token=b6ff5c54-de26-42ea-960d-cf00e42191cf&apiKey=1d0d3cbc213245beba3786aa1a6f12a3"
                  alt="Gift"
                  className="h-5 w-5 rounded-full bg-white p-0.5 shadow-sm"
                  loading="lazy"
                />
                <button
                  aria-label="Hide for now"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleCloseGuide();
                    setShowDismissDialog(true);
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
      )}

      <Dialog open={showDismissDialog} onOpenChange={setShowDismissDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Hide mastery progress?</DialogTitle>
            <DialogDescription>
              Are you sure you want to close this? Your progress will be lost
              permanently.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDismissDialog(false)}
            >
              Close
            </Button>
            <Button variant="destructive" onClick={handleConfirmRemove}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Final completion dialog */}
      <Dialog open={showFinalDialog} onOpenChange={setShowFinalDialog}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle>
              Congratulations! You completed every VAIS mastery step.
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 text-sm text-gray-600">
            Keep exploring VAIS to put your new skills to work.
          </div>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setShowFinalDialog(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
