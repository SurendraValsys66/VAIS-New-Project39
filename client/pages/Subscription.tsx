import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Minus, CreditCard, Info, ChevronDown, CircleCheckBig, CircleX, Gift, Rocket, BarChart3, Building2, Coins } from "lucide-react";
import React, { useMemo, useState, useRef } from "react";

interface Plan {
  id: "free" | "growth" | "scale" | "enterprise";
  name: string;
  description?: string;
  priceMonthly: number; // USD per seat per month
  priceAnnual: number; // USD per seat per month billed annually
  creditsPerMonth: number | null;
  creditsLabel?: string; // override label (e.g., "1000 credits per plan")
  creditsNote?: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free Plan",
    description: "Explore the platform to find leads, manage pipeline & close deals.",
    priceMonthly: 0,
    priceAnnual: 0,
    creditsPerMonth: null,
    creditsLabel: "1000 credits per plan",
    creditsNote: "7-day free plan",
  },
  {
    id: "growth",
    name: "Growth Plan",
    description: "Scale prospecting, outreach & deal management with more credits.",
    priceMonthly: 69,
    priceAnnual: 55,
    creditsPerMonth: 3000,
    popular: true,
  },
  {
    id: "scale",
    name: "Scale Plan",
    description: "Advanced capabilities with higher monthly credits allotment.",
    priceMonthly: 99,
    priceAnnual: 79,
    creditsPerMonth: 6000,
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    description: "Custom pricing and higher limits for teams with advanced needs.",
    priceMonthly: 0,
    priceAnnual: 0,
    creditsPerMonth: null,
    creditsLabel: "Custom credits",
  },
];

// Core modules from the provided design
const coreRows: { label: string; values: (boolean | string | "-")[] }[] = [
  { label: "Build Your ABM with VAIS", values: [false, true, true, true] },
  { label: "ABM Verification", values: [false, true, true, true] },
  { label: "Look-Alike Generation", values: [false, true, true, true] },
  { label: "Find My Prospects", values: [false, true, true, true] },
  {
    label: "Download Center (Reports, Leads, Assets)",
    values: [false, true, true, true],
  },
  { label: "Buy Additional Credits", values: ["✖", "$1.50", "$1", "$1"] },
  { label: "Support", values: ["Tickets", "Email", "Priority Email Support", "Priority Email Support"] },
];

// High value account insights
const insightsRows: { label: string; values: (boolean | string | "-")[] }[] = [
  { label: "Intent Topics", values: ["3", "5", "8", "8"] },
  {
    label: "Account Level Intent Signals",
    values: ["-", "First 10 Free Signals", "First 10 Free Signals", "First 10 Free Signals"],
  },
  { label: "Account Profiling", values: [false, true, true, true] },
  { label: "Account Fit Insights", values: [true, true, true, true] },
  { label: "Market Trend Activity", values: [true, true, true, true] },
  { label: "Funnel Orchestration", values: [true, true, true, true] },
  { label: "Campaign Recommendation", values: [true, true, true, true] },
  { label: "Asset Recommendation", values: [true, true, true, true] },
];

function priceFor(plan: Plan, billing: "monthly" | "annual") {
  return billing === "monthly" ? plan.priceMonthly : plan.priceAnnual;
}

function planDisplay(plan: Plan, billing: "monthly" | "annual") {
  // Price label
  const isEnterprise = plan.id === "enterprise";
  const price = priceFor(plan, billing);
  const priceLabel = isEnterprise ? "Custom Plan" : (price === 0 ? "$0" : `$${price}`);
  const priceSuffix = isEnterprise || price === 0 ? "" : "/month";

  // Billed note and credits text based on provided spec
  let billedNote = billing === "monthly" ? "Billed monthly" : "Per seat per month, billed annually";
  let credits = plan.creditsLabel ?? "";

  if (plan.id === "free") {
    credits = "1000 credits per plan";
    billedNote = "7-day free plan";
  } else if (billing === "annual") {
    if (plan.id === "growth") credits = "36,000 credits per user / year";
    if (plan.id === "scale") credits = "72,000 credits per user / year";
    if (plan.id === "enterprise") credits = "Custom credits";
  } else {
    if (plan.id === "growth") credits = "3,000 credits per user / year";
    if (plan.id === "scale") credits = "6,000 credits per user / month";
    if (plan.id === "enterprise") credits = "Custom credits";
  }

  return { priceLabel, priceSuffix, billedNote, credits };
}

