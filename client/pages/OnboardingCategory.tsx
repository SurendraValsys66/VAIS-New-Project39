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
import {
  ClipboardList,
  Lightbulb,
  Cpu,
  Headphones,
  Cog,
  Calculator,
  Banknote,
  Users,
  Factory,
  Megaphone,
  Landmark,
  ShoppingCart,
  Code,
  FileText,
  BarChart3,
  GraduationCap,
  TrendingUp,
  Stethoscope,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

type CategoryOption = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const CATEGORY_OPTIONS: readonly CategoryOption[] = [
  { label: "Administrative Support", icon: ClipboardList },
  { label: "Business Strategy", icon: Lightbulb },
  { label: "Computing", icon: Cpu },
  { label: "Customer Support", icon: Headphones },
  { label: "Engineering", icon: Cog },
  { label: "Financial Management", icon: Calculator },
  { label: "Financial Services", icon: Banknote },
  { label: "HR Management", icon: Users },
  { label: "Manufacturing", icon: Factory },
  { label: "Marketing", icon: Megaphone },
  { label: "Public Administration", icon: Landmark },
  { label: "Purchasing", icon: ShoppingCart },
  { label: "Software Development", icon: Code },
  { label: "Content Management", icon: FileText },
  { label: "Data Science", icon: BarChart3 },
  { label: "Education", icon: GraduationCap },
  { label: "Sales", icon: TrendingUp },
  { label: "Healthcare", icon: Stethoscope },
  { label: "Hospitality", icon: UtensilsCrossed },
  { label: "Other", icon: Sparkles },
];

type CategoryValue = (typeof CATEGORY_OPTIONS)[number]["label"];

export default function OnboardingCategory() {
  const navigate = useNavigate();
  const initial = getOnboarding().vaisCategory ?? "";
  const [value, setValue] = useState<CategoryValue | "">(
    initial as CategoryValue | "",
  );

  const onNext = () => {
    if (!value) return;
    saveOnboarding({ vaisCategory: value });
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
                  setValue(v as CategoryValue);
                  if (v) {
                    saveOnboarding({
                      vaisCategory: v as CategoryValue,
                    });
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <motion.div
                    key={option.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Label
                      htmlFor={`category-${option.label}`}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                        value === option.label
                          ? "border-valasys-orange bg-valasys-orange/5"
                          : "border-valasys-gray-200 hover:border-valasys-orange/60"
                      }`}
                    >
                      <RadioGroupItem
                        id={`category-${option.label}`}
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
            <div>
              <OnboardingSummaryPanel step={5} />
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
