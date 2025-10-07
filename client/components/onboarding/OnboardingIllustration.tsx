import React from "react";

type Variant = "role" | "usecase" | "experience" | "industry" | "category";

const TITLES: Record<Variant, { title: string; subtitle: string }> = {
  role: {
    title: "AI‑Assisted Chat",
    subtitle:
      "Set your role so VAIS can tailor guidance and defaults to your day‑to‑day. We’ll calibrate questions, examples, and actions to match your responsibilities. This helps surface what matters most first.",
  },
  usecase: {
    title: "Campaign Builder",
    subtitle:
      "Tell us the outcomes you care about and we’ll map them to smart flows. Get prebuilt templates, prompts, and assets to launch faster. Everything remains fully editable later.",
  },
  experience: {
    title: "Guided Experience",
    subtitle:
      "Whether you’re new or advanced, we adapt the level of guidance. Tooltips, presets, and defaults scale with your comfort. You’ll always know the next best step.",
  },
  industry: {
    title: "Industry Insights",
    subtitle:
      "Choose your focus area to unlock sample ICPs, playbooks, and benchmarks. VAIS fine‑tunes copy and suggestions to your market language. Expect more relevant recommendations.",
  },
  category: {
    title: "Smart Suggestions",
    subtitle:
      "Selecting your product category improves search, prompts, and assets. Get accurate shortcuts and examples aligned to how your product is used. Personalization deepens over time.",
  },
};

export default function OnboardingIllustration({
  variant,
  imageSrc,
  imageAlt = "Onboarding illustration",
}: {
  variant: Variant;
  imageSrc?: string;
  imageAlt?: string;
}) {
  const copy = TITLES[variant];

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-valasys-blue/30 via-valasys-orange/20 to-valasys-green/20" />
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

      <div className="relative h-full w-full flex items-center justify-center px-8">
        <div className="max-w-2xl w-full">
          <h2 className="text-black text-2xl font-semibold">{copy.title}</h2>
          <p className="text-black text-sm mt-1 mb-6 max-w-xl">
            {copy.subtitle}
          </p>
          {imageSrc ? (
            <div className="relative mx-auto w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/30 backdrop-blur-sm">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="block w-full h-auto"
              />
            </div>
          ) : (
            <DevicePreview />
          )}
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
