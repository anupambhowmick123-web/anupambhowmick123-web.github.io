# Design System Reference

Documents the typography, spacing, and color token systems in `style.css` as of the current consolidation pass. Font-family is still Sora everywhere (Geist swap not yet applied). Reference doc only — not a narrative. Tables are the source of truth; prose notes below each table only explain, never add new facts.

---

## Typography

All tokens are `font` shorthand values (`weight size/line-height family`), applied as `font: var(--type-x);`. Color is always set separately per class, on every class, never inside the token.

| Token | Base value | At ≤720px | At ≤480px | Classes using it |
|---|---|---|---|---|
| `--type-display` | Sora 32/600/1.5 | 28/600/1.4 | 26/600/1.35 | `.ds-h1`, `.project-hero-title` |
| `--type-h1` | Sora 24/600/1.33 | 22/600/1.3 | 20/600/1.3 | `.ds-h2`, `.ds-h2-muted`, `.ds-h3`, `.cs-section-heading` |
| `--type-h2` | Sora 20/600/1.4 | 18/600/1.4 | no change | `.ds-h3-muted`, `.bio-statement`, `.project-card-title`, `.project-section-heading` |
| `--type-subtitle` | Sora 14/400/1.5 | no change | no change | `.cs-hero-desc`, `.cs-workflow-line` |
| `--type-h3` | Sora 16/600/1.75 | 16/600/1.6 | no change | `.ds-body-highlight`, `.bio-company`, `.exp-title`, `.work-focus-label`, `.project-subsection-heading`, `.cs-sub-heading`, `.cs-impact-heading` |
| `--type-body` | Sora 16/400/1.6 | no change | 15/400/1.6 | `.ds-body`, `.ds-body p`, `.ds-body li`, `.principles-list li`, `.bio-text`, `.work-intro`, `.work-focus-desc`, `.project-card-body`, `.project-hero-desc`, `.project-body`, `.project-body li`, `.project-role-list li`, `.project-impact-list li`, `.cs-body`, `.cs-body li`, `.cs-impact-item` |
| `--type-caption` | Sora 12/400/1.4 | no change | no change | `.ds-caption`, `.project-card-tag`, `.exp-date`, `.cs-flow-box p`, `.cs-img-caption`, `.cs-workflow-caption`, `.email-tooltip` |
| `--type-nav` | Sora 14/600/1.4 | no change | no change | `.resume-modal-title`, `.resume-modal-download`, `.nav-link`, `.ds-link`, `.ds-link-muted`, `.btn`, `.btn-primary`, `.btn-secondary`, `.tab-btn` |
| `--type-code` | Sora 80/600/1, letter-spacing -4px | no change | no change | `.page-404-code` — isolated, not part of core scale |

Notes on this table:
- `.ds-h3` is the 404 page's "Page not found" line.
- `.project-card-tag` adds a local `font-weight: 500` on top of `--type-caption`'s base weight of 400.
- Responsive steps are defined once, on the tokens themselves, inside `@media (max-width: 720px) { :root { ... } }` and the matching `480px` block — not per class. Any class that references a token inherits correct mobile sizing automatically, with no per-class override needed.

### Inline emphasis / bold modifiers

These are local `font-weight` overrides layered on top of whatever token their parent already uses. They are not separate tokens — they inherit size, line-height, and family from context.

| Selector | Override | Base token it inherits |
|---|---|---|
| `.cs-link` | color + font-weight 600 | `--type-body`, via parent `.cs-body` |
| `.cs-workflow-flow` (span inside `.cs-workflow-line`) | color + font-weight 600 | `--type-subtitle`, via `.cs-workflow-line` |
| `.cs-workflow-label` (span inside `.cs-workflow-line`) | font-weight 400, explicit, matches the inherited default | `--type-subtitle` |
| `<strong>` (global fallback) | font-weight 600 + color | Whatever token its container uses |
| `<strong class="cs-impact-heading">` | Uses `--type-h3` directly, via its own class, not inheritance | `--type-h3` |
| `.project-body strong` | font-weight 600 + color | `--type-body`; `.project-body` is legacy/unused, see the dead-code table below |
| `.text-highlight` | color only, no weight change | `--type-body`, via `.bio-text`; despite the name this text is not bold |

