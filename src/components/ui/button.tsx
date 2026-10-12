import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold leading-none transition-[background-color,color,box-shadow,transform] duration-200 ease-(--ease-signal) disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[1.1em] [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-band text-band-ink hover:bg-band-2",
        signal: "bg-line-3 text-ink hover:bg-[#ffc824]",
        line1: "bg-line-1 text-white hover:bg-[#bf321c]",
        line2: "bg-line-2 text-white hover:bg-[#1a4aa7]",
        outline: "bg-plate text-ink shadow-[inset_0_0_0_2px_var(--ink)] hover:bg-paper",
        ghost: "text-ink hover:bg-ink/5",
        onBand: "bg-plate text-ink hover:bg-paper",
      },
      size: {
        default: "h-11 px-5 text-[0.98rem]",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-7 text-lg",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
