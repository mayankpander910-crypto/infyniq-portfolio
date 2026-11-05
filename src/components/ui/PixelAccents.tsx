"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useCursor } from "@/components/providers/CursorContext";

/**
 * Oversized 8-tooth rounded electric-blue cog/asterisk inspired by Reference Image 1.
 * Rotates continuously and accelerates smoothly based on page scroll velocity.
 */
export function BlueHeroGear({ className }: { className?: string }) {
  const baseRotation = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 350,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4.5], {
    clamp: false,
  });

  useAnimationFrame((_, delta) => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const speed = 18; // degrees per second
    const boost = velocityFactor.get();
    const moveBy = ((speed + Math.abs(boost) * 28) * delta) / 1000;
    baseRotation.set(baseRotation.get() + moveBy);
  });

  return (
    <motion.div
      style={{ rotate: baseRotation }}
      className={clsx(
        "inline-flex select-none items-center justify-center",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-[0_10px_24px_rgba(20,99,255,0.28)]"
      >
        <g fill="#1463FF">
          <circle cx="60" cy="60" r="35" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="49"
              y="5"
              width="22"
              height="30"
              rx="8"
              transform={`rotate(${angle} 60 60)`}
            />
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

/**
 * Pixel-art envelope with pink heart seal pinning the yellow sticky note (Reference Image 1).
 */
export function PixelEnvelopePin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 17"
      shapeRendering="crispEdges"
      className={clsx("select-none", className)}
      aria-hidden="true"
    >
      {/* Crisp black pixel border */}
      <rect x="2" y="3" width="18" height="1" fill="#0A0A0A" />
      <rect x="1" y="4" width="1" height="11" fill="#0A0A0A" />
      <rect x="20" y="4" width="1" height="11" fill="#0A0A0A" />
      <rect x="2" y="15" width="18" height="1" fill="#0A0A0A" />

      {/* Warm parchment envelope body */}
      <rect x="2" y="4" width="18" height="11" fill="#FDE6B0" />
      <rect x="2" y="12" width="18" height="3" fill="#F6CF7D" />

      {/* Envelope fold diagonals */}
      <rect x="3" y="5" width="2" height="1" fill="#0A0A0A" />
      <rect x="5" y="6" width="2" height="1" fill="#0A0A0A" />
      <rect x="7" y="7" width="2" height="1" fill="#0A0A0A" />
      <rect x="17" y="5" width="2" height="1" fill="#0A0A0A" />
      <rect x="15" y="6" width="2" height="1" fill="#0A0A0A" />
      <rect x="13" y="7" width="2" height="1" fill="#0A0A0A" />

      {/* Bottom fold lines */}
      <rect x="3" y="13" width="2" height="1" fill="#D99B38" />
      <rect x="5" y="12" width="2" height="1" fill="#D99B38" />
      <rect x="17" y="13" width="2" height="1" fill="#D99B38" />
      <rect x="15" y="12" width="2" height="1" fill="#D99B38" />

      {/* Pixel heart wax seal at top center */}
      <rect x="8" y="1" width="2" height="1" fill="#0A0A0A" />
      <rect x="12" y="1" width="2" height="1" fill="#0A0A0A" />
      <rect x="7" y="2" width="1" height="3" fill="#0A0A0A" />
      <rect x="14" y="2" width="1" height="3" fill="#0A0A0A" />
      <rect x="10" y="2" width="2" height="1" fill="#0A0A0A" />
      <rect x="8" y="5" width="1" height="1" fill="#0A0A0A" />
      <rect x="13" y="5" width="1" height="1" fill="#0A0A0A" />
      <rect x="9" y="6" width="1" height="1" fill="#0A0A0A" />
      <rect x="12" y="6" width="1" height="1" fill="#0A0A0A" />
      <rect x="10" y="7" width="2" height="1" fill="#0A0A0A" />

      <rect x="8" y="2" width="2" height="3" fill="#FF5D8F" />
      <rect x="12" y="2" width="2" height="3" fill="#FF5D8F" />
      <rect x="10" y="3" width="2" height="3" fill="#FF5D8F" />
      <rect x="9" y="5" width="4" height="1" fill="#FF5D8F" />
      <rect x="10" y="6" width="2" height="1" fill="#FF5D8F" />
      <rect x="8" y="2" width="1" height="1" fill="#FFC2D4" />
    </svg>
  );
}

/**
 * Restrained pixel-grid heart icon used in Reference 2's testimonial ratings & Contact header.
 */
export function PixelHeart({
  className,
  variant = "blue",
}: {
  className?: string;
  variant?: "blue" | "pink" | "muted";
}) {
  const fill =
    variant === "blue"
      ? "#1463FF"
      : variant === "pink"
      ? "#F48FB1"
      : "#CBD5E1";

  if (variant === "pink") {
    return (
      <svg
        viewBox="0 0 15 13"
        shapeRendering="crispEdges"
        className={clsx("select-none", className)}
        aria-hidden="true"
      >
        {/* Crisp black pixel outline */}
        <path
          d="M2 0h4v1h1v1h1V1h1V0h4v1h1v1h1v4h-1v2h-1v1h-1v1h-1v1H9v1H8v1H7v-1H6v-1H5v-1H4V9H3V8H2V6H1V2h1V1z"
          fill="#0A0A0A"
        />
        <path
          d="M2 1h4v1h1v1h1V2h1V1h4v1h1v4h-1v2h-1v1h-1v1H9v1H8v1H7v-1H6v-1H4V9H3V8H2V6H1V2h1z"
          fill="#F9A8C9"
        />
        {/* Subtle pixel highlight */}
        <rect x="2" y="2" width="2" height="1" fill="#FFFFFF" />
        <rect x="2" y="3" width="1" height="2" fill="#FFFFFF" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 13 11"
      shapeRendering="crispEdges"
      className={clsx("select-none", className)}
      aria-hidden="true"
    >
      <rect x="2" y="0" width="3" height="1" fill={fill} />
      <rect x="8" y="0" width="3" height="1" fill={fill} />
      <rect x="1" y="1" width="5" height="1" fill={fill} />
      <rect x="7" y="1" width="5" height="1" fill={fill} />
      <rect x="0" y="2" width="13" height="3" fill={fill} />
      <rect x="1" y="5" width="11" height="1" fill={fill} />
      <rect x="2" y="6" width="9" height="1" fill={fill} />
      <rect x="3" y="7" width="7" height="1" fill={fill} />
      <rect x="4" y="8" width="5" height="1" fill={fill} />
      <rect x="5" y="9" width="3" height="1" fill={fill} />
      <rect x="6" y="10" width="1" height="1" fill={fill} />
    </svg>
  );
}

/**
 * Pixel-stepped 8-spoke asterisk menu trigger icon from Reference Image 1.
 */
export function PixelAsterisk({
  className,
  isOpen = false,
}: {
  className?: string;
  isOpen?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 17 17"
      shapeRendering="crispEdges"
      className={clsx(
        "transition-transform duration-300",
        isOpen && "rotate-45",
        className
      )}
      aria-hidden="true"
    >
      {/* Vertical & horizontal bars */}
      <rect x="8" y="1" width="1" height="15" fill="currentColor" />
      <rect x="1" y="8" width="15" height="1" fill="currentColor" />
      {/* Pixel diagonals */}
      <rect x="3" y="3" width="1" height="1" fill="currentColor" />
      <rect x="4" y="4" width="1" height="1" fill="currentColor" />
      <rect x="5" y="5" width="1" height="1" fill="currentColor" />
      <rect x="6" y="6" width="1" height="1" fill="currentColor" />
      <rect x="10" y="10" width="1" height="1" fill="currentColor" />
      <rect x="11" y="11" width="1" height="1" fill="currentColor" />
      <rect x="12" y="12" width="1" height="1" fill="currentColor" />
      <rect x="13" y="13" width="1" height="1" fill="currentColor" />

      <rect x="13" y="3" width="1" height="1" fill="currentColor" />
      <rect x="12" y="4" width="1" height="1" fill="currentColor" />
      <rect x="11" y="5" width="1" height="1" fill="currentColor" />
      <rect x="10" y="6" width="1" height="1" fill="currentColor" />
      <rect x="6" y="10" width="1" height="1" fill="currentColor" />
      <rect x="5" y="11" width="1" height="1" fill="currentColor" />
      <rect x="4" y="12" width="1" height="1" fill="currentColor" />
      <rect x="3" y="13" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Gold wire paperclip pinning the white sticky note in Reference Image 2.
 */
export function PaperclipPin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 64"
      fill="none"
      className={clsx("select-none", className)}
      aria-hidden="true"
    >
      <path
        d="M8 18V48C8 53.5228 12.4772 58 18 58C23.5228 58 28 53.5228 28 48V12C28 5.37258 22.6274 0 16 0C9.37258 0 4 5.37258 4 12V44C4 47.3137 6.68629 50 10 50C13.3137 50 16 47.3137 16 44V18"
        stroke="#EAB308"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Pixel-stepped down or right arrow matching Reference 1 ("Explore Our World ↓").
 */
export function PixelArrow({
  direction = "down",
  className,
}: {
  direction?: "down" | "right" | "left";
  className?: string;
}) {
  const rotation =
    direction === "right"
      ? "-rotate-90"
      : direction === "left"
      ? "rotate-90"
      : "";
  return (
    <svg
      viewBox="0 0 13 15"
      shapeRendering="crispEdges"
      className={clsx("inline-block shrink-0", rotation, className)}
      aria-hidden="true"
    >
      <rect x="6" y="1" width="1" height="11" fill="currentColor" />
      <rect x="5" y="1" width="2" height="11" fill="currentColor" />
      <rect x="2" y="9" width="2" height="2" fill="currentColor" />
      <rect x="4" y="11" width="2" height="2" fill="currentColor" />
      <rect x="6" y="12" width="2" height="2" fill="currentColor" />
      <rect x="8" y="11" width="2" height="2" fill="currentColor" />
      <rect x="10" y="9" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

/**
 * Magnetic Figma-handle CTA button inspired by Reference 1 ("Enter in my world ↓").
 */
interface FigmaButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "outline" | "blue" | "dark";
  handwritten?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function FigmaButton({
  href,
  onClick,
  children,
  className,
  variant = "outline",
  handwritten = false,
  type = "button",
  disabled = false,
}: FigmaButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    resetCursor();
  };

  const innerStyle = clsx(
    "group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 transition-all duration-300",
    variant === "outline" &&
      "border border-border-figma bg-surface-elevated text-ink hover:border-[#0072CE] hover:bg-[#0072CE]/[0.04]",
    variant === "blue" &&
      "border border-[#0072CE] bg-[#0072CE] text-white hover:bg-[#1463FF] shadow-[0_12px_28px_-8px_rgba(0,114,206,0.45)]",
    variant === "dark" &&
      "border border-[#0A0A0A] bg-[#0A0A0A] text-white hover:bg-[#0072CE] hover:border-[#0072CE] dark:border-white/25 dark:bg-white dark:text-[#0A0A0A] dark:hover:bg-[#0072CE] dark:hover:text-white",
    handwritten
      ? "font-hand text-[22px] font-semibold tracking-wide"
      : "font-sans text-sm font-medium tracking-wide",
    disabled && "opacity-60 cursor-not-allowed",
    className
  );

  const handles = (
    <>
      <span className="pointer-events-none absolute -left-[3.5px] -top-[3.5px] h-[6px] w-[6px] bg-[var(--handle-fill)] transition-colors group-hover:bg-[#0072CE]" />
      <span className="pointer-events-none absolute -right-[3.5px] -top-[3.5px] h-[6px] w-[6px] bg-[var(--handle-fill)] transition-colors group-hover:bg-[#0072CE]" />
      <span className="pointer-events-none absolute -bottom-[3.5px] -left-[3.5px] h-[6px] w-[6px] bg-[var(--handle-fill)] transition-colors group-hover:bg-[#0072CE]" />
      <span className="pointer-events-none absolute -bottom-[3.5px] -right-[3.5px] h-[6px] w-[6px] bg-[var(--handle-fill)] transition-colors group-hover:bg-[#0072CE]" />
    </>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursor("interactive")}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            onClick={onClick}
            className={innerStyle}
          >
            {handles}
            {children}
          </a>
        ) : (
          <Link href={href} onClick={onClick} className={innerStyle}>
            {handles}
            {children}
          </Link>
        )
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={innerStyle}
        >
          {handles}
          {children}
        </button>
      )}
    </motion.div>
  );
}
