import { cn } from "@/lib/utils";

/** macOS-style window chrome shared by terminals, code and browser frames. */
export function WindowChrome({
  title,
  dark = false,
  className,
  children,
}: {
  title: React.ReactNode;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border shadow-panel",
        dark ? "border-white/10 bg-code-bg text-code-fg" : "border-border bg-bg",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-10 items-center gap-3 border-b px-4",
          dark ? "border-white/10 bg-white/[0.03]" : "border-border bg-bg-subtle",
        )}
      >
        <span aria-hidden className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <span className={cn("min-w-0 flex-1 truncate text-center font-mono text-xs", dark ? "text-code-muted" : "text-fg-muted")}>
          {title}
        </span>
        <span aria-hidden className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}

/** A code or terminal excerpt in a dark window. */
export function CodeWindow({ title, lines, className }: { title: string; lines: string[]; className?: string }) {
  return (
    <WindowChrome title={title} dark className={className}>
      <pre className="p-5 text-[0.8rem] leading-relaxed whitespace-pre-wrap break-words">
        <code>
          {lines.map((line, index) => (
            <span key={index} className="flex min-h-[1.3em]">
              <span aria-hidden className="mr-4 w-4 shrink-0 text-right text-code-muted/60 select-none">
                {index + 1}
              </span>
              <span className="min-w-0">{line}</span>
            </span>
          ))}
        </code>
      </pre>
    </WindowChrome>
  );
}
