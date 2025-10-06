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

const INDUSTRIES = [
  "Manufacturing",
  "Retail",
  "Software",
  "IT",
  "Hospitality",
  "Healthcare",
  "Financial Services",
  "Other",
] as const;

export default function OnboardingIndustry() {
  const navigate = useNavigate();
  const initial = getOnboarding().targetIndustry ?? "";
  const [value, setValue] = useState<string>(initial);

  const onNext = () => {
    if (!value) return;
    saveOnboarding({ targetIndustry: value as (typeof INDUSTRIES)[number] });
    navigate("/onboarding/category");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 flex items-center justify-center p-6">
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
                  setValue(v);
                  if (v) {
                    saveOnboarding({
                      targetIndustry: v as (typeof INDUSTRIES)[number],
                    });
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {INDUSTRIES.map((industry) => (
                  <motion.div
                    key={industry}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Label
                      htmlFor={`industry-${industry}`}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                        value === industry
                          ? "border-valasys-orange bg-valasys-orange/5"
                          : "border-valasys-gray-200 hover:border-valasys-orange/60"
                      }`}
                    >
                      <RadioGroupItem
                        id={`industry-${industry}`}
                        value={industry}
                      />
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-valasys-orange/10 text-xs font-medium text-valasys-orange">
                        {industry.charAt(0)}
                      </span>
                      <span className="text-sm text-valasys-gray-800">
                        {industry}
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
