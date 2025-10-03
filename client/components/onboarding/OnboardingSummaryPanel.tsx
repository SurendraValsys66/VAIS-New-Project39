import React from "react";
import { CircularProgress } from "@/components/ui/circular-progress";
import { getOnboarding } from "@/lib/onboardingStorage";

export default function OnboardingSummaryPanel({ step, total = 5 }: { step: number; total?: number }) {
  const data = getOnboarding();
  const pct = Math.max(0, Math.min(100, Math.round(((step - 1) / total) * 100)));

  return (
    <div className="rounded-xl border border-valasys-gray-200 bg-white/80 backdrop-blur-sm p-4 space-y-4">
      <div className="flex items-center gap-4">
        <CircularProgress value={pct} size={64} strokeWidth={6} className="text-valasys-orange" />
        <div>
          <div className="text-sm font-medium text-valasys-gray-900">Personalization</div>
          <div className="text-xs text-valasys-gray-600">Answer questions to tailor your experience</div>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-valasys-gray-600">Role</span>
          <span className="text-valasys-gray-900">{data.role ?? "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-valasys-gray-600">Goal</span>
          <span className="text-valasys-gray-900">{data.useCase ?? "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-valasys-gray-600">Experience</span>
          <span className="text-valasys-gray-900">{data.experience ?? "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-valasys-gray-600">Industry</span>
          <span className="text-valasys-gray-900">{data.targetIndustry ?? "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-valasys-gray-600">Product Category</span>
          <span className="text-valasys-gray-900">{data.vaisCategory ?? "—"}</span>
        </div>
      </div>
      <p className="text-xs text-valasys-gray-500">Pro tip: You can change these later in Settings.</p>
    </div>
  );
}
