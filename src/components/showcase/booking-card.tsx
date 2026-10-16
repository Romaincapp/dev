"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import { dayLocale, useToday } from "./dates";
import type { ShowcaseCopy } from "./types";

const SLOTS = ["09:00", "09:30", "10:30", "11:00", "14:00", "14:30", "15:30", "16:00", "17:00"];

/** Some slots are taken, deterministically per day so the grid feels real. */
const taken = (day: Date, slot: string) => (day.getDate() + SLOTS.indexOf(slot)) % 4 === 0;

export function BookingCard({ copy, lang }: { copy: ShowcaseCopy["booking"]; lang: Locale }) {
  const [day, setDay] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string | undefined>();
  const [booked, setBooked] = useState(false);
  const today = useToday();
  const label = day
    ? new Intl.DateTimeFormat(lang === "fr" ? "fr-BE" : "en-GB", { weekday: "short", day: "numeric", month: "short" }).format(day)
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {booked && day && slot ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CalendarCheck className="size-8 text-accent-text" aria-hidden />
            <p role="status" className="flex flex-col">
              <span className="font-medium">{copy.booked}</span>
              <span className="text-sm text-fg-muted capitalize">
                {label} · {slot}
              </span>
            </p>
            <Button variant="secondary" size="sm" onClick={() => setBooked(false)}>
              {copy.change}
            </Button>
          </div>
        ) : (
          <>
            {today ? (
              <Calendar
                mode="single"
                locale={dayLocale(lang)}
                selected={day}
                onSelect={(value) => {
                  setDay(value);
                  setSlot(undefined);
                }}
                startMonth={today}
                disabled={[{ before: today }, { dayOfWeek: [0] }]}
                className="mx-auto"
              />
            ) : (
              <div aria-hidden className="mx-auto h-[19.5rem] w-[15.75rem] rounded-md bg-bg-subtle" />
            )}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">{copy.slots}</span>
              {day ? (
                <div className="grid grid-cols-3 gap-2">
                  {SLOTS.map((time) => {
                    const unavailable = taken(day, time);
                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={unavailable}
                        aria-pressed={slot === time}
                        onClick={() => setSlot(time)}
                        className="tabular h-9 rounded-full border border-border text-sm transition-colors hover:border-border-strong disabled:cursor-not-allowed disabled:text-fg-muted/50 disabled:line-through aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-fg"
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-fg-muted">{copy.pickDay}</p>
              )}
            </div>
            <Button className="w-full" disabled={!day || !slot} onClick={() => setBooked(true)}>
              {copy.confirm}
              {day && slot ? (
                <span className="capitalize">
                  · {label} · {slot}
                </span>
              ) : null}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
