import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";

const adminEmail = process.env.ADMIN_EMAIL ?? "admin@brightnest.example";
const adminPassword = process.env.ADMIN_PASSWORD ?? "local-demo-admin";

test("visitor submits a cleaning request and admin can see it", async ({
  page,
}, testInfo) => {
  const uniqueId = `${testInfo.project.name}-${randomUUID().slice(0, 8)}`;
  const visitorName = `E2E Client ${uniqueId}`;

  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "BrightNest Cleaning Co." }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Request a cleaning quote" }).click();
  await page.getByLabel("Full name").fill(visitorName);
  await page.getByLabel("Requested service").selectOption("deep-cleaning");
  await page.getByRole("textbox", { name: "Email" }).fill(
    `e2e-${uniqueId}@example.com`,
  );
  await page.getByLabel("Either is fine").check();
  await page
    .getByLabel("Message")
    .fill("Please quote a weekend deep clean for a two-bedroom condo.");
  await page.getByLabel(/BrightNest may contact me/).check();
  await page.getByRole("button", { name: "Send request" }).click();

  await expect(page.getByText("Request received.")).toBeVisible();

  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
  await page.getByRole("textbox", { name: "Admin email" }).fill(adminEmail);
  await page.getByLabel("Password").fill(adminPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Lead inbox" })).toBeVisible();
  await expect(page.getByRole("heading", { name: visitorName })).toBeVisible();
});
