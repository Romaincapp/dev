---
version: 1
slug: "src-app-lang-page-tsx"
primary_target: "src/app/[lang]/page.tsx"
related_targets: []
---

# Surface: portfolio home + audience pages + case studies (FR/EN)

Scope: every route of the portfolio. Visitor mode: Persuade.
Audience: direct clients, agencies and devs, founders with a vibe-coded project.
Action: send the contact form (free audit and quote, by video call or on site in Belgium).
Proof: four projects in production. Only two figures are allowed: 70 premium rentals and 150 dates per year.
Constraints: no prices, no vanity stats, the e-mail is never rendered, no eyebrow or kicker labels.

## Direction contract

THESIS: A developer-tool product site (the canon of GitHub, Supabase and Stripe, chosen by Romain over the rejected transit map), played straight at their craft level. The portfolio reads like documentation for a reliable product: Romain.

OWN-WORLD:
- Grounds: white and #f6f8fa canvas in light; #0b0d10 and #151a20 in dark.
- Borders: 1px hairlines (#d1d9e0 light, #262c33 dark).
- Accent: one emerald (#0a7d55 light, #3ecf8e dark) for primary actions and success states only.
- Type: Geist Sans for the UI and headlines, tight tracking; Geist Mono for code, terminal output and repository metadata.
- Components: rounded 8–12px panels, repo-style metadata rows (language dot, stack tags, Public/Private label), terminal and browser-window frames.

STORY: In one screen the visitor sees who Romain is, what he ships and the free audit offer. Next, a terminal that audits a vibe-coded app shows the expertise. Then the visitor picks their profile in a tab switcher, browses real projects framed like product screenshots, and sends the form.

FIRST VIEWPORT: Sticky navbar with a solid background and a bottom border: brand, links (Projects, Agencies, Code review), FR/EN, theme toggle and a primary "Get in touch" button. Left: the large headline, the lead, two CTAs (primary "Get in touch", secondary "See projects") and the location with an availability status. Right: a terminal window running `npx romain-dev audit ./my-app`, whose checks appear line by line (labelled as an example).

FORM: canon direction (the category standard), taken through the standing exit at the user's request; reference products GitHub, Supabase and Stripe; the original seed key acbb0a02 is superseded.
SIGNATURE INTERACTION: an audience tab switcher (Clients, Agencies, Code review) with a keyboard-accessible tablist, each tab revealing its offer and a matching code or terminal snippet.
MOTION: the terminal lines type in once on load from a fully readable default; reduced motion shows them all at once.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
