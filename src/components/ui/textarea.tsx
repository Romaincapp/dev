import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-36 w-full rounded-[10px] bg-plate px-4 py-3 text-base text-ink shadow-[inset_0_0_0_1.5px_var(--rule)] outline-none transition-shadow placeholder:text-ink-2/80 focus-visible:shadow-[inset_0_0_0_2px_var(--focus)] focus-visible:outline-none aria-invalid:shadow-[inset_0_0_0_2px_var(--line-1)]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
