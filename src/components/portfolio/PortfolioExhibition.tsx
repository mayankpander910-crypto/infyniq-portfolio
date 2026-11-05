
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Layers,
  Mail,
  Monitor,
  Smartphone,
} from "lucide-react";

import {
  PORTFOLIO_PROJECTS,
  STUDIO_META,
} from "@/data/portfolioData";

import { useCursor } from "@/components/providers/CursorContext";

import {
  FigmaButton,
  PaperclipPin,
  PixelHeart,
} from "@/components/ui/PixelAccents";

const StudioObjectCanvas = dynamic(
  () =>
    import("@/components/three/StudioObjectCanvas").then(
      (mod) => mod.StudioObjectCanvas
    ),
  { ssr: false }
);

const CATEGORIES = [
  "All Works",
  "Web Development",
  "Brand & Campaigns",
] as const;

type FilterTab = (typeof CATEGORIES)[number];

// ============================================================
// CONSISTENT EDITORIAL PROJECT CARD
// All five projects use the same visual language.
// ============================================================

interface ExhibitionCardProps {
  project: (typeof PORTFOLIO_PROJECTS)[number];
  collageIndex: number;
  isFiltered: boolean;
}

function ExhibitionCollageCard({
  project,
  collageIndex,
  isFiltered,
}: ExhibitionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { setCursor, resetCursor } = useCursor();

  const [hovered, setHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  // Mouse-follow 3D animation

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 180,
    damping: 25,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 180,
    damping: 25,
  });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const layerX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const layerY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!cardRef.current || !isDesktop) return;

    const rect = cardRef.current.getBoundingClientRect();

    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setCursor("project", "VIEW PROJECT ↗");
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    resetCursor();
  };

  // Original collage arrangement retained

  const placement = !isFiltered
    ? [
        "md:col-span-12 lg:col-span-7",
        "md:col-span-6 lg:col-span-5 lg:mt-16",
        "md:col-span-6 lg:col-span-6 lg:-mt-8",
        "md:col-span-12 lg:col-span-6 lg:mt-12",
        "md:col-span-12 lg:col-span-9 lg:col-start-2 lg:-mt-4",
      ][collageIndex % 5]
    : "md:col-span-6 lg:col-span-6";

  const isWebProject =
    project.category === "Web Development";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`portfolio-3d-stage relative ${placement} hover:!z-40`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          y: hovered && isDesktop ? -9 : 0,
          scale: hovered && isDesktop ? 1.012 : 1,
        }}
        style={{
          rotateX: isDesktop ? rotateX : 0,
          rotateY: isDesktop ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 25,
        }}
        className="relative z-10"
      >
        <Link
          href={`/portfolio/${project.slug}`}
          aria-label={`View ${project.title} case study`}
          className="group block rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1463FF]"
        >
          {/* MAIN PROJECT CARD */}

          <div className="relative overflow-hidden border border-border-figma bg-surface-elevated shadow-editorial transition-all duration-500 group-hover:border-[#1463FF] group-hover:shadow-[0_25px_65px_-25px_rgba(20,99,255,0.25)]">

            {/* TOP BLACK PROJECT HEADER */}

            <div className="relative flex min-h-[52px] flex-wrap items-center justify-between gap-3 bg-[#0A0A0A] px-4 py-3 text-white sm:px-5">

              <div className="flex min-w-0 items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em]">
                <span className="font-bold text-[#F5DF2E]">
                  {String(project.index).padStart(2, "0")}
                </span>

                <span className="text-white/40">/</span>

                <span className="truncate">
                  {project.client}
                </span>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-white/[0.09] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-sky-200">
                {isWebProject ? (
                  <Monitor className="h-3 w-3" />
                ) : (
                  <Smartphone className="h-3 w-3" />
                )}

                {project.category}
              </span>

              {/* Header hover indicator */}

              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-[#1463FF]"
                initial={{ width: "0%" }}
                animate={{
                  width: hovered ? "100%" : "0%",
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* PROJECT IMAGE SHOWCASE */}

            <div
              className="relative flex min-h-[270px] items-center justify-center gap-3 overflow-hidden px-4 py-9 sm:min-h-[350px] sm:gap-6 sm:px-8 sm:py-12 lg:min-h-[380px]"
              style={{
                backgroundColor: project.accentTint,
              }}
            >
              {/* Subtle background grid */}

              <div
                className="pointer-events-none absolute inset-0 opacity-[0.13]"
                style={{
                  backgroundImage:
                    "radial-gradient(#1463FF 0.8px, transparent 0.8px)",
                  backgroundSize: "18px 18px",
                }}
              />

              {/* Soft decorative glow */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-3xl transition-transform duration-700 group-hover:scale-150" />

              {/* Decorative floating label */}

              <div className="absolute left-5 top-5 z-20 hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500/80 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1463FF]" />
                PROJECT PREVIEW
              </div>

              {/* PRIMARY IMAGE FRAME */}

              <motion.div
                animate={{
                  rotate: hovered ? -1 : -3,
                  y: hovered ? -5 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 18,
                }}
                className="relative z-10 w-[47%] max-w-[250px] overflow-hidden rounded-2xl border-[3px] border-[#18181B] bg-white p-1 shadow-[0_22px_45px_-15px_rgba(0,0,0,0.3)]"
                style={{
                  transform: "translateZ(25px)",
                }}
              >
                {/* Device camera */}

                <div className="flex h-5 items-center justify-center">
                  <div className="h-1 w-9 rounded-full bg-slate-200" />
                </div>

                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.heroImage}
                    alt={`${project.client} primary preview`}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex h-3 items-center justify-center">
                  <div className="h-1 w-5 rounded-full bg-slate-200" />
                </div>
              </motion.div>

              {/* SECONDARY IMAGE FRAME */}

              <motion.div
                style={{
                  x: layerX,
                  y: layerY,
                  transform: "translateZ(55px)",
                }}
                animate={{
                  rotate: hovered ? 1 : 3,
                  y: hovered ? -10 : 12,
                  scale: hovered ? 1.035 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 19,
                }}
                className="relative z-20 w-[49%] max-w-[275px] overflow-hidden rounded-xl border border-black/10 bg-white p-1.5 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.32)]"
              >
                {/* Browser window */}

                <div className="mb-1.5 flex items-center gap-1.5 border-b border-slate-100 px-2 pb-2 pt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-100" />
                </div>

                <div className="flex aspect-[5/4] items-center justify-center overflow-hidden rounded-lg bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.secondaryImage}
                    alt={`${project.client} secondary preview`}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* MONASTERY LOGO */}

              {project.slug === "monastery" && (
                <motion.div
                  animate={{
                    y: hovered ? -8 : 0,
                    rotate: hovered ? 5 : -5,
                  }}
                  className="absolute bottom-5 left-5 z-30 hidden h-14 w-14 items-center justify-center rounded-xl border border-white bg-white p-2 shadow-xl sm:flex"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/work/monastery-logo.webp"
                    alt="Monastery emblem"
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              )}

              {/* FLOATING PROJECT NUMBER */}

              <div className="pointer-events-none absolute bottom-4 left-5 font-serif text-5xl font-bold text-black/[0.06] sm:bottom-5 sm:left-8 sm:text-7xl">
                {String(project.index).padStart(2, "0")}
              </div>

              {/* VIEW PROJECT INDICATOR */}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: hovered ? 1 : 0,
                  y: hovered ? 0 : 10,
                }}
                className="absolute bottom-5 right-5 z-30"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1463FF] px-4 py-2.5 font-mono text-[9px] font-bold tracking-wider text-white shadow-xl">
                  EXPLORE PROJECT
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </motion.div>

            </div>

            {/* PROJECT INFORMATION */}

            <div className="relative flex flex-col justify-between gap-5 border-t border-border-subtle bg-surface-elevated p-5 sm:flex-row sm:items-end sm:p-6 lg:p-7">

              <div className="max-w-xl">

                {/* PROJECT TAGS */}

                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border-subtle bg-surface px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-[#1463FF]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* PROJECT TITLE */}

                <h3 className="font-serif text-2xl leading-tight text-ink transition-colors duration-300 group-hover:text-[#1463FF] sm:text-3xl lg:text-[2rem]">
                  {project.title}
                </h3>

                {/* PROJECT DESCRIPTION */}

                <p className="mt-2 max-w-lg text-xs leading-[1.8] text-muted sm:text-sm">
                  {project.summary}
                </p>

              </div>

              {/* VIEW PROJECT BUTTON */}

              <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">

                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                  CASE STUDY
                </span>

                <motion.span
                  animate={{
                    x: hovered ? 3 : 0,
                    backgroundColor: hovered
                      ? "#1463FF"
                      : "transparent",
                    color: hovered ? "#FFFFFF" : "#171717",
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center border border-border-figma transition-colors duration-300"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </motion.span>

              </div>

            </div>

          </div>
        </Link>

        {/* STICKY NOTE */}

        {!isFiltered && project.collageStyle.stickyNote && (
          <div
            aria-hidden="true"
            className="sticky-curl pointer-events-none absolute -bottom-7 right-8 z-30 hidden w-52 rotate-2 border border-slate-200 bg-[#FFFDF7] p-3.5 text-black shadow-lg xl:block"
          >
            <PaperclipPin className="absolute -top-4 left-3 h-9 w-4" />

            <p className="pl-3 font-hand text-[16px] leading-snug">
              {project.collageStyle.stickyNote}
            </p>
          </div>
        )}

      </motion.div>
    </motion.article>
  );
}

// ============================================================
// MAIN PORTFOLIO EXHIBITION
// ============================================================

export function PortfolioExhibition() {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<FilterTab>("All Works");

  const { setCursor, resetCursor } = useCursor();

  // ============================================================
  // WATERMARK SCROLL ANIMATION
  // ============================================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      reducedMotion ||
      !sectionRef.current ||
      !watermarkRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        watermarkRef.current,
        {
          xPercent: 3,
          rotateX: 0,
        },
        {
          xPercent: -9,
          rotateX: 7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ============================================================
  // PROJECT FILTERING
  // ============================================================

  const visibleProjects =
    selectedCategory === "All Works"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter(
          (project) => project.category === selectedCategory
        );

  const isFiltered = selectedCategory !== "All Works";

  return (
    <section
      ref={sectionRef}
      id="portfolio-collection"
      className="relative isolate overflow-hidden bg-surface py-16 sm:py-20 lg:py-24"
    >

      {/* ====================================================
          CREATIVE 3D WATERMARK
      ==================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-8 z-0 h-[230px] overflow-hidden sm:top-12 sm:h-[280px]"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={watermarkRef}
          className="absolute left-0 top-8 w-max select-none sm:top-10"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(8deg) rotateY(-5deg)",
          }}
        >
          <span
            className="font-serif text-[clamp(5rem,12vw,10rem)] uppercase leading-none tracking-[-0.075em] text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(20,99,255,0.10)",
              textShadow: `
                1px 1px 0 rgba(20,99,255,0.06),
                2px 2px 0 rgba(20,99,255,0.05),
                3px 3px 0 rgba(20,99,255,0.04),
                4px 4px 0 rgba(20,99,255,0.03),
                8px 12px 25px rgba(20,99,255,0.025)
              `,
            }}
          >
            EXHIBITION
          </span>
        </div>

        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [12, 22, 12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[12%] top-8 hidden h-14 w-14 items-center justify-center rounded-2xl border border-blue-200/70 bg-gradient-to-br from-white/90 to-blue-100/60 shadow-[0_15px_35px_rgba(20,99,255,0.12)] backdrop-blur-xl sm:flex"
        >
          <Layers className="h-6 w-6 text-[#1463FF]" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-[27%] top-36 hidden h-7 w-7 items-center justify-center border border-blue-300/60 bg-blue-100/30 shadow-lg sm:flex"
        />

        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 12, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[6%] top-40 hidden h-10 w-10 rounded-full border border-blue-200 bg-blue-50/60 shadow-[0_10px_30px_rgba(20,99,255,0.12)] sm:block"
        />

        <span className="absolute left-[12%] top-36 h-2 w-2 rotate-45 bg-[#1463FF]/35" />
        <span className="absolute right-[38%] top-16 h-1.5 w-1.5 rotate-45 bg-[#1463FF]/40" />

      </div>

      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-[1420px] px-4 sm:px-8 lg:px-12">

        {/* SECTION HEADER */}

        <div className="relative z-10 mb-12 flex w-full flex-col items-start justify-between gap-6 sm:mb-16 lg:flex-row lg:items-end lg:gap-10">

          <div className="relative z-10 min-w-0">

            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1463FF]">
              Digital Exhibition · Archive
            </div>

            <h4 className="font-serif text-3xl uppercase leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-[3.8rem]">
              Selected{" "}
              <span className="italic text-[#1463FF]">
                Case Studies
              </span>
            </h4>

          </div>

          {/* CATEGORY FILTERS */}

          <div
            role="tablist"
            aria-label="Filter portfolio works"
            className="flex w-full flex-wrap items-center gap-2 sm:w-auto"
          >
            {CATEGORIES.map((category) => {
              const count =
                category === "All Works"
                  ? PORTFOLIO_PROJECTS.length
                  : PORTFOLIO_PROJECTS.filter(
                      (project) =>
                        project.category === category
                    ).length;

              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  onMouseEnter={() => setCursor("interactive")}
                  onMouseLeave={resetCursor}
                  className={`border px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.09em] transition-all duration-300 sm:px-4 sm:text-[10px] ${
                    active
                      ? "border-[#1463FF] bg-[#1463FF] text-white shadow-[0_10px_25px_-8px_rgba(20,99,255,0.45)]"
                      : "border-border-figma bg-surface-elevated text-ink hover:border-[#1463FF] hover:text-[#1463FF]"
                  }`}
                >
                  {category}

                  <span className="ml-1.5 opacity-60">
                    ({String(count).padStart(2, "0")})
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ====================================================
            PROJECT GRID
        ==================================================== */}

        <motion.div
          layout
          className={`grid grid-cols-1 gap-10 md:grid-cols-12 ${
            isFiltered ? "lg:gap-10" : "lg:gap-y-20"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ExhibitionCollageCard
                key={project.id}
                project={project}
                collageIndex={index}
                isFiltered={isFiltered}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ====================================================
            CONTACT CTA
        ==================================================== */}

        <div className="relative mt-24 overflow-hidden border border-border-figma bg-canvas p-7 text-center shadow-editorial sm:mt-32 sm:p-14">

          {/* FLOATING 3D OBJECT */}

          <div className="pointer-events-none absolute -left-5 -top-10 hidden h-36 w-36 opacity-90 xl:block">
            <StudioObjectCanvas
              variant="keycap"
              className="h-full w-full"
              label="DRAG 3D"
            />
          </div>

          <div className="mx-auto inline-flex -rotate-2 items-center gap-2 bg-[#1463FF] px-4 py-1.5 font-hand text-base text-white shadow-lg">
            Send Great Ideas Here
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">

            <h3 className="font-serif text-4xl uppercase leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Let&apos;s Work{" "}
              <span className="text-[#1463FF]">
                Together
              </span>
            </h3>

            <PixelHeart
              variant="pink"
              className="hidden h-9 w-11 sm:block"
            />

          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">

            <FigmaButton
              href={STUDIO_META.contactUrl}
              variant="blue"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </FigmaButton>

            <FigmaButton href={STUDIO_META.emailHref}>
              <Mail className="h-4 w-4 text-[#1463FF]" />
              <span>{STUDIO_META.email}</span>
            </FigmaButton>

          </div>

        </div>

      </div>
    </section>
  );
}
