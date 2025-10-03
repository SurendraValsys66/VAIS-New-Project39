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

export function getOnboarding(): OnboardingData {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OnboardingData) : {};
  } catch {
    return {};
  }
}

export function saveOnboarding(patch: Partial<OnboardingData>) {
  const current = getOnboarding();
  const next = { ...current, ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearOnboarding() {
  localStorage.removeItem(KEY);
}
