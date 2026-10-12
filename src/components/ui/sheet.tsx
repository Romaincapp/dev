"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

function SheetContent({
  className,
  children,
  closeLabel,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { closeLabel: string }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-band/60" />
      <SheetPrimitive.Content
        className={cn(
          "on-band fixed inset-y-0 right-0 z-50 flex w-[min(24rem,88vw)] flex-col bg-band text-band-ink shadow-2xl outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full text-band-ink hover:bg-white/10">
          <X className="size-6" aria-hidden />
          <span className="sr-only">{closeLabel}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription };
