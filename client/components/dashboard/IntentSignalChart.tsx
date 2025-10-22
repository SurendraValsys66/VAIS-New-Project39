import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import IntentSignalModal from "./IntentSignalModal";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

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
}: IntentSignalChartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <div
        className={cn("relative inline-block cursor-pointer group", className)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <Badge
          className={cn(
            "font-medium hover:shadow-md transition-shadow",
            getIntentSignalColor(data.intentSignal),
          )}
        >
          {data.intentSignal}
        </Badge>

        {isHovering && (
          <button
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-5 h-5 bg-valasys-orange text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-valasys-orange/90 shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            title="View intent signal breakdown"
          >
            <Info className="w-3 h-3" />
          </button>
        )}
      </div>

      <IntentSignalModal
        data={data}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
