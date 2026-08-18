# Design System Reference

Documents the typography, spacing, and color token systems in `style.css`. Reference doc only — not a narrative. Tables are the source of truth; prose notes below each table only explain, never add new facts.

## Changelog

- **2026-08-17** — Font-family swapped from Sora to Geist across the entire token system (values-only, no size/weight/line-height changes in that specific step). Loaded via the same Google Fonts `@import` method already in use, now at weights 400/500/600.
- **2026-08-17** — Split `--type-display` into two tokens: `--type-display` (32px, case-study hero titles only) and a new `--type-display-name` (40px, homepage name only). `.ds-h1` moved to the new token; `.project-hero-title` stays on `--type-display`, unchanged in size.
- **2026-08-17** — Font-weight changed from 600 to 500 on all heading tokens: `--type-display-name`, `--type-display`, `--type-h1`, `--type-h2`, `--type-h3`. `--type-subtitle`, `--type-body`, `--type-caption`, `--type-nav`, `--type-code` stay at their original weights (400 or 600).
- **2026-08-17** — Reverted the display split: `--type-display-name` removed, merged back into a single `--type-display` shared by `.ds-h1` and `.project-hero-title` again, now resized to 56px (weight stays 500).
- **2026-08-17** — `.project-card-title` remapped from `--type-h2` to `--type-h3`.
- **2026-08-17** — Fixed a real inconsistency: `ai-system/index.html` had `<body>` with no class, so it never received the `body.payments`/`body.onboarding` `.page` 128px top-padding override and fell through to the generic 80px default — its hero title started noticeably higher than Payments/Onboarding. Added `class="ai-system"` to the body tag and a matching `body.ai-system .page { padding-top: var(--space-128); }` rule.
- **2026-08-17** — Second Vercel-matching color pass, refined against direct reference screenshots (byline/meta text, borders, backgrounds) rather than general estimation. Values only, token names unchanged. An earlier Vercel-inspired color pass in this project was fully reverted at the time, so this is the first Vercel-style color change actually applied to `style.css`. The 3-tier text hierarchy (`--light-1` primary / `--light-2` body-muted / `--light-3` caption-dim) is preserved, not flattened.
- **2026-08-17** — Updated `.btn-primary`'s hardcoded `html.light` exception values (previously flagged as pending) to match the new neutral palette: `#000000`/`#F2F2F2`/hover `#0D0D0D`, replacing the old warm-palette `#252525`/`#F1EDEA`/`#313131`.
- **2026-08-18** — Font-family swapped back from Geist to Sora, reverting the 2026-08-17 swap. Values-only (weights stay 400/500/600, no size/weight/line-height changes). Same Google Fonts `@import` method.
- **2026-08-18** — Font-weight reverted from 500 back to 600 on all heading tokens: `--type-display`, `--type-h1`, `--type-h2`, `--type-h3` (undoing the 2026-08-17 weight change). `--type-display` also resized from 56px back to 40px, with its ≤720/≤480 steps set to 35px/32px to match — these are the exact values previously established for a 40px `--type-display` (from the short-lived `--type-display-name` split), reused here rather than recalculated from scratch. Line-height ratios (1.1/1.03/1.0) are unitless and scale-invariant, so they were left unchanged.
- **2026-08-18** — Homepage identity block re-leveled: `.ds-h3-muted` ("Senior Product Designer") moved from `--type-h2` to `--type-h1`; `.bio-company` ("Xoxoday, Bengaluru") moved from `--type-h3` to `--type-h2`. `.text-highlight` moved from having no token (color-only, inherited from parent) to using `--type-h3` directly — this makes every highlighted phrase on the site bold for the first time (16px stays the same, weight goes 400→600), affecting the homepage's "9 years" and all 38 former `.cs-link` instances across the three case-study pages.
- **2026-08-18** — `.bio-statement` ("I design products and systems for enterprise softwares driving decisions from strategy to production.") moved from `--type-h2` to `--type-h1` (20/600/1.4 → 24/600/1.33).
- **2026-08-18** — Reverted `.bio-statement` back to `--type-h2`, and moved `.bio-company` ("Xoxoday, Bengaluru") from `--type-h2` back to `--type-h3`. `.ds-h3-muted` ("Senior Product Designer") stays on `--type-h1`, unchanged in this pass.
- **2026-08-18** — Hero section layout change (not a token-value pass): `.bio-identity-group` (name/role/company + statement/bio, together) now uses `min-height: calc(100vh - var(--nav-height))` with `justify-content: center`, so the hero fills the viewport below the sticky nav and the Projects section appears right after the first scroll. `body.home .page`'s `padding-top` was removed (was `--space-100`, now `0`) since the hero's own centering replaced it. Disabled below 900px (`min-height: auto; justify-content: flex-start`) — a forced 100vh reads as awkward empty space once the identity/statement text reflows onto more lines on narrower screens; letting it size naturally reads better there. The gap between the identity block and the statement block was initially reduced from `--space-280` to `--space-32` as part of this change, then reverted back to `--space-280` per follow-up request — the viewport-centering behavior stayed, only the internal gap value was kept as-is.
- **2026-08-18** — `.ds-h3-muted` ("Senior Product Designer") moved from `--type-h1` to `--type-h2`. `.bio-statement` ("I design products and systems...") moved from `--type-h2` to `--type-h1`. `.bio-company` ("Xoxoday, Bengaluru") stays on `--type-h3`, already where it needed to be, no change.
- **2026-08-18** — Light mode `--light-2` changed from `#6B6B6B` to `#525252` (darker/higher-contrast). Affects "Senior Product Designer," "Xoxoday, Bengaluru" (both mapped to other tokens as of the entry above, but were on `--type-h2`/`--type-h3` which don't set color — color still comes from `--light-2` on `.ds-h3-muted`/`.bio-company` directly), and all `--type-body` text in light mode. Note: this puts `--light-2` (`#525252`) close to `--light-3` (`#5A5A5A`, captions/dim text) — only 8 points apart on the 0–255 scale — reducing the visual distinction between body and caption text in light mode. Flagged, not resolved.
- **2026-08-18** — Project cards redesigned using new Figma-exported assets (`new project cards/` at repo root — reference screenshots + web/mobile image assets, not committed to `/images/`). Desktop layout mirrored from thumbnail-left/content-right to content-left/thumbnail-right via `.project-card { flex-direction: row-reverse; }` — HTML markup order unchanged (thumb div, then content div), so the existing `flex-direction: column` override at ≤720px naturally keeps the thumbnail on top when stacked on mobile, matching the new mobile mockups, with no extra rule needed. Each card's single thumbnail image was replaced with an art-directed pair via `<picture>`/`<source media="(max-width: 720px)">`: a portrait web crop and a landscape mobile crop, instead of one image resized by `object-fit: cover` at every size. New assets copied into `/images/` as `ai-card-web.png`/`ai-card-mobile.png`, `payments-card-web.png`/`payments-card-mobile.png`, `onboarding-card-web.png`/`onboarding-card-mobile.png`. Old single-image thumbnails (`*-Thumbnail.png`) are no longer referenced anywhere but were left in `/images/`, not deleted. Applied to both the homepage's 3 project cards and the "More Projects" cards at the bottom of all 3 case-study pages (6 more instances), since they share the same `.project-card` markup. **Superseded by the entry directly below — this first pass kept the existing dark/borderless card treatment; the follow-up rebuild replaced it entirely with a fixed-white card matching the mockups exactly.**
- **2026-08-18** — Project cards rebuilt a second time (superseding the entry above), initially on the wrong assumption — based on a misread of a reference screenshot — that the card is a fixed-white surface requiring fixed hex colors throughout (`background: #FFFFFF`, `border-radius: 20px`, text colors `#0A0A0A`/`#525252`, fully-round `9999px` outlined tags). **This was corrected the same day** — see the entry directly below. Kept only for history; do not follow the color/radius values described in this entry.
- **2026-08-18** — Project cards corrected per explicit spec after the above was wrong: **the card background is transparent**, sitting on the page background and inheriting the site's normal dark/light theming — not a fixed white surface. Every color inside the card therefore uses the existing `--light-1`/`--light-2`/`--dark-2`/`--dark-4` theme tokens like everywhere else on the site, not fixed hex — `.project-card` border uses `var(--dark-4)`, title uses `var(--light-1)`, byline/description use `var(--light-2)`. Card corner-radius is `12px` (was `20px`). Tag corner-radius is `8px` (was `9999px`, now matches the original pre-redesign value). Thumbnail background is also transparent (was `#F5F5F5`). Font tokens (`--type-h2` title — bumped up from `--type-h3` after confirming the title reads visibly larger than the description in the mockup, `--type-caption` byline/tags, `--type-body` description) are unchanged from the previous entry. `.project-card-byline` and the description-copy fix (single sentence per card, matching the mockup exactly instead of leftover two-sentence copy from the old site) also carry forward from the previous entries.
- **2026-08-18** — Two more corrections on the same card, per follow-up review: (1) tags changed from filled `var(--dark-2)` back to **transparent with a `var(--dark-4)` border**, matching the card's own border treatment, rather than a filled pill — this was the second attempt at tag styling in one day, first outlined-with-fixed-hex (wrong), then filled-var (also wrong), now outlined-with-token (confirmed correct). (2) `.project-card-body` gained `margin-top: var(--space-8)` on top of the existing `--space-12` flex gap, to open up more space specifically between the byline ("for Xoxoday") and the description paragraph below it (now 20px total) without affecting the title→byline or body→tags spacing, which stay at the base 12px. Confirmed zero hardcoded hex remain anywhere in `.project-card*` — every color and font declaration routes through an existing token.
- **2026-08-18** — All three cards' content brought in line with their mockups (previously only the AI card had been reviewed). Payments and Onboarding card descriptions changed from two leftover problem/solution sentences (old site copy) to the single mockup sentence each: Payments — "Reduced payment support tickets by ~25–35% and reconciliation effort by ~30%, by restructuring scattered workflows into one unified payments system."; Onboarding — "Reduced drop-offs by ~70% and increased conversion by ~12%, by simplifying signup and guiding users straight to their first reward." Onboarding's card title changed from "Onboarding Re-Architecture" to **"Admin Onboarding"**, matching its mockup exactly. *(Update, same day: the page-level mismatch flagged here was resolved — see the entry below.)* Payments' tag changed from "Finance Workflows" to **"Finance Workflow"** (singular, matching the mockup). The AI card's old copy, which had never been propagated to its two "More Projects" instances on `payments/index.html` and `onboarding/index.html`, was fixed there too while doing this pass. Assets (`ai-card-web/mobile.png`, `payments-card-web/mobile.png`, `onboarding-card-web/mobile.png`) were re-copied from updated source files in `new project cards/` more than once this session as the user iterated on them in Figma — always via a plain `Copy-Item -Force` from the exact source filename, never re-exported or modified by hand.
- **2026-08-18** — Fixed a real bug: on mobile (≤900px), the homepage had **zero top padding above the name** ("Anupam Bhowmick"). Cause: `body.home .page { padding-top: 0; }` is unconditional (added when the hero got its 100vh-centering treatment, so the flexbox centering — not a fixed offset — controls vertical position), but `.bio-identity-group`'s centering is itself disabled below 900px (`min-height: auto`), so nothing was left to create any top spacing at all on mobile. Fixed by adding `body.home .page { padding-top: var(--space-128); }` inside the `≤900px` media query only — this doesn't affect desktop, where the hero-centering trick is still active and still needs `padding-top: 0` to work. The 128px value matches the same unconditional top padding the three case-study pages already use above their own heading (`body.payments`/`body.onboarding`/`body.ai-system .page`), so mobile spacing above "Anupam Bhowmick" is now consistent with mobile spacing above each case study's title.
- **2026-08-18** — Fixed mobile project-card images getting cropped. Cause: `.project-card-thumb` used a fixed `height` (300px at ≤900px, 220px at ≤600px) combined with `object-fit: cover`, so the container's shape never matched the mobile assets' actual shape and `cover` cropped whatever didn't fit. All three mobile assets (`ai-card-mobile.png`, `payments-card-mobile.png`, `onboarding-card-mobile.png`) share the exact same dimensions — 854×636 (ratio 1.3428) — confirmed by reading their real pixel dimensions, not assumed. Replaced the fixed heights with `aspect-ratio: 854 / 636` on `.project-card-thumb` at ≤900px (removed the now-redundant fixed height at ≤600px entirely, since the ≤900px aspect-ratio cascades down). With the container's aspect ratio now matching the source image exactly, `object-fit: cover` has nothing left to crop — the full mobile asset displays edge-to-edge on every mobile card. If a future mobile asset ships at a different ratio than 854×636, this value needs updating to match.
- **2026-08-18** — Batch of content/token changes: `--dark-1` (page/nav background) changed from `#000000`/`#FFFFFF` to **`#191919`** (dark) / **`#F2F1EE`** (light) — moving off pure black/white to slightly warmer off-black/off-white. **Flagging, not changing:** `html.light .btn-primary`'s hardcoded background/border (`#000000`) was matching dark-mode `--dark-1` on purpose (see the Colors section's exception note) and is now stale against the new `#191919` — its text color (`#F2F2F2`) still matches `--light-1` correctly, only the background/border is out of sync. Left untouched pending an explicit decision, same as prior rounds of this exception. — The homepage's **Principles section removed entirely** (heading + the 6-item list); `.principles-list` in `style.css` is now unused anywhere on the site but was left in place (same treatment as other unused-but-kept rules/tokens). — Experience entries' duration parentheticals removed: "(~7 years)", "(1 yr 7 mos)", "(3 mos)" all dropped, dates now read e.g. "Jan 2019 – Present" with no trailing annotation. — All three Experience entries' `.exp-title` em dash (—) changed to a plain hyphen (-): "Senior Product Designer - Xoxoday", "UX/UI Designer - Gapoon", "UX/UI Designer - Algebra Analytics". — Footer copyright line changed from "Built with Claude" to **"Built by Claude Code"** on all 4 pages that have it (`index.html`, `payments/index.html`, `onboarding/index.html`, `ai-system/index.html`; `404.html` has no footer).
- **2026-08-18** — Homepage's `.bio-company` line changed from an external link ("Xoxoday, Bengaluru" → xoxoday.com, with a right-arrow icon and hover states) to a **static location line** ("Based in Bengaluru, India", with a location-pin icon, no hover/interaction) — it no longer references the company at all. Markup changed from `<a href>` to a plain `<p>`; the arrow SVG (`.bio-company-arrow`) was replaced with a pin+dot SVG (`.bio-company-icon`); `.bio-company`'s hover color-shift and the arrow's hover-translate animation were removed since there's nothing to click anymore. Font/color still `--type-h3`/`var(--light-2)`, unchanged.
- **2026-08-18** — Fixed a real contrast bug introduced by the `--dark-1` change above: `--dark-4` (the "Borders, dividers" token) was `#1F1F1F` in dark mode — only 6 points from the new `--dark-1` (`#191919`) — and `#EAEAEA` in light mode — only ~8 points from the new `--dark-1` (`#F2F1EE`) — making every border using it (project-card borders, tag borders, footer divider, nav tab-bar border, button hover states) nearly invisible. `--dark-4` is already the semantically correct token for this (documented as "Borders, dividers"), so the token's *value* was fixed rather than switching to a different token: dark mode → **`#333333`** (26-point contrast from the page bg), light mode → **`#D9D9D9`** (~25-point contrast). This is a sitewide fix, not scoped to cards — every other `var(--dark-4)` usage (button hovers, footer border, nav tab-bar) benefits the same way.
- **2026-08-18** — `onboarding/index.html`'s own page-level `<h1 class="project-hero-title">`, `<title>`, `<meta name="description">`, `og:title`, and `twitter:title` changed from "Onboarding Re-Architecture" to **"Admin Onboarding"**, to match the card title changed two entries above — resolves the mismatch flagged there as a pending decision. Confirmed via repo-wide grep that no "Onboarding Re-Architecture" references remain anywhere.
- **2026-08-18** — `.bio-company` ("Based in Bengaluru, India") moved from `--type-h3` to **`--type-body`** (the standard body text token). Color stays `var(--light-2)`, unchanged.
- **2026-08-18** — `.cs-workflow-box` (the Before/After activation-flow panel, shared by `onboarding/index.html` and `ai-system/index.html`) background hardcoded to **`#313131`** per explicit request, not theme-reactive (stays dark in light mode too on both pages). First applied to onboarding only via a `body.onboarding` scoped override, then extended to the AI System page in a same-day follow-up — since both pages now want the identical fixed value, the scoped override was removed and the base `.cs-workflow-box` rule itself hardcoded instead. This is an intentional, explicit exception to the "no hardcoded colors" rule, not an oversight.
- **2026-08-18** — Footer's "Email"/"LinkedIn" links (`.ds-link-muted`, all 4 pages) moved from `--type-nav` with underline to **`--type-caption`, no underline** — visually matching the adjacent copyright caption text. Hover interaction retained unchanged (`color: var(--light-2) → var(--light-1)` on hover, `cursor: pointer`).
- **2026-08-18** — Project card byline company name (`.project-card-byline strong` — "Xoxoday" / "Xoxoday Plum" in "for Xoxoday" etc., site-wide on all project cards) changed from `font-weight: 600` to `font-weight: 400`, matching the caption text's actual weight exactly. Highlight is now color-only (`var(--light-1)` vs. the byline's base `var(--light-2)`), no longer also bolded.
- **2026-08-18** (branch `mobile-changes`) — Projects now starts in the second fold at every breakpoint, matching desktop's existing behavior. Single-property change at ≤900px: `.bio-identity-group`'s `min-height` went from `auto` to `calc(100dvh - var(--nav-height) - var(--space-128))` (with a `100vh` line before it as the fallback half of a progressive-enhancement pair). Everything else in that rule — `justify-content: flex-start` and `gap: var(--space-160)` — is deliberately left exactly as it was, and the ≤600px `.bio-identity-group { gap: var(--space-96); }` override is untouched too, so **no element inside the hero moves**: the top padding above the name, the name/role/location block, the internal gap, and the statement/bio block all render identically to before. The box simply stretches to the bottom of the first screen, which grows only the empty space *below* the bio block — i.e. the gap between the bio section and Projects. Previously the box sized to its natural content height, so on shorter/narrower viewports Projects rendered above the fold and was visible before any scroll. The `--space-128` in the calc is the same token `body.home .page` uses for its top padding at this breakpoint (referenced, not duplicated as a literal), and that rule's `body.home .page` specificity (0,2,0) beats the ≤600px `.page` (0,1,0) override, so the 128px — and therefore the calc — holds at every mobile width. Desktop (>900px) is not touched at all.

