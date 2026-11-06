#!/usr/bin/env python3
"""Static site generator for the Infyniq Solutions portfolio.
Run: python3 scripts/build.py   (regenerates HTML from the data below)
The generated HTML is already included, so you can host the folder as-is.
"""
from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parents[1]

SITE = {
    "name": "Infyniq Solutions",
    "email": "info@infyniq.in",
    "phone": "+91 8487009498",
    "phone_href": "+918487009498",
    "address": "N-301 SG Business Hub, Near Indian Oil Petrol Pump, Vasant Nagar, Ognaj, Ahmedabad, Gujarat 380060",
    "hours": ["Mon – Fri: 9:30 am to 8:30 pm", "Sat – Sun: 9:30 am to 1:30 pm"],
    "url": "https://www.infyniq.in",
}

PROJECTS = [
    {
        "slug": "meridian", "title": "Meridian", "year": "2026", "category": "E-commerce · Horology",
        "services": "Web Design, Web Development, E-commerce, UX/UI",
        "tags": "web ecommerce design", "cover": "meridian-cover.webp", "ar": "4/3", "size": "wide",
        "live": "https://meridian-psi-lilac.vercel.app/",
        "summary": "A considered e-commerce experience for a mechanical watch atelier — collections, product pages, journal, events and a private-viewing booking flow.",
        "challenge": "Meridian needed a storefront that felt as precise as the watches it sells: calm editorial storytelling, clear product discovery across four collections, and commerce details (warranty, returns, servicing) that build trust without shouting.",
        "approach": "We designed a restrained, type-led interface with a serif display voice, structured collection and product templates, an archive-sale module with countdown, an events calendar and a long-form journal. The build is fully responsive with fast image loading and accessible navigation.",
        "deliverables": ["Storefront & collection architecture", "Product detail templates with variants", "Archive sale & countdown module", "Events / private viewing booking", "Journal & newsletter capture", "Responsive, performance-minded build"],
        "gallery": [("meridian-watch.webp", "Product editorial — Atlas GMT 40"), ("meridian-movement.webp", "Atelier story — movement finishing")],
        "stats": [("08", "References"), ("04", "Collections"), ("5 yr", "Warranty flow")],
    },
    {
        "slug": "pulse-crm", "title": "PulseCRM", "year": "2026", "category": "SaaS · Sales & Revenue",
        "services": "Product Design, Web App Development, UX/UI, Dashboards",
        "tags": "web app design", "cover": "pulse-cover.webp", "ar": "4/3", "size": "wide",
        "live": "https://lead-crm-lemon-three.vercel.app/",
        "summary": "A unified sales pipeline and revenue-intelligence workspace with role-based access for admins, managers and workers, lead tracking and team analytics.",
        "challenge": "Sales teams were juggling spreadsheets and disconnected tools. PulseCRM had to bring leads, pipeline stages, won revenue and team performance into one place — with different views for different roles.",
        "approach": "We built a role-aware dashboard suite: a secure sign-in with quick role login, a live pipeline overview, lead management, and revenue analytics. The interface favours dense-but-legible data, clear status colours and a mobile-friendly layout.",
        "deliverables": ["Role-based authentication (Admin / Manager / Worker)", "Live pipeline & lead management", "Revenue analytics dashboard", "Team performance views", "Responsive workspace UI", "Design system for data-heavy screens"],
        "gallery": [("pulsecrm-login.webp", "Revenue intelligence artwork"), ("pulse-cover.webp", "Product cover — live pipeline suite")],
        "stats": [("42", "Active leads (demo)"), ("$1.1M", "Won revenue (demo)"), ("08", "Team members (demo)")],
    },
    {
        "slug": "vraj-interior", "title": "Vraj Interior", "year": "2025", "category": "Interior Design & Architecture",
        "services": "Web Development, Web Maintenance",
        "tags": "web", "cover": "img3.webp", "ar": "4/3", "size": "wide",
        "live": "",
        "summary": "Design that shapes everyday living — a portfolio website for a turnkey interior studio spanning residential and commercial design, custom furniture and refined colour work.",
        "challenge": "Vraj Interior needed a digital home that matched the craftsmanship of its physical work: a place to showcase projects, explain its turnkey process and win enquiries from homeowners and businesses.",
        "approach": "We developed a clean, image-forward website with a strong editorial hero, project showcases, service breakdowns and an about section that communicates quality and timely delivery. Ongoing maintenance keeps the site fast and current.",
        "deliverables": ["Custom responsive website", "Project & service showcases", "Enquiry flow", "Content structure & copy support", "Ongoing web maintenance"],
        "gallery": [("img4.webp", "About / clients section"), ("img3.webp", "Homepage — Interior Design")],
        "stats": [("Web", "Development"), ("Care", "Maintenance"), ("Turnkey", "Storytelling")],
    },
    {
        "slug": "shree-maruti", "title": "Shree Maruti Associates", "year": "2025", "category": "Legal Services",
        "services": "Web Development, Web Maintenance",
        "tags": "web", "cover": "shree-cover.webp", "ar": "4/5", "size": "tall",
        "live": "",
        "summary": "Law with integrity — a trusted digital presence for a legal practice, communicating expertise, diligence and a commitment to protecting client interests.",
        "challenge": "The firm needed to present decades of experience, six practice areas and its attorney team with authority and clarity, while making it easy for potential clients to request an appointment.",
        "approach": "We built a structured, credibility-first website: practice-area pages, a firm timeline, attorney profiles, working hours, latest news and a clear appointment call-to-action — all under a restrained dark-and-gold visual language.",
        "deliverables": ["Multi-page legal website", "Practice area templates", "Attorney profiles & timeline", "Appointment enquiry CTA", "News section", "Ongoing maintenance"],
        "gallery": [("shree-cover.webp", "Homepage hero — Global force in legal defense"), ("img9.webp", "Full page overview")],
        "stats": [("06", "Practice areas"), ("28+", "Years highlighted"), ("Legal", "Brand voice")],
    },
    {
        "slug": "easyteezy", "title": "Easyteezy", "year": "2025", "category": "Fashion & E-commerce",
        "services": "Meta Campaign, Social Media Management",
        "tags": "marketing", "cover": "img1.webp", "ar": "4/5", "size": "tall",
        "live": "",
        "summary": "Trendy T-shirts, easy comfort — campaign creative and social media management for a modern fashion label built for daily wear.",
        "challenge": "Easyteezy wanted to turn bold graphics and everyday essentials into a recognisable social presence and performance campaigns that convert browsers into buyers.",
        "approach": "We produced campaign creative around product drops and price-point offers, managed the social calendar, and ran Meta campaigns with audience testing and creative iteration.",
        "deliverables": ["Meta ad campaigns", "Social media management", "Campaign creative & product promos", "Content calendar", "Performance reporting"],
        "gallery": [("img1.webp", "Fresh fits campaign"), ("img2.webp", "Summer vibes social creative")],
        "stats": [("Meta", "Campaigns"), ("Social", "Management"), ("Fashion", "Category")],
    },
    {
        "slug": "monastery", "title": "Monastery", "year": "2025", "category": "Beauty & Personal Care",
        "services": "Campaigns, Brand Engagement",
        "tags": "marketing design", "cover": "img7.webp", "ar": "4/3", "size": "wide",
        "live": "",
        "summary": "Where beauty meets ritual — a refined brand presence rooted in mindful storytelling and elevated aesthetics for modern beauty essentials.",
        "challenge": "Monastery needed campaign visuals and engagement that felt premium and calm, celebrating everyday rituals rather than hard-selling products.",
        "approach": "We shaped a soft, editorial visual system for product campaigns — eyeliner, lip balm, day/night routines — and managed brand engagement across channels with consistent tone and layouts.",
        "deliverables": ["Campaign creative system", "Product story visuals", "Brand engagement", "Social content", "Launch assets"],
        "gallery": [("img7.webp", "Eyeliner & lip balm campaign"), ("img5.webp", "Day + night eyeliner story"), ("imgg6.webp", "Strawberry Bloom launch"), ("img8.webp", "Brand mark")],
        "stats": [("Brand", "Engagement"), ("Campaigns", "Creative"), ("Beauty", "Category")],
    },
    {
        "slug": "simplq", "title": "Simplq", "year": "2025", "category": "Beauty & Personal Care",
        "services": "Social Media Management, Promotions",
        "tags": "marketing", "cover": "img11.webp", "ar": "4/5", "size": "tall",
        "live": "",
        "summary": "Beauty made simple — social media management and promotions for high-quality, skin-loving essentials designed for effortless daily confidence.",
        "challenge": "Simplq needed a playful yet trustworthy social voice that explains product benefits quickly and keeps the brand present in a crowded beauty feed.",
        "approach": "We managed the social calendar, produced product-led promotional creative (primers, lip products) and ran promotions with clear benefit messaging and consistent brand character.",
        "deliverables": ["Social media management", "Promotional creative", "Product benefit storytelling", "Content calendar", "Channel growth support"],
        "gallery": [("img11.webp", "Character-led product creative"), ("img10.webp", "Soft Fix Primer benefits")],
        "stats": [("Social", "Management"), ("Promos", "Creative"), ("Beauty", "Category")],
    },
]

