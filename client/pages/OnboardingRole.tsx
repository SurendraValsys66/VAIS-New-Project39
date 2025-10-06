import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StepProgress from "@/components/onboarding/StepProgress";
import { saveOnboarding, getOnboarding } from "@/lib/onboardingStorage";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Users,
  Building2,
  Target,
  UserCog,
  Headphones,
  Smile,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import OnboardingDecor from "@/components/onboarding/Decor";
import OnboardingSummaryPanel from "@/components/onboarding/OnboardingSummaryPanel";

const ROLES = [
  { label: "Founder", icon: Brain },
  { label: "Marketer", icon: Target },
  { label: "Business Development", icon: Building2 },
  { label: "Sales Leader", icon: Users },
  { label: "Talent Acquisition", icon: UserCog },
  { label: "Ops & Support", icon: Headphones },
  { label: "Customer Success", icon: Smile },
  { label: "Sales Representative", icon: UserRound },
] as const;

export default function OnboardingRole() {
  const navigate = useNavigate();
  const initial = getOnboarding().role ?? "";
  const [value, setValue] = useState<string>(initial);

  const onNext = () => {
    if (!value) return;
    saveOnboarding({ role: value as any });
    navigate("/onboarding/use-case");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 flex items-center justify-center p-6">
      <OnboardingDecor />
      <Card className="w-full max-w-4xl border-valasys-gray-200 shadow-xl bg-white/95">
        <CardHeader>
          <CardTitle className="text-lg">Welcome to VAIS</CardTitle>
          <StepProgress
            current={1}
            total={6}
            title="Which role defines you best?"
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <RadioGroup
                value={value}
                onValueChange={(v) => {
                  setValue(v);
                  if (v) saveOnboarding({ role: v as any });
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {ROLES.map((r) => (
                  <motion.div
                    key={r.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Label
                      htmlFor={`role-${r.label}`}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                        value === r.label
                          ? "border-valasys-orange bg-valasys-orange/5"
                          : "border-valasys-gray-200 hover:border-valasys-orange/60"
                      }`}
                    >
                      <RadioGroupItem id={`role-${r.label}`} value={r.label} />
                      <r.icon className="h-4 w-4 text-valasys-orange" />
                      <span className="text-sm text-valasys-gray-800">
                        {r.label}
                      </span>
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </div>
            <div className="md:col-span-1">
              <OnboardingSummaryPanel step={1} total={5} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={onNext}
            disabled={!value}
            className="bg-valasys-orange hover:bg-valasys-orange-light text-white"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
