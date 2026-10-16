"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils";

function Calendar({ className, classNames, showOutsideDays = true, ...props }: React.ComponentProps<typeof DayPicker>) {
  const defaults = getDefaultClassNames();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-fit text-sm [--cell:2.25rem]", className)}
      classNames={{
        root: cn("w-fit", defaults.root),
        months: "relative flex flex-col gap-4",
        month: "flex w-full flex-col gap-3",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous:
          "inline-flex size-(--cell) items-center justify-center rounded-md text-fg-muted hover:bg-bg-muted hover:text-fg disabled:opacity-40 aria-disabled:opacity-40",
        button_next:
          "inline-flex size-(--cell) items-center justify-center rounded-md text-fg-muted hover:bg-bg-muted hover:text-fg disabled:opacity-40 aria-disabled:opacity-40",
        month_caption: "flex h-(--cell) items-center justify-center px-(--cell)",
        caption_label: "text-sm font-medium capitalize",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-(--cell) text-[0.75rem] font-normal text-fg-muted capitalize",
        week: "mt-1 flex w-full",
        day: "relative size-(--cell) p-0 text-center",
        day_button:
          "tabular inline-flex size-(--cell) items-center justify-center rounded-md text-sm text-fg outline-none transition-colors hover:bg-bg-muted focus-visible:ring-3 focus-visible:ring-accent/30",
        selected: "[&>button]:bg-accent [&>button]:text-accent-fg [&>button]:hover:bg-accent-hover",
        range_start: "rounded-l-md bg-accent-soft",
        range_middle: "bg-accent-soft [&>button]:!bg-transparent [&>button]:!text-fg",
        range_end: "rounded-r-md bg-accent-soft",
        today: "[&>button]:font-semibold [&>button]:underline [&>button]:decoration-accent [&>button]:underline-offset-4",
        outside: "[&>button]:text-fg-muted/60",
        disabled: "[&>button]:pointer-events-none [&>button]:text-fg-muted/40 [&>button]:line-through",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClass, ...rest }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("size-4", chevronClass)} {...rest} />
          ) : (
            <ChevronRight className={cn("size-4", chevronClass)} {...rest} />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
