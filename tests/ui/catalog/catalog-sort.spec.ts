import { test, expect } from '@playwright/test';
import { CatalogPage } from '../../../src/pages/catalog/CatalogPage';
import * as CatalogTestData from '../../../src/test-data/CatalogTestData';

test.describe('Catalog - Sort filters', () => {
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);
    await page.goto('/inventory.html');
    await catalogPage.waitForCatalogReady();
  });

  /*Scenario Outline: Sort filter updates product order
    When the shopper applies "<sortFilter>"
    Then product names should follow that order

    Examples:
      | sortFilter              |
      | Name (A to Z)           |
      | Name (Z to A)           |*/

  test('sort A to Z', async () => {
    await catalogPage.applySortFilter(CatalogTestData.SORT_A_TO_Z);
    await catalogPage.productNamesAreSorted('asc');
  });

  test('sort Z to A', async () => {
    await catalogPage.applySortFilter(CatalogTestData.SORT_Z_TO_A);
    await catalogPage.productNamesAreSorted('desc');
  });

  test('price low to high changes first item price order', async ({ page }) => {
    await catalogPage.applySortFilter(CatalogTestData.SORT_PRICE_LOW_HIGH);
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numeric = prices.map((p) => parseFloat(p.replace('$', '')));
    for (let i = 1; i < numeric.length; i++) {
      expect(numeric[i]).toBeGreaterThanOrEqual(numeric[i - 1]);
    }
  });
});
