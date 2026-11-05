export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption: string;
  frameType: "browser" | "mobile-card" | "editorial-split" | "brand-mark";
  aspectHint: "wide" | "portrait" | "landscape" | "square";
}

export interface PortfolioProject {
  id: string;
  index: string;
  slug: string;
  client: string;
  title: string;
  headline: string;
  bannerTitle: string;
  category: "Web Development" | "Brand & Campaigns";
  tags: string[];
  summary: string;
  accentTint: string;
  collageStyle: {
    variant: "blue-folder" | "figma-frame";
    tilt: number;
    stickyNote?: string;
  };
  heroImage: string;
  secondaryImage: string;
  scrollableFullPage?: string;
  deliverables: string[];
  industry: string;
  challenge: string;
  approach: string;
  craftHighlights: {
    title: string;
    detail: string;
  }[];
  gallery: ProjectGalleryItem[];
  linkedTestimonial?: {
    quote: string;
    name: string;
    role: string;
  };
}

export const STUDIO_META = {
  name: "Infyniq Solutions",
  shortName: "Infyniq",
  founded: "2025",
  websiteUrl: "https://www.infyniq.in",
  contactUrl: "https://www.infyniq.in/contact",
  email: "info@infyniq.in",
  emailHref: "mailto:info@infyniq.in",
  phone: "+91 8487009498",
  phoneHref: "tel:+918487009498",
  location: "SG Business Hub, Ahmedabad, Gujarat",
  socials: [
    {
      name: "LinkedIn",
      short: "in",
      url: "https://www.linkedin.com/company/infyniq-technology/",
    },
    {
      name: "Instagram",
      short: "ig",
      url: "https://www.instagram.com/infyniq.in/",
    },
    {
      name: "Facebook",
      short: "fb",
      url: "https://www.facebook.com/profile.php?id=61578915957307",
    },
    {
      name: "X (Twitter)",
      short: "x",
      url: "https://x.com/Infyniq25",
    },
  ],
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "vraj-interior",
    index: "",
    slug: "vraj-interior",
    client: "Vraj Interior",
    title: "Vraj Interior: Design That Shapes Everyday Living",
    headline:
      "Architectural Web Presence for Bespoke Residential & Commercial Interiors",
    bannerTitle: "VRAJ INTERIOR · ARCHITECTURAL WEB EXPERIENCE",
    category: "Web Development",
    tags: ["Web Development", "Web Maintenance"],
    summary:
      "Blending creativity with craftsmanship, we deliver thoughtful interior solutions—spanning residential and commercial design, custom furniture, and refined color work to create functional, timeless spaces.",
    accentTint: "#F3F4F6",
    collageStyle: {
      variant: "blue-folder",
      tilt: -2.1,
      stickyNote:
        "Editorial whitespace + spatial grid built for timeless interior storytelling.",
    },
    heroImage: "/assets/work/vraj-hero.webp",
    secondaryImage: "/assets/work/vraj-about.webp",
    deliverables: [
      "Custom Responsive Website Design & Engineering",
      "Portfolio & Spatial Showcase Architecture",
      "Partner & Client Credential Strip",
      "Ongoing Web Maintenance & Performance Care",
    ],
    industry: "Real Estate & Interior Architecture",
    challenge:
      "Vraj Interior needed a digital flagship that mirrored the calm precision, clean finishes, and spatial harmony of their turnkey residential and commercial interior work—without visual clutter competing with their photography.",
    approach:
      "Infyniq engineered a clean, high-contrast editorial web experience anchored by bold geometric typography, generous breathing room, structured project galleries, and dependable web maintenance.",
    craftHighlights: [
      {
        title: "Editorial Hero Composition",
        detail:
          "Asymmetric architectural grid pairing bold display typography with curated interior photography frames.",
      },
      {
        title: "Turnkey Studio Narrative",
        detail:
          "Structured About & Credentials layout highlighting residential, commercial, electrical, furnishing, and painting capabilities.",
      },
      {
        title: "Responsive Performance & Care",
        detail:
          "Fast-loading responsive layouts backed by continuous web maintenance and content updates.",
      },
    ],
    gallery: [
      {
        src: "/assets/work/vraj-hero.webp",
        alt: "Vraj Interior homepage hero design showcasing spatial grid and typography",
        caption:
          " Homepage Hero — Asymmetric spatial layout introducing Vraj Interior's residential & commercial studio.",
        frameType: "browser",
        aspectHint: "wide",
      },
      {
        src: "/assets/work/vraj-about.webp",
        alt: "Vraj Interior partner credentials and About Us section layout",
        caption:
          " Studio Credentials & Story — Client trust strip paired with full-bleed kitchen architecture and editorial narrative.",
        frameType: "browser",
        aspectHint: "wide",
      },
    ],
    linkedTestimonial: {
      quote:
        "I had a great time working with this IT company. The team is professional, supportive, and very knowledgeable.",
      name: "Sandip Patel",
      role: "Founder Of Vraj Interior",
    },
  },
  {
    id: "easyteezy",
    index: "",
    slug: "easyteezy",
    client: "Easyteezy",
    title: "Easyteezy Trendy T-Shirts",
    headline:
      "High-Energy Meta Ad Creatives & Social Storytelling for Modern Streetwear",
    bannerTitle: "EASYTEEZY · META CAMPAIGN & SOCIAL SYSTEM",
    category: "Brand & Campaigns",
    tags: ["Meta Campaign", "Social Media Management"],
    summary:
      "From bold graphics to everyday essentials, Easyteezy offers stylish, comfortable T-shirts made for modern fashion and daily wear.",
    accentTint: "#FEFAF0",
    collageStyle: {
      variant: "figma-frame",
      tilt: 1.9,
    },
    heroImage: "/assets/work/easyteezy-1.webp",
    secondaryImage: "/assets/work/easyteezy-2.webp",
    deliverables: [
      "Meta Paid Campaign Creative Direction",
      "Product Drop Promotional Layouts",
      "Seasonal Lookbook Social Templates",
      "Social Media Calendar & Feed Curation",
    ],
    industry: "E-Commerce & Apparel",
    challenge:
      "In a fast-scrolling streetwear feed, Easyteezy needed thumb-stopping social and Meta campaign visuals capable of spotlighting graphic tee details alongside clear price-point hooks.",
    approach:
      "We crafted a cohesive visual system combining kinetic neon drop-tapes, crisp multi-product flatlays, and lifestyle lookbook grids ('Summer Vibes') tailored for Instagram and Meta conversion placements.",
    craftHighlights: [
      {
        title: "Conversion-Ready Drop Cards",
        detail:
          "Bold graphic tee hero compositions framed by energetic drop ribbons and clear promotional hierarchy.",
      },
      {
        title: "Seasonal Lookbook Storytelling",
        detail:
          "Editorial split-grid social cards pairing back-print typography details with sunlit lifestyle photography.",
      },
      {
        title: "Consistent Brand Sign-Off",
        detail:
          "Unified Easyteezy emblem placement and cohesive typography across organic posts and paid Meta ad sets.",
      },
    ],
    gallery: [
      {
        src: "/assets/work/easyteezy-1.webp",
        alt: "Easyteezy graphic T-shirts Meta campaign creative",
        caption:
          "New Drops Meta Ad Creative — Multi-SKU graphic tee spotlight engineered for instant feed clarity.",
        frameType: "mobile-card",
        aspectHint: "portrait",
      },
      {
        src: "/assets/work/easyteezy-2.webp",
        alt: "Easyteezy Summer Vibes lifestyle social media creative",
        caption:
          "Summer Vibes Lookbook — Editorial collage balancing apparel print craft with lifestyle energy.",
        frameType: "mobile-card",
        aspectHint: "portrait",
      },
    ],
  },
  {
    id: "monastery",
    index: "",
    slug: "monastery",
    client: "Monastery",
    title: "Monastery: Where Beauty Meets Ritual",
    headline:
      "Mindful Brand Storytelling & Multi-Format Beauty Campaign System",
    bannerTitle: "MONASTERY · WHERE BEAUTY MEETS RITUAL",
    category: "Brand & Campaigns",
    tags: ["Campaigns", "Brand Engagement"],
    summary:
      "Blending purity with purpose, we shaped a refined brand presence—rooted in mindful storytelling and elevated aesthetics to celebrate modern beauty essentials.",
    accentTint: "#F4F8F4",
    collageStyle: {
      variant: "figma-frame",
      tilt: -1.6,
      stickyNote:
        "Botanical tones + tactile beauty art direction crafted for ritual skincare & cosmetics.",
    },
    heroImage: "/assets/work/monastery-bloom.webp",
    secondaryImage: "/assets/work/monastery-reel.webp",
    deliverables: [
      "Campaign Art Direction & Visual Identity Alignment",
      "Reel & Story Motion Cover Systems",
      "Product Launch Posters (Strawberry Bloom & Eyeliner)",
      "Multi-Grid Social Engagement Assets",
    ],
    industry: "Beauty, Skincare & Wellness",
    challenge:
      "Monastery sought an elevated, serene digital aesthetic that honored clean vegan formulations while making product launches like Strawberry Bloom Lip Balm and Day + Night Eyeliner feel tactile and editorial.",
    approach:
      "Infyniq developed a soft-rose and botanical-green visual language pairing refined serif typography, delicate linework diagrams, macro beauty photography, and cohesive Shop Now callouts across static carousels and social video reels.",
    craftHighlights: [
      {
        title: "Sensory Product Launches",
        detail:
          "Editorial poster compositions like 'Strawberry Bloom' uniting 3D-lit product photography with flowing botanical linework.",
      },
      {
        title: "Day + Night Reel Architecture",
        detail:
          "Split-screen social video covers communicating vegan, water-resistant product benefits in a single glance.",
      },
      {
        title: "Cohesive Brand System",
        detail:
          "Balanced four-quadrant beauty grids anchored by Monastery's signature botanical wordmark.",
      },
    ],
    gallery: [
      {
        src: "/assets/work/monastery-bloom.webp",
        alt: "Monastery Strawberry Bloom lip balm campaign creative",
        caption:
          "Product Launch Poster — 'Strawberry Bloom' editorial creative pairing serif display type with tactile product photography.",
        frameType: "mobile-card",
        aspectHint: "portrait",
      },
      {
        src: "/assets/work/monastery-reel.webp",
        alt: "Monastery Day + Night vegan eyeliner video reel creative",
        caption:
          "Social Reel Design — Split-frame Day + Night vegan eyeliner story creative.",
        frameType: "mobile-card",
        aspectHint: "portrait",
      },
      {
        src: "/assets/work/monastery-grid.webp",
        alt: "Monastery four-quadrant eyeliner and lip balm beauty grid",
        caption:
          "Editorial Grid System — Close-up texture & benefit storytelling across eyeliner and lip care.",
        frameType: "editorial-split",
        aspectHint: "landscape",
      },
      {
        src: "/assets/work/monastery-logo.webp",
        alt: "Monastery signature green wordmark emblem",
        caption:
          "Brand Sign-Off — Clean botanical green identity mark anchoring campaign touchpoints.",
        frameType: "brand-mark",
        aspectHint: "square",
      },
    ],
    linkedTestimonial: {
      quote:
        "Excellent service with great planning and smooth execution. Highly recommended.",
      name: "Dharti Prajapati",
      role: "monastery CEO",
    },
  },
  {
    id: "shree-maruti-associates",
    index: "",
    slug: "shree-maruti-associates",
    client: "Shree Maruti Associates",
    title: "Shree Maruti Associates: Law with Integrity",
    headline:
      "Authoritative Corporate Legal & Labour Compliance Web Platform",
    bannerTitle: "SHREE MARUTI ASSOCIATES · LAW WITH INTEGRITY",
    category: "Web Development",
    tags: ["Web Development", "Web Maintenance"],
    summary:
      "Delivering trusted legal solutions through expertise, diligence, and a commitment to protecting client interests.",
    accentTint: "#F6F2EC",
    collageStyle: {
      variant: "blue-folder",
      tilt: 1.5,
    },
    heroImage: "/assets/work/maruti-hero.webp",
    secondaryImage: "/assets/work/maruti-practice.webp",
    scrollableFullPage: "/assets/work/maruti-full.webp",
    deliverables: [
      "Corporate Legal Website Design & Development",
      "Structured 6-Pillar Compliance Practice Directory",
      "Interactive Legal Consultation & Working-Hours Module",
      "Ongoing Website Maintenance & Content Governance",
    ],
    industry: "Legal Advisory & Labour Law Compliance",
    challenge:
      "Shree Maruti Associates required an authoritative, trustworthy web presence capable of organizing complex statutory and labour compliance services—from Factory Compliance and EPF to ESI and Gratuity—into an approachable digital experience.",
    approach:
      "We designed and developed a distinguished dark-charcoal, warm-ivory, and brass-gold web platform featuring structured numbered practice areas, a transparent 4-stage legal engagement timeline, attorney profiles, and direct appointment scheduling.",
    craftHighlights: [
      {
        title: "Commanding Executive Hero",
        detail:
          "Refined obsidian and antique-gold hero banner establishing immediate institutional credibility and clear appointment CTAs.",
      },
      {
        title: "Structured Compliance Architecture",
        detail:
          "Numbered 01–06 Practice Areas grid presenting Factory Compliance, EPF, Contract Labour, Bonus, Gratuity, and ESI with clarity.",
      },
      {
        title: "Transparent Legal Process Timeline",
        detail:
          "Step-by-step client engagement roadmap covering Site Inspection, Legal Documentation, Strategy Development, and Support.",
      },
    ],
    gallery: [
      {
        src: "/assets/work/maruti-hero.webp",
        alt: "Shree Maruti Associates legal defense website hero section",
        caption:
          "Executive Hero — Authoritative dark-and-gold digital flagship with instant appointment CTA.",
        frameType: "browser",
        aspectHint: "wide",
      },
      {
        src: "/assets/work/maruti-practice.webp",
        alt: "Shree Maruti Associates numbered Practice Areas grid",
        caption:
          "Practice Areas Directory — Structured 01–06 compliance breakdown for effortless corporate navigation.",
        frameType: "browser",
        aspectHint: "wide",
      },
      {
        src: "/assets/work/maruti-experience.webp",
        alt: "Shree Maruti Associates Why Choose Us and Working Hours section",
        caption:
          "Institutional Trust & Schedule — Heritage credentials paired with structured consultation hours.",
        frameType: "browser",
        aspectHint: "wide",
      },
      {
        src: "/assets/work/maruti-timeline.webp",
        alt: "Shree Maruti Associates 4-stage legal workflow timeline",
        caption:
          "Engagement Timeline — Visual step-by-step legal compliance roadmap.",
        frameType: "browser",
        aspectHint: "wide",
      },
    ],
  },
  {
    id: "simplq",
    index: "",
    slug: "simplq",
    client: "Simplq",
    title: "Simplq: Beauty Made Simple",
    headline:
      "Ingredient-Forward Social Media & Playful Product Promotions",
    bannerTitle: "SIMPLQ · BEAUTY MADE SIMPLE",
    category: "Brand & Campaigns",
    tags: ["Social Media Management", "Promotions"],
    summary:
      "From everyday makeup to skin-loving beauty essentials, Simplq creates high-quality products designed for comfort, performance, and effortless confidence—made to fit your daily routine.",
    accentTint: "#F5F0EE",
    collageStyle: {
      variant: "figma-frame",
      tilt: -1.3,
    },
    heroImage: "/assets/work/simplq-primer.webp",
    secondaryImage: "/assets/work/simplq-mascara.webp",
    deliverables: [
      "Social Media Management & Feed Art Direction",
      "Ingredient Spotlight Educational Graphics",
      "Character-Driven Promotional Creatives",
      "Everyday Beauty Campaign Copy & Visuals",
    ],
    industry: "Cosmetics & Daily Skincare",
    challenge:
      "Simplq wanted its daily-routine beauty line to feel approachable, ingredient-transparent, and genuinely fun on social media—standing out from overly clinical skincare feeds.",
    approach:
      "Infyniq paired warm pastel ingredient breakdowns (highlighting Almond Oil, Jojoba Oil, and Rosehip Oil for Soft Fix Primer) with witty illustrated product storytelling ('I don't cry... even when you do') to drive organic engagement and brand affinity.",
    craftHighlights: [
      {
        title: "Ingredient-Transparent Visuals",
        detail:
          "Clean illustrated botanical callouts making skin-loving primer ingredients effortless to understand at a glance.",
      },
      {
        title: "Playful Illustrated Personality",
        detail:
          "Expressive character doodles and water-splash art direction bringing waterproof performance claims to life.",
      },
      {
        title: "Approachable Daily-Routine Tone",
        detail:
          "Soft pastel palettes and consistent Simplq badge framing across promotional campaigns.",
      },
    ],
    gallery: [
      {
        src: "/assets/work/simplq-primer.webp",
        alt: "Simplq Soft Fix Primer ingredient spotlight social post",
        caption:
          "Ingredient Education — Soft Fix Primer spotlighting Almond, Jojoba, and Rosehip botanical oils.",
        frameType: "mobile-card",
        aspectHint: "portrait",
      },
      {
        src: "/assets/work/simplq-mascara.webp",
        alt: "Simplq playful waterproof eyeliner social media promotion",
        caption:
          "Promotional Storytelling — Playful illustrated creative highlighting smudge-free, waterproof confidence.",
        frameType: "mobile-card",
        aspectHint: "portrait",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: PortfolioProject;
  next: PortfolioProject;
} {
  const idx = PORTFOLIO_PROJECTS.findIndex((p) => p.slug === slug);
  const safeIdx = idx === -1 ? 0 : idx;
  const prevIdx =
    (safeIdx - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
  const nextIdx = (safeIdx + 1) % PORTFOLIO_PROJECTS.length;
  return {
    prev: PORTFOLIO_PROJECTS[prevIdx],
    next: PORTFOLIO_PROJECTS[nextIdx],
  };
}
