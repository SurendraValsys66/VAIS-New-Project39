import React, { useRef } from "react";
import WalkingProgress from "@/components/onboarding/WalkingProgress";

type StepProgressProps = {
  current: number;
  total: number;
  title: string;
  subtitle?: string;
};

export default function StepProgress({
  current,
  total,
  title,
  subtitle,
}: StepProgressProps) {
  const value = Math.min(100, Math.max(0, Math.round((current / total) * 100)));
  const prev = useRef(value);
  const isChange = prev.current !== value;
  prev.current = value;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-valasys-gray-900">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-sm text-valasys-gray-600">{subtitle}</p>
          ) : null}
        </div>
        <div className="text-sm text-valasys-gray-700">
          Step {current} of {total}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <WalkingProgress
          value={value}
          fromValue={Math.max(0, Math.round(((current - 1) / total) * 100))}
          className="flex-1"
          height={8}
          animateOnChange={isChange}
        />
        <span className="text-sm font-medium text-valasys-gray-700 min-w-[3rem] text-right">
          {value}%
        </span>
      </div>
    </div>
  );
}
