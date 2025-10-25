import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMasteryAnimation } from "@/contexts/MasteryAnimationContext";
import MasteryBottomBar from "./MasteryBottomBar";
import MasteryProgressBadge from "./MasteryProgressBadge";

export default function AnimatedMasteryContainer() {
  const {
    isMinimizing,
    isMinimized,
    completeMinimizeAnimation,
    completeExpandAnimation,
  } = useMasteryAnimation();

  const bottomBarRef = useRef<HTMLDivElement>(null);
  const [bottomBarRect, setBottomBarRect] = useState<DOMRect | null>(null);

  // Capture the bottom bar's position before animation
  useEffect(() => {
    if (isMinimizing && bottomBarRef.current && !isMinimized) {
      // Get the position of the bottom bar
      const rect = bottomBarRef.current.getBoundingClientRect();
      setBottomBarRect(rect);
    }
  }, [isMinimizing, isMinimized]);

  return (
    <>
      {/* Animated mastery bottom bar */}
      <AnimatePresence mode="wait">
        {!isMinimized && (
          <motion.div
            key="bottom-bar"
            ref={bottomBarRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              if (isMinimizing) {
                completeMinimizeAnimation();
              }
            }}
          >
            <MasteryBottomBar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated badge that appears in top nav */}
      <AnimatePresence mode="wait">
        {isMinimized && (
          <motion.div
            key="badge"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              if (isMinimizing) {
                completeExpandAnimation();
              }
            }}
          >
            <MasteryProgressBadge />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
