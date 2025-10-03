import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StepProgress from "@/components/onboarding/StepProgress";
import { saveOnboarding, getOnboarding } from "@/lib/onboardingStorage";
import { useNavigate } from "react-router-dom";
import { ListChecks, Rocket, Database } from "lucide-react";
import { motion } from "framer-motion";
import OnboardingDecor from "@/components/onboarding/Decor";
import OnboardingSummaryPanel from "@/components/onboarding/OnboardingSummaryPanel";

const OPTIONS = [
  { label: "Build accounts/prospects list", icon: ListChecks },
  { label: "Build and run campaigns", icon: Rocket },
  { label: "Enrich CRM Data", icon: Database },
] as const;

export default function OnboardingUseCase() {
  const navigate = useNavigate();
  const initial = getOnboarding().useCase ?? "";
  const [value, setValue] = useState<string>(initial);

  const onNext = () => {
    if (!value) return;
    saveOnboarding({ useCase: value as any });
    navigate("/onboarding/experience");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 flex items-center justify-center p-6">
      <OnboardingDecor />
      <Card className="w-full max-w-4xl border-valasys-gray-200 shadow-xl bg-white/95">
        <CardHeader>
          <CardTitle className="text-lg">Getting to know you</CardTitle>
          <StepProgress current={2} total={6} title="What would you like to use VAIS for?" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <RadioGroup value={value} onValueChange={(v) => { setValue(v); if (v) saveOnboarding({ useCase: v as any }); }} className="grid gap-3">
                {OPTIONS.map((opt) => (
                  <motion.div key={opt.label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
                    <Label
                      htmlFor={`usecase-${opt.label}`}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                        value === opt.label ? "border-valasys-orange bg-valasys-orange/5" : "border-valasys-gray-200 hover:border-valasys-orange/60"
                      }`}
                    >
                      <RadioGroupItem id={`usecase-${opt.label}`} value={opt.label} />
                      <opt.icon className="h-4 w-4 text-valasys-orange" />
                      <span className="text-sm text-valasys-gray-800">{opt.label}</span>
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </div>
            <div className="md:col-span-1">
              <OnboardingSummaryPanel step={2} total={5} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/onboarding/role")} className="border-valasys-gray-300">Back</Button>
          <Button onClick={onNext} disabled={!value} className="bg-valasys-orange hover:bg-valasys-orange-light text-white">Continue</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
