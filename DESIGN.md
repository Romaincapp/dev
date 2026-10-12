---
name: Romain / Dev
description: Freelance developer portfolio in the developer-tool canon (GitHub, Supabase, Stripe), light and dark.
colors:
  bg: "#ffffff"
  bg-subtle: "#f6f8fa"
  bg-muted: "#eff2f5"
  fg: "#1f2328"
  fg-muted: "#59636e"
  border: "#d1d9e0"
  border-strong: "#b7c0ca"
  accent: "#0a7d55"
  accent-hover: "#087049"
  accent-soft: "#e3f4ec"
  danger: "#c4322b"
  code-bg: "#0b0d10"
  code-fg: "#e6edf3"
  code-muted: "#8b949e"
  dark-bg: "#0b0d10"
  dark-bg-subtle: "#11151a"
  dark-fg: "#e6edf3"
  dark-fg-muted: "#9198a1"
  dark-border: "#262c33"
  dark-accent: "#3ecf8e"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.1rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.045em"
  heading:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  small:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  code:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  control: "6px"
  panel: "12px"
  pill: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "24px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 16px"
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 12px"
  code-window:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-fg}"
    rounded: "{rounded.panel}"
---

# Design System: Romain / Dev

## Overview

The site plays the developer-tool product canon (GitHub, Supabase, Stripe) straight, at their level of craft. Romain chose this direction after rejecting an earlier "transit map" concept. The portfolio reads like the documentation of a reliable product, with these traits:

- calm neutral grounds and 1px hairline borders;
- one emerald accent for actions and success;
- Geist for the interface;
- the expertise shown in the vocabulary of developers themselves: terminal output, code windows, repository metadata.

It ships light and dark themes. A script in `<head>` sets `data-theme` from localStorage, or from the system setting, before first paint. The toggle sits in the navbar (desktop) and in the mobile menu.

## Colors

### Primary

- **Emerald accent**:
  - `#0a7d55` in light (white text on it: 5.15:1);
  - `#3ecf8e` in dark (near-black text on it: 9.75:1).
- Uses: primary buttons, links in the accent colour, check icons, the availability dot, figure pills, the selected form option.

### Neutral

| Role | Light | Dark |
| --- | --- | --- |
| Ground | `#ffffff` | `#0b0d10` |
| Alternate sections | `#f6f8fa` | `#11151a` |
| Muted | `#eff2f5` | `#171c22` |
| Text | `#1f2328` | `#e6edf3` |
| Muted text | `#59636e` | `#9198a1` |
| Borders | `#d1d9e0` | `#262c33` |

Code windows are always dark (`#0b0d10`, or `#070809` in dark mode).

### Named Rules

- **One accent:** emerald only. Red, yellow and green appear only as terminal status icons and window traffic lights.
- **Sections alternate** between `bg` and `bg-subtle`, separated by hairline borders, never by shadows.

## Typography

Geist Sans and Geist Mono are self-hosted with the `geist` package.

### Hierarchy

- **Display (h1):** weight 600, tracking -0.045em, from 2.5rem to 4.1rem.
- **Section headings (h2):** weight 600, from 1.875rem to 2.25rem.
- **Body:** 16–18px, with a measure of 48–65ch.
- **Mono:** reserved for code, terminal output, stack tags and step numbers.

### Named Rules

- **No eyebrows:** headings stand alone. Mono is never used as a "tech" costume on prose labels.

## Layout

- **Container:** max-w-6xl (72rem), with gutters of 16px (mobile) and 24px (desktop).
- **Spacing:** sections of 80–112px vertically.
- **Home hero:** headline, CTAs and availability on the left, the terminal on the right. They stack on mobile.
- **Projects:** rows alternating copy and visual, never a grid of cards.
- **Hero background:** a 48px engineering grid fading out radially behind heroes.

## Elevation & Depth

- **Panels:** a 1px border plus a soft shadow, `0 1px 2px` and `0 8px 24px -12px` in light, deeper in dark.
- **No hard offset shadows and no glass.**

## Shapes

- **Controls:** 6px radius.
- **Panels and windows:** 12px radius.
- **Pills:** status chips, mode options, tool chips.
- **Window chrome:** the three traffic-light dots.

## Components

- **Buttons:** primary in emerald; secondary bordered on the ground; ghost for icons. All are 36–44px tall.
- **Terminal (signature):** a dark window running `npx romain-dev audit`, with check, cross and warning icons. Lines appear in sequence on load, disabled under reduced motion.
- **Audience tabs:** an accessible tablist (arrow keys, Home, End). Each panel holds an offer, a checklist and a code window (deliverables, `git log`, an RLS fix).
- **Project row:** repository metadata (Public or Private badge, language dot), name, tagline, an optional figure pill, facts with check icons, stack tags in mono, case study link. The visual sits in a browser frame (landscape), a phone frame (portrait) or a code window.
- **Steps:** numbered cells (01 to 04) in a single bordered grid; the numbers carry the order.
- **Form:** radio cards for the request type, pill toggles for the first conversation, a 40px field with an emerald focus ring.

## Do's and Don'ts

### Do:

- Show the expertise in developer vocabulary (terminal, code, repository).
- End every page on the contact form.
- Keep the two approved figures as the only numbers.

### Don't:

- Display the e-mail address.
- Add a second accent colour, gradient text, glass, or vanity stats.
- Add scattered animations; the terminal is the only motion moment.