---

## Typography

All tokens are `font` shorthand values (`weight size/line-height family`), applied as `font: var(--type-x);`. Color is always set separately per class, on every class, never inside the token.

| Token | Base value | At ≤720px | At ≤480px | Classes using it |
|---|---|---|---|---|
| `--type-display` | Sora 40/600/1.1 | 35/600/1.03 | 32/600/1.0 | `.ds-h1` (homepage name), `.project-hero-title` (case-study hero titles) |
| `--type-h1` | Sora 24/600/1.33 | 22/600/1.3 | 20/600/1.3 | `.ds-h2`, `.ds-h2-muted`, `.ds-h3`, `.cs-section-heading`, `.bio-statement` |
| `--type-h2` | Sora 20/600/1.4 | 18/600/1.4 | no change | `.project-section-heading`, `.ds-h3-muted` |
| `--type-subtitle` | Sora 14/400/1.5 | no change | no change | `.cs-hero-desc`, `.cs-workflow-line` |
| `--type-h3` | Sora 16/600/1.75 | 16/600/1.6 | no change | `.ds-body-highlight`, `.exp-title`, `.work-focus-label`, `.project-subsection-heading`, `.cs-sub-heading`, `.cs-impact-heading`, `.project-card-title`, `.text-highlight`, `.bio-company` |
| `--type-body` | Sora 16/400/1.6 | no change | 15/400/1.6 | `.ds-body`, `.ds-body p`, `.ds-body li`, `.principles-list li`, `.bio-text`, `.work-intro`, `.work-focus-desc`, `.project-card-body`, `.project-hero-desc`, `.project-body`, `.project-body li`, `.project-role-list li`, `.project-impact-list li`, `.cs-body`, `.cs-body li`, `.cs-impact-item` |
| `--type-caption` | Sora 12/400/1.4 | no change | no change | `.ds-caption`, `.project-card-tag`, `.exp-date`, `.cs-flow-box p`, `.cs-img-caption`, `.cs-workflow-caption`, `.email-tooltip` |
| `--type-nav` | Sora 14/600/1.4 | no change | no change | `.resume-modal-title`, `.resume-modal-download`, `.nav-link`, `.ds-link`, `.ds-link-muted`, `.btn`, `.btn-primary`, `.btn-secondary`, `.tab-btn` |
| `--type-code` | Sora 80/600/1, letter-spacing -4px | no change | no change | `.page-404-code` — isolated, not part of core scale |

