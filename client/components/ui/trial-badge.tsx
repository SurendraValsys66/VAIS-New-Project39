import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type TrialBadgeProps = {
  className?: string;
  label?: string;
  caret?: boolean;
};

export function TrialBadge({ className, label, caret }: TrialBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-gradient-to-r from-valasys-orange to-valasys-orange-light text-white border-transparent inline-flex items-center gap-1.5 shadow-sm hover:opacity-95",
        className,
      )}
      aria-label={label || "Free Trial user"}
      title={label || "Free Trial user"}
    >
      <Clock className="w-3.5 h-3.5" />
      {label || "Free Trial"}
      {caret && <ChevronDown className="w-3.5 h-3.5 opacity-80" />}
    </Badge>
  );
}

export default TrialBadge;
