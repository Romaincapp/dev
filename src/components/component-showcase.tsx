import type { Locale } from "@/i18n/config";
import { SectionHeader } from "./page-hero";
import { Badge } from "./ui/badge";
import { BookingCard } from "./showcase/booking-card";
import { CartCard } from "./showcase/cart-card";
import { PaymentCard } from "./showcase/payment-card";
import { PricingCard } from "./showcase/pricing-card";
import { SettingsCard } from "./showcase/settings-card";
import { SignupCard } from "./showcase/signup-card";
import { StayCard } from "./showcase/stay-card";
import type { ShowcaseCopy } from "./showcase/types";

/** shadcn/ui-style wall of interactive React components (forms, payments, bookings). */
export function ComponentShowcase({ lang, copy }: { lang: Locale; copy: ShowcaseCopy }) {
  const cards = [
    <BookingCard key="booking" copy={copy.booking} lang={lang} />,
    <SignupCard key="signup" copy={copy.signup} />,
    <PricingCard key="pricing" copy={copy.pricing} lang={lang} />,
    <PaymentCard key="payment" copy={copy.payment} lang={lang} />,
    <StayCard key="stay" copy={copy.stay} lang={lang} />,
    <CartCard key="cart" copy={copy.cart} lang={lang} />,
    <SettingsCard key="settings" copy={copy.settings} lang={lang} />,
  ];

  return (
    <section aria-labelledby="showcase-title" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeader id="showcase-title" title={copy.title} intro={copy.intro} />
        <Badge variant="outline" className="-mt-6 mb-8 flex lg:-mt-10">
          {copy.demo}
        </Badge>
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {cards.map((card) => (
            <div key={card.key} className="mb-6 break-inside-avoid">
              {card}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
