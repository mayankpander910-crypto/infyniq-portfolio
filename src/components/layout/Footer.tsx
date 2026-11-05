"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_PROJECTS, STUDIO_META } from "@/data/portfolioData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border-subtle bg-canvas py-10 text-ink">
      <div className="mx-auto max-w-[1420px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-border-subtle pb-8 lg:flex-row lg:items-center">
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Infyniq Portfolio">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/brand/logo.svg"
                alt="Infyniq Solutions"
                className="h-9 w-auto object-contain sm:h-10"
              />
            </Link>
            <span className="hidden h-5 w-[1px] bg-border-subtle sm:inline-block" />
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:inline-block">
              CREATIVE PORTFOLIO ARCHIVE
            </span>
          </div>

          {/* Direct Case Study Links */}
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm">
            {PORTFOLIO_PROJECTS.map((proj) => (
              <li key={proj.slug}>
                <Link
                  href={`/portfolio/${proj.slug}`}
                  className="group inline-flex items-center gap-1 font-medium text-muted transition-colors hover:text-[#1463FF]"
                >
                  <span className="font-mono text-[10px] text-muted/70">
                    {proj.index}
                  </span>
                  <span>{proj.client}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="font-mono">
              © {new Date().getFullYear()} {STUDIO_META.name}
            </span>
            <span>•</span>
            <a
              href={STUDIO_META.emailHref}
              className="font-mono transition-colors hover:text-[#1463FF]"
            >
              {STUDIO_META.email}
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            {STUDIO_META.socials.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                className="inline-flex h-8 w-8 items-center justify-center border border-border-figma bg-surface-elevated font-mono text-[11px] font-semibold uppercase text-ink transition-colors hover:border-[#1463FF] hover:bg-[#1463FF] hover:text-white"
              >
                {soc.short}
              </a>
            ))}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="ml-1 inline-flex h-8 items-center gap-1.5 border border-border-figma bg-surface-elevated px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-[#1463FF] hover:text-[#1463FF]"
            >
              <span>Top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
