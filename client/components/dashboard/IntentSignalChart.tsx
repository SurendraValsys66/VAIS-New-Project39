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
      <div
        className="relative inline-block w-full"
        onClick={onLockClick}
      >
        <Badge
          className={cn(
            "font-medium cursor-pointer blur-sm",
            getIntentSignalColor(data.intentSignal),
            className,
          )}
        >
          {data.intentSignal}
        </Badge>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-1 bg-white/80 rounded px-2 py-1">
            <Lock className="w-4 h-4 text-gray-700" />
            <span className="text-xs font-semibold text-gray-700">Unlock</span>
          </div>
        </div>
      </div>
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