function planIcon(id: Plan["id"]) {
  const cls = "w-6 h-6 text-valasys-orange";
  switch (id) {
    case "free":
      return <Gift className={cls} />;
    case "growth":
      return <Rocket className={cls} />;
    case "scale":
      return <BarChart3 className={cls} />;
    case "enterprise":
      return <Building2 className={cls} />;
    default:
      return null;
  }
}

function formatPrice(n: number) {
  return n === 0 ? "$0" : `$${n.toFixed(0)}`;
}

function PlanCard({
  plan,
  billing,
  selected,
  planIndex,
  onSelect,
  onToggleComparison,
}: {
  plan: Plan;
  billing: "monthly" | "annual";
  selected?: boolean;
  planIndex: 0 | 1 | 2 | 3;
  onSelect: () => void;
  onToggleComparison: () => void;
}) {
  const includedCore = coreRows
    .map((r) => ({ label: r.label, v: r.values[planIndex] }))
    .filter((r) => r.v !== false && r.v !== "-");
  const includedInsights = insightsRows
    .map((r) => ({ label: r.label, v: r.values[planIndex] }))
    .filter((r) => r.v !== false && r.v !== "-");

  return (
    <Card className={`relative h-full flex flex-col ${selected ? "ring-2 ring-yellow-300 bg-yellow-50" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {planIcon(plan.id)}
            <CardTitle className="text-base md:text-xl font-semibold">{plan.name}</CardTitle>
          </div>
          {plan.popular && (
            <Badge className="bg-valasys-orange text-white">Most Popular</Badge>
          )}
        </div>
        <div className="mt-2 space-y-2">
          {plan.description && (
            <div className="text-sm text-valasys-gray-600">{plan.description}</div>
          )}
          {(() => { const d = planDisplay(plan, billing); return (
            <>
              <div className="text-3xl font-bold">
                {d.priceLabel}
                {d.priceSuffix && <span className="text-sm text-valasys-gray-500"> {d.priceSuffix}</span>}
              </div>
              <div className="text-xs text-valasys-gray-500">{d.billedNote}</div>
            </>
          ); })()}
        </div>
      </CardHeader>
      <CardContent className="space-y-5 flex-1 flex flex-col">
        <div className="border-y border-valasys-gray-200 py-3">
          <div className="text-[17px] font-semibold text-valasys-orange flex items-center gap-2">
            <Coins className="w-5 h-5 text-valasys-orange" />
            {(() => { const d = planDisplay(plan, billing); return (
              <>
                <span>{d.credits}</span>
              </>
            ); })()}
          </div>
        </div>

        <div className="pt-3 grid grid-cols-1">
          {plan.id === "enterprise" ? (
            <Button
              onClick={onSelect}
              className={`w-full ${selected ? "bg-[#424242] text-white border-2 border-[#424242]" : "border-2 border-valasys-orange text-valasys-orange bg-white hover:bg-gradient-to-r hover:from-valasys-orange hover:to-valasys-orange-light hover:text-white"}`}
            >
              {selected && <Check className="w-4 h-4 mr-2 text-white" />}
              Contact to our sales
            </Button>
          ) : (
            <Button
              onClick={onSelect}
              disabled={plan.id === "free"}
              className={`w-full ${selected ? "bg-[#424242] text-white" : "bg-gradient-to-r from-valasys-orange to-valasys-orange-light text-white hover:from-valasys-orange/90 hover:to-valasys-orange-light/90"}`}
            >
              {selected && <Check className="w-4 h-4 mr-2 text-white" />}
              {selected ? "Selected" : plan.id === "free" ? "Current Plan" : "Select Plan"}
            </Button>
          )}
        </div>


        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-valasys-gray-500">
            Core Platform Modules
          </div>
          <ul className="space-y-2">
            {includedCore.map((item) => (
              <li
                key={item.label}
                className="flex items-start text-sm text-valasys-gray-700"
              >
                <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                <span>
                  {item.label}
                  {typeof item.v === "string" && (
                    <span className="ml-2 text-xs text-valasys-gray-600">
                      {item.v}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-valasys-gray-500">
            High Value Account Insights
          </div>
          <ul className="space-y-2">
            {includedInsights.map((item) => (
              <li
                key={item.label}
                className="flex items-start text-sm text-valasys-gray-700"
              >
                <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                <span>
                  {item.label}
                  {typeof item.v === "string" && (
                    <span className="ml-2 text-xs text-valasys-gray-600">
                      {item.v}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={onToggleComparison}
          className="mt-auto inline-flex items-center text-sm font-semibold text-valasys-gray-700 hover:text-valasys-gray-900"
        >
          Show plan comparison
          <ChevronDown className="w-4 h-4 ml-1 transition-transform" />
        </button>

      </CardContent>
    </Card>
  );
}

function FeatureRow({
  label,
  tiers,
}: {
  label: string;
  tiers: (boolean | string | "-")[];
}) {
  return (
    <div className="grid grid-cols-5 gap-4 items-center py-3 border-b border-valasys-gray-200">
      <div className="text-sm font-medium text-valasys-gray-800">{label}</div>
      {tiers.map((t, i) => (
        <div key={i} className="flex justify-center text-sm">
          {typeof t === "string" ? (
            <span className="px-2 py-0.5 rounded-full bg-valasys-gray-100 text-valasys-gray-800 border border-valasys-gray-200">
              {t}
            </span>
          ) : t === "-" ? (
            <Minus className="w-4 h-4 text-valasys-gray-400" />
          ) : t ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <Minus className="w-4 h-4 text-valasys-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Subscription() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [selectedPlan, setSelectedPlan] = useState<"free" | "growth" | "scale" | "enterprise">("growth");
  const [showComparison, setShowComparison] = useState(false);
  const comparisonHeadingRef = useRef<HTMLDivElement | null>(null);
  const handleShowComparison = () => {
    if (!showComparison) setShowComparison(true);
    requestAnimationFrame(() => {
      const el = comparisonHeadingRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offset = 120; // account for sticky header
      const top = rect.top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };
  const sortedPlans = useMemo(() => plans, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-2xl font-bold text-valasys-gray-900">
            Empowering business growth from a single platform
          </h1>
          <p className="text-valasys-gray-600">
            Select from best plans, ensuring a perfect match.
          </p>
          <div className="flex items-center gap-3">
            <Tabs
              value={billing}
              onValueChange={(v: any) => setBilling(v)}
              className="bg-white rounded-lg border border-valasys-gray-200 p-1"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="annual" className="data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light">Annual Plans</TabsTrigger>
                <TabsTrigger value="monthly" className="data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light">Monthly Plans</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Plan grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {sortedPlans.map((p, idx) => (
            <PlanCard
              key={p.id}
              plan={p}
              billing={billing}
              planIndex={idx as 0 | 1 | 2 | 3}
              selected={p.id === selectedPlan}
              onSelect={() => setSelectedPlan(p.id as any)}
              onToggleComparison={handleShowComparison}
            />
          ))}
        </div>

        {showComparison && (
          <Card className="overflow-hidden" id="plan-comparison">
            <div ref={comparisonHeadingRef} className="flex items-center gap-2 bg-valasys-gray-50 border rounded-t-lg px-4 py-3 text-valasys-gray-800">
              <img src="/public/placeholder.svg" alt="" className="w-5 h-5" />
              <div>
                <div className="font-semibold">Plan comparison</div>
                <div className="text-xs text-valasys-gray-600">Find the features available in each plan</div>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b align-top">
                      <th className="px-4 py-4"></th>
                      {sortedPlans.map((p) => {
                        const d = planDisplay(p, billing);
                        const isSelected = selectedPlan === p.id;
                        const isEnterprise = p.id === "enterprise";
                        return (
                          <th key={p.id} className="px-4 py-4 align-top">
                            <div className="relative rounded-xl border bg-white shadow-sm p-4 text-left flex flex-col gap-2">
                              {p.popular && (
                                <Badge className="absolute top-2 right-2 bg-valasys-orange text-white">MOST POPULAR</Badge>
                              )}
                              <div className="text-base md:text-lg font-semibold text-valasys-gray-900 flex items-center gap-2">{planIcon(p.id)}<span>{p.name}</span></div>
                              {p.description && (
                                <div className="text-xs text-valasys-gray-600 mt-1 line-clamp-2">{p.description}</div>
                              )}
                              <div className="text-2xl font-bold mt-3">{d.priceLabel}{d.priceSuffix && <span className="text-sm text-valasys-gray-500"> {d.priceSuffix}</span>}</div>
                              <div className="text-xs text-valasys-gray-500">{d.billedNote}</div>
                              <div className="my-3 h-px bg-valasys-gray-200" />
                              <div className="text-[17px] font-semibold text-valasys-orange flex items-center gap-2"><Coins className="w-5 h-5 text-valasys-orange" />{d.credits}</div>
                              <div className="pt-2">
                                {isEnterprise ? (
                                  <Button
                                    onClick={() => setSelectedPlan(p.id as any)}
                                    className={`w-full ${isSelected ? "bg-[#424242] text-white border-2 border-[#424242]" : "border-2 border-valasys-orange text-valasys-orange bg-white hover:bg-gradient-to-r hover:from-valasys-orange hover:to-valasys-orange-light hover:text-white"}`}
                                  >
                                    {isSelected && <Check className="w-4 h-4 mr-2" />}
                                    Contact to our sales
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => setSelectedPlan(p.id as any)}
                                    className={`w-full ${isSelected ? "bg-[#424242] text-white" : "bg-gradient-to-r from-valasys-orange to-valasys-orange-light text-white hover:from-valasys-orange/90 hover:to-valasys-orange-light/90"}`}
                                  >
                                    {isSelected && <Check className="w-4 h-4 mr-2" />}
                                    {isSelected ? "Selected" : p.id === "free" ? "Current Plan" : "Select Plan"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                    <tr className="border-b">
                      <th className="text-left px-4 py-3 font-medium text-valasys-gray-600">Features</th>
                      <th className="px-4 py-3 text-center">Free</th>
                      <th className="px-4 py-3 text-center">Growth</th>
                      <th className="px-4 py-3 text-center">Scale</th>
                      <th className="px-4 py-3 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-valasys-gray-50/60">
                      <td colSpan={5} className="px-4 py-2 text-xs uppercase tracking-wide text-valasys-gray-500">Core Platform Modules</td>
                    </tr>
                    {coreRows.map((row) => (
                      <tr key={row.label} className="border-b">
                        <td className="px-4 py-3 font-medium text-valasys-gray-800">{row.label}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="px-4 py-3 text-center">
                            {v === "-" ? (
                              <span className="text-valasys-gray-300">—</span>
                            ) : v === "✖" ? (
                              <CircleX className="w-5 h-5 mx-auto text-red-500" />
                            ) : typeof v === "string" ? (
                              <span className="inline-block rounded-full border px-2 py-0.5 text-xs text-valasys-gray-700">{v}</span>
                            ) : v ? (
                              <CircleCheckBig className="w-5 h-5 mx-auto text-green-600" />
                            ) : (
                              <CircleX className="w-5 h-5 mx-auto text-red-500" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}

                    <tr className="bg-valasys-gray-50/60">
                      <td colSpan={5} className="px-4 py-2 text-xs uppercase tracking-wide text-valasys-gray-500">High Value Account Insights</td>
                    </tr>
                    {insightsRows.map((row) => (
                      <tr key={row.label} className="border-b">
                        <td className="px-4 py-3 font-medium text-valasys-gray-800">{row.label}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="px-4 py-3 text-center">
                            {v === "-" ? (
                              <span className="text-valasys-gray-300">—</span>
                            ) : v === "✖" ? (
                              <CircleX className="w-5 h-5 mx-auto text-red-500" />
                            ) : typeof v === "string" ? (
                              <span className="inline-block rounded-full border px-2 py-0.5 text-xs text-valasys-gray-700">{v}</span>
                            ) : v ? (
                              <CircleCheckBig className="w-5 h-5 mx-auto text-green-600" />
                            ) : (
                              <CircleX className="w-5 h-5 mx-auto text-red-500" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-valasys-orange text-white hover:bg-valasys-orange/90"
          >
            <CreditCard className="w-5 h-5 mr-2" /> Credit Usage Comparison
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
