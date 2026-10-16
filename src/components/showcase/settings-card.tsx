"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { Locale } from "@/i18n/config";
import { money, type ShowcaseCopy } from "./types";

export function SettingsCard({ copy, lang }: { copy: ShowcaseCopy["settings"]; lang: Locale }) {
  const id = useId();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ orders: true, news: false, security: true });
  const [language, setLanguage] = useState<string>(lang);
  const [budget, setBudget] = useState([250]);
  const [saved, setSaved] = useState(false);
  const touch = () => setSaved(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent className="gap-0">
        {copy.notifications.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 border-b border-border py-3 first:pt-0">
            <div className="flex flex-col">
              <Label htmlFor={`${id}-${item.id}`}>{item.label}</Label>
              <span className="text-xs text-fg-muted">{item.hint}</span>
            </div>
            <Switch
              id={`${id}-${item.id}`}
              checked={enabled[item.id]}
              onCheckedChange={(checked) => {
                setEnabled((current) => ({ ...current, [item.id]: checked }));
                touch();
              }}
            />
          </div>
        ))}
        <div className="flex flex-col gap-1.5 pt-4">
          <Label htmlFor={`${id}-language`}>{copy.language}</Label>
          <Select
            value={language}
            onValueChange={(value) => {
              setLanguage(value);
              touch();
            }}
          >
            <SelectTrigger id={`${id}-language`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {copy.languages.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span id={`${id}-budget`} className="text-sm font-medium">
              {copy.budget}
            </span>
            <span className="tabular text-sm text-fg-muted">{money(lang, budget[0])}</span>
          </div>
          <Slider
            value={budget}
            onValueChange={(value) => {
              setBudget(value);
              touch();
            }}
            min={50}
            max={1000}
            step={50}
            thumbLabel={copy.budget}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        {saved ? (
          <span role="status" className="mr-auto inline-flex items-center gap-1.5 text-sm text-accent-text">
            <Check className="size-4" aria-hidden />
            {copy.saved}
          </span>
        ) : null}
        <Button size="sm" onClick={() => setSaved(true)}>
          {copy.save}
        </Button>
      </CardFooter>
    </Card>
  );
}
