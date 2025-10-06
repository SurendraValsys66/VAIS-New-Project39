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
import { motion } from "framer-motion";
import OnboardingDecor from "@/components/onboarding/Decor";
import OnboardingSummaryPanel from "@/components/onboarding/OnboardingSummaryPanel";
import OnboardingNavbar from "@/components/onboarding/OnboardingNavbar";
import {
  Factory,
  ShoppingBag,
  Laptop,
  Server,
  UtensilsCrossed,
  Stethoscope,
  Banknote,
  Sparkles,
} from "lucide-react";

type IndustryOption = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const INDUSTRY_OPTIONS: readonly IndustryOption[] = [
  { label: "Manufacturing", icon: Factory },
  { label: "Retail", icon: ShoppingBag },
  { label: "Software", icon: Laptop },
  { label: "IT", icon: Server },
  { label: "Hospitality", icon: UtensilsCrossed },
  { label: "Healthcare", icon: Stethoscope },
  { label: "Financial Services", icon: Banknote },
  { label: "Other", icon: Sparkles },
];

type IndustryValue = (typeof INDUSTRY_OPTIONS)[number]["label"];

export default function OnboardingIndustry() {
  const navigate = useNavigate();
  const initial = getOnboarding().targetIndustry ?? "";
  const [value, setValue] = useState<IndustryValue | "">(
    initial as IndustryValue | "",
  );

  const onNext = () => {
    if (!value) return;
    saveOnboarding({ targetIndustry: value });
    navigate("/onboarding/category");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 flex items-center justify-center p-6">
      <OnboardingNavbar />
      <OnboardingDecor />
      <Card className="w-full max-w-4xl border-valasys-gray-200 shadow-xl bg-white/95">
        <CardHeader>
          <CardTitle className="text-lg">Almost there</CardTitle>
          <StepProgress
            current={4}
            total={6}
            title="What is your preferred target industry?"
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <RadioGroup
                value={value}
                onValueChange={(v) => {
                  setValue(v as IndustryValue);
                  if (v) {
                    saveOnboarding({
                      targetIndustry: v as IndustryValue,
                    });
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {INDUSTRY_OPTIONS.map((option) => (
                  <motion.div
                    key={option.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Label
                      htmlFor={`industry-${option.label}`}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                        value === option.label
                          ? "border-valasys-orange bg-valasys-orange/5"
                          : "border-valasys-gray-200 hover:border-valasys-orange/60"
                      }`}
                    >
                      <RadioGroupItem
                        id={`industry-${option.label}`}
                        value={option.label}
                      />
                      <option.icon className="h-4 w-4 text-valasys-orange" />
                      <span className="text-sm text-valasys-gray-800">
                        {option.label}
                      </span>
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </div>
            <div className="md:col-span-1">
              <OnboardingSummaryPanel step={4} />
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