SERVICES = [
    ("Web Development", "Custom, responsive websites and web applications designed to meet your business goals — clean code, modern tech, seamless user experiences.",
     ["Business websites", "E-commerce", "Web applications", "Landing pages", "CMS", "Maintenance"]),
    ("App Development", "High-performance mobile applications for iOS and Android with smooth functionality, intuitive UX and room to grow.",
     ["iOS & Android", "Cross-platform", "Flutter", "API integration", "App store launch", "Support"]),
    ("UI/UX Design", "User-focused designs that are clean, engaging and optimised to convert visitors into customers.",
     ["User research", "Wireframes", "Figma prototypes", "Design systems", "Usability testing", "Handoff"]),
    ("Digital Marketing", "Data-driven strategies that increase visibility, reach the right audience and maximise ROI.",
     ["Performance marketing", "Meta & Google Ads", "Lead generation", "Funnel strategy", "Analytics", "Reporting"]),
    ("SEO Services", "Boost online visibility and rank higher with data-driven SEO strategies built for long-term growth.",
     ["Technical SEO", "On-page SEO", "Keyword strategy", "Content optimisation", "Local SEO", "Audits"]),
    ("Social Media Management", "We manage and grow your social presence with smart content, consistent engagement and analytics.",
     ["Content calendars", "Creative production", "Community engagement", "Campaigns", "Brand voice", "Insights"]),
]

INDUSTRIES = ["E-commerce", "Entertainment", "Health & Fitness", "Social Networking", "Banking & Finance", "Transportation", "Education", "Real Estate"]

TESTIMONIALS = [
    ("I recently hired this company to develop my e-commerce website, and I couldn't be happier with the results! From start to finish, the team was incredibly cooperative and supportive. They listened to my vision, offered valuable suggestions, and kept me informed throughout the entire process. The website exceeded my expectations in both design and functionality.", "Harsh Rathod", "CEO, Harvon"),
    ("I had a great time working with this IT company. The team is professional, supportive, and very knowledgeable.", "Sandip Patel", "Founder, Vraj Interior"),
    ("Excellent service with great planning and smooth execution. Highly recommended.", "Dharti Prajapati", "CEO, Monastery"),
    ("Infyniq IT & Digital Marketing is a reliable and professional company. The team is supportive, delivers work on time, and provides good guidance in IT and digital marketing services. Overall, a satisfying experience. Highly recommended.", "Zalak Chaudhary", "SEO Specialist"),
]

ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>'
ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'
ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
ARROW_UP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'

