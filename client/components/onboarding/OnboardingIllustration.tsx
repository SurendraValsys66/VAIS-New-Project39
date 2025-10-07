import React from "react";

type Variant = "role" | "usecase" | "experience" | "industry" | "category";

const TITLES: Record<Variant, { title: string; subtitle: string }> = {
  role: {
    title: "AI‑Assisted Chat",
    subtitle:
      "Interactive chat helps tailor your workspace and recommendations.",
  },
  usecase: {
    title: "Campaign Builder",
    subtitle:
      "Setup goals and get smart templates, prompts and assets instantly.",
  },
  experience: {
    title: "Guided Experience",
    subtitle:
      "We adapt the UI depth and helper tips based on your comfort level.",
  },
  industry: {
    title: "Industry Insights",
    subtitle:
      "See sample playbooks, ICP hints and market data for your focus.",
  },
  category: {
    title: "Smart Suggestions",
    subtitle:
      "Feature shortcuts and content ideas personalized to your product.",
  },
};

export default function OnboardingIllustration({ variant }: { variant: Variant }) {
  const copy = TITLES[variant];

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Gradient theme background */}
      <div className="absolute inset-0 bg-gradient-to-br from-valasys-blue/30 via-valasys-orange/20 to-valasys-green/20" />
      {/* Soft blobs */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

      <div className="relative h-full w-full flex items-center justify-center px-8">
        <div className="max-w-xl w-full">
          <h2 className="text-white/90 text-2xl font-semibold drop-shadow-sm">
            {copy.title}
          </h2>
          <p className="text-white/80 text-sm mt-1 mb-6 max-w-md">
            {copy.subtitle}
          </p>
          <DevicePreview />
        </div>
      </div>
    </div>
  );
}

function DevicePreview() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-2xl bg-white/10 p-2 shadow-xl ring-1 ring-white/20 backdrop-blur">
      <div className="rounded-xl bg-white/95 shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="h-9 bg-gradient-to-r from-valasys-gray-100 to-white flex items-center px-3 gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400/90" />
          <div className="h-3 w-3 rounded-full bg-yellow-400/90" />
          <div className="h-3 w-3 rounded-full bg-green-400/90" />
        </div>
        {/* Content */}
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div className="h-32 rounded-xl bg-gradient-to-br from-valasys-orange/90 to-pink-500/80 shadow-md" />
          </div>
          <div className="h-20 rounded-xl bg-gradient-to-br from-sky-500/90 to-indigo-500/80 shadow" />
          <div className="h-20 rounded-xl bg-gradient-to-br from-emerald-500/90 to-teal-500/80 shadow" />
          <div className="col-span-2 h-10 rounded-md bg-valasys-gray-100" />
        </div>
      </div>
      {/* Floating card */}
      <div className="absolute -right-6 -bottom-6 w-36 rounded-xl bg-white/95 p-3 shadow-2xl ring-1 ring-black/5">
        <div className="h-20 rounded-lg bg-gradient-to-br from-violet-500/90 to-fuchsia-500/80" />
        <div className="mt-2 h-2 w-5/6 rounded bg-valasys-gray-200" />
        <div className="mt-1 h-2 w-2/3 rounded bg-valasys-gray-200" />
      </div>
    </div>
  );
}
