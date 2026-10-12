# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript) + Tailwind CSS + shadcn/ui, next-intl (FR/EN), Resend for the contact form, deployed on Vercel. Chosen by Romain.

## Users

Three audiences, each with its own entry point:

1. **Direct clients**: small businesses, independents and associations (Belgium first, remote elsewhere) who need a website, an online shop or a custom web app.
2. **Developers and agencies**: they need a reliable freelancer to subcontract or reinforce a team on Next.js / Supabase / Stripe projects.
3. **Founders with a "vibe-coded" project** (Lovable, Bolt, Cursor, v0, Claude Code…): the product works, but they need a professional eye before going to production or scaling.

## Product Purpose

Portfolio for Romain Dumoulin, a freelance web developer launching his activity. Its single job is to make the visitor send a contact request through the form. Success means qualified requests from any of the three audiences.

## Positioning

Romain builds and runs real web products in production himself: payments (Stripe Checkout, webhooks, Connect), data (Supabase with RLS), multilingual content, and tools used by real clubs and clients. He works with AI agents every day, so he knows where AI-generated code breaks. Free audit and quote, by video call or on site in Belgium.

## Operating Context

- Brand: "Romain / Dev", with "By Romain Dumoulin" as the subtitle.
- Based in Charleroi, Belgium, and works remotely.
- Site languages: French (default) and English.
- Contact only through the form. Romain's e-mail is never displayed or committed; it is a server-side environment variable.

## Capabilities and Constraints

- No prices displayed. The entry offer is "Free audit and quote, by video call or on site in Belgium".
- No vanity statistics (commits, PRs, language percentages, skill bars).
- Only two numbers may be shown:
  - WelcomeApp: about 70 holiday rentals on the premium plan.
  - Championship manager: used for about 150 championship dates per year.
- LinkedIn and booking link: not available yet. Their slots stay hidden until provided.

## Evidence on Hand

1. **WelcomeApp**: a SaaS of digital welcome books for holiday rentals.
   - Next.js 16, Supabase, Stripe Connect, security deposits, extras shop, 7 languages, OpenAI translation.
   - Public site: welcomeapp.be. The repository is private.
2. **Dandyshoes**: the official website of a Belgian rock band (dandyshoes.be), plus an online shop.
   - The shop runs on Next.js 16, Supabase, Stripe and an admin dashboard (shop-liart-eight-13.vercel.app). The shop repository is private.
   - Existing image: `Dandyshoes/img/screenshot.jpg`.
3. **Camping du Wignet** (campingduwignet.com): a showcase site with a booking calendar linked to Google Calendar, automatic pricing, 4 languages and a homemade test suite. Its repository is public.
4. **Championship manager**: a multisport app for championships (round-robin, Swiss system, pools, timing and swimming lanes, PDF exports), used in real conditions. Its repository is public.

Absences:
- no testimonials, no client logos and no prices;
- none must be invented.

## Product Principles

1. Every section earns the click to the contact form.
2. Proof over claims: real projects in production, real code.
3. Speak to each audience in its own terms: results for clients, technical detail for developers, a concrete checklist without judgement for founders with a vibe-coded project.
4. The site itself must demonstrate the quality it sells: fast, accessible, bilingual.

## Accessibility & Inclusion

WCAG 2.1 AA. Several projects serve disability sports (handisport, boccia), so accessibility is a credible commitment.
