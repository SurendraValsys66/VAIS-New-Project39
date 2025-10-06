import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StepProgress from "@/components/onboarding/StepProgress";
import { clearOnboarding, getOnboarding } from "@/lib/onboardingStorage";
import { useNavigate } from "react-router-dom";
import OnboardingDecor from "@/components/onboarding/Decor";
import ConfettiCanvas from "@/components/onboarding/ConfettiCanvas";
import { CheckCircle2 } from "lucide-react";

export default function OnboardingThankYou() {
  const navigate = useNavigate();
  const data = getOnboarding();

  const continueToApp = () => {
    clearOnboarding();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 flex items-center justify-center p-6">
      <OnboardingDecor />
      <div className="absolute inset-0">
        <ConfettiCanvas />
      </div>
      <Card className="relative w-full max-w-2xl border-valasys-gray-200 shadow-xl bg-white/95 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-valasys-gray-900">
            <CheckCircle2 className="h-5 w-5 text-valasys-green" /> You're all
            set!
          </CardTitle>
          <StepProgress
            current={6}
            total={6}
            title="Thank you for completing the onboarding"
            subtitle="We personalized your experience based on your answers."
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-valasys-gray-800">
            {data.role ? (
              <p>
                <span className="text-valasys-gray-600">Role:</span> {data.role}
              </p>
            ) : null}
            {data.useCase ? (
              <p>
                <span className="text-valasys-gray-600">Primary goal:</span>{" "}
                {data.useCase}
              </p>
            ) : null}
            {data.experience ? (
              <p>
                <span className="text-valasys-gray-600">Experience:</span>{" "}
                {data.experience}
              </p>
            ) : null}
            {data.targetIndustry ? (
              <p>
                <span className="text-valasys-gray-600">Target industry:</span>{" "}
                {data.targetIndustry}
              </p>
            ) : null}
            {data.vaisCategory ? (
              <p>
                <span className="text-valasys-gray-600">Product category:</span>{" "}
                {data.vaisCategory}
              </p>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={continueToApp}
            className="bg-valasys-orange hover:bg-valasys-orange-light text-white"
          >
            Continue to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
