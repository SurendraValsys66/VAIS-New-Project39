import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  c: string;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
};

export default function ConfettiCanvas({
  duration = 2500,
}: {
  duration?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const colors = ["#FF6A00", "#F5A243", "#1A73E8", "#00C48C"];
    const parts: Particle[] = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * canvas.clientWidth,
      y: -20 - Math.random() * 60,
      r: 6 + Math.random() * 6,
      c: colors[(Math.random() * colors.length) | 0],
      vx: -1 + Math.random() * 2,
      vy: 2 + Math.random() * 2,
      rot: Math.random() * Math.PI,
      vr: -0.1 + Math.random() * 0.2,
    }));

    let start = performance.now();
    let raf = 0;

    const tick = (t: number) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > canvas.clientHeight + 20) p.y = -20;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
        ctx.restore();
      });
      if (elapsed < duration) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [duration]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
