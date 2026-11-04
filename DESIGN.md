---
name: AURELIA
description: Coworking space booking platform with a quiet-luxury editorial aesthetic
colors:
  bg: "#F5EFE6"
  surface: "#FDFBF7"
  subtle: "#EDE5D8"
  border: "#E2D8CA"
  text: "#2E241B"
  text-secondary: "#7C6F62"
  brand: "#33261C"
  brand-deep: "#211912"
  accent: "#9A6B3F"
  accent-light: "#D4AF7E"
  success: "#3F5A38"
  success-bg: "#E6EFE4"
  warning: "#644424"
  warning-bg: "#F2E5D2"
  danger: "#B3402E"
  danger-bg: "#F6E3DE"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontWeight: 500
    lineHeight: 1.02
  heading:
    fontFamily: "Playfair Display, Georgia, serif"
    fontWeight: 500
    lineHeight: 1.1
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    lineHeight: 1.6
    fontWeight: 400
  label:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.22em"
rounded:
  md: "0.75rem"
  lg: "1rem"
  card: "1.25rem"
  sheet: "1.5rem"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  hero: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.bg}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.brand-deep}"
    textColor: "{colors.bg}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
    border: "1px solid {colors.border}"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.bg}"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    border: "1px solid {colors.border}"
    shadow: "0 8px 32px rgba(51, 38, 28, 0.06)"
  input:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.full}"
    border: "1px solid #E2D8CA"
    padding: "0.625rem 1.25rem"
  badge:
    rounded: "{rounded.full}"
    padding: "0.125rem 0.625rem"
---

# Design System: AURELIA

## 1. Overview

**Creative North Star: "The Sunlit Atelier"**

AURELIA is quiet-luxury editorial — espresso and bronze on warm cream surfaces, like a sunlit design atelier. It is inviting without being casual, premium without being cold. The interface steps back to let the spaces speak, using generous whitespace, hairline borders, and restrained motion. Light only. No dark mode anywhere.

