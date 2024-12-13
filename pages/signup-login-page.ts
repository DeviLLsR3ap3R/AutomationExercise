import { expect, type Locator, type Page } from "@playwright/test";

export class SignupLoginPage {
  readonly page: Page;
  readonly userSignupHeading: Locator;
  readonly userLoginHeading: Locator;
  readonly loginEmailField: Locator;
  readonly loginPasswordField: Locator;
  readonly loginButton: Locator;
  readonly signupNameField: Locator;
  readonly signupEmailField: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userSignupHeading = page.getByRole("heading", {
      name: "New User Signup!",
    });
    this.userLoginHeading = page.getByRole("heading", {
      name: "Login to your account",
    });
    this.loginEmailField = page
      .locator("form")
      .filter({ hasText: "Login" })
      .getByPlaceholder("Email Address");
    this.loginPasswordField = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.signupNameField = page.getByPlaceholder("Name");
    this.signupEmailField = page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address");
    this.signupButton = page.getByRole("button", { name: "Signup" });
  }

  async verifyUserSignupHeadingExists() {
    try {
      await expect(this.userSignupHeading).toBeVisible();
    } catch {
      throw new Error(
        `Expected User Signup Heading to be visible, but it wasn't`
      );
    }
  }

  async verifyUserSignupHeadingText() {
    try {
      await expect(this.userSignupHeading).toContainText("New User Signup!");
    } catch {
      throw new Error(
        `Expected the heading to contain "New User Signup!", but it didn't.`
      );
    }
  }

  async verifyUserLoginHeadingExists() {
    try {
      await expect(this.userLoginHeading).toBeVisible();
    } catch {
      throw new Error(
        `Expected User Login Heading to be visible, but it wasn't`
      );
    }
  }

  async verifyUserLoginHeadingText() {
    try {
      await expect(this.userLoginHeading).toContainText(
        "Login to your account"
      );
    } catch {
      throw new Error(
        "Expected the heading to contain 'Login to your account', but it didn't."
      );
    }
  }

  async fillLoginEmailField(email: string) {
    await this.loginEmailField.fill(email);
  }

  async fillLoginPasswordField(password: string) {
    await this.loginPasswordField.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.fillLoginEmailField(email);
    await this.fillLoginPasswordField(password);
    await this.clickLoginButton();
  }

  async fillSignupNameField(name: string) {
    await this.signupNameField.fill(name);
  }

  async fillSignupEmailField(email: string) {
    await this.signupEmailField.fill(email);
  }

  async clickSignupButton() {
    await this.signupButton.click();
  }

  async signup(name: string, email: string) {
    await this.fillSignupNameField(name);
    await this.fillSignupEmailField(email);
    await this.clickSignupButton();
  }
}
