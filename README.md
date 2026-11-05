# Infyniq Solutions — Standalone 3D & Editorial Portfolio

A pure, standalone, responsive **Portfolio Showcase + Case Study** codebase for **Infyniq Solutions** (`https://www.infyniq.in/`) with all non-portfolio pages/sections removed.

## Project Structure (Portfolio Only)
- `src/app/page.tsx` & `src/app/portfolio/page.tsx` — Portfolio Exhibition Page (`PortfolioHero` + `PortfolioExhibition`)
- `src/app/portfolio/[slug]/page.tsx` — Dynamic Case Study Routes (`/portfolio/vraj-interior`, `/portfolio/easyteezy`, `/portfolio/monastery`, `/portfolio/shree-maruti-associates`, `/portfolio/simplq`)
- `src/components/portfolio/PortfolioHero.tsx` — Oversized mixed pixel/editorial hero, rotating blue cog, 3D floating studio sculptures, floating previews, yellow sticky note, smooth-scroll CTA
- `src/components/portfolio/PortfolioExhibition.tsx` — Overlapping 3D editorial collage, cursor-tilt physics, GSAP scroll watermark, category filter
- `src/components/portfolio/PortfolioCaseStudy.tsx` — Dedicated case study layout, metadata strip, scrollable full-page browser monitor, multi-layout gallery + lightbox, prev/next project nav
- `src/components/three/StudioObjectCanvas.tsx` — Interactive Three.js / React Three Fiber 3D studio sculptures
- `src/data/portfolioData.ts` — Verified Infyniq portfolio project data

## Run Locally
```bash
npm install --legacy-peer-deps
npm run dev
```
