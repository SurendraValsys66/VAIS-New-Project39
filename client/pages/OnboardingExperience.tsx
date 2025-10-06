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
import { Baby, Gauge, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import OnboardingDecor from "@/components/onboarding/Decor";
import OnboardingSummaryPanel from "@/components/onboarding/OnboardingSummaryPanel";
import OnboardingNavbar from "@/components/onboarding/OnboardingNavbar";

const LEVELS = [
  { label: "Beginner", icon: Baby },
  { label: "Intermediate", icon: Gauge },
  { label: "Advanced", icon: GraduationCap },
] as const;

export default function OnboardingExperience() {
  const navigate = useNavigate();
  const initial = getOnboarding().experience ?? "";
  const [value, setValue] = useState<string>(initial);

  const onNext = () => {
    if (!value) return;
    saveOnboarding({ experience: value as any });
    navigate("/onboarding/industry");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 flex items-center justify-center p-6 pt-20">
      <OnboardingNavbar />
      <OnboardingDecor />
      <Card className="w-full max-w-4xl border-valasys-gray-200 shadow-xl bg-white/95">
        <CardHeader>
          <CardTitle className="text-lg">A few more details</CardTitle>
          <StepProgress
            current={3}
            total={6}
            title="What is your level of experience in using sales tech?"
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <RadioGroup
                value={value}
                onValueChange={(v) => {
                  setValue(v);
                  if (v) saveOnboarding({ experience: v as any });
                }}
                className="grid gap-3"
              >
                {LEVELS.map((lvl) => (
                  <motion.div
                    key={lvl.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Label
                      htmlFor={`lvl-${lvl.label}`}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                        value === lvl.label
                          ? "border-valasys-orange bg-valasys-orange/5"
                          : "border-valasys-gray-200 hover:border-valasys-orange/60"
                      }`}
                    >
                      <RadioGroupItem
                        id={`lvl-${lvl.label}`}
                        value={lvl.label}
                      />
                      <lvl.icon className="h-4 w-4 text-valasys-orange" />
                      <span className="text-sm text-valasys-gray-800">
                        {lvl.label}
                      </span>
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </div>
            <div className="md:col-span-1">
              <OnboardingSummaryPanel step={3} />
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
