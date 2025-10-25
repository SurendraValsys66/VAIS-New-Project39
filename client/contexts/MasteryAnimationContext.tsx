import React, { createContext, useContext, useState, useCallback } from "react";

interface MasteryAnimationContextType {
  isMinimizing: boolean;
  isMinimized: boolean;
  startMinimizeAnimation: () => void;
  completeMinimizeAnimation: () => void;
  startExpandAnimation: () => void;
  completeExpandAnimation: () => void;
}

const MasteryAnimationContext = createContext<MasteryAnimationContextType | undefined>(
  undefined
);

export function MasteryAnimationProvider({ children }: { children: React.ReactNode }) {
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("valasys-mastery-minimized") === "1";
    } catch {
      return false;
    }
  });

  const startMinimizeAnimation = useCallback(() => {
    setIsMinimizing(true);
  }, []);

  const completeMinimizeAnimation = useCallback(() => {
    setIsMinimizing(false);
    setIsMinimized(true);
  }, []);

  const startExpandAnimation = useCallback(() => {
    setIsMinimizing(true);
  }, []);

  const completeExpandAnimation = useCallback(() => {
    setIsMinimizing(false);
    setIsMinimized(false);
  }, []);

  return (
    <MasteryAnimationContext.Provider
      value={{
        isMinimizing,
        isMinimized,
        startMinimizeAnimation,
        completeMinimizeAnimation,
        startExpandAnimation,
        completeExpandAnimation,
      }}
    >
      {children}
    </MasteryAnimationContext.Provider>
  );
}

export function useMasteryAnimation() {
  const context = useContext(MasteryAnimationContext);
  if (!context) {
    throw new Error(
      "useMasteryAnimation must be used within MasteryAnimationProvider"
    );
  }
  return context;
}
