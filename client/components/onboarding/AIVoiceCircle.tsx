import React, { useMemo } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export type AIVoiceCircleProps = {
  items: string[];
  selected?: string;
  onSelect?: (value: string) => void;
  className?: string;
  diameter?: number; // px
  anchorAngle?: number; // degrees where selected label should align (CSS clockwise, 0deg at +X)
  origin?: "top-right" | "top-left" | "bottom-right" | "bottom-left"; // where the big circle is anchored within its container
  helperTextPosition?: "bottom-right" | "top-left"; // where to position the helper text card
};

/**
 * Big partially-visible circle anchored to the top-right.
 * Items are distributed around the circumference. When selection changes,
 * the ring rotates to align the selected item with the anchor angle.
 */
export default function AIVoiceCircle({
  items,
  selected,
  onSelect,
  className,
  diameter = 820,
  anchorAngle = 0, // align selected to right center
  origin = "top-right",
  helperTextPosition = "bottom-right",
}: AIVoiceCircleProps) {
  const radius = diameter / 2;
  const step = 360 / (items.length || 1);
  const selectedIndex = Math.max(
    0,
    items.findIndex((i) => i === selected),
  );
  const targetRotation = anchorAngle - selectedIndex * step;

  const rotation = useMotionValue(targetRotation);

  // animate to new rotation when selection or items change
  React.useEffect(() => {
    const controls = animate(rotation, targetRotation, {
      duration: 0.9,
      ease: [0.2, 0.8, 0.2, 1],
    });
    return () => controls.stop();
  }, [targetRotation]);

  const negRotation = useTransform(rotation, (v) => -v);

  const positions = useMemo(() => {
    return items.map((_, idx) => idx * step);
  }, [items, step]);

  const cornerStyle = React.useMemo(() => {
    const offset = -diameter * 0.25;
    switch (origin) {
      case "bottom-left":
        return { bottom: offset, left: offset } as const;
      case "bottom-right":
        return { bottom: offset, right: offset } as const;
      case "top-left":
        return { top: offset, left: offset } as const;
      case "top-right":
      default:
        return { top: offset, right: offset } as const;
    }
  }, [origin, diameter]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* Gradient background for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-valasys-blue/20 via-valasys-orange/10 to-valasys-green/10" />

      {/* Giant circle, half outside the viewport (corner) */}
      <div className="absolute" style={cornerStyle}>
        {/* Wavy ripple layers */}
        {[0, 1, 2].map((layer) => (
          <motion.div
            key={`wave-${layer}`}
            className="absolute rounded-full"
            style={{
              width: diameter,
              height: diameter,
              border: "2px solid",
              borderColor: `rgba(255,106,0,${0.3 - layer * 0.1})`,
            }}
            animate={{
              scale: [1, 1.15, 1.3],
              opacity: [0.8, 0.4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              delay: layer * 0.6,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Outer glow */}
        <motion.div
          className="relative rounded-full"
          style={{ width: diameter, height: diameter }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Pulsing halo - Enhanced AI glow with wave motion */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,106,0,0.45), rgba(255,106,0,0.2) 50%, transparent)",
              filter: "blur(12px)",
            }}
            animate={{
              scale: [1, 1.04, 1.08, 1.04, 1],
              opacity: [0.7, 0.85, 1, 0.85, 0.7],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />

          {/* Secondary pulsing layer for depth - Wavy phase 1 */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(26,115,232,0.3), transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{
              scale: [1.05, 1.08, 1.15, 1.10, 1.05],
              opacity: [0.4, 0.5, 0.7, 0.5, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />

          {/* Tertiary wave layer - Wavy phase 2 */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(0,196,140,0.15), transparent 75%)",
              filter: "blur(28px)",
            }}
            animate={{
              scale: [1, 1.06, 1.12, 1.08, 1],
              opacity: [0.2, 0.35, 0.5, 0.35, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Ring border - Enhanced gradient */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "0 0 0 3px rgba(255,106,0,0.9) inset, 0 0 40px rgba(255,106,0,0.3), 0 10px 30px rgba(0,0,0,0.1)",
              background:
                "conic-gradient(from 0deg, rgba(26,115,232,0.4), rgba(255,106,0,0.6), rgba(0,196,140,0.4), rgba(26,115,232,0.4))",
              mask: "radial-gradient(farthest-side, transparent calc(50% - 3px), black calc(50% - 3px))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(50% - 3px), black calc(50% - 3px))",
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />

          {/* Accent glow rings */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 0 0 60px rgba(255,106,0,0.2), 0 0 100px rgba(255,106,0,0.15)",
            }}
          />

          {/* Rotating items layer */}
          <motion.div className="absolute inset-0" style={{ rotate: rotation }}>
            {positions.map((angle, idx) => {
              const item = items[idx];
              const isActive = item === selected;
              const a = (angle * Math.PI) / 180;
              const x = radius + (radius - 8) * Math.cos(a);
              const y = radius + (radius - 8) * Math.sin(a);
              return (
                <motion.button
                  key={item}
                  type="button"
                  onClick={() => onSelect?.(item)}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 select-none px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-sm border",
                    isActive
                      ? "bg-gradient-to-r from-valasys-orange to-valasys-orange-light text-white shadow-2xl shadow-valasys-orange/50 px-4 py-2 border-valasys-orange/50"
                      : "bg-white/80 text-valasys-gray-800 hover:bg-white shadow-lg border-white/60 hover:border-valasys-orange/30",
                  )}
                  style={{
                    left: x,
                    top: y,
                    rotate: negRotation,
                    zIndex: isActive ? 2 : 1,
                  }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={{ scale: isActive ? 1.12 : 1.06 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Anchor indicator at the alignment point (top-right). */}
          <motion.div
            className="absolute z-10 h-3 w-3 rounded-full bg-gradient-to-br from-valasys-orange to-valasys-orange-light shadow-lg"
            style={{
              left:
                radius +
                (radius - 2) * Math.cos((anchorAngle * Math.PI) / 180) -
                6,
              top:
                radius +
                (radius - 2) * Math.sin((anchorAngle * Math.PI) / 180) -
                6,
              boxShadow:
                "0 0 20px rgba(255,106,0,0.6), 0 0 40px rgba(255,106,0,0.3)",
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />

          {/* Anchor glow ring */}
          <motion.div
            className="absolute z-9 rounded-full border"
            style={{
              left:
                radius +
                (radius - 2) * Math.cos((anchorAngle * Math.PI) / 180) -
                12,
              top:
                radius +
                (radius - 2) * Math.sin((anchorAngle * Math.PI) / 180) -
                12,
              width: "24px",
              height: "24px",
              borderColor: "rgba(255,106,0,0.4)",
              borderWidth: "2px",
            }}
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.1,
            }}
          />
        </motion.div>
      </div>

      {/* Right side helper text card */}
      <div
        className={cn(
          "absolute max-w-sm rounded-xl bg-white/90 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur",
          helperTextPosition === "top-left"
            ? "top-8 left-8"
            : "bottom-8 right-8",
        )}
      >
        <div className="text-sm font-semibold text-valasys-gray-900">
          AI Voice Assistant
        </div>
        <div className="mt-1 text-xs text-valasys-gray-700">
          Your role selection tunes guidance, prompts, and defaults.
        </div>
      </div>
    </div>
  );
}
