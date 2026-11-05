"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  BlueHeroGear,
  FigmaButton,
  PixelArrow,
  PixelEnvelopePin,
  PixelHeart,
} from "@/components/ui/PixelAccents";
import { useCursor } from "@/components/providers/CursorContext";

const StudioObjectCanvas = dynamic(
  () =>
    import("@/components/three/StudioObjectCanvas").then(
      (mod) => mod.StudioObjectCanvas
    ),
  { ssr: false }
);

export function PortfolioHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { setCursor, resetCursor } = useCursor();

  // Mouse-following 3D depth parallax across floating studio objects (desktop)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 24 });

  const layer1X = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const layer1Y = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);
  const layer2X = useTransform(smoothX, [-0.5, 0.5], [24, -24]);
  const layer2Y = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const layer3X = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const layer3Y = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scrollParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -45]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !isFine) return;

    const handleMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      pointerX.set(nx);
      pointerY.set(ny);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [pointerX, pointerY]);

  const scrollToCollection = () => {
    const target = document.getElementById("portfolio-collection");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden bg-canvas bg-artboard pt-24 sm:min-h-[95vh] sm:pt-32"
    >
      <div className="relative mx-auto flex w-full max-w-[1420px] flex-1 flex-col items-center justify-center px-4 pb-14 pt-4 sm:px-8 sm:pb-16 lg:px-12">
        {/* Top Archive Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-figma bg-surface-elevated/90 px-3.5 py-1.5 backdrop-blur-sm sm:mb-6 sm:px-4"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#1463FF]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:text-[11px] sm:tracking-[0.22em]">
            CURATED EXHIBITION 
          </span>
        </motion.div>

        {/* Central Monumental Typography Stage + Floating 3D & Project Previews */}
        <div className="portfolio-3d-stage relative flex w-full max-w-[1220px] flex-col items-center justify-center py-2 sm:py-8">
          {/* 1. Top-Left Floating Mini Browser Preview (Desktop/Tablet) */}
          <motion.div
            style={{ x: layer1X, y: layer1Y }}
            initial={{ opacity: 0, scale: 0.86, rotate: -7 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="hidden md:block md:absolute md:-top-6 md:left-[0%] lg:left-[2%] z-20"
          >
            <div
              style={{ ["--float-rot" as string]: "-5deg" }}
              className="animate-portfolio-float"
            >
              <Link
                href="/portfolio/vraj-interior"
                onMouseEnter={() => setCursor("project", "VIEW PROJECT ↗")}
                onMouseLeave={resetCursor}
                aria-label="Preview Vraj Interior project"
                className="group relative block w-44 border border-border-figma bg-surface-elevated p-2 shadow-[0_20px_44px_-12px_rgba(10,14,26,0.2)] transition-transform duration-300 hover:scale-105 hover:border-[#1463FF] lg:w-56"
              >
                <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 bg-[#1463FF]" />
                <span className="absolute -right-[3px] -top-[3px] h-1.5 w-1.5 bg-[#1463FF]" />
                <span className="absolute -bottom-[3px] -left-[3px] h-1.5 w-1.5 bg-[#1463FF]" />
                <span className="absolute -bottom-[3px] -right-[3px] h-1.5 w-1.5 bg-[#1463FF]" />

                <div className="mb-1.5 flex items-center justify-between border-b border-border-subtle pb-1 px-1">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-muted">
                    01 · VRAJ
                  </span>
                </div>
                <div className="overflow-hidden bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/work/vraj-hero.webp"
                    alt="Vraj Interior preview"
                    className="h-24 w-full object-contain transition-transform duration-500 group-hover:scale-105 lg:h-28"
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between px-1">
                  <span className="font-serif text-xs text-ink">
                    Vraj Interior
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-[#1463FF]" />
                </div>

                <div className="pointer-events-none absolute -right-3 -top-3 rotate-12">
                  <PixelHeart variant="pink" className="h-5 w-6 drop-shadow-sm" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* 2. Top-Right Floating 3D Geometric Sculpture + Floating UI Pill */}
          <motion.div
            style={{ x: layer2X, y: layer2Y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="hidden md:flex md:flex-col md:items-center md:absolute md:-top-10 md:right-[0%] lg:right-[2%] z-20"
          >
            <div className="h-32 w-32 lg:h-44 lg:w-44">
              <StudioObjectCanvas
                variant="prism"
                className="h-full w-full"
                label="DRAG 3D OBJECT"
              />
            </div>
            <div className="animate-portfolio-bounce -mt-2 rounded-full border border-border-figma bg-surface-elevated/95 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#1463FF] shadow-sm">
              ✦ 3D ARCHIVE
            </div>
          </motion.div>

          {/* DOMINANT OVERSIZED MIXED PIXEL + EDITORIAL HEADLINE (Reference Image 1) */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            aria-label="OUR CREATIVE WORKS."
            className="relative z-10 w-full select-none text-center leading-[0.87] tracking-tight text-ink"
          >
            {/* Row 1: OUR */}
            <span className="flex items-center justify-center gap-1 sm:gap-3">
              <span className="font-serif text-[clamp(2.75rem,10.5vw,8.2rem)] font-normal">
                O
              </span>
              <span className="font-pixel text-[clamp(2.5rem,9.5vw,7.4rem)] font-normal">
                U
              </span>
              <span className="font-serif text-[clamp(2.75rem,10.5vw,8.2rem)] font-normal">
                R
              </span>
            </span>

            {/* Row 2: CREATIVE */}
            <span className="mt-1 flex items-center justify-center gap-0.5 sm:gap-2">
              <span className="font-pixel text-[clamp(2.45rem,10vw,8.2rem)] font-normal">
                C
              </span>
              <span className="font-serif text-[clamp(2.75rem,11vw,9.1rem)] font-normal">
                R
              </span>
              <span className="font-serif italic text-[clamp(2.75rem,11vw,9.1rem)] font-normal text-[#1463FF]">
                E
              </span>
              <span className="font-pixel text-[clamp(2.45rem,10vw,8.2rem)] font-normal">
                A
              </span>
              <span className="font-serif text-[clamp(2.75rem,11vw,9.1rem)] font-normal">
                T
              </span>
              <span className="font-pixel text-[clamp(2.45rem,10vw,8.2rem)] font-normal">
                I
              </span>
              <span className="font-serif text-[clamp(2.75rem,11vw,9.1rem)] font-normal">
                V
              </span>
              <span className="font-pixel text-[clamp(2.45rem,10vw,8.2rem)] font-normal">
                E
              </span>
            </span>

            {/* Row 3: W [ROTATING BLUE GEAR] RKS. */}
            <span className="mt-1 flex items-center justify-center gap-0.5 sm:mt-2 sm:gap-2.5">
              <span className="font-serif text-[clamp(2.85rem,11.2vw,9.4rem)] font-normal">
                W
              </span>
              <BlueHeroGear className="mx-0.5 h-[clamp(2.35rem,9.2vw,7.6rem)] w-[clamp(2.35rem,9.2vw,7.6rem)] sm:mx-1.5" />
              <span className="font-pixel text-[clamp(2.55rem,10.2vw,8.4rem)] font-normal">
                R
              </span>
              <span className="font-serif text-[clamp(2.85rem,11.2vw,9.4rem)] font-normal">
                K
              </span>
              <span className="font-pixel text-[clamp(2.55rem,10.2vw,8.4rem)] font-normal">
                S
              </span>
              <span className="font-pixel text-[clamp(2.55rem,10.2vw,8.4rem)] text-[#1463FF]">
                .
              </span>
            </span>
          </motion.h1>

          {/* Concise Portfolio Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="relative z-10 mt-5 max-w-md px-2 text-center font-sans text-xs leading-relaxed text-muted sm:mt-6 sm:max-w-lg sm:text-base"
          >
            An interactive digital exhibition of custom websites, brand
            identities, and social campaigns crafted by Infyniq Solutions.
          </motion.p>

          {/* Mobile-Only Touch Preview Pair (gives small screens rich layered charm with zero overlap) */}
          <div className="mt-6 flex w-full max-w-sm items-center justify-center gap-3 md:hidden">
            <Link
              href="/portfolio/vraj-interior"
              className="flex w-1/2 -rotate-2 flex-col border border-border-figma bg-surface-elevated p-2 shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/work/vraj-hero.webp"
                alt="Vraj Interior"
                className="h-20 w-full bg-slate-50 object-contain"
              />
              <span className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-ink">
                <span>01 · Vraj</span>
                <ArrowUpRight className="h-3 w-3 text-[#1463FF]" />
              </span>
            </Link>
            <Link
              href="/portfolio/monastery"
              className="flex w-1/2 rotate-2 flex-col border border-border-figma bg-surface-elevated p-2 shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/work/monastery-bloom.webp"
                alt="Monastery"
                className="h-20 w-full bg-slate-50 object-contain"
              />
              <span className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-ink">
                <span>03 · Monastery</span>
                <ArrowUpRight className="h-3 w-3 text-[#1463FF]" />
              </span>
            </Link>
          </div>

          {/* 3. Bottom-Left Interactive 3D Studio Headphones (Reference 1) */}
          <motion.div
            style={{ x: layer3X, y: scrollParallaxSlow }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="hidden md:block md:absolute md:-bottom-14 md:left-[0%] lg:left-[2%] z-20 h-40 w-40 lg:h-52 lg:w-52"
          >
            <StudioObjectCanvas
              variant="headphones"
              className="h-full w-full"
              label="DRAG 3D STUDIO"
            />
          </motion.div>

          {/* 4. Bottom-Right Layered Preview + Curled Canary-Yellow Sticky Note (Reference 1) */}
          <motion.div
            style={{ x: layer2X, y: layer3Y }}
            initial={{ opacity: 0, y: 24, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="relative mt-8 md:absolute md:-bottom-16 md:right-[0%] md:mt-0 lg:right-[2%] z-20"
          >
            <Link
              href="/portfolio/monastery"
              onMouseEnter={() => setCursor("project", "VIEW PROJECT ↗")}
              onMouseLeave={resetCursor}
              aria-label="Preview Monastery campaign"
              className="animate-portfolio-float-delayed hidden xl:block absolute -left-20 -top-12 w-28 -rotate-6 border border-border-figma bg-white p-1.5 shadow-lg transition-transform hover:scale-105"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/work/monastery-bloom.webp"
                alt="Monastery campaign preview"
                className="h-auto w-full object-contain"
              />
            </Link>

            <aside
              aria-label="Portfolio curator note"
              className="sticky-curl relative w-full max-w-[270px] bg-[#F5DF2E] p-5 pt-7 text-[#141414] transition-transform duration-300 hover:rotate-0 sm:max-w-[290px] sm:p-6 sm:pt-8"
            >
              <div className="absolute -top-5 right-6 w-12 drop-shadow-[0_4px_6px_rgba(0,0,0,0.18)] sm:w-14">
                <PixelEnvelopePin className="w-full" />
              </div>

              <p className="font-hand text-[20px] leading-[1.24] text-[#18181B] sm:text-[22px]">
                Every project here is a real client collaboration—hover to tilt
                in 3D or tap any card to open its full case study.
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-black/15 pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-black/75">
                <span>WEB PLATFORMS</span>
                <span>CAMPAIGNS</span>
              </div>
            </aside>
          </motion.div>
        </div>

        {/* Smooth-Scroll Magnetic CTA: "EXPLORE OUR WORK ↓" */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="mt-8 sm:mt-12"
        >
          <FigmaButton onClick={scrollToCollection} handwritten>
            <span className="uppercase tracking-wider">EXPLORE OUR WORK</span>
            <PixelArrow direction="down" className="h-4 w-4 text-[#1463FF]" />
          </FigmaButton>
        </motion.div>
      </div>

      {/* Portfolio Discipline Ribbon (Reference Image 2 Top Ribbon) */}
      <div className="relative z-20 overflow-hidden border-y border-black bg-[#0A0A0A] py-2.5 text-white dark:border-border-figma sm:py-3">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap sm:gap-10">
          {[
            "WEB DEVELOPMENT",
            "BRAND ENGAGEMENT",
            "META CAMPAIGNS",
            "SOCIAL MEDIA SYSTEMS",
            "UI/UX ARCHITECTURE",
            "WEB MAINTENANCE",
            "WEB DEVELOPMENT",
            "BRAND ENGAGEMENT",
            "META CAMPAIGNS",
            "SOCIAL MEDIA SYSTEMS",
            "UI/UX ARCHITECTURE",
            "WEB MAINTENANCE",
          ].map((label, idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-10">
              <span className="font-serif text-xs tracking-[0.22em] text-white/95 sm:text-base">
                {label}
              </span>
              <span className="text-[#1463FF]" aria-hidden="true">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
