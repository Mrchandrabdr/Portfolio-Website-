# Chandra Bdr Katuwal — Portfolio

A fast, accessible, single-page portfolio for a programming educator & developer.
Built with **React 18 + TypeScript**, **Tailwind CSS**, **Lucide icons** and **Vite**.

- Dark, editorial design with an "editor gutter" visual language (line-numbered sections, `// comment` kickers, code-window thumbnails)
- All text, skills, projects, teaching and education data live in `src/content/` — no component edits needed
- Working contact form (Formspree / Web3Forms / any JSON endpoint) with validation, spam honeypot and a `mailto:` fallback
- Scroll-reveal animations, animated nav underline, active-section tracking, accessible mobile menu — all respecting `prefers-reduced-motion`
- SEO: meta + Open Graph + Twitter cards, JSON-LD `Person` schema, canonical URL, `robots.txt`, `sitemap.xml`, web manifest
- ~70 KB gzipped JS, no runtime animation libraries

---

## 1. Getting started

Requirements: **Node.js 18+** (20 LTS recommended) and npm.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:5173.

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload           |
| `npm run build`     | Type-check, then build to `dist/`              |
| `npm run preview`   | Serve the production build locally             |
| `npm run typecheck` | Type-check only                                |

---

## 2. Project structure

```
├─ index.html                 SEO meta, Open Graph, JSON-LD, fonts
├─ public/                    Static files served as-is
│  ├─ images/                 ← put profile.jpg, about.jpg, project screenshots here
│  ├─ favicon.svg, apple-touch-icon.png, og-image.png
│  └─ robots.txt, sitemap.xml, site.webmanifest
├─ src/
│  ├─ content/                ← EDIT THESE: all site content
│  │  ├─ site.ts              name, intro, email, socials, nav, photos
│  │  ├─ about.ts             about text, "what drives me", "now" panel
│  │  ├─ skills.ts            skill categories + levels, "currently learning"
│  │  ├─ projects.ts          projects + filter categories
│  │  ├─ teaching.ts          subjects, approach, resources, weekly exercise
│  │  └─ education.ts         education, certifications, achievements
│  ├─ types/content.ts        TypeScript shapes for all content
│  ├─ components/
│  │  ├─ sections/            Hero, About, Skills, Projects, Teaching, Education, Contact
│  │  ├─ layout/              Navbar, Footer, BackToTop
│  │  ├─ projects/            ProjectCard, ProjectThumb, CodePreview
│  │  ├─ contact/             ContactForm
│  │  ├─ hero/                HeroBackground, TerminalLine
│  │  └─ ui/                  Button, Reveal, SectionHeading, SocialLinks, BrandIcon, ProfilePhoto
│  ├─ hooks/                  useInView, useActiveSection, useScrolled, usePrefersReducedMotion
│  ├─ lib/                    contact (form delivery), validation, cn
│  ├─ App.tsx, main.tsx, index.css
├─ .env.example               environment variable template
├─ vercel.json / netlify.toml deployment configs
└─ tailwind.config.ts         colours, fonts, type scale, animations
```

---

## 3. Editing your content

Everything visitors see comes from `src/content/`. TypeScript will tell you if a field is missing or misspelled.

### Photos
Add your photos to `public/images/`:

| File                         | Used in | Recommended size |
| ---------------------------- | ------- | ---------------- |
| `public/images/profile.jpg`  | Hero    | 840 × 1050 (4:5) |
| `public/images/about.jpg`    | About   | 840 × 1050 (4:5) |

