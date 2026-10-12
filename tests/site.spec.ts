import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = {
  fr: ["/fr", "/fr/agences", "/fr/audit", "/fr/contact", "/fr/projets/welcomeapp", "/fr/projets/dandyshoes", "/fr/projets/camping-du-wignet", "/fr/projets/gestionnaire-de-championnats"],
  en: ["/en", "/en/agencies", "/en/code-review", "/en/contact", "/en/projects/welcomeapp", "/en/projects/dandyshoes", "/en/projects/camping-du-wignet", "/en/projects/gestionnaire-de-championnats"],
};
const allPages = [...pages.fr, ...pages.en];
const ctaLabel = { fr: "Me contacter", en: "Get in touch" } as const;

test("root redirects to a locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(fr|en)$/);
});

for (const path of allPages) {
  test(`${path} renders, has no horizontal scroll and no serious a11y issue`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
  });
}

for (const lang of ["fr", "en"] as const) {
  test(`${lang} home shows the four projects and a visible contact CTA`, async ({ page }) => {
    await page.goto(`/${lang}`);
    await expect(page.locator("#projects article")).toHaveCount(4);
    const cta = page.getByRole("banner").getByRole("link", { name: ctaLabel[lang] });
    await expect(cta).toBeInViewport();
    await cta.click();
    await expect(page).toHaveURL(new RegExp(`/${lang}/contact$`));
    await expect(page.getByRole("button", { name: lang === "fr" ? "Envoyer ma demande" : "Send my request" })).toBeVisible();
  });
}

test("language switch keeps the current page", async ({ page, isMobile }) => {
  await page.goto("/fr/agences");
  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "English" }).click();
  } else {
    await page.getByRole("banner").getByRole("link", { name: "English" }).click();
  }
  await expect(page).toHaveURL(/\/en\/agencies$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("the e-mail address is never rendered", async ({ page }) => {
  for (const path of ["/fr", "/fr/contact", "/en/code-review"]) {
    await page.goto(path);
    const html = await page.content();
    expect(html).not.toMatch(/@gmail\.com/i);
    if (process.env.CONTACT_TO_EMAIL) expect(html).not.toContain(process.env.CONTACT_TO_EMAIL);
    expect(html).not.toContain("mailto:");
  }
});

test("contact form blocks invalid input and confirms a valid request", async ({ page }) => {
  await page.goto("/fr/contact");
  const form = page.locator("main form");
  await form.getByRole("button", { name: "Envoyer ma demande" }).click();
  // Native validation keeps the visitor on the form.
  await expect(form.getByLabel("Votre nom")).toBeFocused();
  await expect(page.getByText("Demande envoyée")).toHaveCount(0);

  await form.getByText("Je veux faire auditer mon app").click();
  await form.getByLabel("Votre nom").fill("Test Playwright");
  await form.getByLabel("Votre e-mail").fill("test@example.com");
  await form.getByLabel("Votre projet").fill("Une app Lovable avec Supabase à vérifier avant le lancement.");
  await form.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(page.getByRole("status")).toContainText("Demande envoyée");
});
