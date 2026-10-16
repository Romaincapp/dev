import type { Locale } from "@/i18n/config";
import type { AudienceId } from "./audiences";

type T = Record<Locale, string>;

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: T;
};

export type Project = {
  slug: string;
  name: string;
  audiences: AudienceId[];
  /** Main language, shown GitHub-style with a coloured dot. */
  language: "TypeScript" | "JavaScript";
  visibility: "public" | "private";
  tagline: T;
  /** The only figure allowed on the site for this project, if any. */
  figure?: T;
  facts: T[];
  context: T;
  challenge: T;
  solution: T[];
  result: T;
  stack: string[];
  links: { label: T; url: string }[];
  image?: ProjectImage;
  secondaryImage?: ProjectImage;
};

export const projects: Project[] = [
  {
    slug: "welcomeapp",
    name: "WelcomeApp",
    audiences: ["clients", "agencies", "audit"],
    language: "TypeScript",
    visibility: "private",
    tagline: {
      fr: "Le SaaS de livrets d'accueil numériques pour les locations de vacances, paiements compris.",
      en: "A SaaS for digital welcome books in holiday rentals, payments included.",
    },
    figure: {
      fr: "≈ 70 logements en abonnement premium",
      en: "≈ 70 rentals on the premium plan",
    },
    facts: [
      { fr: "En production, abonnements payants", en: "In production, paid subscriptions" },
      { fr: "7 langues, traduction automatique", en: "7 languages, automatic translation" },
      { fr: "Stripe Connect : paiement direct aux gestionnaires", en: "Stripe Connect: direct payouts to hosts" },
    ],
    context: {
      fr: "Les gestionnaires de locations de vacances répondent cent fois aux mêmes questions : code wifi, poubelles, bonnes adresses. Les livrets papier se perdent et ne parlent qu'une langue.",
      en: "Holiday rental hosts answer the same questions a hundred times: wifi code, bins, good addresses. Paper welcome books get lost and speak a single language.",
    },
    challenge: {
      fr: "Construire un produit complet qu'un gestionnaire configure seul, que ses voyageurs lisent dans leur langue, et qui génère du revenu pour lui comme pour la plateforme.",
      en: "Build a complete product a host can set up alone, that guests read in their own language, and that earns money for the host and for the platform.",
    },
    solution: [
      {
        fr: "Livret public par logement (welcomeapp.be/nom-du-logement), carte des bonnes adresses, URLs localisées en 7 langues et traduction automatique des catégories.",
        en: "A public book per rental (welcomeapp.be/rental-name), a map of local spots, localised URLs in 7 languages and automatic category translation.",
      },
      {
        fr: "Monétisation intégrée : boutique d'extras pour les voyageurs, cautions par pré-autorisation Stripe avec état des lieux photo, site vitrine avec calendrier de réservation.",
        en: "Built-in revenue: an extras shop for guests, Stripe pre-authorised security deposits with photo check-in reports, a showcase site with a booking calendar.",
      },
      {
        fr: "Stripe Connect : l'argent des ventes arrive directement sur le compte du gestionnaire, la commission de la plateforme est prélevée automatiquement.",
        en: "Stripe Connect: sales go straight to the host's account and the platform commission is taken automatically.",
      },
      {
        fr: "PostgreSQL via Supabase (Auth, Storage), règles d'accès par ligne (RLS) et migrations SQL, e-mails transactionnels via Resend, tests Vitest.",
        en: "PostgreSQL via Supabase (Auth, Storage), row-level security (RLS) and SQL migrations, transactional e-mails through Resend, Vitest tests.",
      },
    ],
    result: {
      fr: "Un SaaS en production que je conçois, développe et fais tourner seul, avec environ 70 logements en abonnement premium.",
      en: "A SaaS in production that I design, build and run on my own, with about 70 rentals on the premium plan.",
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL (Supabase)", "Stripe Connect", "Resend", "OpenAI", "Vitest"],
    links: [{ label: { fr: "welcomeapp.be", en: "welcomeapp.be" }, url: "https://welcomeapp.be" }],
    image: {
      src: "/projects/welcomeapp/accueil.webp",
      width: 1151,
      height: 810,
      alt: {
        fr: "Page d'accueil de WelcomeApp : livret d'accueil digital et réservation directe, avec un livret ouvert sur mobile",
        en: "WelcomeApp home page: digital welcome book and direct booking, with a welcome book open on a phone",
      },
    },
  },
  {
    slug: "dandyshoes",
    name: "Dandyshoes",
    audiences: ["clients", "agencies", "audit"],
    language: "TypeScript",
    visibility: "public",
    tagline: {
      fr: "Le site officiel d'un groupe de rock de Charleroi et sa boutique de merch en ligne.",
      en: "The official website of a rock band from Charleroi, and its online merch shop.",
    },
    facts: [
      { fr: "Site vitrine + boutique en production", en: "Showcase site + shop in production" },
      { fr: "Paiements Stripe réels, précommandes", en: "Real Stripe payments, pre-orders" },
      { fr: "Back-office complet pour le groupe", en: "Full back office for the band" },
    ],
    context: {
      fr: "Un groupe qui tourne a besoin d'une vitrine qui lui ressemble et d'un moyen simple de vendre t-shirts, CD et vinyles, en ligne comme après les concerts.",
      en: "A touring band needs a website that looks like it, and a simple way to sell t-shirts, CDs and vinyl, online and after gigs.",
    },
    challenge: {
      fr: "Une identité forte côté public, et côté coulisses une boutique que des musiciens gèrent sans aide : stock par taille, précommandes, expéditions Bpost, retraits au concert.",
      en: "A strong public identity and, behind the scenes, a shop musicians run without help: stock per size, pre-orders, Bpost shipping, pickup at gigs.",
    },
    solution: [
      {
        fr: "Site vitrine rapide : lecteur audio, galerie, dates de tournée, formulaire de booking, images optimisées.",
        en: "A fast showcase site: audio player, gallery, tour dates, booking form, optimised images.",
      },
      {
        fr: "Boutique Next.js + PostgreSQL (Supabase) : Stripe Checkout, webhooks (commande, remboursement, litige), codes promo, liste d'attente avec lien de paiement en un clic.",
        en: "A Next.js + PostgreSQL (Supabase) shop: Stripe Checkout, webhooks (order, refund, dispute), discount codes, a waitlist with one-click payment links.",
      },
      {
        fr: "Tableau de bord admin : chiffre d'affaires, commandes, stock par variante, clients, suivi d'expédition et e-mails automatiques à chaque étape.",
        en: "Admin dashboard: revenue, orders, stock per variant, customers, shipment tracking and automatic e-mails at each step.",
      },
    ],
    result: {
      fr: "Le groupe vend son merch en autonomie, et le site porte son image auprès des programmateurs comme du public.",
      en: "The band sells its merch on its own, and the site carries its image with promoters and fans alike.",
    },
    stack: ["Next.js 16", "Tailwind CSS 4", "PostgreSQL (Supabase)", "Stripe Checkout", "Webhooks", "Zustand", "HTML/CSS/JS"],
    links: [
      { label: { fr: "dandyshoes.be", en: "dandyshoes.be" }, url: "https://dandyshoes.be" },
      { label: { fr: "La boutique", en: "The shop" }, url: "https://shop-liart-eight-13.vercel.app" },
      { label: { fr: "Code du site", en: "Site source code" }, url: "https://github.com/Romaincapp/Dandyshoes" },
    ],
    image: {
      src: "/projects/dandyshoes/site.webp",
      width: 1440,
      height: 900,
      alt: {
        fr: "Page d'accueil du site Dandyshoes : le groupe en noir et blanc, titre jaune",
        en: "Dandyshoes home page: the band in black and white, yellow title",
      },
    },
    secondaryImage: {
      src: "/projects/dandyshoes/shop-tshirt.webp",
      width: 900,
      height: 1260,
      alt: {
        fr: "T-shirt Dandyshoes vendu sur la boutique en ligne",
        en: "Dandyshoes t-shirt sold on the online shop",
      },
    },
  },
  {
    slug: "camping-du-wignet",
    name: "Camping du Wignet",
    audiences: ["clients"],
    language: "JavaScript",
    visibility: "public",
    tagline: {
      fr: "Un terrain de camping privatif dans les Ardennes, réservable en ligne en quatre langues.",
      en: "A private campsite in the Belgian Ardennes, bookable online in four languages.",
    },
    facts: [
      { fr: "En ligne sur campingduwignet.com", en: "Live at campingduwignet.com" },
      { fr: "Calendrier relié à Google Agenda", en: "Calendar synced with Google Calendar" },
      { fr: "FR · EN · NL · DE", en: "FR · EN · NL · DE" },
    ],
    context: {
      fr: "Un terrain de 3 200 m² à Olloy-sur-Viroin, loué en exclusivité à des groupes jusqu'à 20 personnes, avec des stages de survie et de bushcraft.",
      en: "A 3,200 m² field in Olloy-sur-Viroin, rented exclusively to groups of up to 20 people, with survival and bushcraft courses.",
    },
    challenge: {
      fr: "Que les visiteurs belges, néerlandais et allemands voient les disponibilités, connaissent le prix exact de leur séjour et réservent sans échanges interminables.",
      en: "Let Belgian, Dutch and German visitors see availability, know the exact price of their stay and book without endless back-and-forth.",
    },
    solution: [
      {
        fr: "Calendrier de disponibilités alimenté par Google Agenda : le propriétaire gère ses dates directement dans son agenda.",
        en: "An availability calendar fed by Google Calendar: the owner manages dates where they already do.",
      },
      {
        fr: "Calcul automatique du prix : haute et basse saison, enfants, réductions selon la durée et la taille du groupe.",
        en: "Automatic pricing: high and low season, children, discounts by length of stay and group size.",
      },
      {
        fr: "Site léger en HTML, CSS et JavaScript, données structurées pour le SEO, et une suite de tests maison (liens, prix, sécurité CSP, test navigateur).",
        en: "A lightweight HTML, CSS and JavaScript site, structured data for SEO, and a homemade test suite (links, prices, CSP security, browser test).",
      },
    ],
    result: {
      fr: "Les demandes de réservation arrivent qualifiées, avec les dates et le prix déjà calculés.",
      en: "Booking requests arrive qualified, with dates and price already worked out.",
    },
    stack: ["HTML/CSS/JS", "Tailwind CSS", "GSAP", "Google Calendar API", "Schema.org", "Node tests"],
    links: [
      { label: { fr: "campingduwignet.com", en: "campingduwignet.com" }, url: "https://campingduwignet.com" },
      { label: { fr: "Code source", en: "Source code" }, url: "https://github.com/Romaincapp/camping" },
    ],
    image: {
      src: "/projects/camping/accueil.webp",
      width: 1512,
      height: 829,
      alt: {
        fr: "Page d'accueil du Camping du Wignet : le terrain en lisière de forêt et le bouton « Réserver maintenant »",
        en: "Camping du Wignet home page: the field at the edge of the forest and the \"Book now\" button",
      },
    },
  },
  {
    slug: "gestionnaire-de-championnats",
    name: "Gestionnaire de championnats",
    audiences: ["clients", "agencies"],
    language: "JavaScript",
    visibility: "public",
    tagline: {
      fr: "L'outil qui fait tourner des championnats multisport, du tennis de table à la natation adaptée.",
      en: "The tool that runs multisport championships, from table tennis to adapted swimming.",
    },
    figure: {
      fr: "≈ 150 dates de championnat par an",
      en: "≈ 150 championship dates per year",
    },
    facts: [
      { fr: "Utilisé en conditions réelles", en: "Used in real competitions" },
      { fr: "Fonctionne hors ligne, sans serveur", en: "Works offline, no server" },
      { fr: "Handisport, pétanque, boccia, natation", en: "Disability sport, pétanque, boccia, swimming" },
    ],
    context: {
      fr: "Des organisateurs bénévoles gèrent des journées de compétition avec des feuilles papier et des tableurs : poules, horaires, classements recalculés à la main.",
      en: "Volunteer organisers run competition days with paper sheets and spreadsheets: pools, schedules, standings recalculated by hand.",
    },
    challenge: {
      fr: "Un seul outil pour des formats très différents (round-robin, système suisse, poules et phases finales, courses chronométrées) qui tourne sur l'ordinateur du club, même sans réseau.",
      en: "One tool for very different formats (round-robin, Swiss system, pools and finals, timed races) that runs on the club's laptop, even without a network.",
    },
    solution: [
      {
        fr: "Génération automatique des matchs, saisie des scores en direct, classements par journée et général.",
        en: "Automatic match generation, live score entry, standings per day and overall.",
      },
      {
        fr: "Mode chrono : relais, arrivées, abandons, natation par couloirs au clavier, classement par épreuve au centième.",
        en: "Timing mode: relays, finishes, withdrawals, keyboard-driven swimming lanes, rankings per event to the hundredth.",
      },
      {
        fr: "Classement multisport combiné, clubs, export PDF, feuilles de match imprimables pour les arbitres, sauvegarde locale et import/export JSON.",
        en: "Combined multisport ranking, clubs, PDF export, printable score sheets for referees, local saving and JSON import/export.",
      },
    ],
    result: {
      fr: "L'outil sert environ 150 dates de championnat par an, et évolue au rythme des retours des arbitres.",
      en: "The tool serves about 150 championship dates a year and evolves with referees' feedback.",
    },
    stack: ["JavaScript", "HTML/CSS", "LocalStorage", "PDF export", "Jest"],
    links: [
      { label: { fr: "Code source", en: "Source code" }, url: "https://github.com/Romaincapp/Gestionnaire-de-championnats" },
    ],
    image: {
      src: "/projects/gestionnaire-de-championnats/classement.webp",
      width: 1440,
      height: 900,
      alt: {
        fr: "Gestionnaire de championnats : classement général sur trois journées, avec le nombre de joueurs et de matchs et le tableau de la division 1",
        en: "Championship manager: general standings over three match days, with player and match counts and the division 1 table",
      },
    },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
