"use client";

import { useId, useState } from "react";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ShowcaseCopy } from "./types";

type Field = "name" | "email" | "password" | "terms";

export function SignupCard({ copy }: { copy: ShowcaseCopy["signup"] }) {
  const id = useId();
  const [values, setValues] = useState({ name: "", email: "", password: "", terms: false });
  const [errors, setErrors] = useState<Field[]>([]);
  const [done, setDone] = useState(false);

  const validate = (v: typeof values) => {
    const invalid: Field[] = [];
    if (!v.name.trim()) invalid.push("name");
    if (!/^\S+@\S+\.\S+$/.test(v.email)) invalid.push("email");
    if (v.password.length < 8) invalid.push("password");
    if (!v.terms) invalid.push("terms");
    return invalid;
  };

  const update = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors.length) setErrors(validate(next));
  };

  if (done) {
    return (
      <Card>
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <CircleCheck className="size-8 text-accent-text" aria-hidden />
          <p className="font-medium" role="status">
            {copy.success}
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setValues({ name: "", email: "", password: "", terms: false });
              setDone(false);
            }}
          >
            {copy.reset}
          </Button>
        </div>
      </Card>
    );
  }

  const error = (field: Field) =>
    errors.includes(field) ? (
      <p id={`${id}-${field}-error`} className="text-xs text-danger">
        {copy.errors[field]}
      </p>
    ) : null;

  const textField = (field: "name" | "email" | "password", type: string, autoComplete: string) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={`${id}-${field}`}>{copy[field]}</Label>
      <Input
        id={`${id}-${field}`}
        type={type}
        autoComplete={autoComplete}
        value={values[field]}
        onChange={(event) => update(field, event.target.value)}
        aria-invalid={errors.includes(field) || undefined}
        aria-describedby={errors.includes(field) ? `${id}-${field}-error` : undefined}
      />
      {error(field)}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          const invalid = validate(values);
          setErrors(invalid);
          if (!invalid.length) setDone(true);
        }}
      >
        <CardContent>
          {textField("name", "text", "off")}
          {textField("email", "email", "off")}
          {textField("password", "password", "new-password")}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`${id}-terms`}
                checked={values.terms}
                onCheckedChange={(checked) => update("terms", checked === true)}
                aria-invalid={errors.includes("terms") || undefined}
                aria-describedby={errors.includes("terms") ? `${id}-terms-error` : undefined}
              />
              <Label htmlFor={`${id}-terms`} className="font-normal">
                {copy.terms}
              </Label>
            </div>
            {error("terms")}
          </div>
          <Button type="submit" className="w-full">
            {copy.submit}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
