import { expect, Page } from '@playwright/test';
import { CheckoutLocators } from '../../locators/checkout/checkout.locators';
import { BasePage } from '../common/BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillShipping(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.locator(CheckoutLocators.firstName).fill(firstName);
    await this.page.locator(CheckoutLocators.lastName).fill(lastName);
    await this.page.locator(CheckoutLocators.postalCode).fill(postalCode);
  }

  async continueToSummary(): Promise<void> {
    await this.page.locator(CheckoutLocators.continue).click();
  }

  async submitEmptyShippingAndContinue(): Promise<void> {
    await this.continueToSummary();
  }

  async finishOrder(): Promise<void> {
    await this.page.locator(CheckoutLocators.finish).click();
  }

  async expectValidationError(): Promise<void> {
    await expect(this.page.locator(CheckoutLocators.error)).toBeVisible();
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.page.locator(CheckoutLocators.completeHeader)).toHaveText(
      'Thank you for your order!'
    );
  }
}
