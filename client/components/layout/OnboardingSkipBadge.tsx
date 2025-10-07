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
        "group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-valasys-orange to-valasys-orange-light px-4 py-1.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,106,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valasys-orange",
        "before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        "after:absolute after:inset-0 after:rounded-full after:border after:border-white/40 after:opacity-70 after:animate-[pulse_2s_ease-in-out_infinite]",
        className,
      )}
      aria-label="Resume onboarding"
    >
      <span className="pointer-events-none absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping" aria-hidden />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" aria-hidden />
      </span>
      <Sparkles className="h-4 w-4" />
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[11px] uppercase tracking-wide text-white/80">
          Resume onboarding
        </span>
        <span className="text-sm font-semibold">
          {reminder.stepLabel}
        </span>
      </div>
    </button>
  );
}
