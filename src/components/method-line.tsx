/** The working method drawn as one line with its stations, in order. */
export function MethodLine({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
      <span aria-hidden className="absolute top-0 bottom-0 left-[13px] w-2.5 rounded-full bg-ink lg:top-[13px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-2.5 lg:w-auto" />
      {steps.map((step, index) => (
        <li key={step.title} className="relative grid gap-3 pl-14 lg:pt-14 lg:pl-0">
          <span
            aria-hidden
            className="absolute top-0 left-0 flex size-9 items-center justify-center rounded-full border-[5px] border-ink bg-plate font-mono text-sm font-bold tabular"
          >
            {index + 1}
          </span>
          <h3 className="text-2xl font-black">{step.title}</h3>
          <p className="max-w-[34ch] text-ink-2">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