All 8 live `<strong>` tags on the site are inside `ai-system/index.html`, and all 8 carry `class="cs-impact-heading"`. There are no unclassed or raw `<strong>`/`<b>` tags anywhere on the site.

### Classes intentionally left outside the type scale

These are decorative, in-image annotation labels, not reader-facing content, so they were not tokenized.

| Class | Reason | Also dead code? |
|---|---|---|
| `.project-img-placeholder-label` | In-image annotation inside an empty image slot | No, still live |
| `.before-after-label` | Small label inside a workflow mockup panel | Yes |
| `.cs-ds-label` | Tiny 8px annotation inside an image-mockup grid panel | Yes |
| `.video-placeholder-label` | Tiny 8px overlay text inside a placeholder box | Yes |

---

## Spacing

Spacing tokens are identical in dark and light mode — there is no theme variant, unlike color tokens. Tokens apply to `gap`, `padding`, and `margin` only. The literal value `0` is never tokenized. A few sub-pixel visual hacks are intentionally left outside the scale because they are border-overlap nudges, not rhythm values: `.tab-bar-sticky` has `padding-bottom: 1px`, and `.tab-btn` has `margin-bottom: -1.5px`.

| Token | Value | Scope | Notes |
|---|---|---|---|
| `--space-4` | 4px | Desktop base | |
| `--space-8` | 8px | Desktop base | |
| `--space-12` | 12px | Desktop base | |
| `--space-16` | 16px | Desktop base | |
| `--space-20` | 20px | Desktop base | |
| `--space-24` | 24px | Desktop base | |
| `--space-28` | 28px | Desktop base | |
| `--space-32` | 32px | Desktop base | |
| `--space-40` | 40px | Desktop base | |
| `--space-44` | 44px | Desktop base | |
| `--space-48` | 48px | Desktop base | See adjusted values below |
| `--space-52` | 52px | Desktop base | |
| `--space-60` | 60px | Breakpoint, ≤900px and ≤600px | |
| `--space-72` | 72px | Desktop base | |
| `--space-80` | 80px | Desktop base | |
| `--space-92` | 92px | Page-variant, unconditional | Used only by `body.payments .project-main` and `body.onboarding .project-main` gap. Not tied to any breakpoint |
| `--space-96` | 96px | Breakpoint, ≤900px and ≤600px | |
| `--space-100` | 100px | Page-variant, unconditional, plus breakpoint | `body.home .page` padding-top is unconditional; also used at the ≤900px breakpoint |
| `--space-112` | 112px | Desktop base | Used only by legacy `.project-list`, which is dead code |
| `--space-120` | 120px | Breakpoint, ≤900px | |
| `--space-124` | 124px | Page-variant, unconditional | Used only by `body.payments .content` and `body.onboarding .content` gap. Not tied to any breakpoint |
| `--space-128` | 128px | Desktop base and page-variant | Shared value: used by the default `.page` padding-bottom and by `body.payments`/`body.onboarding .page` padding-top. Not exclusively page-variant |
| `--space-132` | 132px | Desktop base | Used by `.bio-main` gap |
| `--space-160` | 160px | Breakpoint, ≤900px | |
| `--space-200` | 200px | Desktop base | Used by `.content` gap |
| `--space-280` | 280px | Desktop base | See adjusted values below |

### Values adjusted during consolidation

Two outliers had the largest visual shift of the whole snap-to-4px pass, ±2px each. Worth remembering if anything looks subtly off around these two spots.

