import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StepProgress from "@/components/onboarding/StepProgress";
import { saveOnboarding, getOnboarding } from "@/lib/onboardingStorage";
import { useNavigate } from "react-router-dom";

const ROLES = [
  "Founder",
  "Marketer",
  "Business Development",
  "Sales Leader",
  "Talent Acquisition",
  "Ops & Support",
  "Customer Success",
  "Sales Representative",
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
    <div className="min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl border-valasys-gray-200 shadow-xl bg-white/95">
        <CardHeader>
          <CardTitle className="text-lg">Welcome to VAIS</CardTitle>
          <StepProgress current={1} total={4} title="Which role defines you best?" />
        </CardHeader>
        <CardContent>
          <RadioGroup value={value} onValueChange={setValue} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ROLES.map((r) => (
              <Label
                key={r}
                htmlFor={`role-${r}`}
                className={`flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                  value === r ? "border-valasys-orange bg-valasys-orange/5" : "border-valasys-gray-200 hover:border-valasys-orange/60"
                }`}
              >
                <RadioGroupItem id={`role-${r}`} value={r} />
                <span className="text-sm text-valasys-gray-800">{r}</span>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate(-1)} className="border-valasys-gray-300">Back</Button>
          <Button onClick={onNext} disabled={!value} className="bg-valasys-orange hover:bg-valasys-orange-light text-white">Continue</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
