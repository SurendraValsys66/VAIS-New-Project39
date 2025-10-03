import React from "react";
import { Sparkles, Stars, Wand2 } from "lucide-react";

export default function OnboardingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-valasys-orange/10 blur-3xl" />
      <div className="absolute -bottom-48 -right-40 h-96 w-96 rounded-full bg-valasys-blue/10 blur-3xl" />

      <div className="absolute inset-0">
        <div className="absolute left-10 top-10 animate-pulse-slow">
          <Sparkles className="h-5 w-5 text-valasys-orange/60" />
        </div>
        <div className="absolute right-16 top-24 animate-pulse-slower">
          <Stars className="h-6 w-6 text-valasys-blue/60" />
        </div>
        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 animate-pulse-slow">
          <Wand2 className="h-6 w-6 text-valasys-green/60" />
        </div>
      </div>
    </div>
  );
}
