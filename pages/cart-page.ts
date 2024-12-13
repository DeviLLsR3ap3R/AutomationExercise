import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCorrectProduct(
    id: number,
    product: { name: string; price: string }
  ) {
    const rowLocator = "tr#product-" + id.toString();
    const tableRow = this.page.locator(rowLocator);
    const itemDescription = tableRow.locator("td.cart_description > h4 > a");
    const itemPrice = tableRow.locator("td.cart_price > p");
    const itemQuantity = tableRow.locator("td.cart_quantity > button");

    const itemDescriptionContent = await itemDescription.textContent();
    const itemPriceContent = await itemPrice.textContent();
    const itemQuantityContent = await itemQuantity.textContent();

    try {
      await expect(itemDescriptionContent).toBe(product.name);
    } catch {
      throw new Error(
        `Expected item description to be "${product.name}", but it was "${itemDescriptionContent}".`
      );
    }

    try {
      await expect(itemPriceContent).toBe(product.price);
    } catch {
      throw new Error(
        `Expected item price to be "${product.price}", but it was "${itemPriceContent}".`
      );
    }

    try {
      await expect(itemQuantityContent).toBe("1");
    } catch {
      throw new Error(
        `Expected item quantity to be "1", but it was "${itemQuantityContent}".`
      );
    }
  }
}
