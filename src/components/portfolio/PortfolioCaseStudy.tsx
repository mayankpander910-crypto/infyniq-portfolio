"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Grid,
  Mail,
  Maximize2,
  MousePointerClick,
  Sparkles,
  X,
} from "lucide-react";
import { PortfolioProject, STUDIO_META } from "@/data/portfolioData";
import { FigmaFrame } from "@/components/ui/FigmaFrame";
import {
  FigmaButton,
  PaperclipPin,
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

interface PortfolioCaseStudyProps {
  project: PortfolioProject;
  prevProject: PortfolioProject;
  nextProject: PortfolioProject;
}

export function PortfolioCaseStudy({
  project,
  prevProject,
  nextProject,
}: PortfolioCaseStudyProps) {
  const { setCursor, resetCursor } = useCursor();
  const [lightbox, setLightbox] = useState<{
    src: string;
    caption: string;
  } | null>(null);

  const isWebProject = project.category === "Web Development";

  return (
    <main className="portfolio-experience min-h-screen bg-canvas bg-artboard pt-24 pb-20 text-ink sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8 lg:px-12">
        {/* Top Navigation Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 sm:mb-10">
          <Link
            href="/"
            onMouseEnter={() => setCursor("interactive")}
            onMouseLeave={resetCursor}
            className="group inline-flex items-center gap-2 border border-border-figma bg-surface-elevated px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-[#1463FF] hover:text-[#1463FF] sm:px-4 sm:text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:text-xs">
            <span>EXHIBITION {project.index} / 05</span>
            <span className="text-[#1463FF]">•</span>
            <span>{project.category}</span>
          </div>
        </div>

        {/* Large Editorial Case Study Display Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-10 max-w-[1120px] text-center sm:mb-12"
        >
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-[2px] bg-[#1463FF] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              {project.category}
            </span>
            {project.tags.map((t) => (
              <span
                key={t}
                className="border border-border-figma bg-surface-elevated px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-4xl uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {project.client}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-lg italic text-muted sm:mt-4 sm:text-2xl">
            {project.headline}
          </p>
        </motion.div>

        {/* Reference Image 3 Signature Framed Studio Card + Flanking 3D Objects */}
        <div className="relative flex items-center justify-center">
          <div className="hidden 2xl:block absolute -left-14 top-1/3 h-48 w-48">
            <StudioObjectCanvas
              variant="keycap"
              className="h-full w-full"
              label="DRAG 3D OBJECT"
            />
          </div>

          <div className="w-full max-w-[1120px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <FigmaFrame
                bannerTitle={project.bannerTitle}
                dimensionTag={`CASE · ${project.index}`}
                bannerRight={
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5DF2E] sm:inline">
                    VERIFIED CASE STUDY
                  </span>
                }
                className="portfolio-card-shadow"
                innerClassName="relative grid grid-cols-1 gap-8 p-5 sm:p-10 lg:grid-cols-12 lg:items-center"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 top-16 z-30 hidden rotate-12 sm:block"
                >
                  <PixelHeart variant="pink" className="h-7 w-8 drop-shadow-sm" />
                </div>

                {/* Left Column: Overview & Deliverables */}
                <div className="lg:col-span-5">
                  <p className="font-sans text-xs font-medium uppercase leading-[1.85] tracking-[0.04em] text-ink sm:text-sm">
                    <span className="font-semibold text-[#1463FF]">
                      PROJECT OVERVIEW —
                    </span>{" "}
                    {project.summary}
                  </p>

                  <div className="mt-6 border-t border-border-subtle pt-5">
                    <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1463FF]">
                      FINAL DELIVERABLES
                    </h2>
                    <ul className="mt-3.5 space-y-2.5">
                      {project.deliverables.map((del) => (
                        <li
                          key={del}
                          className="flex items-start gap-2.5 text-xs font-medium text-ink sm:text-sm"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1463FF]" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Main Hero Visual */}
                <div className="lg:col-span-7">
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({
                        src: project.heroImage,
                        caption: project.title,
                      })
                    }
                    onMouseEnter={() => setCursor("interactive")}
                    onMouseLeave={resetCursor}
                    aria-label="Inspect main project visual in full resolution"
                    className="group relative flex w-full flex-col overflow-hidden border border-border-subtle p-3.5 text-left transition-colors hover:border-[#1463FF] sm:p-6"
                    style={{ backgroundColor: project.accentTint }}
                  >
                    {isWebProject && (
                      <div className="mb-2.5 flex w-full items-center justify-between rounded-t border-b border-slate-200 bg-white/90 px-3 py-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-rose-400" />
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        </div>
                        <span className="font-mono text-[9px] text-slate-500 sm:text-[10px]">
                          {project.slug}.showcase
                        </span>
                        <span className="w-6" />
                      </div>
                    )}

                    <div className="flex min-h-[230px] w-full items-center justify-center sm:min-h-[360px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="max-h-[390px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <span className="mt-3 inline-flex items-center gap-1.5 self-end bg-[#0A0A0A] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                      <Maximize2 className="h-3 w-3" />
                      <span>Full Size</span>
                    </span>
                  </button>
                </div>
              </FigmaFrame>
            </motion.div>

            {/* Metadata Strip (Reference Image 3) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-5"
            >
              <FigmaFrame
                dimensionTag="CASE · METADATA"
                innerClassName="grid grid-cols-2 divide-x divide-y divide-border-subtle lg:grid-cols-4 lg:divide-y-0"
              >
                <div className="px-4 py-4 sm:px-6">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    CLIENT
                  </span>
                  <span className="mt-1 block font-serif text-lg text-ink sm:text-xl">
                    {project.client}
                  </span>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    INDUSTRY
                  </span>
                  <span className="mt-1 block font-serif text-lg text-ink sm:text-xl">
                    {project.industry}
                  </span>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    CATEGORY
                  </span>
                  <span className="mt-1 block font-serif text-lg text-[#1463FF] sm:text-xl">
                    {project.category}
                  </span>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    SERVICES
                  </span>
                  <span className="mt-1 block font-mono text-[11px] font-medium text-ink">
                    {project.tags.join(" · ")}
                  </span>
                </div>
              </FigmaFrame>
            </motion.div>
          </div>

          <div className="hidden 2xl:block absolute -right-14 top-1/3 h-48 w-48">
            <StudioObjectCanvas
              variant="mug"
              className="h-full w-full"
              label="DRAG 3D OBJECT"
            />
          </div>
        </div>

        {/* Project Context & Approach */}
        <section className="mx-auto mt-20 max-w-[1120px] sm:mt-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <FigmaFrame innerClassName="p-6 sm:p-9" className="h-full">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#1463FF]">
                  01 / OBJECTIVES & CHALLENGES
                </span>
                <h2 className="mt-2 font-serif text-3xl text-ink">
                  Project Context
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {project.challenge}
                </p>
              </FigmaFrame>
            </div>

            <div className="md:col-span-7">
              <FigmaFrame innerClassName="p-6 sm:p-9" className="h-full">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#1463FF]">
                  02 / DESIGN & EXECUTION APPROACH
                </span>
                <h2 className="mt-2 font-serif text-3xl text-ink">
                  Craft & Architecture
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {project.approach}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border-subtle pt-6 sm:grid-cols-3">
                  {project.craftHighlights.map((item, idx) => (
                    <div key={item.title}>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1463FF]">
                        0{idx + 1} · FOCUS
                      </span>
                      <h3 className="mt-1 font-serif text-lg text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </FigmaFrame>
            </div>
          </div>
        </section>

        {/* Interactive Full-Length Scrollable Browser Preview (Shree Maruti Associates) */}
        {project.scrollableFullPage && (
          <section className="mx-auto mt-20 max-w-[1120px] sm:mt-24">
            <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#1463FF]">
                  LIVE DESKTOP MONITOR PREVIEW
                </span>
                <h2 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">
                  Interactive Full-Page Website Scroll
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                <MousePointerClick className="h-4 w-4 text-[#1463FF]" />
                <span>Scroll inside the browser window</span>
              </span>
            </div>

            <FigmaFrame
              dimensionTag="1440PX · FULL PAGE"
              className="portfolio-card-shadow"
              innerClassName="overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-border-subtle bg-[#0A0A0A] px-4 py-3 text-white">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="truncate rounded bg-white/10 px-3 py-1 font-mono text-[10px] text-white/85 sm:text-[11px]">
                  {project.slug}.showcase — Full Website
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#F5DF2E]">
                  SCROLL ↓
                </span>
              </div>

              <div className="max-h-[480px] overflow-y-auto bg-white sm:max-h-[620px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.scrollableFullPage}
                  alt={`${project.client} full-length website design`}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </div>
            </FigmaFrame>
          </section>
        )}

        {/* Art-Directed Multi-Composition Visual Gallery */}
        <section className="mx-auto mt-20 max-w-[1120px] sm:mt-24">
          <div className="mb-10 flex flex-col justify-between gap-3 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#1463FF]">
                03 / VISUAL EXHIBITION
              </span>
              <h2 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">
                Curated{" "}
                <span className="italic text-[#1463FF]">Visual Plates</span>
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              TAP ANY PLATE TO EXPAND
            </p>
          </div>

          <div className="space-y-14 sm:space-y-16">
            {project.gallery.map((item, idx) => {
              if (item.frameType === "browser" && idx % 2 === 0) {
                return (
                  <motion.figure
                    key={item.src}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.52 }}
                  >
                    <FigmaFrame
                      dimensionTag={`PLATE 0${idx + 1} · DESKTOP`}
                      className="portfolio-card-shadow"
                    >
                      <div className="flex items-center justify-between border-b border-border-subtle bg-[#0A0A0A] px-4 py-3 text-white sm:px-5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                          DESKTOP VIEWPORT · 0{idx + 1}
                        </span>
                        <span className="font-mono text-[10px] text-[#F5DF2E]">
                          HD
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({ src: item.src, caption: item.caption })
                        }
                        onMouseEnter={() => setCursor("interactive")}
                        onMouseLeave={resetCursor}
                        className="group relative flex w-full items-center justify-center overflow-hidden p-4 sm:p-10"
                        style={{ backgroundColor: project.accentTint }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          className="max-h-[560px] w-auto max-w-full rounded object-contain shadow-xl transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </button>

                      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle bg-surface-elevated px-5 py-4 font-mono text-xs text-muted">
                        <span>{item.caption}</span>
                        <span className="text-[#1463FF]">PLATE 0{idx + 1}</span>
                      </figcaption>
                    </FigmaFrame>
                  </motion.figure>
                );
              }

              const isReversed = idx % 2 === 1;
              const highlight =
                project.craftHighlights[idx % project.craftHighlights.length];

              return (
                <motion.figure
                  key={item.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.52 }}
                  className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8"
                >
                  <div
                    className={
                      isReversed
                        ? "lg:order-2 lg:col-span-7"
                        : "lg:order-1 lg:col-span-7"
                    }
                  >
                    <FigmaFrame
                      dimensionTag={`PLATE 0${idx + 1}`}
                      className="portfolio-card-shadow"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({ src: item.src, caption: item.caption })
                        }
                        onMouseEnter={() => setCursor("interactive")}
                        onMouseLeave={resetCursor}
                        className="group relative flex w-full items-center justify-center overflow-hidden p-5 sm:p-10"
                        style={{ backgroundColor: project.accentTint }}
                      >
                        {item.frameType === "mobile-card" ? (
                          <div
                            className={`rounded-[22px] border-[4px] border-[#18181B] bg-white p-1.5 shadow-2xl transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.03] sm:rounded-[24px] sm:border-[5px] sm:p-2 ${
                              isReversed ? "sm:rotate-2" : "sm:-rotate-2"
                            }`}
                          >
                            <div className="mx-auto mb-1.5 h-1 w-10 rounded-full bg-slate-200 sm:w-12" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.src}
                              alt={item.alt}
                              loading="lazy"
                              className="max-h-[430px] w-auto max-w-full rounded-[12px] object-contain"
                            />
                          </div>
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                            className="max-h-[460px] w-auto max-w-full rounded object-contain shadow-lg transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        )}

                        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-[#0A0A0A] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                          <Maximize2 className="h-3 w-3" />
                          <span>Zoom</span>
                        </span>
                      </button>
                    </FigmaFrame>
                  </div>

                  <figcaption
                    className={
                      isReversed
                        ? "lg:order-1 lg:col-span-5"
                        : "lg:order-2 lg:col-span-5"
                    }
                  >
                    <div className="relative border border-border-figma bg-surface-elevated p-6 sm:p-7">
                      <PaperclipPin className="absolute -top-5 right-6 h-10 w-5" />
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#1463FF]">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>PLATE 0{idx + 1} · ART DIRECTION</span>
                      </span>
                      <h3 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
                        {highlight.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {item.caption}
                      </p>
                      <p className="mt-3 border-t border-border-subtle pt-3 text-xs leading-relaxed text-muted">
                        {highlight.detail}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>
        </section>

        {/* Verified Client Perspective (when available) */}
        {project.linkedTestimonial && (
          <section className="mx-auto mt-20 max-w-[1120px] sm:mt-24">
            <FigmaFrame
              bannerTitle="CLIENT PERSPECTIVE"
              className="portfolio-card-shadow"
              innerClassName="p-7 sm:p-12 text-center"
            >
              <div className="mb-5 flex justify-center gap-2">
                {[0, 1, 2, 3, 4].map((n) => (
                  <PixelHeart key={n} variant="blue" className="h-4 w-5" />
                ))}
              </div>
              <blockquote className="mx-auto max-w-2xl font-serif text-2xl italic leading-snug text-ink sm:text-4xl">
                “{project.linkedTestimonial.quote}”
              </blockquote>
              <p className="mt-5 font-serif text-xl uppercase tracking-wide text-ink">
                {project.linkedTestimonial.name}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1463FF]">
                {project.linkedTestimonial.role}
              </p>
            </FigmaFrame>
          </section>
        )}

        {/* Bottom Case Study Navigation + Contact CTA */}
        <section
          aria-label="Portfolio project navigation"
          className="mx-auto mt-20 max-w-[1120px] sm:mt-24"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-stretch md:gap-5">
            <Link
              href={`/portfolio/${prevProject.slug}`}
              onMouseEnter={() => setCursor("project", "PREV PROJECT ←")}
              onMouseLeave={resetCursor}
              className="group flex items-center justify-between gap-4 border border-border-figma bg-surface-elevated p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1463FF] md:col-span-5"
            >
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted group-hover:text-[#1463FF]">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Previous Project</span>
                </span>
                <p className="mt-2 font-serif text-2xl text-ink group-hover:text-[#1463FF]">
                  {prevProject.client}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {prevProject.category}
                </p>
              </div>
              <div className="hidden h-16 w-20 shrink-0 items-center justify-center overflow-hidden border border-border-subtle bg-white p-1 sm:flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prevProject.heroImage}
                  alt={prevProject.client}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </Link>

            <Link
              href="/"
              onMouseEnter={() => setCursor("interactive")}
              onMouseLeave={resetCursor}
              className="group flex flex-row items-center justify-center gap-2 border border-border-figma bg-surface p-4 text-center transition-all duration-300 hover:border-[#1463FF] hover:bg-[#1463FF] hover:text-white md:col-span-2 md:flex-col md:p-5"
            >
              <Grid className="h-5 w-5" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                All Works
              </span>
            </Link>

            <Link
              href={`/portfolio/${nextProject.slug}`}
              onMouseEnter={() => setCursor("project", "NEXT PROJECT →")}
              onMouseLeave={resetCursor}
              className="group flex items-center justify-between gap-4 border border-border-figma bg-surface-elevated p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-[#1463FF] md:col-span-5"
            >
              <div className="hidden h-16 w-20 shrink-0 items-center justify-center overflow-hidden border border-border-subtle bg-white p-1 sm:flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nextProject.heroImage}
                  alt={nextProject.client}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="ml-auto">
                <span className="inline-flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted group-hover:text-[#1463FF]">
                  <span>Next Project</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <p className="mt-2 font-serif text-2xl text-ink group-hover:text-[#1463FF]">
                  {nextProject.client}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {nextProject.category}
                </p>
              </div>
            </Link>
          </div>

          <div className="mt-10 border border-border-figma bg-[#0A0A0A] p-7 text-center text-white sm:mt-12 sm:p-12">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#F5DF2E]">
              COLLABORATE WITH INFYNIQ
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl">
              Inspired by {project.client}&apos;s Project?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-xs text-white/75 sm:text-sm">
              Let&apos;s craft a tailored digital experience for your brand.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <FigmaButton href={STUDIO_META.contactUrl} variant="blue">
                <span>Contact Our Studio</span>
                <ArrowUpRight className="h-4 w-4" />
              </FigmaButton>
              <FigmaButton href={STUDIO_META.emailHref} variant="dark">
                <Mail className="h-4 w-4" />
                <span>{STUDIO_META.email}</span>
              </FigmaButton>
            </div>
          </div>
        </section>
      </div>

      {/* Full-Resolution Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/88 p-4 backdrop-blur-md sm:p-8"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close image preview"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/30 bg-white/10 text-white hover:bg-white/25 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] max-w-5xl flex-col items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="max-h-[80vh] w-auto max-w-full rounded bg-white p-2 object-contain shadow-2xl"
              />
              <p className="mt-3 text-center font-mono text-xs text-white/85">
                {lightbox.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