MARK = '''<svg class="mark" viewBox="0 0 1150 1490" aria-hidden="true"><path fill="#4DA3FF" d="M68.36 690.04l210.87 0c36.7,0 66.64,-29.94 66.64,-66.65l0 -210.84c0,-36.7 -29.94,-66.63 -66.64,-66.63l-212.55 0c-36.74,0 -66.69,-29.97 -66.69,-66.72l0 -212.55c0,-36.7 29.94,-66.64 66.69,-66.64l212.55 0c36.7,0 66.64,29.94 66.64,66.64l0 212.55c0,36.57 29.94,66.72 66.65,66.72l212.58 0c36.7,0 66.63,30.06 66.63,66.63l0 210.84c0,36.54 -30.06,66.65 -66.63,66.65l-212.58 0c-36.48,0 -66.65,30.16 -66.65,66.67l0 319.12c0,36.62 -30.04,66.65 -66.64,66.65l-210.87 0c-36.6,0 -66.65,-29.94 -66.65,-66.65l0 -319.12c0,-36.78 29.94,-66.67 66.65,-66.67z"/><path fill="#FFB433" d="M1077.85 798.61l-210.87 0c-36.7,0 -66.64,29.94 -66.64,66.65l0 210.84c0,36.7 29.94,66.61 66.64,66.61l212.58 0c36.72,0 66.65,30 66.65,66.71l0 212.58c0,36.7 -29.94,66.64 -66.65,66.64l-212.58 0c-36.7,0 -66.64,-29.94 -66.64,-66.64l0 -212.58c0,-36.54 -29.91,-66.71 -66.65,-66.71l-212.54 0c-36.72,0 -66.65,-30.07 -66.65,-66.61l0 -210.84c0,-36.54 30.06,-66.65 66.65,-66.65l212.54 0c36.48,0 66.65,-30.16 66.65,-66.7l0 -319.73c0,-36.61 30.04,-66.65 66.64,-66.65l210.87 0c36.63,0 66.69,29.97 66.69,66.65l0 319.73c0,36.73 -29.97,66.7 -66.69,66.7z"/></svg>'''


def prefix(depth):
    return "../" * depth


def header(depth, page):
    p = prefix(depth)
    links = [("index.html", "Home"), ("work.html", "Portfolio"), ("studio.html", "The Studio"), ("services.html", "Services"), ("contact.html", "Contact")]
    nav = "".join(f'<a href="{p}{h}">{t}</a>' for h, t in links)
    mob = "".join(f'<a href="{p}{h}"><span>{t}</span><small>0{i+1}</small></a>' for i, (h, t) in enumerate(links))
    return f'''<a class="skip-link" href="#main">Skip to main content</a>
<div id="preloader" class="preloader" aria-hidden="true">
  <svg class="preloader__mark" viewBox="0 0 1150 1490" fill="none" stroke-width="18"><path stroke="#4DA3FF" d="M68 690h211c37 0 67-30 67-67V413c0-37-30-67-67-67H67c-37 0-67-30-67-67V67C0 30 30 0 67 0h212c37 0 67 30 67 67v212c0 37 30 67 67 67h212c37 0 67 30 67 67v210c0 37-30 67-67 67H413c-37 0-67 30-67 67v319c0 37-30 67-67 67H68c-37 0-67-30-67-67V757c0-37 30-67 67-67z"/><path stroke="#FFB433" d="M1078 799H867c-37 0-67 30-67 67v210c0 37 30 67 67 67h213c37 0 67 30 67 67v212c0 37-30 67-67 67H867c-37 0-67-30-67-67v-212c0-37-30-67-67-67H521c-37 0-67-30-67-67V866c0-37 30-67 67-67h212c37 0 67-30 67-67V413c0-37 30-67 67-67h211c37 0 67 30 67 67v319c0 37-30 67-67 67z"/></svg>
  <div class="preloader__word">infyniq<small>Solutions</small></div>
  <div class="preloader__bar"><i id="preloader-bar"></i></div>
  <div class="preloader__meta"><span>Loading experience</span><b id="preloader-count">000</b></div>
  <div class="preloader__tags"><span>Strategy</span><span>Design</span><span>Technology</span></div>
</div>
<div class="announcement" aria-hidden="true">
  <div class="marquee"><div class="marquee__group">
    <span class="marquee__item">Infyniq Solutions — IT services &amp; digital growth</span>
    <span class="marquee__item">Ahmedabad, India · Working worldwide</span>
    <span class="marquee__item">Web · Apps · UI/UX · Marketing · SEO</span>
    <span class="marquee__item">Now open for new projects</span>
  </div></div>
</div>
<header class="site-header">
  <div class="container">
    <a class="brand" href="{p}index.html" aria-label="Infyniq Solutions — home">
      <img src="{p}assets/images/logo-mark.svg" alt="" width="31" height="40">
      <span class="brand__text"><span class="brand__name">infyniq</span><span class="brand__sub">Solutions</span></span>
    </a>
    <nav class="nav" aria-label="Primary">{nav}<a class="script-link" href="{p}contact.html">start a project</a></nav>
    <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
  </div>
</header>
<div id="mobile-menu" class="mobile-menu" aria-hidden="true">
  <nav aria-label="Mobile">{mob}</nav>
  <a class="script-link" href="{p}contact.html">start a project</a>
  <div class="mobile-menu__foot"><span>{SITE["email"]}</span><span>{SITE["phone"]}</span><span>Ahmedabad, IN</span></div>
</div>'''


