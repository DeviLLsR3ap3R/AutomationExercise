import { expect, type Locator, type Page } from "@playwright/test";

let productToOrder;

export class ProductsPage {
  readonly page: Page;
  readonly allProductsHeading: Locator;
  readonly searchField: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProductsHeading = page.getByRole("heading", {
      name: "All Products",
    });
    this.searchedProductsHeading = page.getByRole("heading", {
      name: "Searched Products",
    });
    this.searchField = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
    this.searchResults = page.locator(".features_items");
  }

  async verifyAllProductsHeadingExists() {
    try {
      await expect(this.allProductsHeading).toBeVisible();
    } catch {
      throw new Error(
        `Expected the 'All Products Heading' element to be visible, but it wasn't.`
      );
    }
  }

  async verifySearchedProductsHeadingExists() {
    try {
      await expect(this.searchedProductsHeading).toBeVisible();
    } catch {
      throw new Error(
        `Expected the 'Searched Products Heading' element to be visible, but it wasn't.`
      );
    }
  }

  async enterSearchTerm(searchTerm: string) {
    await this.searchField.fill(searchTerm);
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async verifySearchResultsDisplayed() {
    try {
      await expect(this.searchResults).toBeVisible();
    } catch {
      throw new Error(
        `Expected the 'Search Results' element to be visible, but it wasn't.`
      );
    }
  }

  async verifySearchResultsRelevance(searchTerm: string) {
    const allResults = await this.searchResults.locator(".col-sm-4");
    const resultsCount = await allResults.count();
    if (resultsCount == 0) {
      throw new Error("No matching products found");
    }
    await expect(resultsCount).toBeGreaterThan(0);
    for (let i = 0; i < resultsCount; i++) {
      const paragraph = await allResults
        .nth(i)
        .locator(
          "div.product-image-wrapper > div.single-products > div.productinfo.text-center > p"
        );
      const paragraphText = await paragraph.textContent();
      try {
        await expect(paragraphText?.toLowerCase()).toContain(searchTerm);
      } catch {
        throw new Error(
          `Expected the paragraph text to contain "${searchTerm}", but it didn't.`
        );
      }
    }
    productToOrder = await allResults.nth(0);
  }

  async searchAndVerifyResults(searchTerm: string) {
    await this.enterSearchTerm(searchTerm);
    await this.clickSearchButton();
    await this.verifySearchedProductsHeadingExists();
    await this.verifySearchResultsDisplayed();
    await this.verifySearchResultsRelevance(searchTerm);
  }

  async getProductData() {
    const productName = await productToOrder.locator(
      "div.product-image-wrapper > div.single-products > div.productinfo.text-center > p"
    );
    const productPrice = await productToOrder.locator(
      "div.product-image-wrapper > div.single-products > div.productinfo.text-center > h2"
    );
    return {
      name: (await productName.textContent()) as string,
      price: (await productPrice.textContent()) as string,
    };
  }

  async getProductId() {
    const hrefValue = await productToOrder
      .locator(
        "div.product-image-wrapper > div.choose > ul.nav.nav-pills.nav-justified > li > a"
      )
      .getAttribute("href");

    const id = hrefValue.match(/\/product_details\/(\d+)/);
    return parseInt(id[1], 10);
  }

  async clickViewProduct() {
    await productToOrder
      .locator(
        "div.product-image-wrapper > div.choose > ul.nav.nav-pills.nav-justified > li > a"
      )
      .click();
  }
}
