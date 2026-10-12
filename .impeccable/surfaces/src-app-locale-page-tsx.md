---
version: 1
slug: "src-app-locale-page-tsx"
primary_target: "src/app/[locale]/page.tsx"
related_targets: []
---

# Surface: portfolio home + audience pages + case studies (FR/EN)

Scope: every route of the portfolio. Visitor mode: Persuade.
Audience: direct clients, agencies/devs, founders with a vibe-coded project.
Action: send the contact form (free audit and quote, by video or on site in Belgium).
Proof: 4 projects in production (WelcomeApp, Dandyshoes site + shop, Camping du Wignet, championship manager). Only two numbers allowed (70 premium rentals, 150 dates per year).
Constraints: no prices, no vanity stats, e-mail never rendered, no eyebrow/kicker labels.

## Direction contract

THESIS: The portfolio is a transit network. Three coloured lines (Clients, Agences, Audit), one per audience, run through project "stations" and converge on one shared terminus: Contact. It refuses the category default of a centred headline over a row of equal project cards.

OWN-WORLD: Belgian transit signage (Charleroi light metro, enamel station plates). Cool signage-white ground, near-black ink, a dark navy station band for the header and footer. Three line colours own their regions: vermilion (Clients), cobalt (Agences), signal yellow (Audit). Roundel line badges, station plates with rounded-rectangle enamel panels, arrows. Type: Overpass (highway-signage derived) for display and UI, Overpass Mono only for station codes and data.

STORY: A visitor finds their line in one look, follows it through real projects in production, believes Romain ships working products (payments, data, multilingual), and gets off at the terminus to send a request.

FIRST VIEWPORT: The navy station band at the top: brand "Romain / Dev" and its subtitle on the left, the three line badges as navigation, and the terminus button "Me contacter" on the right. Below it, a full-width network map covers the ground. A signage panel set on the map carries the headline (large, Overpass Black), the promise and "Charleroi, Belgique · remote". The three lines are working controls: each origin label ("J'ai un projet", "Je suis une agence", "J'ai vibe-codé une app") is a link to its line page. All three converge at a terminus plate, "Audit & devis gratuits", which is the primary action. On mobile, three vertical parallel lines descend to the terminus.

FORM: Transit wayfinding / network map, candidate 5 of 7 on the ordered list; seed key acbb0a02 (degraded roll, no challengers).
SIGNATURE INTERACTION: hovering or focusing a line highlights it and its stations while the other lines dim; inner pages run their content along that line's rail with station markers.
MOTION: a single orchestrated moment on load: a train dot travels each line to the terminus from an already-visible map. It is disabled under prefers-reduced-motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