def footer(depth):
    p = prefix(depth)
    return f'''<footer class="site-footer" id="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="{p}index.html"><img src="{p}assets/images/logo-light.svg" alt="Infyniq Solutions" width="146" height="44"></a>
        <p>We’re a team of technology experts building high-impact digital products — combining strategy, design and development to transform businesses and empower users.</p>
        <a class="script-link" href="{p}contact.html" style="margin-top:18px">let’s talk</a>
      </div>
      <div>
        <h3>Sitemap</h3>
        <ul>
          <li><a href="{p}index.html">Home</a></li>
          <li><a href="{p}work.html">Portfolio</a></li>
          <li><a href="{p}studio.html">The Studio</a></li>
          <li><a href="{p}services.html">Services</a></li>
          <li><a href="{p}contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3>Services</h3>
        <ul>
          <li><a href="{p}services.html#web-development">Web Development</a></li>
          <li><a href="{p}services.html#app-development">App Development</a></li>
          <li><a href="{p}services.html#ui-ux-design">UI/UX Design</a></li>
          <li><a href="{p}services.html#digital-marketing">Digital Marketing</a></li>
          <li><a href="{p}services.html#seo-services">SEO</a></li>
          <li><a href="{p}services.html#social-media-management">Social Media</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h3>Get in touch</h3>
        <a href="mailto:{SITE["email"]}">{SITE["email"]}</a>
        <a href="tel:{SITE["phone_href"]}">{SITE["phone"]}</a>
        <address>{SITE["address"]}</address>
      </div>
    </div>
    <div class="footer-word" aria-hidden="true">infyniq</div>
    <div class="footer-bottom">
      <span>© <span id="year">2026</span> Infyniq Solutions. All rights reserved.</span>
      <span class="time" id="local-time">Ahmedabad, IN</span>
      <a class="to-top" href="#top">Back to top {ARROW_UP}</a>
    </div>
  </div>
</footer>
<div class="cursor" id="cursor" aria-hidden="true"></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script src="{p}js/main.js" defer></script>
</body>
</html>'''


def head(title, desc, depth, page, og="assets/images/meridian-cover.webp"):
    p = prefix(depth)
    canonical = f'{SITE["url"]}/{page if page != "index.html" else ""}'
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{escape(title)}</title>
<meta name="description" content="{escape(desc)}">
<meta name="theme-color" content="#191b1a">
<link rel="canonical" href="{canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="{escape(title)}">
<meta property="og:description" content="{escape(desc)}">
<meta property="og:image" content="{SITE["url"]}/{og}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{p}assets/images/favicon.svg" type="image/svg+xml">
<link rel="preload" href="{p}assets/fonts/plus-jakarta-sans-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{p}assets/fonts/lekton-400.woff2" as="font" type="font/woff2" crossorigin>
<script>document.documentElement.classList.add("js");setTimeout(function(){{var p=document.getElementById("preloader");if(p&&!p.classList.contains("is-done")){{p.remove();document.documentElement.classList.remove("no-scroll");}}}},5000);</script>
<link rel="stylesheet" href="{p}css/fonts.css">
<link rel="stylesheet" href="{p}css/style.css">
</head>
<body id="top">'''


def project_card(pr, depth, reveal=True):
    p = prefix(depth)
    cls = "project-card reveal" if reveal else "project-card"
    badge = '<span class="badge">Live project</span>' if pr["live"] else ""
    return f'''<a class="{cls}" href="{p}project/{pr["slug"]}.html" data-tags="{pr["tags"]}">
  <div class="project-card__media" style="--ar:{pr["ar"]}">
    <img src="{p}assets/images/{pr["cover"]}" alt="{escape(pr["title"])} — {escape(pr["category"])}" loading="lazy" decoding="async">
    {badge}
    <span class="view">{ARROW}</span>
  </div>
  <div class="project-card__meta">
    <div class="project-card__row"><span>{escape(pr["title"])}</span><span>{pr["year"]}</span></div>
    <div class="project-card__row">{escape(pr["category"])}</div>
    <div class="project-card__row">{escape(pr["services"])}</div>
  </div>
</a>'''


def reel_item(pr, depth):
    p = prefix(depth)
    return f'''<a class="reel__item {pr["size"]}" href="{p}project/{pr["slug"]}.html"><figure style="margin:0"><img src="{p}assets/images/{pr["cover"]}" alt="{escape(pr["title"])}" loading="eager" decoding="async"><figcaption><span>{escape(pr["title"])}</span><span>{pr["year"]}</span></figcaption></figure></a>'''


def big_cta(depth, title="Have a project in mind?", text="Whether you’re starting from scratch, changing direction, or ready to scale something that works, we’d love to hear about it."):
    p = prefix(depth)
    return f'''<section class="big-cta">
  <div class="container reveal">
    <h2>{escape(title)}</h2>
    <p>{escape(text)}</p>
    <a class="script-link" href="{p}contact.html">start a project</a>
  </div>
</section>'''


def word_marquee():
    items = ["Web Development", "App Development", "UI/UX Design", "Digital Marketing", "SEO", "Social Media", "E-commerce", "Ongoing Support"]
    inner = "".join(f'<span class="marquee__item">{i}</span>' for i in items)
    return f'<div class="word-marquee" aria-hidden="true"><div class="marquee"><div class="marquee__group">{inner}</div></div></div>'


def testimonial_stack(depth):
    cards = ""
    for i, (q, n, r) in enumerate(TESTIMONIALS):
        cards += f'''<article class="stack__card" data-pos="{i}"><p class="stack__quote">{escape(q)}</p><div class="stack__author"><span class="stack__avatar">{escape(n[0])}</span><div><b>{escape(n)}</b><span>{escape(r)}</span></div></div></article>'''
    return f'''<section class="section testimonials" id="testimonials">
  <div class="container">
    <div class="testimonials__head reveal">
      <span class="eyebrow">Our testimonials</span>
      <h2>Good work. Real results.</h2>
      <p>Every project here started with a conversation. Here’s what the people behind them have to say about working with Infyniq.</p>
    </div>
    <div class="stack reveal" id="testimonial-stack" aria-live="polite">{cards}</div>
    <div class="stack__controls">
      <button class="stack__btn" id="stack-prev" aria-label="Previous testimonial">{ARROW_L}</button>
      <span class="stack__count" id="stack-count">01 / 0{len(TESTIMONIALS)}</span>
      <button class="stack__btn" id="stack-next" aria-label="Next testimonial">{ARROW_R}</button>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------
