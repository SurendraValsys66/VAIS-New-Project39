import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  calculateMasteryPercentage,
  getMastery,
  MasterySteps,
  MASTERY_EVENT,
} from "@/lib/masteryStorage";

export default function MasteryBottomBar({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const [state, setState] = useState<MasterySteps>({});
  const [hidden, setHidden] = useState(false);

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

  const percent = calculateMasteryPercentage(state);
  if (hidden || percent >= 100) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 pointer-events-none">
      <div className="mx-auto w-[min(92vw,520px)] pointer-events-auto">
        <div className="relative flex items-center gap-3 rounded-xl shadow-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] text-white">
          {/* Avatar */}
          <div className="flex-shrink-0 hidden sm:block">
            <Avatar className="h-7 w-7">
              <AvatarImage src="" alt="VAIS" />
              <AvatarFallback className="bg-white/30 text-white text-[10px]">VA</AvatarFallback>
            </Avatar>
          </div>

          {/* Bar content */}
          <button onClick={onOpen} className="flex-1 text-left">
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

          {/* Close */}
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
