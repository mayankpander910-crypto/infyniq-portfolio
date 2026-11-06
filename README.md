# Infyniq Solutions — Portfolio Website

A dark, editorial-style agency portfolio inspired by the layout and typographic scale of onseis.com, with content adapted from infyniq.in and two additional live projects (Meridian and PulseCRM).

Built with **plain HTML, CSS and JavaScript** — no frameworks, no build step, no `npm install` required. Fonts and images are bundled locally, so it works offline.

---

## 1. Run it on localhost

Pick **one** of these options:

### Option A — Node.js (recommended)
```bash
cd infyniq-solutions
node server.js
```
Open **http://localhost:3000**

Custom port: `node server.js 8080`

### Option B — Double-click
- **Windows:** double-click `start.bat`
- **macOS / Linux:** run `./start.sh` (first: `chmod +x start.sh`)

### Option C — Python
```bash
cd infyniq-solutions
python3 -m http.server 3000
```
Open **http://localhost:3000**

### Option D — VS Code
Install the **Live Server** extension → right-click `index.html` → **Open with Live Server**.

> You can also open `index.html` directly in a browser, but a local server is recommended so fonts, the preloader session logic and relative links behave exactly as they will in production.

---

## 2. What's inside

```
infyniq-solutions/
├── index.html          Home (preloader, hero, project reel, work, capabilities, studio, testimonials, CTA)
├── work.html           Portfolio with category filters
├── studio.html         About / mission / vision / values / process
├── services.html       Services accordion, industries, FAQ
├── contact.html        Contact details + validated enquiry form (opens email app)
├── 404.html            Not-found page
├── project/            7 project detail pages
│   ├── meridian.html         → https://meridian-psi-lilac.vercel.app/
│   ├── pulse-crm.html        → https://lead-crm-lemon-three.vercel.app/
│   ├── vraj-interior.html
│   ├── shree-maruti.html
│   ├── easyteezy.html
│   ├── monastery.html
│   └── simplq.html
├── css/                fonts.css + style.css
├── js/main.js          Preloader, menu, marquees, reveals, testimonial stack, filters, accordion, form, cursor
├── assets/images/      Logo, favicons and project imagery (WebP)
├── assets/fonts/       Plus Jakarta Sans, Lekton, Pinyon Script (self-hosted, OFL licensed)
├── scripts/build.py    Optional static generator — edit content in one place, regenerate HTML
├── server.js           Zero-dependency local server
├── start.sh / start.bat
├── sitemap.xml / robots.txt / site.webmanifest
└── README.md
```

---

## 3. Editing content

**Quick edits:** open any `.html` file and change the text directly.

**Structured edits:** all copy, projects, services and testimonials live in `scripts/build.py`.
Edit the `SITE`, `PROJECTS`, `SERVICES`, `TESTIMONIALS` data, then regenerate:
```bash
python3 scripts/build.py
```
This rewrites every HTML page, the sitemap and robots.txt consistently.

### Add a new project
1. Add its images to `assets/images/`.
2. Add an entry to `PROJECTS` in `scripts/build.py` (slug, title, category, services, tags, cover, summary, challenge, approach, deliverables, gallery, stats, optional `live` URL).
3. Run `python3 scripts/build.py`. A card, reel item and detail page are created automatically.

### Change colours / fonts
Edit the CSS variables at the top of `css/style.css` (`--bg`, `--ink`, `--accent`, fonts, gutters).

### Preloader
Shown once per browser session (stored in `sessionStorage`), respects `prefers-reduced-motion`, and has a 4-second safety timeout so the page never stays blocked. Edit in `js/main.js` → *Preloader*.

---

## 4. Contact form

The form validates fields and then opens the visitor's email client with a pre-filled message to **info@infyniq.in** (no backend needed).
To use a real form backend later (Formspree, Getform, your own API), replace the `mailto` logic in `js/main.js` → *Contact form* with a `fetch()` POST.

---

## 5. Deploying

Because it's fully static, you can deploy the folder as-is to **Vercel, Netlify, Cloudflare Pages, GitHub Pages** or any web host.
- Vercel: `vercel` (framework preset: *Other*, output directory: `.`)
- Netlify: drag-and-drop the folder into the Netlify dashboard.
Update `SITE["url"]` in `scripts/build.py` to your production domain and rebuild so canonical/OG URLs are correct.

---

## 6. Notes

- Layout/typography reference: onseis.com (structure and scale re-created, not copied code).
- Agency copy, services, industries, testimonials and contact details: infyniq.in.
- Project imagery for existing clients comes from infyniq.in; Meridian/PulseCRM visuals come from the supplied live sites.
- Fonts: Plus Jakarta Sans, Lekton, Pinyon Script — SIL Open Font License (license files in `assets/fonts/`).
- Accessibility: skip link, keyboard-operable menu/accordion/filters, focus styles, reduced-motion support, semantic landmarks.
