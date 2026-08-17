# Portfolio — Anupam Bhowmick
## Claude Code Rules & Reference

READ THIS ENTIRE FILE BEFORE TOUCHING ANY CODE.

---

## Project Overview

Static portfolio site. No frameworks, no build system, no npm.
Stack: HTML5 + CSS3 + Vanilla JS only.
Font: Sora (Google Fonts — 400, 500, 600 weights only). See DESIGN-SYSTEM.md for the full type-token scale.
Dev server: `python3 serve.py` → localhost:4200
Figma file key: `8GEqwkx0ENInCieGuJe1gp`

---

## File Structure

```
/portfolio
  index.html          ← Homepage (bio, work summary, 3 project cards)
  ai-system.html      ← Case study: AI-Driven Product Development System
  payments.html       ← Case study: Enterprise Payments Management System
  onboarding.html     ← Case study: Onboarding Re-Architecture
  work.html           ← (legacy, not primary)
  style.css           ← Single stylesheet for entire site
  script.js           ← Single JS file (lightbox, theme toggle, email copy)
  assets/
    bg-texture.png    ← Subtle noise texture, layered over bg
  images/             ← ALL case study images live here (local PNGs)
    *.png             ← Exported from Figma at 2×
```

---

## Cardinal Rules — Never Break These

1. **Images always live in `/images/`** — reference as `images/filename.png`
   Never embed Figma asset URLs (`figma.com/api/mcp/asset/...`) — they expire in 7 days.
   Never use base64 inline images in HTML.

2. **No hardcoded colors** — always use CSS variables from the token list below.
   Exception: `#313131` panel backgrounds (same as `--dark-2`) — use the variable.

3. **No hardcoded px values for spacing** — derive from the spacing scale below.

4. **Never install external dependencies** — no npm, no CDN libraries, no UI kits.

5. **Every page uses the same nav, lightbox, resume modal structure** — copy exactly from index.html.

6. **Lightbox must work on every `<img>` inside `.project-main`** — add `data-lightbox` to the containing panel and wire up in script.js (see Lightbox section below).

7. **Show completed section and confirm before moving to the next** — don't batch-write entire pages.

---

## Design Tokens

### Colors — CSS Variables

```css
/* Dark mode (default) */
--dark-1:           #252525   /* Page background */
--dark-2:       #313131   /* Image panels, cards darker fill */
--dark-4:       #4a4a4a   /* Borders, dividers */
--dark-3:      #282828   /* Project card background */
--workflow-bg: #2b2b2a   /* Before/after workflow box */
--media-bg:     #323232   /* Video placeholder */
--light-1:      #F1EDEA   /* Primary text (headings, highlights) */
--light-2:      #B7B2AA   /* Body text, muted labels */
--light-3:      #6A665F   /* Captions, dividers, disabled */
--surface-tint:      rgba(183,178,170,0.04)  /* Subtle surface tint */
--nav-height:         48px
--font:               'Sora', sans-serif

/* Light mode — html.light overrides all of the above */
--dark-1:           #F1EDEA
--dark-2:       #E0DBD6
--dark-4:       #D0CAC4
--dark-3:      #E5E0DB
--light-1:      #252525
--light-2:      #4A4A4A
```

### Typography Scale

| Class | Size | Weight | Line-height | Color | Usage |
|---|---|---|---|---|---|
| `.ds-h1` | 32px | 600 | 48px | light-1 | Page title |
| `.ds-h2` | 24px | 600 | 32px | light-1 | Section heading |
| `.ds-h2-muted` | 24px | 600 | 32px | light-2 | Role subtitle |
| `.ds-h3` | 20px | 600 | 28px | light-1 | Sub-section heading |
| `.ds-h3-muted` | 20px | 600 | 28px | light-2 | Company name |
| `.ds-body` | 16px | 400 | 28px | light-2 | Standard body (payments, onboarding) |
| `.cs-body` | 14px | 400 | 26px | light-2 | Case study body (ai-system) |
| `.ds-caption` | 12px | 400 | 16px | light-2 | Footer, captions |
| `.project-hero-title` | 32px | 600 | 48px | light-1 | Case study page title |
| `.project-section-heading` | 20px | 600 | 28px | light-1 | Section heading in case study |
| `.cs-section-heading` | 24px | 600 | 32px | light-1 | Sub-section heading (Execution area) |
| `.cs-sub-heading` | 16px | 600 | 28px | light-1 | Bold heading inside cs-body text |
| `.cs-img-caption` | 12px | 400 | 16px | light-2 | Caption below image panels |

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| 4px | — | Identity block gap (name/role/company) |
| 8px | — | Card content gap, list spacing |
| 16px | — | Paragraph spacing, small gaps |
| 20px | — | Hero section gap |
| 24px | — | Section internal gap |
| 28px | — | Card padding (small) |
| 32px | — | Bio-identity-group gap, section gap |
| 44px | — | Work section items gap |
| 48px | — | Execution subsection top padding |
| 72px | — | Between project sections on case study |
| 80px | — | Page top padding |
| 132px | — | Between bio sections on homepage |
| 200px | — | `.content` section gap |

