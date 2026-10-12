import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-[10px] bg-plate px-4 text-base text-ink shadow-[inset_0_0_0_1.5px_var(--rule)] outline-none transition-shadow placeholder:text-ink-2/80 focus-visible:shadow-[inset_0_0_0_2px_var(--focus)] focus-visible:outline-none aria-invalid:shadow-[inset_0_0_0_2px_var(--line-1)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
