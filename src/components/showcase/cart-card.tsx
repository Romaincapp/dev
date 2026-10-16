"use client";

import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n/config";
import { money, type ShowcaseCopy } from "./types";

const SHIPPING = 4.9;
const FREE_FROM = 60;

export function CartCard({ copy, lang }: { copy: ShowcaseCopy["cart"]; lang: Locale }) {
  const initial = { tee: 1, mug: 2, cap: 0 } as Record<string, number>;
  const [qty, setQty] = useState(initial);
  const lines = copy.items.filter((item) => qty[item.id] > 0);
  const subtotal = lines.reduce((sum, item) => sum + item.price * qty[item.id], 0);
  const shipping = subtotal >= FREE_FROM || subtotal === 0 ? 0 : SHIPPING;
  const change = (itemId: string, delta: number) =>
    setQty((current) => ({ ...current, [itemId]: Math.max(0, Math.min(9, current[itemId] + delta)) }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {lines.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <p className="text-sm text-fg-muted">{copy.empty}</p>
            <Button variant="secondary" size="sm" onClick={() => setQty({ tee: 1, mug: 1, cap: 1 })}>
              {copy.restore}
            </Button>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {lines.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-md bg-bg-muted font-mono text-xs text-fg-muted uppercase"
                >
                  {item.id}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">{item.name}</span>
                  <span className="text-xs text-fg-muted">
                    {item.variant} · {money(lang, item.price)}
                  </span>
                </div>
                <div className="flex items-center rounded-md border border-border">
                  <button
                    type="button"
                    className="grid size-8 place-items-center text-fg-muted hover:text-fg"
                    aria-label={`${copy.decrease} ${item.name}`}
                    onClick={() => change(item.id, -1)}
                  >
                    {qty[item.id] === 1 ? <Trash2 className="size-3.5" aria-hidden /> : <Minus className="size-3.5" aria-hidden />}
                  </button>
                  <span className="tabular w-5 text-center text-sm" aria-live="polite">
                    {qty[item.id]}
                  </span>
                  <button
                    type="button"
                    className="grid size-8 place-items-center text-fg-muted hover:text-fg"
                    aria-label={`${copy.increase} ${item.name}`}
                    onClick={() => change(item.id, 1)}
                  >
                    <Plus className="size-3.5" aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Separator />
        <dl className="tabular flex flex-col gap-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-fg-muted">{copy.subtotal}</dt>
            <dd>{money(lang, subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-fg-muted">{copy.shipping}</dt>
            <dd>{shipping === 0 ? copy.free : money(lang, shipping)}</dd>
          </div>
          <div className="flex justify-between pt-1 text-base font-semibold">
            <dt>{copy.total}</dt>
            <dd>{money(lang, subtotal + shipping)}</dd>
          </div>
        </dl>
        {shipping > 0 ? <p className="text-xs text-fg-muted">{copy.freeFrom}</p> : null}
        <Button className="w-full" disabled={lines.length === 0}>
          {copy.checkout}
        </Button>
      </CardContent>
    </Card>
  );
}