### Layout

- Content column: `680px` max-width, centered
- Page padding: `80px max(20px, calc((100% - 680px) / 2)) 128px`
- Nav padding: `10px max(20px, calc((100% - 680px) / 2))`
- All case study image panels: `width: 100%` of the 680px column
- Image panel background: `var(--dark-2)` (#313131)
- Image panel border-radius: `4px`

---

## Image Handling

### Rule
All images are stored locally in `/images/`. Reference as `images/filename.png`.

### Naming convention
```
images/
  ai-hero.png                   ← Hero cascade panel
  ai-problem-libraries.png      ← Problem section: 3 library screenshots
  ai-ds-grid.png                ← Unifying DS: token grid panel
  ai-ds-components.png          ← Unifying DS: component system panel
  ai-ds-products.png            ← Unifying DS: product showcase panel
  ai-code-1.png                 ← Building Code System panel 1
  ai-code-2.png                 ← Building Code System panel 2
  ai-code-3.png                 ← Building Code System panel 3 (cascading)
  ai-validation.png             ← AI Validation panel
  ai-governance.png             ← Governance panel
  ai-key-moment.png             ← Key Moment panel
  payments-hero.png
  payments-problem.png
  payments-wallet.png
  payments-transactions.png
  payments-invoices.png
  onboarding-hero.png
  onboarding-before.png
  onboarding-solution.png
  onboarding-result.png
```

### When user uploads images
1. Drop into `/images/` folder
2. Reference in HTML as `<img src="images/filename.png" alt="">`
3. Images inside panels use `object-fit: cover; object-position: top left`

---

## CSS Class Reference — Case Study Pages

### Image Panels (all have `background: var(--dark-2); border-radius: 4px`)

```css
.cs-hero-panel          /* Overlapping cascade — position: relative + overflow: hidden */
                        /* Images inside: position: absolute, exact left/top/width/height */

.cs-ds-grid             /* 2-col CSS grid: 37% left (tall, spans all rows) + 1fr right (3 cells) */
                        /* Use for: token grid, library panels */

.cs-panel-duo           /* 2 images side-by-side, flex, height: 244px */
.cs-panel-trio          /* 3 images side-by-side, flex, height: 260px */
.cs-panel-solo          /* 1 full-width image, height: 260px */
.cs-panel-key           /* Key moment: left 120px narrow + right flex-1, height: 284px */

.cs-panel-cascade       /* Overlapping images (like hero) — use for code panels */
                        /* Same as cs-hero-panel: position: relative; overflow: hidden; height: 287px */
```

### Text Classes

```css
.cs-body                /* 14px/26px body text — use for ALL body text in ai-system.html */
.cs-link                /* Underlined light-1 text — for key sentences/callouts */
.cs-sub-heading         /* 16px/28px bold — bold sub-heading INSIDE cs-body paragraphs */
.cs-img-wrap            /* flex column gap-8px — wraps image panel + caption */
.cs-img-caption         /* 12px/16px caption below panels */
.cs-impact-list         /* Impact list — disc bullets, 16px gap between items */
.cs-impact-item         /* Each item — has .cs-impact-heading (bold) + body text */
.cs-workflow-box        /* Before/After box — bg dark-2, padding 28px 44px */
```

---

## Lightbox — How It Works

The lightbox is already built in `script.js`. To wire an image:

**Method 1: Single image panel**
```html
<div class="cs-img-wrap" data-lightbox-src="images/my-image.png">
  <div class="cs-panel-solo">
    <img src="images/my-image.png" alt="">
  </div>
  <p class="cs-img-caption">Caption text</p>
</div>
```

**Method 2: Any `<img>` tag** — script.js auto-wires all `<img>` tags inside `.project-main` 
that have a `src` attribute. Cursor becomes zoom-in. Click opens lightbox with full image.

**Add this block to script.js if not already present:**
```js
// Wire all case study images to lightbox
document.querySelectorAll('.project-main img[src]').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(img.src, img.alt);
  });
});
```

---

## Page Structure — Every Case Study Page

Copy this shell exactly:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Project Name] — Anupam Bhowmick</title>
  <link rel="stylesheet" href="style.css" />
  <script>if(localStorage.getItem('theme')==='light'){document.documentElement.classList.add('light')}</script>
