import React from "react";
import type { Metadata } from "next";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioExhibition } from "@/components/portfolio/PortfolioExhibition";

export const metadata: Metadata = {
  title: "Portfolio — Selected Creative Works | Infyniq Solutions",
  description:
    "Explore Infyniq Solutions' interactive 3D creative portfolio—custom web platforms, brand systems, and social media campaigns crafted for real client growth.",
};

export default function DedicatedPortfolioPage() {
  return (
    <main className="portfolio-experience relative overflow-x-clip">
      <PortfolioHero />
      <PortfolioExhibition />
    </main>
  );
}
