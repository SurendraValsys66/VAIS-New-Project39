import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Minus, CreditCard, Info } from "lucide-react";
import React, { useMemo, useState } from "react";

interface Plan {
  id: "free" | "basic" | "pro" | "org";
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
    name: "Free",
    description: "Explore the platform to find leads, manage pipeline & close deals.",
    priceMonthly: 0,
    priceAnnual: 0,
    creditsPerMonth: null,
    creditsLabel: "1,200 credits",
    creditsNote: "per user/month granted upfront",
  },
  {
    id: "basic",
    name: "Basic",
    description: "Take prospecting, outreach & deal management to the next level.",
    priceMonthly: 49,
    priceAnnual: 49,
    creditsPerMonth: 30000,
  },
  {
    id: "pro",
    name: "Professional",
    description: "Optimize your sales process with multi‑touch outreach, AI & automations.",
    priceMonthly: 79,
    priceAnnual: 79,
    creditsPerMonth: 48000,
    popular: true,
  },
  {
    id: "org",
    name: "Organization",
    description: "Transform go‑to‑market with advanced tools, custom solutions & expert help.",
    priceMonthly: 119,
    priceAnnual: 119,
    creditsPerMonth: 72000,
  },
];

// Core modules from the provided design
const coreRows: { label: string; values: (boolean | string | "-")[] }[] = [
  { label: "Build Your ABM with VAIS", values: [false, true, true] },
  { label: "ABM Verification", values: [false, true, true] },
  { label: "Look-Alike Generation", values: [false, true, true] },
  { label: "Find My Prospects", values: [false, true, true] },
  {
    label: "Download Center (Reports, Leads, Assets)",
    values: [false, true, true],
  },
  { label: "Buy Additional Credits", values: ["✖", "$1.50", "$1"] },
  { label: "Support", values: ["Tickets", "Email", "Priority Email Support"] },
];

// High value account insights
const insightsRows: { label: string; values: (boolean | string | "-")[] }[] = [
  { label: "Intent Topics", values: ["3", "5", "8"] },
  {
    label: "Account Level Intent Signals",
    values: ["-", "First 10 Free Signals", "First 10 Free Signals"],
  },
  { label: "Account Profiling", values: [false, true, true] },
  { label: "Account Fit Insights", values: [true, true, true] },
  { label: "Market Trend Activity", values: [true, true, true] },
  { label: "Funnel Orchestration", values: [true, true, true] },
  { label: "Campaign Recommendation", values: [true, true, true] },
  { label: "Asset Recommendation", values: [true, true, true] },
];

function priceFor(plan: Plan, billing: "monthly" | "annual") {
  return billing === "monthly" ? plan.priceMonthly : plan.priceAnnual;
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
}: {
  plan: Plan;
  billing: "monthly" | "annual";
  selected?: boolean;
  planIndex: 0 | 1 | 2 | 3;
  onSelect: () => void;
}) {
  const includedCore = coreRows
    .map((r) => ({ label: r.label, v: r.values[planIndex] }))
    .filter((r) => r.v !== false && r.v !== "-");
  const includedInsights = insightsRows
    .map((r) => ({ label: r.label, v: r.values[planIndex] }))
    .filter((r) => r.v !== false && r.v !== "-");

  return (
    <Card className={`relative h-full ${selected ? "ring-2 ring-yellow-300 bg-yellow-50" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
          {plan.popular && (
            <Badge className="bg-valasys-orange text-white">Most Popular</Badge>
          )}
        </div>
        <div className="mt-2 space-y-1">
          <div className="text-3xl font-bold">
            {formatPrice(priceFor(plan, billing))}
            {plan.priceMonthly > 0 && (
              <span className="text-sm text-valasys-gray-500"> /seat /mo</span>
            )}
          </div>
          <div className="text-xs text-valasys-gray-500">
            {billing === "monthly"
              ? "Billed monthly"
              : "Per seat per month, billed annually"}
          </div>
          {plan.description && (
            <div className="text-sm text-valasys-gray-600">{plan.description}</div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-md border border-valasys-gray-200 p-3 bg-white">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">
                {plan.creditsLabel ?? `${(plan.creditsPerMonth || 0).toLocaleString()} credits`}
              </span>
              <span className="text-valasys-gray-500"> {plan.creditsNote ?? "per user granted upfront"}</span>
            </div>
            <Button variant="outline" size="sm" className="h-8 px-3">Add more credits</Button>
          </div>
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

        <div className="pt-1 grid grid-cols-1 gap-2">
          <Button onClick={onSelect} className="w-full bg-valasys-orange text-white hover:bg-valasys-orange/90">
            {selected ? "Selected" : plan.id === "free" ? "Current Plan" : "Select Plan"}
          </Button>
        </div>
        <button type="button" className="text-xs text-valasys-gray-600 underline">Try for free</button>
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
    <div className="grid grid-cols-4 gap-4 items-center py-3 border-b border-valasys-gray-200">
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
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<"free" | "basic" | "pro" | "org">("basic");
  const sortedPlans = useMemo(() => plans, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-valasys-gray-900">
              Choose your right plan!
            </h1>
            <p className="text-valasys-gray-600">
              Select from best plans, ensuring a perfect match.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Tabs
              value={billing}
              onValueChange={(v: any) => setBilling(v)}
              className="bg-white rounded-lg border border-valasys-gray-200 p-1"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="annual">Annual Billing</TabsTrigger>
              </TabsList>
            </Tabs>
            {billing === "annual" && (
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800 border-yellow-200"
              >
                Save up to $2000*
              </Badge>
            )}
          </div>
        </div>

        {/* Plan grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedPlans.map((p, idx) => (
            <PlanCard
              key={p.id}
              plan={p}
              billing={billing}
              planIndex={idx as 0 | 1 | 2}
              selected={p.id === "growth"}
            />
          ))}
        </div>

        {/* Core Modules */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Core Platform Modules</CardTitle>
              <Badge variant="outline" className="text-xs">
                <Info className="w-3 h-3 mr-1" /> Included features per plan
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-3 text-xs uppercase tracking-wide text-valasys-gray-500">
              <div>Features</div>
              <div className="text-center">Free</div>
              <div className="text-center">Growth</div>
              <div className="text-center">Scale</div>
            </div>
            <div className="divide-y divide-valasys-gray-200">
              {coreRows.map((row) => (
                <FeatureRow
                  key={row.label}
                  label={row.label}
                  tiers={row.values}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Insights */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>High Value Account Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-3 text-xs uppercase tracking-wide text-valasys-gray-500">
              <div>Insights</div>
              <div className="text-center">Free</div>
              <div className="text-center">Growth</div>
              <div className="text-center">Scale</div>
            </div>
            <div className="divide-y divide-valasys-gray-200">
              {insightsRows.map((row) => (
                <FeatureRow
                  key={row.label}
                  label={row.label}
                  tiers={row.values}
                />
              ))}
            </div>
          </CardContent>
        </Card>

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
