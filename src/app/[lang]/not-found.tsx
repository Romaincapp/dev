import Link from "next/link";
import { lines } from "@/data/lines";
import { LineBadge } from "@/components/line-badge";

// Rendered inside the [lang] layout; copy is shown in both languages
// because not-found pages do not receive route params.
export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[90rem] flex-col gap-6 px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <span className="flex gap-2" aria-hidden>
        {lines.map((line) => (
          <LineBadge key={line.id} line={line} size="lg" className="opacity-40" />
        ))}
      </span>
      <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-black">
        Cette station n&apos;existe pas
        <span className="mt-2 block text-[0.55em] text-ink-2" lang="en">
          This station does not exist
        </span>
      </h1>
      <div className="flex flex-wrap gap-3">
        <Link href="/fr" className="inline-flex h-12 items-center rounded-full bg-band px-6 font-bold text-band-ink hover:bg-band-2">
          Retour à l&apos;accueil
        </Link>
        <Link href="/en" lang="en" className="inline-flex h-12 items-center rounded-full bg-plate px-6 font-bold shadow-[inset_0_0_0_2px_var(--ink)]">
          Back to home
        </Link>
      </div>
    </section>
  );
}
