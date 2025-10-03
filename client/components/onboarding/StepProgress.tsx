import React from "react";
import { Progress } from "@/components/ui/progress";

type StepProgressProps = {
  current: number;
  total: number;
  title: string;
  subtitle?: string;
};

export default function StepProgress({ current, total, title, subtitle }: StepProgressProps) {
  const value = Math.min(100, Math.max(0, Math.round((current / total) * 100)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-valasys-gray-900">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-valasys-gray-600">{subtitle}</p>
          ) : null}
        </div>
        <div className="text-sm text-valasys-gray-700">
          Step {current} of {total}
        </div>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}
