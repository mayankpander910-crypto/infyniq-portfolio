"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/components/providers/CursorContext";

export function CustomCursor() {
  const { variant, label } = useCursor();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 360, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePointer || prefersReduced) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, visible]);

  if (!enabled) return null;

  const isPill = variant === "project" || variant === "3d";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden lg:block"
      style={{ x, y }}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          scale: variant === "interactive" ? 1.35 : 1,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        {isPill ? (
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-[#0072CE] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-md">
            <span>{label || (variant === "project" ? "VIEW PROJECT ↗" : "DRAG 3D")}</span>
          </div>
        ) : (
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#0072CE]/60 bg-[#0072CE]/5 backdrop-blur-[1px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0072CE]" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
