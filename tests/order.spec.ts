import { test } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { ProductsPage } from "../pages/products-page";
import { ProductPage } from "../pages/product-page";
import { CartPage } from "../pages/cart-page";

let homePage: HomePage;
let productsPage: ProductsPage;
let productPage: ProductPage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.automationexercise.com/");
  await page.getByLabel("Consent", { exact: true }).click();
  homePage = new HomePage(page);
  productsPage = new ProductsPage(page);
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);
});

test("Add product to cart and verify correct product details", async () => {
  await homePage.verifyHeadingExists();
  await homePage.verifyHeadingText();
  await homePage.verifyProductsButtonExists();
  await homePage.clickProductsButton();
  await productsPage.verifyAllProductsHeadingExists();
  await productsPage.searchAndVerifyResults("jeans");
  const product = await productsPage.getProductData();
  const productId = await productsPage.getProductId();
  await productsPage.clickViewProduct();
  await productPage.selectQuantity(1);
  await productPage.clickAddToCartButton();
  await productPage.clickContinueShoppingButton();
  await homePage.verifyCartButtonExists();
  await homePage.clickCartButton();
  await cartPage.verifyCorrectProduct(productId, product);
});
