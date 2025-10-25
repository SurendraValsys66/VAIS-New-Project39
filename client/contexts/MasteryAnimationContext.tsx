import React, { createContext, useContext, useState, useRef } from "react";

interface MasteryAnimationContextType {
  isAnimating: boolean;
  startAnimation: () => void;
  endAnimation: () => void;
  badgeRef: React.RefObject<HTMLDivElement>;
}

const MasteryAnimationContext = createContext<
  MasteryAnimationContextType | undefined
>(undefined);

export function MasteryAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  const startAnimation = () => {
    setIsAnimating(true);
  };

  const endAnimation = () => {
    setIsAnimating(false);
  };

  return (
    <MasteryAnimationContext.Provider
      value={{ isAnimating, startAnimation, endAnimation, badgeRef }}
    >
      {children}
    </MasteryAnimationContext.Provider>
  );
}

export function useMasteryAnimation() {
  const context = useContext(MasteryAnimationContext);
  if (!context) {
    throw new Error(
      "useMasteryAnimation must be used within MasteryAnimationProvider",
    );
  }
  return context;
}
