import React from "react";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioExhibition } from "@/components/portfolio/PortfolioExhibition";

export default function PortfolioRootPage() {
  return (
    <main className="portfolio-experience relative overflow-x-clip">
      <PortfolioHero />
      <PortfolioExhibition />
    </main>
  );
}
