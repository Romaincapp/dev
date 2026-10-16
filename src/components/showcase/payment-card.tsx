"use client";

import { useId, useState } from "react";
import { CircleCheck, CreditCard, Landmark, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Locale } from "@/i18n/config";
import { money, type ShowcaseCopy } from "./types";

const AMOUNT = 49;
const icons = { card: CreditCard, paypal: Wallet, bancontact: Landmark };

const formatCard = (raw: string) =>
  raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

export function PaymentCard({ copy, lang }: { copy: ShowcaseCopy["payment"]; lang: Locale }) {
  const id = useId();
  const [method, setMethod] = useState<keyof typeof icons>("card");
  const [number, setNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("");
  const [paid, setPaid] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={method}
          onValueChange={(value) => {
            setMethod(value as keyof typeof icons);
            setPaid(false);
          }}
          className="grid-cols-3 gap-2"
          aria-label={copy.description}
        >
          {(Object.keys(icons) as (keyof typeof icons)[]).map((key) => {
            const Icon = icons[key];
            return (
              <Label
                key={key}
                htmlFor={`${id}-${key}`}
                className="flex cursor-pointer flex-col items-center gap-2 rounded-md border border-border px-2 py-3 text-xs font-medium transition-colors hover:bg-bg-subtle has-[[data-state=checked]]:border-accent has-[[data-state=checked]]:bg-accent-soft"
              >
                <RadioGroupItem id={`${id}-${key}`} value={key} className="sr-only" />
                <Icon className="size-5" aria-hidden />
                {copy.methods[key]}
              </Label>
            );
          })}
        </RadioGroup>

        {method === "card" ? (
          <>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${id}-holder`}>{copy.cardName}</Label>
              <Input id={`${id}-holder`} autoComplete="off" placeholder="Jane Doe" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${id}-number`}>{copy.cardNumber}</Label>
              <Input
                id={`${id}-number`}
                inputMode="numeric"
                autoComplete="off"
                className="tabular font-mono"
                value={number}
                onChange={(event) => setNumber(formatCard(event.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${id}-expiry`}>{copy.expiry}</Label>
                <Input
                  id={`${id}-expiry`}
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="MM/AA"
                  className="tabular font-mono"
                  value={expiry}
                  onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${id}-cvc`}>{copy.cvc}</Label>
                <Input
                  id={`${id}-cvc`}
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={4}
                  placeholder="123"
                  className="tabular font-mono"
                />
              </div>
            </div>
          </>
        ) : (
          <p className="rounded-md bg-bg-subtle px-3 py-4 text-sm text-fg-muted">{copy.redirect}</p>
        )}

        {paid ? (
          <p
            role="status"
            className="flex h-10 items-center justify-center gap-2 rounded-md bg-accent-soft text-sm font-medium text-accent-text"
          >
            <CircleCheck className="size-4" aria-hidden />
            {copy.paid}
          </p>
        ) : (
          <Button className="w-full" onClick={() => setPaid(true)}>
            {copy.pay} {money(lang, AMOUNT)}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
