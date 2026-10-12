import Link from "next/link";

// Rendered inside the [lang] layout without route params, so both languages are shown.
export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-24 sm:px-6 lg:py-36">
      <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
        Page introuvable
        <span className="mt-2 block text-[0.55em] text-fg-muted" lang="en">
          Page not found
        </span>
      </h1>
      <div className="flex flex-wrap gap-3">
        <Link href="/fr" className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg hover:bg-accent-hover">
          Retour à l&apos;accueil
        </Link>
        <Link href="/en" lang="en" className="inline-flex h-10 items-center rounded-md border border-border px-4 text-sm font-medium hover:bg-bg-muted">
          Back to home
        </Link>
      </div>
    </section>
  );
}