# Pages
# ----------------------------------------------------------------------
def page_index():
    d = 0; p = ""
    reel = "".join(reel_item(pr, d) for pr in PROJECTS)
    grid = "".join(project_card(pr, d) for pr in PROJECTS[:6])
    caps = [
        ("Web", "Web design • Web development • E-commerce • UX/UI • Digital experiences • Ongoing optimization"),
        ("Apps", "iOS & Android • Cross-platform • Product design • API integration • Launch • Support"),
        ("Growth", "SEO • Performance marketing • Social media • Campaigns • Content • Analytics"),
        ("Ongoing", "Web maintenance • Dedicated resources • Creative support • Consulting • Reporting"),
    ]
    cap_html = "".join(f'<div class="cap-item reveal" data-delay="{i%3}"><h3>{t}<span>0{i+1}</span></h3><p>{s.replace(" • ", " <b>·</b> ")}</p></div>' for i, (t, s) in enumerate(caps))
    industries = "".join(f"<li>{i}</li>" for i in INDUSTRIES)
    html = head("Infyniq Solutions — IT Services, Web & App Development, Digital Growth", "Infyniq Solutions is a full-stack IT agency in Ahmedabad building scalable websites, apps, UI/UX and digital marketing that deliver measurable results.", d, "index.html")
    html += header(d, "index.html")
    html += f'''<main id="main">
<section class="hero">
  <span class="hero__meta">Independent IT studio — Ahmedabad, IN</span>
  <div class="hero__grid">
    <h1 class="hero__left line-reveal"><span>Everything your<br>business needs</span></h1>
    <div class="hero__center-wrap">
      <div class="hero__center reveal" data-delay="1">
        <p>Infyniq Solutions is a full-stack IT agency building scalable, secure digital products — from strategy and design to development and growth — that transform operations and deliver measurable results.</p>
      </div>
      <a class="script-link reveal" data-delay="2" href="contact.html">start a project</a>
    </div>
    <h1 class="hero__right line-reveal"><span>built to scale.</span></h1>
  </div>
  <div class="hero__scroll" aria-hidden="true"><span>Scroll</span><i></i></div>
  <div class="reel" aria-label="Selected projects"><div class="reel__track"><div class="reel__group">{reel}</div></div></div>
</section>

<section class="section" id="work">
  <div class="container">
    <div class="section-head">
      <div class="reveal"><span class="eyebrow">Our work</span><h2>Built different,<br>every time.</h2></div>
      <div class="section-head__right reveal" data-delay="1"><p>Every business has its own story, audience and ambition. Our job is to find what makes it distinct — and build the technology that carries it forward.</p></div>
    </div>
    <div class="work-grid">{grid}</div>
    <div class="work-cta reveal"><a class="btn" href="work.html">View more projects {ARROW}</a></div>
  </div>
</section>

<section class="section" id="capabilities">
  <div class="container">
    <div class="capabilities">
      <div class="capabilities__intro reveal">
        <span class="eyebrow">Capabilities</span>
        <h2>From the first idea to launch — and everything after.</h2>
        <p>We work across web, mobile, design and growth, bringing everything together under one technical direction.</p>
        <a class="script-link" href="contact.html">start a project</a>
      </div>
      <div class="capabilities__visual reveal" data-delay="1">
        <img src="assets/images/about.webp" alt="Modern glass architecture — scalable solutions" loading="lazy">
        <span class="chip"><i></i> Scalable by design</span>
      </div>
      <div class="cap-list">{cap_html}</div>
    </div>
  </div>
</section>

<section class="section" id="studio">
  <div class="container">
    <div class="studio">
      <div class="studio__head reveal"><div><span class="eyebrow">About us</span><h2>The studio</h2></div><a class="script-link" href="studio.html">about us</a></div>
      <div class="studio__side reveal">
        <p>We’re a team of technology experts dedicated to building high-impact digital products for businesses worldwide.</p>
        {MARK}
        <p>We explore. We question. We build things, test them, and bring them to life.</p>
      </div>
      <div class="studio__media reveal" data-delay="1">
        <img src="assets/images/why.webp" alt="Infyniq team collaborating around a table" loading="lazy">
        <span class="caption">Strategy · Design · Development</span>
      </div>
      <div class="studio__side studio__side--right reveal" data-delay="2">
        <p>We keep the team close to the work, because the best results happen when strategy, design, technology and content aren’t separated into different rooms.</p>
        <div class="stats">
          <div class="stat"><b data-count="25" data-suffix="+">0+</b><span>Projects completed</span></div>
          <div class="stat"><b data-count="7" data-suffix="+">0+</b><span>Expert members</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <div class="section-head reveal" style="margin-bottom:32px"><div><span class="eyebrow">Industries</span><h2>Custom solutions for every industry we serve.</h2></div><div class="section-head__right"><p>We bring deep industry expertise to craft solutions that fit your sector — and build technology that delivers real value.</p></div></div>
    <ul class="industries reveal">{industries}</ul>
  </div>
</section>

{testimonial_stack(d)}
{word_marquee()}
{big_cta(d)}
</main>'''
    html += footer(d)
    return html


def page_work():
    d = 0
    grid = "".join(project_card(pr, d) for pr in PROJECTS)
    html = head("Portfolio — Infyniq Solutions", "Selected web, app, e-commerce and marketing projects by Infyniq Solutions — including Meridian, PulseCRM, Vraj Interior and more.", d, "work.html")
    html += header(d, "work.html")
    html += f'''<main id="main">
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a><span>Portfolio</span></div>
    <div class="page-hero__grid">
      <h1 class="line-reveal"><span>Work that works<br>as hard as you do.</span></h1>
      <p class="reveal">Websites, products and campaigns built to solve real problems. Filter by discipline, or open a project to read the story behind it.</p>
    </div>
  </div>
</section>
<section class="section--tight">
  <div class="container">
    <div class="filters reveal" role="group" aria-label="Filter projects">
      <button class="filter is-active" data-filter="all" aria-pressed="true">All</button>
      <button class="filter" data-filter="web" aria-pressed="false">Web</button>
      <button class="filter" data-filter="ecommerce" aria-pressed="false">E-commerce</button>
      <button class="filter" data-filter="app" aria-pressed="false">Web apps</button>
      <button class="filter" data-filter="design" aria-pressed="false">Design</button>
      <button class="filter" data-filter="marketing" aria-pressed="false">Marketing</button>
    </div>
    <div class="work-grid">{grid}</div>
    <p id="work-empty" class="muted center" hidden style="padding:60px 0">No projects in this category yet.</p>
  </div>
</section>
{word_marquee()}
{big_cta(d, "Your project could be next.", "Tell us what you’re building. We’ll bring the strategy, design and engineering to make it real.")}
</main>'''
    html += footer(d)
    return html


