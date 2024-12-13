import { expect, type Locator, type Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly quantityField: Locator;
  readonly addToCartButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quantityField = page.locator("#quantity");
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  async validateQuantity(quantity: number) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error(`Quantity must be a positive integer`);
    }
  }

  async selectQuantity(quantity: number) {
    await this.validateQuantity(quantity);
    try {
      await this.quantityField.fill(String(quantity));
    } catch {
      throw new Error(
        `Unable to select quantity. Ensure you are passing a valid opiton.`
      );
    }
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click();
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }
}