Until they exist, a "CK." monogram is shown automatically. Compress them first (e.g. https://squoosh.app, WebP or JPEG ~80% quality, under ~200 KB). To use different file names, change `profile.photo` in `src/content/site.ts`.

### Social links — **please complete**
In `src/content/site.ts → socials`:
- **LinkedIn** currently points to a LinkedIn *search* for your name. Replace it with your profile URL (`https://www.linkedin.com/in/<you>`).
- **Instagram** is empty, so it is hidden. Add your URL to show it.
- Set any `url` to `''` to hide that platform everywhere; add `x` or `youtube` entries if you like.

### Projects (add / edit / remove)
`src/content/projects.ts` contains **placeholder projects** — replace them with your own.

```ts
{
  id: 'my-new-project',              // unique
  title: 'My New Project',
  description: 'One or two sentences about what it does and why.',
  category: 'Python',                // 'Web Development' | 'Python' | 'C++' | 'Java' | 'Other'
  tech: ['Python', 'Flask'],
  image: '/images/projects/my-new-project.webp', // optional — otherwise a code thumbnail is generated
  snippet: { filename: 'app.py', code: 'print("hi")' }, // used by the generated thumbnail
  repoUrl: 'https://github.com/Mrchandrabdr/my-new-project', // optional
  liveUrl: 'https://my-new-project.vercel.app',              // optional
  featured: true,                    // optional — shown first with a badge
  year: '2026',
}
```

- **Remove** a project by deleting its object.
- To add a new filter category, add it to `ProjectCategory` in `src/types/content.ts`, to `projectFilters` in `projects.ts`, and give it a tint in `src/components/projects/ProjectThumb.tsx`.

### Skills
`src/content/skills.ts` — edit categories, skills and `level` (1 = Familiar … 5 = Expert). Icons per category: `'code' | 'globe' | 'wrench' | 'graduation'`.

### Education, certifications & achievements — **please complete**
`src/content/education.ts` uses bracketed placeholders like `[Start year]` and `[Your school / college name]`. Replace them with your real details. Empty the `certifications` or `achievements` arrays to hide those lists.

### Colours & fonts
`tailwind.config.ts` → `theme.extend.colors.accent` (the lime accent) and `ink` (greys). Fonts are loaded in `index.html` (Inter, Space Grotesk, JetBrains Mono).

---

## 4. Contact form

The form validates name, email, subject and message, shows inline errors, and announces success / error to screen readers.

**Without configuration** it opens the visitor's email app with the message pre-filled (to `profile.email`).

**To receive messages directly** (recommended), use a free form service — no server or private key needed:

**Web3Forms (simplest — no account needed)**
1. Go to https://web3forms.com, enter the email address where you want to receive messages, and click *Create Access Key*. The key is emailed to you.
2. Create `.env.local` (copy `.env.example`) and set:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your-access-key
   ```
3. Add the same variable on your host (Vercel/Netlify → Environment Variables) and redeploy.

**Formspree (alternative)**
1. Create a form at https://formspree.io and copy its endpoint (`https://formspree.io/f/abcdwxyz`).
2. Set `VITE_CONTACT_ENDPOINT=https://formspree.io/f/abcdwxyz` in `.env.local` and on your host.

Any endpoint that accepts a JSON `POST` and returns a 2xx status works (e.g. your own serverless function).

> ⚠️ Variables prefixed with `VITE_` are embedded in the public JavaScript bundle. Only use **public** form endpoints/keys here — never secret API keys. If you need a secret (e.g. an email-sending API key), put it in a serverless function and point `VITE_CONTACT_ENDPOINT` at that function.

Restart `npm run dev` after editing env files. On your host, add the same variables in its dashboard (see below).

---

## 5. Environment variables

| Variable                    | Required | Purpose                                                    |
| --------------------------- | -------- | ---------------------------------------------------------- |
| `VITE_SITE_URL`             | Yes (prod) | Your live URL without trailing slash — used in canonical & Open Graph tags |
| `VITE_WEB3FORMS_ACCESS_KEY` | No       | Web3Forms access key — enough on its own to enable the form |
| `VITE_CONTACT_ENDPOINT`     | No       | Any other public JSON form endpoint (e.g. Formspree)       |

With neither set, the form falls back to `mailto:`.

`.env` holds a safe default; put your real values in `.env.local` (git-ignored) or in your hosting dashboard.

---

## 6. Deployment

### Before you deploy — checklist
- [ ] Photos added to `public/images/`
- [ ] Real projects in `src/content/projects.ts`
- [ ] LinkedIn / Instagram URLs in `src/content/site.ts`
- [ ] Education placeholders replaced in `src/content/education.ts`
- [ ] `VITE_SITE_URL` set to your domain
- [ ] Replace `your-domain.com` in `public/robots.txt` and `public/sitemap.xml`
- [ ] `npm run build` succeeds

### Option A — Vercel (recommended)
1. Push the project to a GitHub repository.
2. Go to https://vercel.com → **Add New → Project** → import the repo. The framework (Vite) is detected from `vercel.json`.
3. **Settings → Environment Variables**: add `VITE_SITE_URL` (and `VITE_CONTACT_ENDPOINT` if used).
4. Deploy. Every push to `main` redeploys automatically.

### Option B — Netlify
1. Push to GitHub, then https://app.netlify.com → **Add new site → Import an existing project**.
2. Build command and publish directory are read from `netlify.toml` (`npm run build`, `dist`).
3. **Site configuration → Environment variables**: add the variables above, then redeploy.

### Option C — Any static host
```bash
npm run build
```
Upload the contents of `dist/` to any static host (Cloudflare Pages, GitHub Pages, cPanel `public_html`, etc.).

### Connecting a custom domain
1. Buy a domain (e.g. a `.com`, or a free `.com.np` from https://register.com.np for Nepali citizens).
2. In your host's dashboard add the domain:
   - **Vercel:** Project → Settings → Domains → Add.
   - **Netlify:** Site → Domain management → Add a domain.
3. At your domain registrar, create the DNS records the host shows you — typically:
   - Apex (`example.com`): an `A` record (Vercel: `76.76.21.21`; Netlify: `75.2.60.5`) — or move your nameservers to the host.
   - `www`: a `CNAME` to `cname.vercel-dns.com` (Vercel) or `<site>.netlify.app` (Netlify).
4. Wait for DNS to propagate (minutes to a few hours). HTTPS certificates are issued automatically.
5. Set `VITE_SITE_URL=https://your-domain.com`, update `robots.txt` / `sitemap.xml`, and redeploy.
6. Optional: submit `https://your-domain.com/sitemap.xml` in Google Search Console.

---

## 7. Accessibility & performance notes
- Semantic landmarks, skip link, one `h1`, ordered headings, visible focus rings, labelled form fields with linked errors.
- Text colours tuned for WCAG AA contrast on the dark background.
- All motion is CSS-based and disabled under `prefers-reduced-motion`.
- Images are lazy-loaded with explicit dimensions; the hero portrait is loaded eagerly.
- React is split into its own long-cached chunk; hashed assets are served with immutable cache headers (see `vercel.json` / `netlify.toml`).

---

© Chandra Bdr Katuwal. Code may be reused for your own portfolio; please replace the personal content.
