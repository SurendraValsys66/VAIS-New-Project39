import React from "react";
import { Badge } from "@/components/ui/badge";
import IntentSignalPopover from "./IntentSignalPopover";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface IntentSignalData {
  compositeScore: number;
  deltaScore: number;
  matchedTopics: number;
  intentSignal: string;
  companyName: string;
  vais: number;
  revenue: string;
  city: string;
  relatedTopics: string[];
}

interface IntentSignalChartProps {
  data: IntentSignalData;
  className?: string;
  isLocked?: boolean;
  onLockClick?: () => void;
}

const getIntentSignalColor = (signal: string) => {
  switch (signal) {
    case "Super Strong":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200";
    case "Very Strong":
      return "bg-green-100 text-green-800 border border-green-200";
    case "Strong":
      return "bg-blue-100 text-blue-800 border border-blue-200";
    case "Medium":
      return "bg-orange-100 text-orange-800 border border-orange-200";
    case "Weak":
      return "bg-red-100 text-red-800 border border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200";
  }
};

export default function IntentSignalChart({
  data,
  className,
  isLocked = false,
  onLockClick,
}: IntentSignalChartProps) {
  if (isLocked) {
    return (
      <Badge
        onClick={onLockClick}
        className={cn(
          "font-medium cursor-pointer flex items-center justify-center backdrop-blur-sm",
          "bg-emerald-100/80 text-emerald-800 border border-emerald-200",
          className,
        )}
      >
        <Lock className="w-4 h-4" />
      </Badge>
    );
  }

  return (
    <IntentSignalPopover data={data}>
      <Badge
        className={cn(
          "font-medium hover:shadow-md transition-shadow cursor-pointer",
          getIntentSignalColor(data.intentSignal),
          className,
        )}
      >
        {data.intentSignal}
      </Badge>
    </IntentSignalPopover>
  );
}
