"use client";

import React from "react";
import clsx from "clsx";

interface FigmaFrameProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  bannerTitle?: string;
  bannerRight?: React.ReactNode;
  handleColor?: "default" | "blue";
  as?: "div" | "article" | "section";
  dimensionTag?: string;
}

export function FigmaFrame({
  children,
  className,
  innerClassName,
  bannerTitle,
  bannerRight,
  handleColor = "default",
  as: Component = "div",
  dimensionTag,
}: FigmaFrameProps) {
  const handleClasses =
    handleColor === "blue"
      ? "bg-[#0072CE]"
      : "bg-[var(--handle-fill)] group-hover/figma:bg-[#0072CE]";

  return (
    <Component
      className={clsx(
        "group/figma relative border border-border-figma bg-surface-elevated transition-colors duration-300 hover:border-[#0072CE]/60",
        className
      )}
    >
      {/* 4 Figma Selection Handles */}
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute -left-[4px] -top-[4px] z-20 h-[7px] w-[7px] transition-colors duration-300",
          handleClasses
        )}
      />
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute -right-[4px] -top-[4px] z-20 h-[7px] w-[7px] transition-colors duration-300",
          handleClasses
        )}
      />
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute -bottom-[4px] -left-[4px] z-20 h-[7px] w-[7px] transition-colors duration-300",
          handleClasses
        )}
      />
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute -bottom-[4px] -right-[4px] z-20 h-[7px] w-[7px] transition-colors duration-300",
          handleClasses
        )}
      />

      {dimensionTag && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-2 hidden rounded-[2px] bg-[#0072CE] px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-white opacity-0 transition-opacity duration-200 group-hover/figma:opacity-100 sm:inline-block"
        >
          {dimensionTag}
        </span>
      )}

      {bannerTitle && (
        <div className="flex items-center justify-between gap-3 rounded-t-[2px] bg-[#0A0A0A] px-5 py-3.5 text-white dark:bg-[#05070B] dark:border-b dark:border-border-figma sm:px-7 sm:py-4">
          <h3 className="font-serif text-lg uppercase tracking-[0.12em] text-white sm:text-2xl">
            {bannerTitle}
          </h3>
          {bannerRight && <div className="shrink-0">{bannerRight}</div>}
        </div>
      )}

      <div className={innerClassName}>{children}</div>
    </Component>
  );
}
