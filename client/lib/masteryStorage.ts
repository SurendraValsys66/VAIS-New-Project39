export type MasterySteps = {
  // Always considered completed per requirements
  signUp?: boolean; // kept for completeness
  onboardingCompleted?: boolean;
  vaisResultsGenerated?: boolean;
  accountsDownloaded?: boolean;
  prospectSearchGenerated?: boolean;
  prospectDetailsDownloaded?: boolean;
  dismissed?: boolean; // whether the checklist auto-popup is dismissed
  firstSeenAt?: number;
};

const KEY = "vais.mastery";
export const MASTERY_EVENT = "vais:mastery-updated";

function canUseStorage() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function getMastery(): MasterySteps {
  if (!canUseStorage()) return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MasterySteps) : {};
  } catch {
    return {};
  }
}

export function saveMastery(patch: Partial<MasterySteps>) {
  if (!canUseStorage()) return;
  const current = getMastery();
  const next: MasterySteps = { ...current, ...patch };
  if (next.firstSeenAt == null) next.firstSeenAt = Date.now();
  localStorage.setItem(KEY, JSON.stringify(next));
  emitMasteryUpdate(next);
}

export function markStepCompleted(
  step:
    | "onboardingCompleted"
    | "vaisResultsGenerated"
    | "accountsDownloaded"
    | "prospectSearchGenerated"
    | "prospectDetailsDownloaded",
) {
  saveMastery({ [step]: true } as Partial<MasterySteps>);
}

export function setMasteryDismissed(dismissed: boolean) {
  saveMastery({ dismissed });
}

export function calculateMasteryPercentage(state?: MasterySteps) {
  const s = state ?? getMastery();
  // 6 steps total; sign up always counts as completed
  const total = 6;
  let completed = 1; // sign up
  if (s.onboardingCompleted) completed++;
  if (s.vaisResultsGenerated) completed++;
  if (s.accountsDownloaded) completed++;
  if (s.prospectSearchGenerated) completed++;
  if (s.prospectDetailsDownloaded) completed++;
  return Math.round((completed / total) * 100);
}

export function emitMasteryUpdate(state: MasterySteps) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(MASTERY_EVENT, { detail: state }) as Event,
  );
}
