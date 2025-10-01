import React from "react";
import { cn } from "@/lib/utils";

interface Action {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "h-80 flex flex-col items-center justify-center text-center border-2 border-dashed border-valasys-gray-200 rounded-lg bg-white/60",
        className,
      )}
    >
      {icon && <div className="mb-3 text-valasys-orange">{icon}</div>}
      <h3 className="text-base font-medium text-valasys-gray-900">{title}</h3>
      {description && (
        <p className="text-sm text-valasys-gray-600 mt-1 max-w-md">
          {description}
        </p>
      )}
      {(primaryAction || secondaryAction) && (
        <div className="mt-4 flex gap-2">
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="inline-flex items-center gap-2 bg-valasys-orange text-white px-3 py-2 rounded-md text-sm hover:bg-valasys-orange/90"
            >
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-2 border border-valasys-gray-300 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
