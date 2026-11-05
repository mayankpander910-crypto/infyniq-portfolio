import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PORTFOLIO_PROJECTS,
  getAdjacentProjects,
  getProjectBySlug,
} from "@/data/portfolioData";
import { PortfolioCaseStudy } from "@/components/portfolio/PortfolioCaseStudy";

interface PortfolioDetailProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PortfolioDetailProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found | Infyniq Solutions Portfolio",
    };
  }
  return {
    title: `${project.client} — Portfolio Case Study | Infyniq Solutions`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Infyniq Solutions Portfolio`,
      description: project.summary,
      images: [project.heroImage],
    },
  };
}

export default function PortfolioProjectDetailPage({
  params,
}: PortfolioDetailProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <PortfolioCaseStudy
      project={project}
      prevProject={prev}
      nextProject={next}
    />
  );
}
