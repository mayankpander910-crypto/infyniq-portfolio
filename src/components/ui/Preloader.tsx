"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    try {
      const seen = window.sessionStorage.getItem("infyniq-loaded");
      if (seen || prefersReduced) {
        setShow(false);
        return;
      }
      window.sessionStorage.setItem("infyniq-loaded", "1");
    } catch {
      // proceed normally
    }

    setShow(true);
    let frame = 0;
    const start = performance.now();
    const duration = 720;

    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setShow(false), 140);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="infyniq-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-between bg-canvas px-6 py-10 text-ink"
        >
          <div className="flex w-full max-w-6xl items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span>INFYNIQ SOLUTIONS</span>
            <span>EST. 2025 · AHMEDABAD</span>
          </div>

          <div className="flex flex-col items-center gap-5">
            <div className="relative flex h-20 w-20 items-center justify-center border border-border-figma bg-surface-elevated p-4">
              <span className="absolute -left-1 -top-1 h-2 w-2 bg-[#0072CE]" />
              <span className="absolute -right-1 -top-1 h-2 w-2 bg-[#0072CE]" />
              <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-[#0072CE]" />
              <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-[#0072CE]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/brand/site-icon.svg"
                alt="Infyniq mark"
                className="h-11 w-11 object-contain"
              />
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl tracking-wide text-ink sm:text-3xl">
                Loading Digital Studio
              </p>
              <p className="mt-1 font-mono text-xs tracking-[0.24em] text-[#0072CE]">
                {String(progress).padStart(3, "0")}%
              </p>
            </div>
          </div>

          <div className="h-[2px] w-full max-w-xs overflow-hidden bg-border-subtle">
            <motion.div
              className="h-full bg-[#0072CE]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
