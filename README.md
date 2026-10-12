# Romain / Dev

Portfolio of Romain Dumoulin, freelance web developer (Charleroi, Belgium / remote). It is bilingual (FR/EN) and built as a transit network: three lines, one per audience, all lead to the contact form.

| Line | Audience | Page |
| --- | --- | --- |
| 1 · Clients | Small businesses, independents, non-profits | `/fr`, `/en` + case studies |
| 2 · Agencies & devs | Subcontracting, team reinforcement | `/fr/agences`, `/en/agencies` |
| 3 · Code review | Vibe-coded apps to make solid | `/fr/audit`, `/en/code-review` |

## Stack

- **Framework**: Next.js 16 (App Router, Cache Components) and TypeScript.
- **UI**: Tailwind CSS 4 and shadcn/ui primitives on Radix (`src/components/ui`), with Overpass self-hosted through Fontsource.
- **i18n**: no library.
  - Dictionaries live in `src/i18n/dictionaries/`.
  - Routes use `[lang]`, and French slugs are rewritten in `next.config.ts`.
  - `src/proxy.ts` redirects `/` to the visitor's language.
- **Contact form**: a Server Action (`src/app/actions/contact.ts`) with zod validation, sent via Resend.
- **Analytics**: Vercel Analytics, with the `cta_click` and `contact_submit` events.
- **Tests**: Playwright and axe-core (`tests/`).

## Content

- Projects: `src/data/projects.ts` (bilingual text, stack, links, images).
- Lines (audiences): `src/data/lines.ts`.
- All site copy: `src/i18n/dictionaries/fr.ts` and `en.ts` (the EN dictionary is type-checked against the FR one).

## Development

```bash
npm install
npm run dev        # http://localhost:3000 (the form runs in dry-run mode without Resend)
npm run build
npm run lint
npm test           # builds, starts the server and runs Playwright (desktop + mobile)
```

In an environment without its own Chromium download, point `PLAYWRIGHT_CHROMIUM_PATH` at a local Chromium.

## Environment variables (Vercel)

See `.env.example`.

- `RESEND_API_KEY`: Resend key.
- `CONTACT_TO_EMAIL`: address that receives requests. It stays server-side and is never displayed on the site.
- `CONTACT_FROM_EMAIL` (optional): sender on a domain verified in Resend.
- `NEXT_PUBLIC_SITE_URL`: public URL, used for canonical URLs and the sitemap.

## Design

The visual system is documented in `DESIGN.md`, and the product context in `PRODUCT.md`. The design was built with the [Impeccable](https://github.com/pbakaus/impeccable) skill (Apache 2.0), vendored in `.claude/skills/impeccable/`.
