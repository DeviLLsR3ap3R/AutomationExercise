import { test } from "@playwright/test";
import { AccountCreatedPage } from "../pages/account-created-page";
import { SignupPage } from "../pages/signup-page";
import { SignupLoginPage } from "../pages/signup-login-page";
import { HomePage } from "../pages/home-page";
import { AccountDeletedPage } from "../pages/account-deleted-page";

let homePage: HomePage;
let signupLoginPage: SignupLoginPage;
let signupPage: SignupPage;
let accountCreatedPage: AccountCreatedPage;
let accountDeletedPage: AccountDeletedPage;

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.automationexercise.com/");
  await page.getByLabel("Consent", { exact: true }).click();
  homePage = new HomePage(page);
  signupLoginPage = new SignupLoginPage(page);
  signupPage = new SignupPage(page);
  accountCreatedPage = new AccountCreatedPage(page);
  accountDeletedPage = new AccountDeletedPage(page);
});

test("Successful user registration", async () => {
  await homePage.verifyHeadingExists();
  await homePage.verifyHeadingText();
  await homePage.verifyHomeButtonExists();
  await homePage.verifySignupLoginButtonExists();
  await homePage.clickSignupLoginButton();
  await signupLoginPage.verifyUserSignupHeadingExists();
  await signupLoginPage.verifyUserSignupHeadingText();
  await signupLoginPage.signup("test9999", "test9999@test.test");
  await signupPage.verifyHeadingExists();
  await signupPage.verifyHeadingText();
  await signupPage.fillSignupForm(
    "male",
    "test9999",
    "test",
    "1",
    "April",
    "1999",
    "Test",
    "Test",
    "TestComp",
    "TestAddr",
    "TestAddr2",
    "India",
    "TestState",
    "TestCity",
    "test",
    "0895666111"
  );
  await signupPage.clickCreateAccountButton();
  await accountCreatedPage.verifyHeadingExists();
  await accountCreatedPage.verifyHeadingText();
  await accountCreatedPage.clickContinueButton();
  await homePage.verifyLoggedInAsExists();
  await homePage.verifyLogoutButtonExists();
  await homePage.verifyDeleteAccountButtonExists();
  await homePage.clickDeleteAccountButton();
  await accountDeletedPage.verifyHeadingExists();
  await accountDeletedPage.verifyHeadingText();
  await accountDeletedPage.clickContinueButton();
  await homePage.verifyHeadingExists();
  await homePage.verifyHeadingText();
  await homePage.verifySignupLoginButtonExists();
});
