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

const CATEGORIES = [
  "Administrative Support",
  "Business Strategy",
  "Computing",
  "Customer Support",
  "Engineering",
  "Financial Management",
  "Financial Services",
  "HR Management",
  "Manufacturing",
  "Marketing",
  "Public Administration",
  "Purchasing",
  "Software Development",
  "Content Management",
  "Data Science",
  "Education",
  "Sales",
  "Healthcare",
  "Hospitality",
  "Other",
] as const;

export default function OnboardingCategory() {
  const navigate = useNavigate();
  const initial = getOnboarding().vaisCategory ?? "";
  const [value, setValue] = useState<string>(initial);

  const groupedCategories = useMemo(() => {
    const midpoint = Math.ceil(CATEGORIES.length / 2);
    return [CATEGORIES.slice(0, midpoint), CATEGORIES.slice(midpoint)];
  }, []);

  const onNext = () => {
    if (!value) return;
    saveOnboarding({ vaisCategory: value as (typeof CATEGORIES)[number] });
    navigate("/onboarding/complete");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 flex items-center justify-center p-6">
      <OnboardingDecor />
      <Card className="w-full max-w-5xl border-valasys-gray-200 shadow-xl bg-white/95">
        <CardHeader>
          <CardTitle className="text-lg">Final touch</CardTitle>
          <StepProgress
            current={5}
            total={6}
            title="Which of these categories align with your product?"
            subtitle="Choose the closest match so VAIS can tailor recommendations."
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
            <div className="space-y-4">
              <RadioGroup
                value={value}
                onValueChange={(v) => {
                  setValue(v);
                  if (v) {
                    saveOnboarding({
                      vaisCategory: v as (typeof CATEGORIES)[number],
                    });
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {groupedCategories.flat().map((category) => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Label
                      htmlFor={`category-${category}`}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                        value === category
                          ? "border-valasys-orange bg-valasys-orange/5"
                          : "border-valasys-gray-200 hover:border-valasys-orange/60"
                      }`}
                    >
                      <RadioGroupItem
                        id={`category-${category}`}
                        value={category}
                      />
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-valasys-orange/10 text-[0.65rem] font-medium uppercase tracking-wide text-valasys-orange">
                        {category
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </span>
                      <span className="text-sm text-valasys-gray-800">
                        {category}
                      </span>
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </div>
            <div>
              <OnboardingSummaryPanel step={5} total={5} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={onNext}
            disabled={!value}
            className="bg-valasys-orange hover:bg-valasys-orange-light text-white"
          >
            Finish
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