def page_studio():
    d = 0
    html = head("The Studio — Infyniq Solutions", "Built by people, powered by innovation. Meet Infyniq Solutions — our mission, vision, values and process.", d, "studio.html")
    html += header(d, "studio.html")
    steps = [("Discover", "We start with your business objectives, users and constraints — then define what success looks like."),
             ("Design", "Strategy becomes structure: wireframes, prototypes and a visual system that fits your brand."),
             ("Develop", "Clean, scalable code with regular check-ins, testing and transparent progress."),
             ("Grow", "Launch, measure, optimise. We stay close with maintenance, marketing and ongoing support.")]
    steps_html = "".join(f'<div class="step reveal" data-delay="{i}"><h3>{t}</h3><p>{s}</p></div>' for i, (t, s) in enumerate(steps))
    html += f'''<main id="main">
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a><span>The Studio</span></div>
    <div class="page-hero__grid">
      <h1 class="line-reveal"><span>Built by people.<br>Powered by innovation.</span></h1>
      <p class="reveal">At Infyniq, passionate minds come together to create digital experiences that drive growth. We blend strategy, technology and creativity to deliver solutions that make a real impact.</p>
    </div>
  </div>
</section>
<section class="section--tight">
  <div class="container about-grid">
    <img class="reveal" src="assets/images/why.webp" alt="The Infyniq team in a working session" loading="lazy">
    <div class="reveal" data-delay="1">
      <span class="eyebrow">Our company</span>
      <h2>Where ideas meet innovation.</h2>
      <p>We believe technology should create real impact. By working closely with startups and enterprises, we design and build scalable digital experiences that solve problems, drive innovation and fuel business growth. Our collaborative mindset and technical expertise help turn ideas into meaningful results.</p>
      <p>Our designers, engineers and problem-solvers build digital solutions that drive growth — and we keep every discipline in the same room.</p>
      <div class="stats">
        <div class="stat"><b data-count="25" data-suffix="+">0+</b><span>Projects completed</span></div>
        <div class="stat"><b data-count="7" data-suffix="+">0+</b><span>Expert members</span></div>
      </div>
    </div>
  </div>
</section>
<section class="section--tight">
  <div class="container">
    <div class="values">
      <div class="value reveal"><span class="num">01 — Mission</span><h3>Empower through technology</h3><p>Empowering organizations through reliable, scalable and future-ready technology solutions that support long-term success.</p></div>
      <div class="value reveal" data-delay="1"><span class="num">02 — Vision</span><h3>A global transformation partner</h3><p>To become a global digital transformation leader, helping businesses evolve through innovative and scalable technology solutions.</p></div>
      <div class="value reveal" data-delay="2"><span class="num">03 — Values</span><h3>Trust, transparency, accountability</h3><p>Built on trust and transparency, we hold ourselves accountable to deliver quality-driven solutions that create real impact.</p></div>
    </div>
  </div>
</section>
<section class="section" id="process">
  <div class="container">
    <div class="section-head"><div class="reveal"><span class="eyebrow">How we work</span><h2>A structured, transparent process.</h2></div><div class="section-head__right reveal" data-delay="1"><p>Every engagement begins with understanding your business objectives and ends with a solution designed to exceed expectations.</p></div></div>
    <div class="process">{steps_html}</div>
  </div>
</section>
<section class="section--tight">
  <div class="container about-grid">
    <div class="reveal">
      <span class="eyebrow">Why Infyniq</span>
      <h2>Why our services stand apart.</h2>
      <p>We combine strategic insight, creative thinking and technical expertise to deliver reliable, future-ready digital solutions. Our team follows a structured, transparent process focused on quality, performance and long-term value.</p>
      <ul class="industries" style="margin-top:24px"><li>Future-proof</li><li>Leading innovation</li><li>AI-driven solutions</li><li>Smart solutions</li></ul>
      <a class="script-link" href="services.html" style="margin-top:24px">explore services</a>
    </div>
    <img class="reveal" data-delay="1" src="assets/images/about.webp" alt="Glass building reaching upward" loading="lazy">
  </div>
</section>
{testimonial_stack(d)}
{big_cta(d, "Let’s build something great together.", "Whether you have a project in mind or just a question — let’s connect and explore how we can support your business.")}
</main>'''
    html += footer(d)
    return html


def slugify(s):
    return s.lower().replace("/", "-").replace(" & ", "-").replace(" ", "-")


