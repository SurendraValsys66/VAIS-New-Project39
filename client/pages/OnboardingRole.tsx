import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StepProgress from "@/components/onboarding/StepProgress";
import {
  saveOnboarding,
  getOnboarding,
  saveOnboardingSkipReminder,
  emitOnboardingSkipReminderUpdate,
} from "@/lib/onboardingStorage";
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
import OnboardingSplitLayout from "@/components/onboarding/OnboardingSplitLayout";
import AIVoiceCircle from "@/components/onboarding/AIVoiceCircle";

const ROLES = [
  {
    label: "Founder",
    icon: Brain,
    description:
      "Build strategy with AI-powered insights. Get real-time market intelligence and prospect data to make faster, smarter business decisions.",
  },
  {
    label: "Marketer",
    icon: Target,
    description:
      "Amplify campaigns with AI assistance. Create targeted campaigns with advanced audience insights and automated lead generation.",
  },
  {
    label: "Business Development",
    icon: Building2,
    description:
      "Accelerate partnerships and growth. Discover high-potential prospects and streamline business development workflows.",
  },
  {
    label: "Sales Leader",
    icon: Users,
    description:
      "Lead high-performing teams with data. Get visibility into pipeline, predict outcomes, and empower your sales team with AI insights.",
  },
  {
    label: "Talent Acquisition",
    icon: UserCog,
    description:
      "Find and hire top talent faster. Identify qualified candidates and streamline your recruitment process with AI-powered matching.",
  },
  {
    label: "Ops & Support",
    icon: Headphones,
    description:
      "Optimize operations with intelligent automation. Streamline workflows and improve efficiency across your support team.",
  },
  {
    label: "Customer Success",
    icon: Smile,
    description:
      "Deliver exceptional customer experiences. Proactively identify at-risk customers and maximize retention with AI guidance.",
  },
  {
    label: "Sales Representative",
    icon: UserRound,
    description:
      "Close deals faster with AI coaching. Get real-time insights on prospects, personalized talking points, and next best actions.",
  },
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

  const onSkip = () => {
    const reminder = saveOnboardingSkipReminder({
      stepRoute: "/onboarding/role",
      stepLabel: "Complete your role selection",
      stepNumber: 1,
      totalSteps: 6,
    });
    emitOnboardingSkipReminderUpdate(reminder);
    navigate("/");
  };

  return (
    <OnboardingSplitLayout
      logoSrc="https://cdn.builder.io/api/v1/image/assets%2Ff2a051d62a994479965d33c6eada9792%2F9b770886bd6142129584a6e279795c21?format=webp&width=800"
      left={
        <div className="space-y-8 mx-auto">
          <div>
            <div className="text-sm font-medium text-valasys-gray-700">
              Welcome to VAIS
            </div>
            <StepProgress
              current={1}
              total={6}
              title="Which role defines you best?"
            />
          </div>

          <div>
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

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onSkip}
              className="text-sm font-semibold text-valasys-gray-600 transition-colors hover:text-valasys-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valasys-orange underline-offset-4 hover:underline"
            >
              Skip for now
            </button>
            <Button
              onClick={onNext}
              disabled={!value}
              className="bg-valasys-orange hover:bg-valasys-orange-light text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      }
      right={
        <div className="flex flex-col items-center justify-start h-full">
          <AIVoiceCircle
            items={ROLES.map((r) => r.label)}
            selected={value}
            anchorAngle={360 / ROLES.length}
            origin="top-left"
            helperTextPosition="top-left"
            onSelect={(v) => {
              setValue(v);
              if (v) saveOnboarding({ role: v as any });
            }}
          />

          {/* Role Description with Slide Animation - Premium Design */}
          <div className="absolute bottom-12 left-0 right-0 px-8 max-w-lg mx-auto">
            {value && (() => {
              const selectedRole = ROLES.find((r) => r.label === value);
              const Icon = selectedRole?.icon;
              return (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: 120, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -120, y: 20 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.320, 1] }}
                  className="relative"
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-valasys-orange/10 to-valasys-orange/5 rounded-2xl blur-xl" />

                  {/* Card */}
                  <div className="relative bg-white/98 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-valasys-orange/20 overflow-hidden">
                    {/* Accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-valasys-orange to-valasys-orange-light" />

                    {/* Header with Icon and Role Name */}
                    <div className="flex items-center gap-3 mb-4">
                      {Icon && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="p-3 bg-gradient-to-br from-valasys-orange/20 to-valasys-orange/10 rounded-lg"
                        >
                          <Icon className="w-6 h-6 text-valasys-orange" />
                        </motion.div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                      >
                        <h3 className="text-lg font-bold text-valasys-gray-900">
                          {value}
                        </h3>
                        <p className="text-xs text-valasys-orange font-semibold tracking-wide">
                          ROLE OVERVIEW
                        </p>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-sm text-valasys-gray-700 leading-relaxed font-light mb-4"
                    >
                      {selectedRole?.description}
                    </motion.p>

                    {/* Bottom accent bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                      className="h-0.5 w-16 bg-gradient-to-r from-valasys-orange to-transparent origin-left"
                    />
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </div>
      }
    />
  );
}
