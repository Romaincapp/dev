---
name: Romain / Dev
description: Freelance portfolio built as a transit network. Three lines lead to one terminus, the contact form.
colors:
  paper: "#f2f4f5"
  plate: "#ffffff"
  ink: "#12161c"
  ink-2: "#48505c"
  rule: "#d3d9df"
  band: "#0e2140"
  band-2: "#17305a"
  band-ink: "#ffffff"
  band-ink-2: "#c3cbd8"
  line-1: "#d63a22"
  line-2: "#1f57c3"
  line-3: "#f2b705"
  line-1-soft: "#fbe3de"
  line-2-soft: "#dfe8f8"
  line-3-soft: "#fdf1cc"
typography:
  display:
    fontFamily: "Overpass Variable, Overpass, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 5.75rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  heading:
    fontFamily: "Overpass Variable, Overpass, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.6vw, 4rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Overpass Variable, Overpass, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  code:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  field: "10px"
  plate: "14px"
  pill: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "40px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.band}"
    textColor: "{colors.band-ink}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.band-2}"
  button-terminus:
    backgroundColor: "{colors.line-3}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 20px"
  station-plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "40px"
  input:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    height: "48px"
    padding: "0 16px"
---

# Design System: Romain / Dev

## Overview

The portfolio is a transit network modelled on Belgian station signage (the Charleroi light metro, enamel station plates). Three coloured lines, one per audience, run through the projects (the "stations") and converge on a single terminus: the contact form. Every page ends there.

- **Line 1, Clients** (vermilion): small businesses with a project.
- **Line 2, Agencies & devs** (cobalt): teams subcontracting Next.js, Supabase and Stripe work.
- **Line 3, Code review** (signal yellow): founders whose vibe-coded app must hold up in production.

The world is the page's structure, not decoration. Roundels carry line numbers, project codes sit in station plates, sections run along a line rail, and the navy band frames every page top and bottom like platform signage.

## Colors

### Primary

- **Band navy** `#0e2140`: header, footer, terminus panels, primary buttons.

### Line colours

Each line colour owns whole regions (bands, rails, roundels). They are never scattered as accents.

- **Line 1 vermilion** `#d63a22`: white text on it only at 18px or more (4.68:1).
- **Line 2 cobalt** `#1f57c3`: also the focus ring colour on light grounds.
- **Line 3 signal yellow** `#f2b705`: always ink text on it. This is the primary action colour: every "Me contacter / Get in touch" is yellow.

### Neutral

- **Paper** `#f2f4f5`: a cool signage white, used as the page ground. Never cream.
- **Plate** `#ffffff`: enamel surfaces.
- **Ink** `#12161c` and **ink-2** `#48505c` for text. Ink-2 is 7.38:1 on paper.

### Named Rules

- **One action colour:** yellow means "get in touch". Nothing else uses a yellow button.
- **Lines own regions:** a line colour fills a band, a rail or a roundel, never a thin side stripe.

## Typography

Overpass, which derives from US highway signage, is the only family and is self-hosted through Fontsource. Overpass Mono is reserved for codes and data: station codes (WA, DS), step numbers, tabular figures.

### Hierarchy

- **Display:** weight 900, tracking -0.035em, line height 0.98, at most about 6rem.
- **Section heading:** weight 900, `clamp(2.2rem, 4.6vw, 4rem)`.
- **Sub-heading:** weight 900, 1.5–2.75rem.
- **Body:** 17px, line height 1.6, measure 44–62ch.

### Named Rules

- **No eyebrows:** headings carry their own weight. No mono labels as "tech" costume.

## Layout

- Content max width 90rem, with gutters of 16px (mobile), 24px and 40px (desktop).
- Sections are separated by 80–112px.
- Desktop hero: the headline sits in two columns (headline plus lead), then the full-width network map. The SVG uses a 1280×400 viewBox, and its HTML origin plates and terminus are positioned in percentages so they scale together.
- Below 1024px the map turns into three parallel vertical rails that descend to the terminus.
- Inner pages run their sections along their line's vertical rail, with a station marker on each heading.

## Elevation & Depth

Plates float slightly on paper: `0 1px 0 rgb(14 33 64 / .06), 0 10px 30px -18px rgb(14 33 64 / .35)`. Navy terminus panels use a deeper `0 18px 40px -20px`. There are no hard offset shadows and no glass.

## Shapes

Plates have a 14px radius. Fields have 10px. Buttons and chips are pills. Line badges are perfect circles. Interchange stations are capsules with a 5px ink outline.

## Components

### Buttons

Navy pill (primary), yellow pill (contact action), white pill on coloured bands. All are 44–56px tall. Hover lightens navy to `#17305a` and raises plates by 2px with `cubic-bezier(0.16, 1, 0.3, 1)`.

### Line badge

A circle in the line colour with a weight-900 number, in four sizes (24, 32, 48, 80px).

### Station plate (project)

A white plate split between text and image. It holds the line badges, the station code, the name, a tagline, facts with ring markers, and an optional single figure on a yellow tag. Only two figures exist on the site: about 70 premium rentals (WelcomeApp) and about 150 championship dates per year.

### Inputs / Fields

White fields with an inset 1.5px rule. The focus ring is cobalt at 2px, and the invalid state is vermilion. Choices are radio plates: the selected plate gets a 2.5px ink outline, and a selected mode pill turns navy.

### Navigation

The navy band holds the brand ("Romain / Dev" with a yellow slash, "By Romain Dumoulin"), the three lines as links, the FR/EN switch and the yellow contact button. On mobile, a navy sheet opens with the same items.

### Network map (signature)

Three 14px lines with metro-style 45° bends converge on the terminus. Hovering or focusing a line dims the others to 18% opacity and thickens the active line to 20px. On load, a train dot runs each line once; it is hidden under reduced motion.

## Do's and Don'ts

### Do:

- End every page on the terminus (the contact form).
- Give each audience its own line colour and keep it consistent.
- Show real projects in production, and only the two approved figures.

### Don't:

- Display the e-mail address anywhere. The form is the only channel.
- Use cream grounds, gradient text, hard offset shadows, eyebrow labels or skill bars.
- Add vanity statistics (commits, languages, Lighthouse scores).
