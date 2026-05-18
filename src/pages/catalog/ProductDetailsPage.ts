import { expect, Page } from '@playwright/test';
import { ProductDetailsLocators } from '../../locators/catalog/productDetails.locators';
import { BasePage } from '../common/BasePage';

export class ProductDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async waitForDetailsReady(): Promise<void> {
    await expect(this.page.locator(ProductDetailsLocators.description)).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.page.locator(ProductDetailsLocators.addToCart).click();
  }

  async backToCatalog(): Promise<void> {
    await this.page.locator(ProductDetailsLocators.backToProducts).click();
  }
}