</head>
<body>
  <div id="loading-screen" class="loading-screen"></div>
  <!-- lightbox + resume modal — copy from index.html exactly -->

  <nav class="site-nav">
    <div class="nav-left">
      <a href="index.html" class="nav-link">Work</a>
      <button class="nav-link" id="resume-trigger">Resume</button>
    </div>
    <div class="nav-right">
      <!-- email copy + theme toggle — copy from index.html exactly -->
    </div>
  </nav>

  <div class="page">
    <div class="content">
      <div class="project-main">
        <!-- sections here -->
      </div>
      <!-- footer — copy from index.html exactly -->
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

---

## Case Study Section Order

Every case study follows this section order:

1. **Hero** — title + 1-line subtitle + hero image panel
2. **Problem** — text + image panel showing before-state
3. **Role** — short text, my responsibilities
4. **Strategy and Direction** — framing / decision-making
5. **Execution** — 2–4 subsections, each with text + image panel(s)
6. **Impact** — metric list
7. **Key Moment** *(if relevant)* — pivotal event
8. **Defining the [X] Workflow** *(if relevant)* — Before/After box
9. **What's Next** *(if relevant)*
10. **Summary** — closing paragraph
11. `<hr class="section-divider" />`
12. **More Projects** — 2 cards linking to other case studies

---

## Working with Figma MCP

### Workflow for each section
1. `get_screenshot` on the section node → visual reference
2. `get_design_context` on the section node → extract text content, spacing values, layout
3. Check if images are bitmap (RECTANGLE nodes with image fills → have URLs) or vector (FRAME/component → need local PNG)
4. If bitmap: download URL to `/images/` using Bash curl before using in HTML
5. If vector: user exports from Figma as 2× PNG, drops into `/images/`

### Getting image URLs from Figma
```js
// In use_figma: find RECTANGLE nodes with image fills in a frame
const node = figma.currentPage.findOne(n => n.id === 'NODE_ID');
const rects = node.findAll(n => n.type === 'RECTANGLE');
// Then call get_design_context on each RECTANGLE to get the asset URL
```

### Downloading Figma asset URLs locally
```bash
curl -L "https://www.figma.com/api/mcp/asset/UUID" -o images/filename.png
```

### NEVER do this
- Never put `figma.com/api/mcp/asset` URLs directly in HTML — they expire
- Never leave image panels empty with placeholder text
- Never use get_design_context code output as-is — it's React/Tailwind, must convert to vanilla HTML/CSS

---

## Pages Status

| Page | Status | Notes |
|---|---|---|
| `index.html` | ✅ Complete | Homepage with bio, work summary, 3 project cards |
| `ai-system.html` | 🔄 In Progress | Structure complete, images need local replacements, lightbox needs wiring |
| `payments.html` | 🔲 Needs content | Shell exists, all sections need Figma content |
| `onboarding.html` | 🔲 Needs content | Shell exists, all sections need Figma content |

---

## Figma Page Node IDs

| Page | Node ID | Notes |
|---|---|---|
| AI System case study | `884:110947` | Full page frame |
| AI System — Hero | `884:110950` | h=434 |
| AI System — Problem + Role + Strategy | `884:110963` | h=1341 |
| AI System — Execution | `884:111825` + `884:113665` + `884:113685` + `884:113694` | 4 subsections |
| AI System — Impact onwards | `884:113838` + `884:113841` + `884:113852` + `884:113857` + `884:113860` | |
| More Projects section | `884:113864` | h=628 |

---

## Common Mistakes to Avoid

```html
<!-- ✗ Never — Figma URL in HTML -->
<img src="https://www.figma.com/api/mcp/asset/abc123">

<!-- ✓ Always — local image -->
<img src="images/ai-ds-grid.png" alt="">

<!-- ✗ Never — hardcoded color -->
<div style="background: #313131">

<!-- ✓ Always — CSS variable -->
<div class="cs-panel-duo">

<!-- ✗ Never — inline style for spacing -->
<div style="margin-top: 48px">

<!-- ✓ Always — semantic class -->
<div class="cs-subsection">

<!-- ✗ Never — empty image panel with placeholder text -->
<div class="cs-panel-solo">
  <span>Image coming soon</span>
</div>

<!-- ✓ Always — real image or omit the panel entirely -->
<div class="cs-panel-solo">
  <img src="images/ai-governance.png" alt="">
</div>
```

---

## Before Starting Any Page

Checklist:
- [ ] All images for this page are in `/images/` folder
- [ ] Figma screenshot of every section has been reviewed
- [ ] Text content extracted from Figma (exact wording, not paraphrased)
- [ ] Section order confirmed against the case study section order above
- [ ] Lightbox wiring planned for all image panels
