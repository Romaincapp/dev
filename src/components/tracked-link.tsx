"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import type { ComponentProps } from "react";

/** Link that reports which call-to-action was clicked. */
export function TrackedLink({
  location,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { location: string }) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        track("cta_click", { location });
        onClick?.(event);
      }}
    />
  );
}
