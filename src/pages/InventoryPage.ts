import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.locator('.inventory_list')).toBeVisible();
    await this.expectHeadingVisible('Products');
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async expectCartBadgeCount(count: number): Promise<void> {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText(String(count));
  }

  async openCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }
}
