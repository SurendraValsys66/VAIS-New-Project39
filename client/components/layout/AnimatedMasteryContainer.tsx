import React from "react";
import { useMasteryAnimation } from "@/contexts/MasteryAnimationContext";
import MasteryBottomBar from "./MasteryBottomBar";

export default function AnimatedMasteryContainer() {
  const { isMinimized } = useMasteryAnimation();

  if (isMinimized) {
    return null;
  }

  return <MasteryBottomBar />;
}