**Key Characteristics:**
- Warm cream canvas (#F5EFE6) with a near-white card surface (#FDFBF7) for tonal lift
- Espresso (#33261C / #211912) as the single voice: buttons, footer, active nav, admin pill states
- Bronze (#9A6B3F) as the restrained accent: eyebrow dots, focus rings, italic emphasis words
- Playfair Display serif for headlines (with italic accents), DM Sans for body
- Pill-shaped primary actions, 20px radii on cards, hairline #E2D8CA borders
- Motion that conveys state, not decoration; GSAP scrub/entrance, Framer Motion micro-interactions

## 2. Colors

**The Cream Canvas Rule.** #F5EFE6 is the room everything sits in. Cards (#FDFBF7) lift with a single hairline border and a whisper of warm shadow, never with saturated fills.

### Primary
- **Espresso** (#33261C): Primary buttons, active nav pill, admin active states, brand wordmark accents, footer is deeper (#211912).
- **Bronze** (#9A6B3F): Eyebrow markers, focus rings, links' hover, italic serif emphasis. Never more than 10% of any screen.

### Neutral
- **Canvas** (#F5EFE6): Page backgrounds.
- **Surface** (#FDFBF7): Cards, modals, inputs, sidebar.
- **Subtle** (#EDE5D8): Section bands, table headers, skeletons.
- **Hairline** (#E2D8CA): All borders and dividers.
- **Body Text** (#2E241B): Copy, headings, nav labels.
- **Muted Text** (#7C6F62): Metadata, second lines, captions.
- **Footer** (#211912): Deep espresso footer / bookend sections with cream type.

### Semantic
- **Success** (#3F5A38 on #E6EFE4): Confirmed bookings, positive badges.
- **Warning** (#644424 on #F2E5D2): Pending states, attention badges.
- **Danger** (#B3402E on #F6E3DE): Destructive actions, cancelled status, field errors.
- **Info** (#47543E on #E8ECE4): Informational badges.

### Named Rules
**The One Voice Rule.** Espresso is the interface's single voice. Bronze is seasoning, never the dish.
**The Eighth-Wall Rule.** Dark appears only as espresso bookends (footer, closing CTA, auth brand panel is avoided in favour of sunlit imagery). Never a global dark theme.

## 3. Typography

**Display Font:** Playfair Display (Georgia, serif fallback)

**Body Font:** DM Sans (ui-sans-serif, system-ui, sans-serif fallback)

A high-contrast serif/sans pairing. Playfair carries the editorial authority; DM Sans keeps booking flows effortless at small sizes. No third typeface anywhere (mono is restricted to booking timestamps in Code contexts and hidden from the UI).

### Hierarchy
- **Display** (500 weight, 5rem to 7.5rem, 0.96 leading): Hero headline, the 404, section eyebrow-paired serif lines. Italic emphasis on one word in bronze ("Beyond", "inspire", "trust").
- **Title** (500 weight, 2.5rem to 4rem): Page h1s and closing CTA bands.
- **Heading** (500 weight, 1.5rem to 2rem): Card titles, section h2s inside content columns.
- **Body** (400 weight, 0.9375rem, 1.6): Most text. Max 68ch for prose.
- **Eyebrow** (500 weight, 0.6875rem, 0.28em tracking, uppercase): Small-caps labels with a 4px bronze dot. Always the first element in a section.

## 4. Elevation

Flat by default, lifted by light. Surfaces are level at rest; depth is conveyed by warm shadows tinted with espresso, never gray or black.

### Shadow Vocabulary
- **Rest** (`0 8px 32px rgba(51,38,28,0.06), 0 1px 4px rgba(51,38,28,0.02)`): Cards, inputs on focus-adjacent states.
- **Hover Lift** (`0 12px 40px rgba(51,38,28,0.1)`): Card hover, 2–3px translateY. Pair with border stay.
- **Hero Image** (`0 30px 80px rgba(51,38,28,0.18)`): The one dramatic elevation, under the full-width hero photograph.
- **Modal** (`0 16px 48px rgba(51,38,28,0.14)`): Dialogs and menus.

### Named Rules
**The Candlelight Rule.** Warm shadows only. If a shadow reads gray, tint it espresso.

## 5. Components

### Buttons
- **Shape:** Fully pill-shaped (9999px), never rectangular.
- **Primary:** Espresso (#33261C) fill, cream text, 220ms bronze-ish hover to #211912. Sizes: sm 0.375rem, md 0.625rem, lg 0.75rem vertical padding.
- **Outline:** 1px espresso border, espresso text; hover inverts to fill.
- **Ghost:** Text only, quiet sand hover wash.
- **Danger:** #B3402E fill, cream text.
- **Motion:** Framer Motion scale 1.02 hover, 0.97 tap.

### Cards
- **Shape:** 20px radius, 1px #E2D8CA border, cream-white fill.
- **Hover:** 2–3px lift with espresso-tinted shadow; images scale 1.05 over 1.2s.
- **Internal Padding:** 24–40px, generous and even.
- **No stripe accents, no corner ribbons.** Status lives in badges or small-caps text.

### Inputs
- **Shape:** Pill-shaped fields, cream fill, hairline border.
- **Focus:** Bronze ring (2px, 30–40% opacity) + bronze border.
- **Error:** #B3402E border, matching helper text below.
- **Label:** 14px medium, espresso-800, 6px gap.

### Badges
- **Shape:** Full pill, 11px medium uppercase, 0.08em tracking.
- **Variants:** Confirmed (deep green on sage), Pending (bronze on sand), Cancelled/danger (brick on blush), Default (sand on paper).

### Navigation
- **Public Nav:** Fixed, transparent over the hero, blur + cream wash + hairline border after 24px scroll. Brand left (letterspaced serif wordmark), links centered (Spaces / Membership / About / Journal), espresso pill CTA right ("Contact", or "Dashboard" when signed in).
- **Member Nav:** Same system, links Dashboard / My Bookings, pill avatar menu.
- **Admin Nav:** Cream top bar with blur; desktop icon-only espresso pill sidebar on sand; active item is espresso fill with cream icon.

### Footer
- Deep espresso (#211912), cream wordmark, warm-gray muted copy, bronze hover links, hairline separators at 20% bronze.

### Modal
- 20px radius cream panel, espresso-tinted backdrop with blur. Framer Motion scale/opacity entrance.

## 6. Do's and Don'ts

### Do
- **Do** let the photography lead. Type steps back; images of the spaces speak first.
- **Do** pair every section with an eyebrow (dot + small caps) before the serif line.
- **Do** use Playfair Display with italic bronze for exactly one word per headline.
- **Do** use pill buttons and 20px card radii; keep corner language consistent.
- **Do** keep motion to two channels: GSAP for scroll, Framer Motion for state.

### Don't
- **Don't** introduce a second accent hue (no teal, no amber, no indigo). Bronze and espresso only.
- **Don't** build dark mode or add `dark:` variants. ".dark" selectors do not exist in this codebase.
- **Don't** use em dashes in copy. Commas, colons, periods.
- **Don't** use exclamation marks in interface copy.
- **Don't** use pure #000 or #fff. Warm-tinted neutrals only.
- **Don't** animate layout properties; transform and opacity only.
- **Don't** reach for modals before exhausting inline or progressive alternatives.