| Original value | New token | New value | Delta | Used by |
|---|---|---|---|---|
| 50px | `--space-48` | 48px | −2px | `.project-card` gap — the homepage's 3 project cards, plus the "More Projects" cards on all 3 case-study pages |
| 282px | `--space-280` | 280px | −2px | `.bio-identity-group` gap — homepage hero, the gap between the name/role/company block and the statement/bio paragraph block |

Full list of every outlier snapped to the nearest 4px step during this pass, all folded into the tokens above with no dedicated token created just for the outlier: 5→4, 6→8, 10→12, 14→16, 22→24, 30→32, 33→32, 50→48, 282→280.

---

## Colors

Renamed from the older `--color-*` naming in a pure rename pass — no values were changed, only names. Dark is the `:root` default; light is the `html.light` override.

| Token | Dark value | Light value | Usage | Status |
|---|---|---|---|---|
| `--dark-1` | `#252525` | `#F1EDEA` | Page/nav background | Active |
| `--dark-2` | `#313131` | `#E0DBD6` | Card/image panel fills, button backgrounds | Active |
| `--dark-3` | `#282828` | `#EBE6E0` | None currently | Defined but unused in any live rule — reserved/available for future use |
| `--dark-4` | `#4a4a4a` | `#D0CAC4` | Borders, dividers | Active |
| `--light-1` | `#FDFCFA` | `#1A1A1A` | Primary text — headings, emphasis | Active |
| `--light-2` | `#B7B2AA` | `#635D54` | Body/muted text | Active |
| `--light-3` | `#6A665F` | `#948F87` | Captions, dividers, disabled/dim text | Active |
| `--workflow-bg` | `#2b2b2a` | `#EBE6E0` | Before/after workflow box background | Active |
| `--media-bg` | `#323232` | `#C8C3BC` | Video placeholder background | Active |
| `--surface-tint` | `rgba(183,178,170,0.04)` | `rgba(37,37,37,0.04)` | Subtle surface tint on image placeholders | Active |

### Intentional non-tokenized exception

`html.light .btn-primary` hardcodes two hex values instead of referencing variables: `background: #252525` and `border-color: #252525`, plus `color: #F1EDEA`. This is deliberate, not an oversight.

Why: `#252525` and `#F1EDEA` equal the dark-mode values of `--dark-1` and `--dark-2`. But this rule lives inside the `html.light` scope, where `--dark-1` and `--dark-2` are redefined to their light-mode values. If the rule referenced `var(--dark-1)` instead of the literal hex, it would resolve to the light-mode value, not the dark-mode value, flipping the button from dark-on-light to light-on-light and breaking its intended look. The hardcoding exists specifically to preserve a fixed dark-button-on-light-page appearance regardless of theme. Do not replace these two hex values with variable references.

---

## Unmapped / legacy classes (dead code)

These classes exist in `style.css` but are not referenced by any of the 5 live pages: `index.html`, `404.html`, `payments/index.html`, `onboarding/index.html`, `ai-system/index.html`. Verified by searching all HTML files. They are kept for reference or possible future reuse, not actively rendered anywhere today. Most were still brought into the token system for consistency during the typography and spacing consolidation passes, even though they render on no page; a few purely decorative ones were left with their original raw values.

