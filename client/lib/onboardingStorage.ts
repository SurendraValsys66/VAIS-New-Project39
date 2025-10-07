export type OnboardingData = {
  role?:
    | "Founder"
    | "Marketer"
    | "Business Development"
    | "Sales Leader"
    | "Talent Acquisition"
    | "Ops & Support"
    | "Customer Success"
    | "Sales Representative";
  useCase?:
    | "Build accounts/prospects list"
    | "Build and run campaigns"
    | "Enrich CRM Data";
  experience?: "Beginner" | "Intermediate" | "Advanced";
  targetIndustry?:
    | "Manufacturing"
    | "Retail"
    | "Software"
    | "IT"
    | "Hospitality"
    | "Healthcare"
    | "Financial Services"
    | "Other";
  vaisCategory?:
    | "Administrative Support"
    | "Business Strategy"
    | "Computing"
    | "Customer Support"
    | "Engineering"
    | "Financial Management"
    | "Financial Services"
    | "HR Management"
    | "Manufacturing"
    | "Marketing"
    | "Public Administration"
    | "Purchasing"
    | "Software Development"
    | "Content Management"
    | "Data Science"
    | "Education"
    | "Sales"
    | "Healthcare"
    | "Hospitality"
    | "Other";
};

const KEY = "vais.onboarding";
const SKIP_KEY = `${KEY}.skip-reminder`;
export const ONBOARDING_SKIP_EVENT = "vais:onboarding-skip";

function canUseStorage() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function getOnboarding(): OnboardingData {
  if (!canUseStorage()) {
    return {};
  }
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OnboardingData) : {};
  } catch {
    return {};
  }
}

export function saveOnboarding(patch: Partial<OnboardingData>) {
  if (!canUseStorage()) {
    return;
  }
  const current = getOnboarding();
  const next = { ...current, ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearOnboarding() {
  if (!canUseStorage()) {
    return;
  }
  localStorage.removeItem(KEY);
}

export interface OnboardingSkipReminder {
  stepRoute: string;
  stepLabel: string;
  stepNumber: number;
  createdAt: number;
}

export function saveOnboardingSkipReminder(
  reminder: Omit<OnboardingSkipReminder, "createdAt">,
) {
  if (!canUseStorage()) {
    return { ...reminder, createdAt: Date.now() };
  }
  const value: OnboardingSkipReminder = {
    ...reminder,
    createdAt: Date.now(),
  };
  localStorage.setItem(SKIP_KEY, JSON.stringify(value));
  return value;
}

export function getOnboardingSkipReminder(): OnboardingSkipReminder | null {
  if (!canUseStorage()) {
    return null;
  }
  try {
    const raw = localStorage.getItem(SKIP_KEY);
    return raw ? (JSON.parse(raw) as OnboardingSkipReminder) : null;
  } catch {
    return null;
  }
}

export function clearOnboardingSkipReminder() {
  if (!canUseStorage()) {
    return;
  }
  localStorage.removeItem(SKIP_KEY);
}

export function emitOnboardingSkipReminderUpdate(
  reminder: OnboardingSkipReminder | null,
) {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(
    new CustomEvent(ONBOARDING_SKIP_EVENT, {
      detail: reminder,
    }),
  );
}
