"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Locale } from "@/i18n/config";
import { money, type ShowcaseCopy } from "./types";

const PRICES = { monthly: 19, yearly: 15 };

export function PricingCard({ copy, lang }: { copy: ShowcaseCopy["pricing"]; lang: Locale }) {
  const [period, setPeriod] = useState<keyof typeof PRICES>("yearly");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={period} onValueChange={(value) => setPeriod(value as keyof typeof PRICES)}>
          <TabsList className="w-full">
            <TabsTrigger value="monthly">{copy.monthly}</TabsTrigger>
            <TabsTrigger value="yearly">
              {copy.yearly}
              <Badge className="px-1.5 py-0">{copy.yearlyBadge}</Badge>
            </TabsTrigger>
          </TabsList>
          {(Object.keys(PRICES) as (keyof typeof PRICES)[]).map((key) => (
            <TabsContent key={key} value={key} className="flex flex-col gap-1">
              <span className="font-mono text-xs text-fg-muted uppercase">{copy.plan}</span>
              <p className="flex items-baseline gap-1">
                <span className="tabular text-4xl font-semibold tracking-[-0.03em]">{money(lang, PRICES[key])}</span>
                <span className="text-sm text-fg-muted">{copy.perMonth}</span>
              </p>
              <p className="text-xs text-fg-muted">{key === "yearly" ? copy.billedYearly : copy.billedMonthly}</p>
            </TabsContent>
          ))}
        </Tabs>
        <ul className="flex flex-col gap-2 text-sm">
          {copy.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check className="size-4 shrink-0 text-accent-text" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full">{copy.cta}</Button>
      </CardContent>
    </Card>
  );
}
