/** Ordered steps, numbered because the order matters. */
export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col gap-3 bg-bg p-6">
          <span className="font-mono text-sm text-accent-text tabular" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <p className="text-sm text-fg-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