def page_services():
    d = 0
    items = ""
    for i, (t, desc, tags) in enumerate(SERVICES):
        sl = slugify(t)
        items += f'''<div class="service reveal" id="{sl}">
  <button class="service__head" aria-expanded="false"><span class="service__num">0{i+1}</span><span class="service__title">{t}</span><span class="service__icon" aria-hidden="true"></span></button>
  <div class="service__body"><div class="service__inner"><div class="service__content">
    <span></span>
    <p>{desc}</p>
    <ul>{"".join(f"<li>{x}</li>" for x in tags)}</ul>
    <a class="script-link" href="contact.html">talk to our experts</a>
  </div></div></div>
</div>'''
    faqs = [
        ("What services do you offer?", "Web development, mobile app development, UI/UX design, digital marketing, SEO and social media management — plus dedicated resources and ongoing maintenance."),
        ("How does your process work?", "We begin with a discovery call to understand your goals, then move through design, development, testing and launch with regular check-ins. After launch we offer support and growth services."),
        ("What are your pricing models?", "Fixed-scope project pricing for defined builds, and monthly retainers for ongoing development, marketing or dedicated resources. We’ll recommend the best fit after understanding your needs."),
        ("How long does a typical project take?", "A business website typically takes 2–4 weeks; e-commerce and web apps 4–10 weeks; mobile apps depend on scope. We share a clear timeline before we start."),
    ]
    faq_html = "".join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q, a in faqs)
    html = head("Services — Infyniq Solutions", "Full-stack IT services: web development, app development, UI/UX design, digital marketing, SEO and social media management.", d, "services.html")
    html += header(d, "services.html")
    html += f'''<main id="main">
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a><span>Services</span></div>
    <div class="page-hero__grid">
      <h1 class="line-reveal"><span>Services that define<br>what we do.</span></h1>
      <p class="reveal">End-to-end digital and IT services that help businesses grow, scale and innovate. Each service is crafted with a clear purpose: measurable impact and long-term value.</p>
    </div>
  </div>
</section>
<section class="section--tight">
  <div class="container">
    <div class="section-head reveal" style="margin-bottom:28px"><div><span class="eyebrow">Our services</span><h2>Explore our core services.</h2></div><div class="section-head__right"><p>We blend strategic thinking, creative design and robust development to deliver scalable digital solutions that support long-term business growth.</p></div></div>
    <div class="services-list">{items}</div>
  </div>
</section>
<section class="section--tight">
  <div class="container">
    <div class="section-head reveal" style="margin-bottom:32px"><div><span class="eyebrow">Industries</span><h2>Custom solutions for every industry we serve.</h2></div></div>
    <ul class="industries reveal">{"".join(f"<li>{i}</li>" for i in INDUSTRIES)}</ul>
  </div>
</section>
<section class="section" id="faq">
  <div class="container">
    <div class="testimonials__head reveal"><span class="eyebrow">FAQ</span><h2>Frequently asked questions.</h2><p>Have questions about our services, process or pricing? We’ve answered the most common ones to help you get started with ease.</p></div>
    <div class="faq reveal">{faq_html}</div>
  </div>
</section>
{word_marquee()}
{big_cta(d, "Not sure where to start?", "Tell us about your business and goals. We’ll help you choose the right mix of services — and a plan that fits.")}
</main>'''
    html += footer(d)
    return html


def page_contact():
    d = 0
    options = ["Web Development", "App Development", "UI/UX / Figma Design", "Dedicated Resource", "Social Media Management", "Digital Marketing", "Performance Marketing", "SEO", "Other"]
    opts = "".join(f'<option value="{o}">{o}</option>' for o in options)
    html = head("Contact — Infyniq Solutions", "Let’s start something great together. Contact Infyniq Solutions in Ahmedabad — call, email or send a project enquiry.", d, "contact.html")
    html += header(d, "contact.html")
    html += f'''<main id="main">
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a><span>Contact</span></div>
    <div class="page-hero__grid">
      <h1 class="line-reveal"><span>Let’s start something<br>great together.</span></h1>
      <p class="reveal">Whether you have a project in mind or just a question — let’s connect and explore how we can support your business.</p>
    </div>
  </div>
</section>
<section class="section--tight">
  <div class="container contact-grid">
    <div class="contact-info reveal">
      <div class="contact-info__item"><small>Contact us</small><div class="row"><a href="mailto:{SITE["email"]}">{SITE["email"]}</a><button class="copy-btn" data-copy="{SITE["email"]}">Copy</button></div><div class="row" style="margin-top:8px"><a href="tel:{SITE["phone_href"]}">{SITE["phone"]}</a><button class="copy-btn" data-copy="{SITE["phone"]}">Copy</button></div></div>
      <div class="contact-info__item"><small>Address</small><p>{SITE["address"]}</p></div>
      <div class="contact-info__item"><small>Working time</small><p>{SITE["hours"][0]}<br>{SITE["hours"][1]}</p></div>
      <div class="contact-info__item"><small>Response</small><p>We usually reply within one business day.</p></div>
    </div>
    <div class="reveal" data-delay="1">
      <span class="eyebrow">Project enquiry</span>
      <h2 style="margin-bottom:28px">We’re here to help you move forward.</h2>
      <form id="contact-form" class="form" novalidate>
        <div class="field"><label for="f-name">Your name <i>*</i></label><input id="f-name" name="name" type="text" autocomplete="name" placeholder="Full name" required><span class="error"></span></div>
        <div class="field"><label for="f-email">Your email <i>*</i></label><input id="f-email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required><span class="error"></span></div>
        <div class="field"><label for="f-phone">Your contact no <i>*</i></label><input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="+91 00000 00000" required><span class="error"></span></div>
        <div class="field"><label for="f-service">Service <i>*</i></label><select id="f-service" name="service" required><option value="">Choose a service</option>{opts}</select><span class="error"></span></div>
        <div class="field full"><label for="f-message">Description <i>*</i></label><textarea id="f-message" name="message" placeholder="Tell us about your project, goals and timeline…" required></textarea><span class="error"></span></div>
        <div class="form__foot">
          <p class="form__note">Submitting opens your email app with the message pre-filled to {SITE["email"]}. No data is stored on this site.</p>
          <button class="btn btn-solid" type="submit">Send message {ARROW}</button>
        </div>
        <div class="form__success" id="form-success" role="status"><b>Your message is ready.</b>Your email app should open with the enquiry pre-filled. If it didn’t, <a id="mailto-link" href="mailto:{SITE["email"]}">click here to open it</a> or write to us directly at <a href="mailto:{SITE["email"]}">{SITE["email"]}</a>.</div>
      </form>
    </div>
  </div>
  <div class="container">
    <div class="map-embed reveal">
      <div>
        <span class="eyebrow" style="text-align:center">Find us</span>
        <h3>SG Business Hub, Ognaj, Ahmedabad</h3>
        <p>{SITE["address"]}</p>
        <a class="btn btn-sm" href="https://www.google.com/maps/search/?api=1&query={escape(SITE["address"].replace(' ', '+'))}" target="_blank" rel="noopener">Open in Google Maps {ARROW}</a>
      </div>
    </div>
  </div>
</section>
</main>'''
    html += footer(d)
    return html


