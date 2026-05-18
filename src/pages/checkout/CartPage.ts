import { expect, Page } from '@playwright/test';
import { CartLocators } from '../../locators/checkout/checkout.locators';
import { BasePage } from '../common/BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async waitForCartReady(): Promise<void> {
    await this.verifyHeading('Your Cart');
  }

  async expectLineItems(count: number): Promise<void> {
    await expect(this.page.locator(CartLocators.lineItem)).toHaveCount(count);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.locator(CartLocators.checkout).click();
  }
}