Notes on this table:
- `.ds-h3` is the 404 page's "Page not found" line.
- `.project-card-tag` adds a local `font-weight: 500` on top of `--type-caption`'s base weight of 400 — this predates and is unrelated to the heading-weight change above (`--type-caption` itself is still 400).
- Responsive steps are defined once, on the tokens themselves, inside `@media (max-width: 720px) { :root { ... } }` and the matching `480px` block — not per class. Any class that references a token inherits correct mobile sizing automatically, with no per-class override needed.
- `--type-display`'s ≤720/≤480 values (35px, 32px) reuse the exact numbers previously established for a 40px `--type-display` (from the short-lived `--type-display-name` split), rather than being recalculated fresh. Line-height (1.1/1.03/1.0) is unchanged from the prior 56px version — it's unitless, so it doesn't need to scale with font-size.
- All documented inline-emphasis/bold modifiers (`.cs-link`, `.cs-workflow-flow`, `<strong class="cs-impact-heading">`, etc. — see subsection below) are unaffected by the heading-weight changes in either direction (500 or back to 600): their `font-weight: 600` local overrides sit on top of `--type-body`/`--type-subtitle`, both always 400, never on top of the heading tokens.

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

All 8 live `<strong>` tags on the site are inside `ai-system/index.html`, and all 8 carry `class="cs-impact-heading"`. There are no unclassed or raw `<strong>`/`<b>` tags anywhere on the site.

