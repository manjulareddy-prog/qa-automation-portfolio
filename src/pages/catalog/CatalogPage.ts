import { expect, Page } from '@playwright/test';
import { InventoryLocators } from '../../locators/catalog/inventory.locators';
import { BasePage } from '../common/BasePage';
import { CatalogSlug } from '../../config/samplePortal';

export class CatalogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async waitForCatalogReady(): Promise<void> {
    await expect(this.page.locator(InventoryLocators.list)).toBeVisible({ timeout: 30_000 });
    await this.verifyHeading('Products');
  }

  async addItem(slug: CatalogSlug): Promise<void> {
    await this.page.locator(InventoryLocators.addToCart(slug)).click();
  }

  async removeItem(slug: CatalogSlug): Promise<void> {
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async openItem(slug: CatalogSlug): Promise<void> {
    await this.page.locator(InventoryLocators.itemTitleLink(slug)).click();
  }

  async openCart(): Promise<void> {
    await this.page.locator(InventoryLocators.cartLink).click();
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.page.locator(InventoryLocators.cartBadge)).toHaveText(String(count));
  }

  async applySortFilter(filterLabel: string): Promise<void> {
    await this.page.locator(InventoryLocators.sortDropdown).selectOption({ label: filterLabel });
    // let DOM settle after sort
    await this.page.waitForTimeout(300);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator(InventoryLocators.itemName).allTextContents();
  }

  async allProductNamesMatch(fragment: string): Promise<void> {
    const names = await this.getProductNames();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name.toLowerCase()).toContain(fragment.toLowerCase());
    }
  }

  async productNamesAreSorted(direction: 'asc' | 'desc'): Promise<void> {
    const names = await this.getProductNames();
    const sorted =
      direction === 'asc'
        ? [...names].sort((a, b) => a.localeCompare(b))
        : [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  }
}
