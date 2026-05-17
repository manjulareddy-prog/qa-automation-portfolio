import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await this.expectHeadingVisible('Your Cart');
  }

  async expectItemVisible(productName: string): Promise<void> {
    await expect(this.page.locator('.cart_item').filter({ hasText: productName })).toBeVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