def page_project(pr, idx):
    d = 1; p = "../"
    prev = PROJECTS[(idx - 1) % len(PROJECTS)]
    nxt = PROJECTS[(idx + 1) % len(PROJECTS)]
    live = f'<a class="btn btn-solid" href="{pr["live"]}" target="_blank" rel="noopener">Visit live project {ARROW}</a>' if pr["live"] else f'<a class="btn" href="{p}contact.html">Start a similar project {ARROW}</a>'
    stats = "".join(f'<div><small>{escape(l)}</small><span>{escape(v)}</span></div>' for v, l in pr["stats"])
    gallery = "".join(f'<figure class="reveal"><img src="{p}assets/images/{img}" alt="{escape(pr["title"])} — {escape(cap)}" loading="lazy"><figcaption>{escape(cap)}</figcaption></figure>' for img, cap in pr["gallery"])
    checks = "".join(f"<li>{escape(x)}</li>" for x in pr["deliverables"])
    html = head(f'{pr["title"]} — Project — Infyniq Solutions', pr["summary"], d, f'project/{pr["slug"]}.html', f'assets/images/{pr["cover"]}')
    html += header(d, "work.html")
    html += f'''<main id="main">
<section class="project-hero">
  <div class="container">
    <div class="breadcrumb"><a href="{p}index.html">Home</a><a href="{p}work.html">Portfolio</a><span>{escape(pr["title"])}</span></div>
    <div class="page-hero__grid">
      <h1 class="line-reveal"><span>{escape(pr["title"])}</span></h1>
      <p class="reveal">{escape(pr["summary"])}</p>
    </div>
    <div class="project-hero__meta reveal">
      <div><small>Category</small><span>{escape(pr["category"])}</span></div>
      <div><small>Services</small><span>{escape(pr["services"])}</span></div>
      <div><small>Year</small><span>{pr["year"]}</span></div>
      <div><small>Client</small><span>{escape(pr["title"])}</span></div>
    </div>
    <div style="margin-top:28px" class="reveal">{live}</div>
    <div class="project-hero__media reveal"><img src="{p}assets/images/{pr["cover"]}" alt="{escape(pr["title"])} project cover" fetchpriority="high"></div>
  </div>
</section>
<section class="container">
  <div class="project-body">
    <div>
      <div class="block reveal"><span class="eyebrow">Overview</span><h2>The project at a glance.</h2><div class="stats" style="grid-template-columns:1fr;margin-top:24px">{"".join(f'<div class="stat"><b style="font-size:28px">{escape(v)}</b><span>{escape(l)}</span></div>' for v, l in pr["stats"])}</div></div>
    </div>
    <div>
      <div class="block reveal"><span class="eyebrow">Challenge</span><h2>What needed to change.</h2><p>{escape(pr["challenge"])}</p></div>
      <div class="block reveal"><span class="eyebrow">Approach</span><h2>How we built it.</h2><p>{escape(pr["approach"])}</p></div>
      <div class="block reveal"><span class="eyebrow">Deliverables</span><h2>What we shipped.</h2><ul class="checks">{checks}</ul></div>
    </div>
  </div>
  <div class="project-gallery">{gallery}</div>
  <nav class="project-nav reveal" aria-label="More projects">
    <a href="{p}project/{prev["slug"]}.html"><small>← Previous project</small><span>{escape(prev["title"])}</span></a>
    <a href="{p}project/{nxt["slug"]}.html"><small>Next project →</small><span>{escape(nxt["title"])}</span></a>
  </nav>
</section>
{big_cta(d, "Like what you see?", "Let’s talk about what we can build for your business.")}
</main>'''
    html += footer(d)
    return html


def page_404():
    d = 0
    html = head("Page not found — Infyniq Solutions", "This page could not be found.", d, "404.html")
    html += header(d, "")
    html += f'''<main id="main"><section class="not-found"><div class="container"><span class="eyebrow" style="text-align:center">Error 404</span><h1>Lost in<br>the build.</h1><p>The page you’re looking for doesn’t exist or has moved. Let’s get you back to the work.</p><a class="btn btn-solid" href="index.html">Back to home {ARROW}</a></div></section></main>'''
    html += footer(d)
    return html


def main():
    pages = {
        "index.html": page_index(), "work.html": page_work(), "studio.html": page_studio(),
        "services.html": page_services(), "contact.html": page_contact(), "404.html": page_404(),
    }
    for i, pr in enumerate(PROJECTS):
        pages[f'project/{pr["slug"]}.html'] = page_project(pr, i)
    for name, html in pages.items():
        out = ROOT / name
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(html, encoding="utf-8")
        print("wrote", name)
    # sitemap
    urls = [f'{SITE["url"]}/{n if n != "index.html" else ""}' for n in pages if n != "404.html"]
    sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(f"  <url><loc>{u}</loc></url>\n" for u in urls) + "</urlset>\n"
    (ROOT / "sitemap.xml").write_text(sm)
    (ROOT / "robots.txt").write_text(f'User-agent: *\nAllow: /\nSitemap: {SITE["url"]}/sitemap.xml\n')
    (ROOT / "site.webmanifest").write_text(json.dumps({"name": "Infyniq Solutions", "short_name": "Infyniq", "start_url": "./index.html", "display": "standalone", "background_color": "#191b1a", "theme_color": "#191b1a", "icons": [{"src": "assets/images/favicon.svg", "sizes": "any", "type": "image/svg+xml"}]}, indent=2))
    print("done")


if __name__ == "__main__":
    main()
