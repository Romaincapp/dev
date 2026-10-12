import { Check, TriangleAlert, X } from "lucide-react";
import { WindowChrome } from "./window";

type TerminalCopy = {
  title: string;
  command: string;
  lines: { kind: string; text: string }[];
  summary: string;
};

const icon = {
  ok: <Check className="size-4 text-[#3ecf8e]" aria-hidden />,
  fail: <X className="size-4 text-[#f47067]" aria-hidden />,
  warn: <TriangleAlert className="size-4 text-[#d29922]" aria-hidden />,
} as const;

/** The hero demonstration: an audit run on a vibe-coded app (example output). */
export function Terminal({ copy }: { copy: TerminalCopy }) {
  return (
    <WindowChrome title={copy.title} dark>
      <div className="space-y-2 p-5 font-mono text-[0.8rem] leading-relaxed sm:text-[0.85rem]">
        <p className="terminal-line">
          <span className="text-[#3ecf8e]">~</span> <span className="text-code-muted">$</span> {copy.command}
        </p>
        <ul className="space-y-1.5 pt-1">
          {copy.lines.map((line, index) => (
            <li
              key={line.text}
              className="terminal-line flex gap-2.5"
              style={{ animationDelay: `${350 + index * 260}ms` }}
            >
              <span className="mt-[0.2em]">{icon[line.kind as keyof typeof icon]}</span>
              <span className={line.kind === "ok" ? "text-code-muted" : "text-code-fg"}>{line.text}</span>
            </li>
          ))}
        </ul>
        <p
          className="terminal-line border-t border-white/10 pt-3 text-[#3ecf8e]"
          style={{ animationDelay: `${350 + copy.lines.length * 260}ms` }}
        >
          → {copy.summary}
        </p>
      </div>
    </WindowChrome>
  );
}
