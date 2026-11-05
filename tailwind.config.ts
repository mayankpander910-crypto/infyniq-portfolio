import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        "border-subtle": "var(--border-subtle)",
        "border-figma": "var(--border-figma)",
        brand: {
          blue: "#0072CE",
          electric: "#1463FF",
          amber: "#FFB433",
          sticky: "#F5DF2E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        pixel: ["var(--font-pixel)", "monospace"],
        silk: ["var(--font-silk)", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        editorial:
          "0 20px 50px -15px rgba(10, 14, 26, 0.08), 0 4px 14px -2px rgba(10, 14, 26, 0.04)",
        "editorial-hover":
          "0 30px 70px -15px rgba(0, 114, 206, 0.16), 0 10px 24px -4px rgba(10, 14, 26, 0.08)",
        sticky:
          "6px 16px 32px -8px rgba(15, 23, 42, 0.22), 0 2px 6px rgba(15, 23, 42, 0.08)",
        glass:
          "0 24px 64px -12px rgba(10, 14, 26, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        marquee: "marquee 34s linear infinite",
        "marquee-reverse": "marquee-reverse 38s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7.5s ease-in-out 1.5s infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
