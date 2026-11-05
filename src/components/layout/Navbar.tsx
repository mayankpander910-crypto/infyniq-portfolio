"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
} from "lucide-react";
import { PORTFOLIO_PROJECTS, STUDIO_META } from "@/data/portfolioData";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useCursor } from "@/components/providers/CursorContext";
import { PixelAsterisk } from "@/components/ui/PixelAccents";

export function Navbar() {
  const pathname = usePathname();
  const isDetailRoute =
    pathname?.startsWith("/portfolio/") && pathname !== "/portfolio";
  const { theme, toggleTheme } = useTheme();
  const { setCursor, resetCursor } = useCursor();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [previewIdx, setPreviewIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const activePreview = PORTFOLIO_PROJECTS[previewIdx] || PORTFOLIO_PROJECTS[0];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-300 ${
          scrolled
            ? "border-b border-border-subtle/75 bg-canvas/85 py-3 backdrop-blur-md"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1420px] items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* Left: Portfolio Brand Mark */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              onMouseEnter={() => setCursor("interactive")}
              onMouseLeave={resetCursor}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-2 sm:gap-2.5 focus:outline-none"
              aria-label="Infyniq Portfolio Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/brand/site-icon.svg"
                alt="Infyniq mark"
                className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7"
              />
              <span className="font-hand text-lg font-bold uppercase tracking-wider text-ink sm:text-2xl">
                INFYNIQ PORTFOLIO
              </span>
            </Link>

            {isDetailRoute && (
              <Link
                href="/"
                onMouseEnter={() => setCursor("interactive")}
                onMouseLeave={resetCursor}
                className="hidden items-center gap-1.5 rounded-full border border-border-figma bg-surface-elevated px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-[#1463FF] hover:text-[#1463FF] sm:inline-flex"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Works</span>
              </Link>
            )}
          </div>

          {/* Center: Quick Case-Study Switcher Pill (Desktop) */}
          <nav
            aria-label="Portfolio quick index"
            className="hidden items-center gap-5 rounded-full border border-border-subtle bg-surface-elevated/85 px-5 py-1.5 backdrop-blur-md xl:flex"
          >
            <Link
              href="/#portfolio-collection"
              onMouseEnter={() => setCursor("interactive")}
              onMouseLeave={resetCursor}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1463FF]"
            >
              All Works (05)
            </Link>
            <span className="h-3 w-[1px] bg-border-subtle" />
            {PORTFOLIO_PROJECTS.map((proj) => {
              const active = pathname === `/portfolio/${proj.slug}`;
              return (
                <Link
                  key={proj.slug}
                  href={`/portfolio/${proj.slug}`}
                  onMouseEnter={() => setCursor("interactive")}
                  onMouseLeave={resetCursor}
                  className={`font-sans text-xs transition-colors hover:text-[#1463FF] ${
                    active ? "font-semibold text-[#1463FF]" : "text-muted"
                  }`}
                >
                  {proj.client}
                </Link>
              );
            })}
          </nav>

          {/* Right: Theme Toggle + Pixel-Asterisk Index Overlay Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              onMouseEnter={() => setCursor("interactive")}
              onMouseLeave={resetCursor}
              aria-label={
                theme === "light" ? "Switch to dark theme" : "Switch to light theme"
              }
              className="relative flex h-9 w-9 items-center justify-center border border-border-figma bg-surface-elevated text-ink transition-colors hover:border-[#1463FF] hover:text-[#1463FF] sm:h-10 sm:w-10"
            >
              <span className="pointer-events-none absolute -left-[3px] -top-[3px] h-[5px] w-[5px] bg-[var(--handle-fill)]" />
              <span className="pointer-events-none absolute -right-[3px] -top-[3px] h-[5px] w-[5px] bg-[var(--handle-fill)]" />
              <span className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-[5px] w-[5px] bg-[var(--handle-fill)]" />
              <span className="pointer-events-none absolute -bottom-[3px] -right-[3px] h-[5px] w-[5px] bg-[var(--handle-fill)]" />
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4 text-[#F5DF2E]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              onMouseEnter={() => setCursor("interactive")}
              onMouseLeave={resetCursor}
              aria-expanded={menuOpen}
              aria-label={
                menuOpen ? "Close portfolio index" : "Open portfolio index"
              }
              className="group relative flex h-9 items-center gap-2 border border-border-figma bg-surface-elevated px-3 text-ink transition-colors hover:border-[#1463FF] hover:text-[#1463FF] sm:h-10 sm:px-3.5"
            >
              <span className="pointer-events-none absolute -left-[3px] -top-[3px] h-[5px] w-[5px] bg-[var(--handle-fill)] group-hover:bg-[#1463FF]" />
              <span className="pointer-events-none absolute -right-[3px] -top-[3px] h-[5px] w-[5px] bg-[var(--handle-fill)] group-hover:bg-[#1463FF]" />
              <span className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-[5px] w-[5px] bg-[var(--handle-fill)] group-hover:bg-[#1463FF]" />
              <span className="pointer-events-none absolute -bottom-[3px] -right-[3px] h-[5px] w-[5px] bg-[var(--handle-fill)] group-hover:bg-[#1463FF]" />
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] sm:inline">
                {menuOpen ? "CLOSE" : "INDEX"}
              </span>
              <PixelAsterisk className="h-4 w-4" isOpen={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Glassmorphic Portfolio Case-Study Index Overlay (Reference Image 2) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="portfolio-index-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="fixed inset-0 z-[85] flex flex-col justify-between overflow-y-auto bg-gradient-to-br from-[#0A2342]/95 via-[#004A8F]/92 to-[#091224]/96 px-4 pb-8 pt-24 text-white backdrop-blur-xl sm:px-8 lg:px-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />

            <div className="relative z-10 mx-auto grid w-full max-w-[1320px] flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-12">
              {/* Left Glassmorphic Case Study List */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.32 }}
                className="relative border border-white/35 bg-white/12 p-6 shadow-glass backdrop-blur-2xl sm:p-9 lg:col-span-6"
              >
                <span className="absolute -left-1 -top-1 h-2 w-2 bg-white" />
                <span className="absolute -right-1 -top-1 h-2 w-2 bg-white" />
                <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-white" />
                <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-white" />

                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-sky-200">
                  PORTFOLIO EXHIBITION · 05 WORKS
                </p>

                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={() => setCursor("interactive")}
                      onMouseLeave={resetCursor}
                      className="group flex items-baseline justify-between border-b border-white/15 pb-2.5 transition-colors hover:border-white/50"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-[#F5DF2E]">
                          00
                        </span>
                        <span className="font-serif text-2xl tracking-[0.06em] text-white transition-transform duration-200 group-hover:translate-x-2 sm:text-3xl">
                          ALL PORTFOLIO WORKS
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-sky-200" />
                    </Link>
                  </li>

                  {PORTFOLIO_PROJECTS.map((proj, idx) => (
                    <li key={proj.slug}>
                      <Link
                        href={`/portfolio/${proj.slug}`}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={() => {
                          setCursor("interactive");
                          setPreviewIdx(idx);
                        }}
                        onMouseLeave={resetCursor}
                        className="group flex items-baseline justify-between border-b border-white/10 pb-2.5 transition-colors hover:border-white/45"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-sky-300/80">
                            {proj.index}
                          </span>
                          <div>
                            <span className="block font-serif text-2xl tracking-[0.04em] text-white transition-transform duration-200 group-hover:translate-x-2 sm:text-3xl">
                              {proj.client.toUpperCase()}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-sky-200/80">
                              {proj.category}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-sky-200 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    {STUDIO_META.socials.map((soc) => (
                      <a
                        key={soc.name}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={soc.name}
                        className="flex h-9 w-9 items-center justify-center rounded-[3px] bg-[#0A0A0A] font-mono text-xs font-bold uppercase text-white transition-transform hover:-translate-y-0.5 hover:bg-[#F5DF2E] hover:text-[#0A0A0A]"
                      >
                        {soc.short}
                      </a>
                    ))}
                  </div>
                  <a
                    href={STUDIO_META.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5DF2E] hover:underline"
                  >
                    <span>infyniq.in</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* Right Live Project Preview Stage */}
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="hidden lg:col-span-6 lg:block"
              >
                <div className="relative overflow-hidden border border-white/30 bg-white/10 p-6 backdrop-blur-xl">
                  <span className="absolute -left-1 -top-1 h-2 w-2 bg-[#F5DF2E]" />
                  <span className="absolute -right-1 -top-1 h-2 w-2 bg-[#F5DF2E]" />
                  <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-[#F5DF2E]" />
                  <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-[#F5DF2E]" />

                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-200">
                      PREVIEW · {activePreview.index}/05
                    </span>
                    <span className="rounded-full bg-[#F5DF2E] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#0A0A0A]">
                      {activePreview.category}
                    </span>
                  </div>

                  <Link
                    href={`/portfolio/${activePreview.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="group block"
                  >
                    <div className="relative mb-4 flex h-64 items-center justify-center overflow-hidden rounded bg-white/95 p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activePreview.heroImage}
                        alt={activePreview.title}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-2xl text-white">
                          {activePreview.title}
                        </h4>
                        <p className="mt-1 line-clamp-1 text-xs text-sky-100/80">
                          {activePreview.summary}
                        </p>
                      </div>
                      <span className="ml-4 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1463FF] transition-transform group-hover:scale-110">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Bottom Contact Metadata Strip (Ref 2) */}
            <div className="relative z-10 mx-auto mt-8 grid w-full max-w-[1320px] grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href={STUDIO_META.emailHref}
                className="relative flex items-center gap-3.5 border border-white/35 bg-white/10 px-5 py-3.5 backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <span className="absolute -left-1 -top-1 h-1.5 w-1.5 bg-white" />
                <span className="absolute -right-1 -top-1 h-1.5 w-1.5 bg-white" />
                <span className="absolute -bottom-1 -left-1 h-1.5 w-1.5 bg-white" />
                <span className="absolute -bottom-1 -right-1 h-1.5 w-1.5 bg-white" />
                <Mail className="h-4 w-4 shrink-0 text-[#F5DF2E]" />
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-sky-200">
                    MAIL TO
                  </span>
                  <span className="font-mono text-xs text-white sm:text-sm">
                    {STUDIO_META.email.toUpperCase()}
                  </span>
                </div>
              </a>

              <a
                href={STUDIO_META.phoneHref}
                className="relative flex items-center gap-3.5 border border-white/35 bg-white/10 px-5 py-3.5 backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <span className="absolute -left-1 -top-1 h-1.5 w-1.5 bg-white" />
                <span className="absolute -right-1 -top-1 h-1.5 w-1.5 bg-white" />
                <span className="absolute -bottom-1 -left-1 h-1.5 w-1.5 bg-white" />
                <span className="absolute -bottom-1 -right-1 h-1.5 w-1.5 bg-white" />
                <Phone className="h-4 w-4 shrink-0 text-[#F5DF2E]" />
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-sky-200">
                    PHONE DIRECT
                  </span>
                  <span className="font-mono text-xs text-white sm:text-sm">
                    {STUDIO_META.phone}
                  </span>
                </div>
              </a>

              <div className="relative flex items-center gap-3.5 border border-white/35 bg-white/10 px-5 py-3.5 backdrop-blur-md">
                <span className="absolute -left-1 -top-1 h-1.5 w-1.5 bg-white" />
                <span className="absolute -right-1 -top-1 h-1.5 w-1.5 bg-white" />
                <span className="absolute -bottom-1 -left-1 h-1.5 w-1.5 bg-white" />
                <span className="absolute -bottom-1 -right-1 h-1.5 w-1.5 bg-white" />
                <MapPin className="h-4 w-4 shrink-0 text-[#F5DF2E]" />
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-sky-200">
                    STUDIO
                  </span>
                  <span className="font-mono text-xs text-white sm:text-sm">
                    AHMEDABAD, IN
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
