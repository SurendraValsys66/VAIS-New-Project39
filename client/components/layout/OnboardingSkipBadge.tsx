import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ONBOARDING_SKIP_EVENT,
  OnboardingSkipReminder,
  clearOnboardingSkipReminder,
  emitOnboardingSkipReminderUpdate,
  getOnboardingSkipReminder,
} from "@/lib/onboardingStorage";

interface OnboardingSkipBadgeProps {
  className?: string;
}

export default function OnboardingSkipBadge({
  className,
}: OnboardingSkipBadgeProps) {
  const navigate = useNavigate();
  const [reminder, setReminder] = useState<OnboardingSkipReminder | null>(
    () => {
      if (typeof window === "undefined") {
        return null;
      }
      return getOnboardingSkipReminder();
    },
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<OnboardingSkipReminder | null>;
      const detail = customEvent.detail;
      if (detail) {
        setReminder(detail);
      } else {
        setReminder(getOnboardingSkipReminder());
      }
    };

    const handleStorage = () => {
      setReminder(getOnboardingSkipReminder());
    };

    window.addEventListener(
      ONBOARDING_SKIP_EVENT,
      handleUpdate as EventListener,
    );
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        ONBOARDING_SKIP_EVENT,
        handleUpdate as EventListener,
      );
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  if (!reminder) {
    return null;
  }

  const handleClick = () => {
    clearOnboardingSkipReminder();
    emitOnboardingSkipReminderUpdate(null);
    navigate(reminder.stepRoute);
  };

  const totalSteps = Math.max(1, reminder.totalSteps ?? 6);
  const completedSteps = Math.max(
    0,
    Math.min(totalSteps, reminder.stepNumber - 1),
  );
  const progressPercent = Math.max(
    0,
    Math.min(100, Math.round((completedSteps / totalSteps) * 100)),
  );
  const percentLabel = `${progressPercent}%`;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group relative flex h-[41px] items-center gap-1.5 rounded-full bg-gradient-to-r from-valasys-orange to-valasys-orange-light pr-2.5 pl-2 text-[11px] font-semibold text-white shadow-[0_8px_22px_rgba(255,106,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valasys-orange",
        "sm:h-[41px] sm:gap-2 sm:pr-3",
        "before:absolute before:inset-0 before:rounded-full before:bg-white/15 before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        "after:absolute after:inset-0 after:rounded-full after:border after:border-white/25 after:opacity-60 after:animate-[onboardingPulse_1.8s_ease-in-out_infinite]",
        className,
      )}
      aria-label={`Resume Onboarding, ${percentLabel} complete`}
    >
      <span className="pointer-events-none absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center sm:h-3.5 sm:w-3.5">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 onboarding-badge-sparkle"
          aria-hidden
        />
        <span
          className="relative inline-flex h-1 w-1 rounded-full bg-white sm:h-1.5 sm:w-1.5"
          aria-hidden
        />
      </span>
      <span className="relative flex h-6 w-auto items-center justify-center rounded-full bg-white/20 text-[10px] font-semibold text-white transition-all duration-300 group-hover:bg-white/25 sm:h-[26px] sm:text-[11px] px-2">
        <span
          className="transition-opacity duration-200 group-hover:opacity-0 flex items-center gap-1 whitespace-nowrap"
          aria-hidden
        >
          <span className="font-semibold">{percentLabel}</span>
          <span className="text-[9px] font-normal opacity-90">
            Resume Onboarding
          </span>
        </span>
        <Sparkles
          className="absolute h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:h-3.5 sm:w-3.5"
          aria-hidden
        />
      </span>
      <span className="sr-only">Resume Onboarding</span>
      <div className="flex max-w-0 translate-x-1.5 flex-col items-start overflow-hidden leading-tight opacity-0 transition-all duration-300 ease-out group-hover:max-w-[220px] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:max-w-[220px] group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:translate-x-2">
        <span className="text-[9px] uppercase tracking-wide text-white/75 sm:text-[10px]">
          Resume Onboarding · {percentLabel} complete
        </span>
        <span className="text-xs font-semibold sm:text-sm">
          {reminder.stepLabel}
        </span>
      </div>
    </button>
  );
}