| Class | Group | Tokenized during consolidation |
|---|---|---|
| `.ds-list` | Typography-related | No |
| `.ds-list li` | Typography-related | No |
| `.ds-link` | Typography-related | Yes, to `--type-nav` |
| `.ds-body-highlight` | Typography-related | Yes, to `--type-h3` |
| `.cs-hero-desc` | Typography-related | Yes, to `--type-subtitle` |
| `.cs-hero-panel` | Typography-related | No, not a text class |
| `.cs-hero-img` | Typography-related | No, not a text class |
| `.cs-sub-heading` | Typography-related | Yes, to `--type-h3` |
| `.cs-flow-box` | Typography-related | No, not a text class |
| `.cs-flow-box p` | Typography-related | Yes, to `--type-caption` |
| `.tab-bar-sticky` | Work.html-era layout, page no longer exists | No |
| `.tab-bar` | Work.html-era layout, page no longer exists | No |
| `.tab-btn` | Work.html-era layout, page no longer exists | Yes, to `--type-nav` |
| `.work-main` | Work.html-era layout, page no longer exists | No |
| `.work-header` | Work.html-era layout, page no longer exists | No |
| `.work-projects-section` | Work.html-era layout, page no longer exists | No |
| `.work-projects-intro` | Work.html-era layout, page no longer exists | No |
| `.work-section` | Work.html-era layout, page no longer exists | No |
| `.work-focus-row` | Work.html-era layout, page no longer exists | No |
| `.work-focus-label` | Work.html-era layout, page no longer exists | Yes, to `--type-h3` |
| `.work-focus-desc` | Work.html-era layout, page no longer exists | Yes, to `--type-body` |
| `.project-list` | Work.html-era layout, page no longer exists | No |
| `.project-entry` | Work.html-era layout, page no longer exists | No |
| `.project-title-block` | Work.html-era layout, page no longer exists | No |
| `.project-subsection-old` | Work.html-era layout, page no longer exists | No |
| `.project-img` | Work.html-era layout, page no longer exists | No |
| `.project-divider` | Work.html-era layout, page no longer exists | No |
| `.video-placeholder` | Work.html-era layout, page no longer exists | No |
| `.video-placeholder-label` | Work.html-era layout, page no longer exists | No |
| `.projects-sub` | Superseded case-study pattern | No |
| `.project-body` | Superseded case-study pattern | Yes, to `--type-body` |
| `.project-body p` | Superseded case-study pattern | No, structural rule only |
| `.project-body strong` | Superseded case-study pattern | No, weight override only |
| `.project-body ul` | Superseded case-study pattern | No, structural rule only |
| `.project-body ol` | Superseded case-study pattern | No, structural rule only |
| `.project-body li` | Superseded case-study pattern | Yes, to `--type-body` |
| `.project-role-list` | Superseded case-study pattern | No, structural rule only |
| `.project-role-list li` | Superseded case-study pattern | Yes, to `--type-body` |
| `.project-impact-list` | Superseded case-study pattern | No, structural rule only |
| `.project-impact-list li` | Superseded case-study pattern | Yes, to `--type-body` |
| `.project-subsection-heading` | Superseded case-study pattern | Yes, to `--type-h3` |
| `.project-subsection` | Superseded case-study pattern | No |
| `.before-after-block` | Superseded case-study pattern | No |
| `.before-after-item` | Superseded case-study pattern | No |
| `.before-after-label` | Superseded case-study pattern | No |
| `.cs-ds-grid` | Superseded case-study pattern | No |
| `.cs-ds-left` | Superseded case-study pattern | No |
| `.cs-ds-right-cell` | Superseded case-study pattern | No |
| `.cs-ds-label` | Superseded case-study pattern | No |
| `.cs-panel-duo` | Superseded case-study pattern | No |
| `.cs-panel-trio` | Superseded case-study pattern | No |
| `.cs-panel-key` | Superseded case-study pattern | No |
| `.cs-panel-key-left` | Superseded case-study pattern | No |
| `.cs-panel-key-right` | Superseded case-study pattern | No |

### Currently live replacements for the patterns above

Listed for context only — these are not dead code, they are the classes actually in use today in place of the superseded patterns listed in the table above.

| Live class | Replaces |
|---|---|
| `.cs-panel-full` | `.cs-panel-duo`, `.cs-panel-trio`, `.cs-panel-key` |
| `.cs-pair` | Part of the same superseded image-layout family |
| `.cs-img-stack` | Part of the same superseded image-layout family |
| `.cs-workflow-box` | `.before-after-block` |
| `.work-intro` | Not a replacement, already a live homepage class, listed here only to avoid confusion with the similarly-named dead `.work-*` classes above |
| `.principles-list` | Not a replacement, already a live homepage class |
| `.exp-entries` | Not a replacement, already a live homepage class |
