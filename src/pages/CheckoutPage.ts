import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finishCheckout(): Promise<void> {
    await this.page.locator('[data-test="finish"]').click();
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
  }
}
