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
  const [reminder, setReminder] = useState<OnboardingSkipReminder | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return getOnboardingSkipReminder();
  });

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

    window.addEventListener(ONBOARDING_SKIP_EVENT, handleUpdate as EventListener);
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

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-valasys-orange to-valasys-orange-light pr-3 pl-2 py-1 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(255,106,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valasys-orange",
        "before:absolute before:inset-0 before:rounded-full before:bg-white/15 before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        "after:absolute after:inset-0 after:rounded-full after:border after:border-white/30 after:opacity-60 after:animate-[pulse_2s_ease-in-out_infinite]",
        className,
      )}
      aria-label="Resume onboarding"
    >
      <span className="pointer-events-none absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping" aria-hidden />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
      </span>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-300 group-hover:rotate-3">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
      <span className="sr-only">Resume onboarding</span>
      <div
        className="flex max-w-0 translate-x-2 flex-col items-start overflow-hidden leading-tight opacity-0 transition-all duration-300 ease-out group-hover:max-w-[220px] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:max-w-[220px] group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      >
        <span className="text-[10px] uppercase tracking-wide text-white/75">
          Resume onboarding
        </span>
        <span className="text-sm font-semibold">
          {reminder.stepLabel}
        </span>
      </div>
    </button>
  );
}
