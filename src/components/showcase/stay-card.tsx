"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { CalendarDays, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Locale } from "@/i18n/config";
import { dayLocale, useToday } from "./dates";
import type { ShowcaseCopy } from "./types";

const DAY = 24 * 60 * 60 * 1000;

function Counter({
  label,
  hint,
  value,
  min,
  onChange,
  addLabel,
  removeLabel,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
  addLabel: string;
  removeLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-fg-muted">{hint}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="icon"
          className="size-8 rounded-full"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          aria-label={`${removeLabel} · ${label}`}
        >
          <Minus aria-hidden />
        </Button>
        <span className="tabular w-4 text-center text-sm" aria-live="polite">
          {value}
        </span>
        <Button
          variant="secondary"
          size="icon"
          className="size-8 rounded-full"
          disabled={value >= 8}
          onClick={() => onChange(value + 1)}
          aria-label={`${addLabel} · ${label}`}
        >
          <Plus aria-hidden />
        </Button>
      </div>
    </div>
  );
}

export function StayCard({ copy, lang }: { copy: ShowcaseCopy["stay"]; lang: Locale }) {
  const today = useToday();
  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const format = new Intl.DateTimeFormat(lang === "fr" ? "fr-BE" : "en-GB", { day: "numeric", month: "short" });
  const nights = range?.from && range.to ? Math.round((range.to.getTime() - range.from.getTime()) / DAY) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{copy.dates}</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" className="w-full justify-start font-normal">
                <CalendarDays className="text-fg-muted" aria-hidden />
                {range?.from ? (
                  <span className="tabular">
                    {format.format(range.from)}
                    {range.to ? ` – ${format.format(range.to)}` : ""}
                    {nights ? (
                      <span className="text-fg-muted">
                        {" "}
                        · {nights} {nights > 1 ? copy.nights : copy.night}
                      </span>
                    ) : null}
                  </span>
                ) : (
                  <span className="text-fg-muted">{copy.pickDates}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" align="start">
              <Calendar
                mode="range"
                locale={dayLocale(lang)}
                selected={range}
                onSelect={setRange}
                startMonth={today ?? undefined}
                disabled={today ? { before: today } : undefined}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Counter
          label={copy.adults}
          hint={copy.adultsHint}
          value={adults}
          min={1}
          onChange={setAdults}
          addLabel={copy.add}
          removeLabel={copy.remove}
        />
        <Counter
          label={copy.children}
          hint={copy.childrenHint}
          value={children}
          min={0}
          onChange={setChildren}
          addLabel={copy.add}
          removeLabel={copy.remove}
        />
        <Button className="w-full" disabled={!nights}>
          {copy.search}
        </Button>
      </CardContent>
    </Card>
  );
}
