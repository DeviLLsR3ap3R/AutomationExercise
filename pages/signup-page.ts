import { expect, type Locator, type Page } from "@playwright/test";
import { Days, Months, Years, Countries } from "../helpers/signup-enums";

export class SignupPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly genderMaleRadioButton: Locator;
  readonly genderFemaleRadioButton: Locator;
  readonly nameField: Locator;
  readonly passwordField: Locator;
  readonly dateOfBirthDayDropdown: Locator;
  readonly dateOfBirthMonthDropdown: Locator;
  readonly dateOfBirthYearDropdown: Locator;
  readonly singupForNewsletterCheckbox: Locator;
  readonly recieveOffersCheckbox: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly companyField: Locator;
  readonly addressField: Locator;
  readonly address2Field: Locator;
  readonly countryDropdown: Locator;
  readonly stateField: Locator;
  readonly cityField: Locator;
  readonly zipCodeField: Locator;
  readonly phoneNumberField: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByText("Enter Account Information");
    this.genderMaleRadioButton = page.locator("#uniform-id_gender1");
    this.genderFemaleRadioButton = page.locator("#uniform-id_gender2");
    this.nameField = page.locator("#name");
    this.passwordField = page.locator("#password");
    this.dateOfBirthDayDropdown = page.locator("#days");
    this.dateOfBirthMonthDropdown = page.locator("#months");
    this.dateOfBirthYearDropdown = page.locator("#years");
    this.singupForNewsletterCheckbox = page.locator("#newsletter");
    this.recieveOffersCheckbox = page.locator("#optin");
    this.firstNameField = page.locator("#first_name");
    this.lastNameField = page.locator("#last_name");
    this.companyField = page.locator("#company");
    this.addressField = page.locator("#address1");
    this.address2Field = page.locator("#address2");
    this.countryDropdown = page.locator("#country");
    this.stateField = page.locator("#state");
    this.cityField = page.locator("#city");
    this.zipCodeField = page.locator("#zipcode");
    this.phoneNumberField = page.locator("#mobile_number");
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
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
      await expect(this.heading).toContainText("Enter Account Information");
    } catch {
      throw new Error(
        `Expected the heading to contain 'Enter Account Information', but it didn't.`
      );
    }
  }

  async selectGenderMale() {
    await this.genderMaleRadioButton.click();
  }

  async selectGenderFemale() {
    await this.genderFemaleRadioButton.click();
  }

  async fillNameField(name: string) {
    await this.nameField.fill(name);
  }

  async fillPasswordField(password: string) {
    await this.passwordField.fill(password);
  }

  async validateDayOption(day: string) {
    const dayNumber = Number(day);
    if (isNaN(dayNumber) || dayNumber < Days.Min || dayNumber > Days.Max) {
      throw new Error(
        `Invalid day option. Value must be between ${Days.Min} and ${Days.Max}`
      );
    }
  }

  async selectDateOfBirthDay(day: string) {
    await this.validateDayOption(day);
    try {
      await this.dateOfBirthDayDropdown.selectOption(day);
    } catch {
      throw new Error(
        `Unable to select day ${day}. Ensure you are passing a valid opiton.`
      );
    }
  }

  async validateMonthOption(month: string) {
    if (!(month in Months)) {
      throw new Error(
        `Invalid month option. Value must be one of the following: ${Object.values(
          Months
        ).join(",")}`
      );
    }
  }

  async selectDateOfBirthMonth(month: string) {
    await this.validateMonthOption(month);
    try {
      await this.dateOfBirthMonthDropdown.selectOption(month);
    } catch {
      throw new Error(
        `Unable to select month ${month}. Ensure you are passing a valid opiton.`
      );
    }
  }

  async validateYearOption(year: string) {
    const yearNumber = Number(year);
    if (isNaN(yearNumber) || yearNumber < Years.Min || yearNumber > Years.Max) {
      throw new Error(
        `Invalid year option. Value must be between ${Years.Min} and ${Years.Max}`
      );
    }
  }

  async selectDateOfBirthYear(year: string) {
    await this.validateYearOption(year);
    try {
      await this.dateOfBirthYearDropdown.selectOption(year);
    } catch {
      throw new Error(
        `Unable to select year ${year}. Ensure you are passing a valid opiton.`
      );
    }
  }

  async checkNewsletterCheckbox() {
    await this.singupForNewsletterCheckbox.check();
  }

  async uncheckNewsletterCheckbox() {
    await this.singupForNewsletterCheckbox.uncheck();
  }

  async checkOfferCheckbox() {
    await this.recieveOffersCheckbox.check();
  }

  async uncheckOfferCheckbox() {
    await this.recieveOffersCheckbox.uncheck();
  }

  async fillFirstNameField(firstName: string) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastNameField(lastName: string) {
    await this.lastNameField.fill(lastName);
  }

  async fillCompanyField(company: string) {
    await this.companyField.fill(company);
  }

  async fillAddressField(address: string) {
    await this.addressField.fill(address);
  }

  async fillAddress2Field(address2: string) {
    await this.address2Field.fill(address2);
  }

  async validateCountryOption(country: string) {
    if (!(country in Countries)) {
      throw new Error(
        `Invalid country option. Value must be one of the following: ${Object.values(
          Countries
        ).join(",")}`
      );
    }
  }

  async selectCountry(country: string) {
    await this.validateCountryOption(country);
    try {
      await this.countryDropdown.selectOption(country);
    } catch {
      throw new Error(
        `Unable to select country ${country}. Ensure you are passing a valid opiton.`
      );
    }
  }

  async fillStateField(state: string) {
    await this.stateField.fill(state);
  }

  async fillCityField(city: string) {
    await this.cityField.fill(city);
  }

  async fillZipCodeField(zipCode: string) {
    await this.zipCodeField.fill(zipCode);
  }

  async fillPhoneNumberField(phoneNumber: string) {
    await this.phoneNumberField.fill(phoneNumber);
  }

  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }

  async fillSignupForm(
    gender: string,
    name: string,
    password: string,
    day: string,
    month: string,
    year: string,
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipCode: string,
    phoneNumber: string
  ) {
    if (gender == "male") {
      await this.selectGenderMale();
    } else if (gender == "female") {
      await this.selectGenderFemale();
    } else throw new Error(`Gender must be either male or female`);
    await this.fillNameField(name);
    await this.fillPasswordField(password);
    await this.selectDateOfBirthDay(day);
    await this.selectDateOfBirthMonth(month);
    await this.selectDateOfBirthYear(year);
    await this.checkNewsletterCheckbox();
    await this.checkOfferCheckbox();
    await this.fillFirstNameField(firstName);
    await this.fillLastNameField(lastName);
    await this.fillCompanyField(company);
    await this.fillAddressField(address);
    await this.fillAddress2Field(address2);
    await this.selectCountry(country);
    await this.fillStateField(state);
    await this.fillCityField(city);
    await this.fillZipCodeField(zipCode);
    await this.fillPhoneNumberField(phoneNumber);
  }
}