`.text-highlight` used to belong in this table (color only, inherited size/weight from its `.bio-text`/`.cs-body` parent). It no longer does — as of 2026-08-18 it uses `--type-h3` directly as its own token, like `<strong class="cs-impact-heading">` does, so it's listed in the main table above instead. This affects every instance on the site: the homepage's "9 years", plus all 38 former `.cs-link` spans renamed to `.text-highlight` across payments/onboarding/ai-system (see Changelog and the earlier `.cs-link` → `.text-highlight` rename). All of them are now bold (weight 600, was previously not bold) at the same 16px size as before, with `--type-h3`'s 1.75 line-height instead of inheriting the parent paragraph's 1.6.

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
| `--space-100` | 100px | Breakpoint, ≤900px only | No longer unconditional — `body.home .page`'s padding-top was removed 2026-08-18 (now `0`), see Changelog |
| `--space-112` | 112px | Desktop base | Used only by legacy `.project-list`, which is dead code |
| `--space-120` | 120px | Breakpoint, ≤900px | |
| `--space-124` | 124px | Page-variant, unconditional | Used only by `body.payments .content` and `body.onboarding .content` gap. Not tied to any breakpoint |
| `--space-128` | 128px | Desktop base and page-variant | Shared value: used by the default `.page` padding-bottom and by `body.payments`/`body.onboarding`/`body.ai-system .page` padding-top. Not exclusively page-variant |
| `--space-132` | 132px | Desktop base | Used by `.bio-main` gap |
| `--space-160` | 160px | Breakpoint, ≤900px | Used by `.bio-identity-group`'s ≤900px gap step |
| `--space-200` | 200px | Desktop base | Used by `.content` gap |
| `--space-280` | 280px | Desktop base | Used by `.bio-identity-group` gap (homepage hero) — see adjusted values below |

