import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly homeButton: Locator;
  readonly signupLoginButton: Locator;
  readonly loggedInAs: Locator;
  readonly logoutButton: Locator;
  readonly deleteAccountButton: Locator;
  readonly productsButton: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "AutomationExercise" });
    this.homeButton = page.getByRole("link", { name: "Home" });
    this.signupLoginButton = page.getByRole("link", {
      name: "Signup / Login",
    });
    this.loggedInAs = page.locator("li").filter({ hasText: "Logged in as" });
    this.logoutButton = page.getByRole("link", { name: "Logout" });
    this.deleteAccountButton = page.getByRole("link", {
      name: "Delete Account",
    });
    this.productsButton = page.getByRole("link", { name: "Products" });
    this.cartButton = page.getByRole("link", { name: "Cart" });
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
      await expect(this.heading).toContainText("AutomationExercise");
    } catch {
      throw new Error(
        `Expected heading to contain text "AutomationExercise", but it didn't.`
      );
    }
  }

  async verifyHomeButtonExists() {
    try {
      await expect(this.homeButton).toBeVisible();
    } catch {
      throw new Error(`Expected the Home button to be visible, but it wasn't.`);
    }
  }

  async verifySignupLoginButtonExists() {
    try {
      await expect(this.signupLoginButton).toBeVisible();
    } catch {
      throw new Error(
        `Expected the Signup/Login button to be visible, but it wasn't.`
      );
    }
  }

  async clickSignupLoginButton() {
    await this.signupLoginButton.click();
  }

  async verifyLoggedInAsExists() {
    try {
      await expect(this.loggedInAs).toBeVisible();
    } catch {
      throw new Error(
        `Expected the 'Logged In As' element to be visible, but it wasn't.`
      );
    }
  }

  async verifyLogoutButtonExists() {
    try {
      await expect(this.logoutButton).toBeVisible();
    } catch {
      throw new Error(
        `Expected the 'Logout Button' element to be visible, but it wasn't.`
      );
    }
  }

  async verifyDeleteAccountButtonExists() {
    try {
      await expect(this.deleteAccountButton).toBeVisible();
    } catch {
      throw new Error(
        `Expected the 'Delete Account Button' element to be visible, but it wasn't.`
      );
    }
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async clickDeleteAccountButton() {
    await this.deleteAccountButton.click();
  }

  async verifyProductsButtonExists() {
    try {
      await expect(this.productsButton).toBeVisible();
    } catch {
      throw new Error(
        `Expected the 'Products Button' element to be visible, but it wasn't.`
      );
    }
  }

  async clickProductsButton() {
    await this.productsButton.click();
  }

  async verifyCartButtonExists() {
    try {
      await expect(this.cartButton).toBeVisible();
    } catch {
      throw new Error(
        `Expected the 'Cart Button' element to be visible, but it wasn't.`
      );
    }
  }

  async clickCartButton() {
    await this.cartButton.click();
  }
}
