/** "Romain / Dev" wordmark with the accent slash. */
export function Brand({ by, size = "md" }: { by?: string; size?: "md" | "lg" }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={size === "lg" ? "text-xl font-semibold tracking-[-0.03em]" : "text-base font-semibold tracking-[-0.03em]"}>
        Romain <span className="font-mono font-normal text-accent-text">/</span> Dev
      </span>
      {by ? <span className="mt-1 text-xs text-fg-muted">{by}</span> : null}
    </span>
  );
}
