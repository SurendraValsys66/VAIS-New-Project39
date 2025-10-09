import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Minus, CreditCard, Info } from "lucide-react";
import React, { useMemo, useState } from "react";

interface Plan {
  id: "free" | "growth" | "scale";
  name: string;
  priceMonthly: number; // USD per seat per month
  priceAnnual: number; // USD per seat per month billed annually
  creditsPerMonth: number | null;
  creditsLabel?: string; // override label (e.g., "1000 credits per plan")
  popular?: boolean;
  tagline?: string;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free Plan",
    priceMonthly: 0,
    priceAnnual: 0,
    creditsPerMonth: null,
    creditsLabel: "1000 credits per plan",
    tagline: "7-day free plan",
  },
  {
    id: "growth",
    name: "Growth Plan",
    priceMonthly: 69,
    priceAnnual: 69, // per seat per month, billed annually
    creditsPerMonth: 3000,
    popular: true,
  },
  {
    id: "scale",
    name: "Scale Plan",
    priceMonthly: 99,
    priceAnnual: 99, // per seat per month, billed annually
    creditsPerMonth: 6000,
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
}: {
  plan: Plan;
  billing: "monthly" | "annual";
  selected?: boolean;
  planIndex: 0 | 1 | 2;
}) {
  const includedCore = coreRows
    .map((r) => ({ label: r.label, v: r.values[planIndex] }))
    .filter((r) => r.v !== false && r.v !== "-");
  const includedInsights = insightsRows
    .map((r) => ({ label: r.label, v: r.values[planIndex] }))
    .filter((r) => r.v !== false && r.v !== "-");

  return (
    <Card
      className={`relative h-full ${plan.popular ? "ring-2 ring-valasys-orange" : ""}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
          {plan.popular && (
            <Badge className="bg-valasys-orange text-white">Most Popular</Badge>
          )}
        </div>
        <div className="mt-2">
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
          {plan.tagline && (
            <div className="mt-1 text-xs text-valasys-gray-500">
              {plan.tagline}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="text-sm text-valasys-gray-600">
          {plan.creditsLabel ? (
            <span className="font-medium">{plan.creditsLabel}</span>
          ) : (
            <>
              <span className="font-medium">
                {plan.creditsPerMonth?.toLocaleString()}
              </span>{" "}
              credits per user / month
            </>
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

        <div className="pt-1 grid grid-cols-1 gap-2">
          <Button className="w-full bg-valasys-orange text-white hover:bg-valasys-orange/90">
            {selected
              ? "Selected"
              : plan.id === "free"
                ? "Try for free"
                : "Select Plan"}
          </Button>
        </div>
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
