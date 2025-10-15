import React, { useMemo } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export type AIVoiceCircleProps = {
  items: string[];
  selected?: string;
  onSelect?: (value: string) => void;
  className?: string;
  diameter?: number; // px
  anchorAngle?: number; // degrees where selected label should align (CSS clockwise, 0deg at +X)
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
  anchorAngle = -45, // top-right edge
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

  const positions = useMemo(() => {
    return items.map((_, idx) => idx * step);
  }, [items, step]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* Gradient background for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-valasys-blue/20 via-valasys-orange/10 to-valasys-green/10" />

      {/* Giant circle, half outside the viewport (top-right) */}
      <div className="absolute" style={{ top: -diameter * 0.35, right: -diameter * 0.35 }}>
        {/* Outer glow */}
        <motion.div
          className="relative rounded-full"
          style={{ width: diameter, height: diameter }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Pulsing halo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,106,0,0.18), rgba(255,106,0,0.08) 60%, transparent)",
              filter: "blur(8px)",
            }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          />

          {/* Ring border */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: "0 0 0 2px rgba(255,106,0,0.7) inset, 0 10px 30px rgba(0,0,0,0.08)",
              background:
                "conic-gradient(from 0deg, rgba(26,115,232,0.25), rgba(255,106,0,0.4), rgba(0,196,140,0.25), rgba(26,115,232,0.25))",
              mask: "radial-gradient(farthest-side, transparent calc(50% - 2px), black calc(50% - 2px))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(50% - 2px), black calc(50% - 2px))",
            }}
          />

          {/* Rotating items layer */}
          <motion.div
            className="absolute inset-0"
            style={{ rotate: rotation }}
          >
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
                    "absolute -translate-x-1/2 -translate-y-1/2 select-none px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors",
                    isActive
                      ? "bg-valasys-orange text-white shadow-md"
                      : "bg-white/85 text-valasys-gray-800 hover:bg-white shadow"
                  )}
                  style={{
                    left: x,
                    top: y,
                    transform: `translate(-50%, -50%) rotate(${-targetRotation}deg)`,
                  }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Anchor indicator at the alignment point (top-right). */}
          <div
            className="absolute z-10 h-3 w-3 rounded-full bg-valasys-orange shadow"
            style={{
              left: radius + (radius - 2) * Math.cos((anchorAngle * Math.PI) / 180) - 6,
              top: radius + (radius - 2) * Math.sin((anchorAngle * Math.PI) / 180) - 6,
            }}
          />
        </motion.div>
      </div>

      {/* Right side helper text card */}
      <div className="absolute bottom-8 right-8 max-w-sm rounded-xl bg-white/90 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur">
        <div className="text-sm font-semibold text-valasys-gray-900">AI Voice Assistant</div>
        <div className="mt-1 text-xs text-valasys-gray-700">
          Your role selection tunes guidance, prompts, and defaults.
        </div>
      </div>
    </div>
  );
}
