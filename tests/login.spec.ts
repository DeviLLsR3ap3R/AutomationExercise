import { test, expect } from "@playwright/test";
import { SignupLoginPage } from "../pages/signup-login-page";
import { HomePage } from "../pages/home-page";

let homePage: HomePage;
let signupLoginPage: SignupLoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.automationexercise.com/");
  await page.getByLabel("Consent", { exact: true }).click();
  homePage = new HomePage(page);
  signupLoginPage = new SignupLoginPage(page);
});

test("Login with valid credentials", async () => {
  await homePage.verifyHeadingExists();
  await homePage.verifyHeadingText();
  await homePage.verifyHomeButtonExists();
  await homePage.verifySignupLoginButtonExists();
  await homePage.clickSignupLoginButton();
  await signupLoginPage.verifyUserLoginHeadingExists();
  await signupLoginPage.verifyUserLoginHeadingText();
  await signupLoginPage.login("test999@test.test", "a");
  await homePage.verifyHeadingExists();
  await homePage.verifyHeadingText();
  await homePage.verifyLoggedInAsExists();
  await homePage.verifyLogoutButtonExists();
  await expect(homePage.page.getByText("Logged in as test999")).toBeVisible();
  await homePage.clickLogoutButton();
  await homePage.verifyHeadingExists();
  await homePage.verifyHeadingText();
  await homePage.verifySignupLoginButtonExists();
});