### Values adjusted during consolidation

Two outliers had the largest visual shift of the whole snap-to-4px pass, ±2px each. Worth remembering if anything looks subtly off around these two spots.

| Original value | New token | New value | Delta | Used by |
|---|---|---|---|---|
| 50px | `--space-48` | 48px | −2px | `.project-card` gap — the homepage's 3 project cards, plus the "More Projects" cards on all 3 case-study pages |
| 282px | `--space-280` | 280px | −2px | `.bio-identity-group` gap — homepage hero, the gap between the name/role/company block and the statement/bio paragraph block |

Full list of every outlier snapped to the nearest 4px step during this pass, all folded into the tokens above with no dedicated token created just for the outlier: 5→4, 6→8, 10→12, 14→16, 22→24, 30→32, 33→32, 50→48, 282→280.

---

## Colors

Token names are unchanged since the original `--color-*` rename pass. Values were updated in the Vercel-matched neutral palette pass — see Changelog. Dark is the `:root` default; light is the `html.light` override.

| Token | Dark value | Light value | Usage | Status |
|---|---|---|---|---|
| `--dark-1` | `#191919` | `#F2F1EE` | Page/nav background | Active |
| `--dark-2` | `#0D0D0D` | `#F7F7F7` | Card/image panel fills, button backgrounds | Active |
| `--dark-3` | `#141414` | `#F0F0F0` | None currently | Defined but unused in any live rule — reserved/available for future use |
| `--dark-4` | `#333333` | `#D9D9D9` | Borders, dividers | Active |
| `--light-1` | `#F2F2F2` | `#0A0A0A` | Primary text — headings, emphasis | Active |
| `--light-2` | `#A0A0A0` | `#6B6B6B` | Body/muted text | Active |
| `--light-3` | `#8A8A8A` | `#5A5A5A` | Captions, dividers, disabled/dim text | Active |
| `--workflow-bg` | `#0D0D0D` | `#F5F5F5` | Before/after workflow box background | Active |
| `--media-bg` | `#101010` | `#F2F2F2` | Video placeholder background | Active |
| `--surface-tint` | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.04)` | Subtle surface tint on image placeholders | Active |

### Intentional non-tokenized exception

`html.light .btn-primary` hardcodes hex values instead of referencing variables: `background: #000000`, `border-color: #000000`, `color: #F2F2F2`, and on hover `background: #0D0D0D`, `border-color: #0D0D0D`. This is deliberate, not an oversight.

Why: this rule lives inside the `html.light` scope, where `--dark-1`/`--dark-2` are redefined to their light-mode values. If the rule referenced `var(--dark-1)` instead of a literal hex, it would resolve to the light-mode value, not the dark-mode value, flipping the button from dark-on-light to light-on-light and breaking its intended look. The hardcoding exists specifically to preserve a fixed dark-button-on-light-page appearance regardless of theme. Do not replace these hex values with variable references.

**Status: updated to match the current neutral palette** (2026-08-17) — values now equal the current dark-mode `--dark-1` (`#000000`, background/border/hover-border) and `--dark-2` (`#0D0D0D`, hover background), plus `--light-1` (`#F2F2F2`, text color). They will need updating again by hand if `--dark-1`/`--dark-2`/`--light-1` change in the future, since this rule intentionally does not reference the variables.

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
