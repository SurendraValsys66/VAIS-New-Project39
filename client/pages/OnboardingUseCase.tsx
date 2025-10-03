import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StepProgress from "@/components/onboarding/StepProgress";
import { saveOnboarding, getOnboarding } from "@/lib/onboardingStorage";
import { useNavigate } from "react-router-dom";

const OPTIONS = [
  "Build accounts/prospects list",
  "Build and run campaigns",
  "Enrich CRM Data",
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
    <div className="min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl border-valasys-gray-200 shadow-xl bg-white/95">
        <CardHeader>
          <CardTitle className="text-lg">Getting to know you</CardTitle>
          <StepProgress current={2} total={4} title="What would you like to use VAIS for?" />
        </CardHeader>
        <CardContent>
          <RadioGroup value={value} onValueChange={setValue} className="grid gap-3">
            {OPTIONS.map((opt) => (
              <Label
                key={opt}
                htmlFor={`usecase-${opt}`}
                className={`flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                  value === opt ? "border-valasys-orange bg-valasys-orange/5" : "border-valasys-gray-200 hover:border-valasys-orange/60"
                }`}
              >
                <RadioGroupItem id={`usecase-${opt}`} value={opt} />
                <span className="text-sm text-valasys-gray-800">{opt}</span>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/onboarding/role")} className="border-valasys-gray-300">Back</Button>
          <Button onClick={onNext} disabled={!value} className="bg-valasys-orange hover:bg-valasys-orange-light text-white">Continue</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
