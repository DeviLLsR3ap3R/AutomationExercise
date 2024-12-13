import { expect, type Locator, type Page } from "@playwright/test";

export class AccountCreatedPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Account Created!" });
    this.continueButton = page.getByRole("link", { name: "Continue" });
  }

  async verifyHeadingExists() {
    try {
      await expect(this.heading).toBeVisible();
    } catch {
      throw new Error(`Expected heading to be visible, but it wasn't`);
    }
  }

  async verifyHeadingText() {
    try {
      await expect(this.heading).toContainText("Account Created!");
    } catch {
      throw new Error(
        `Expected the heading to contain "Account Created!", but it didn't.`
      );
    }
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}
