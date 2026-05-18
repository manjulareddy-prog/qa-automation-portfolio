import { test } from '@playwright/test';
import { CatalogPage } from '../../../src/pages/catalog/CatalogPage';
import { CartPage } from '../../../src/pages/checkout/CartPage';
import { SamplePortalCatalog } from '../../../src/config/samplePortal';

test.describe('Catalog - Cart management', () => {
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);
    await page.goto('/inventory.html');
    await catalogPage.waitForCatalogReady();
  });

  /* Scenario: Shopper removes an item from cart
    Given two items in cart
    When one item is removed on catalog page
    Then badge count should drop to 1 */

  test('remove item updates badge count', async ({ page }) => {
    await catalogPage.addItem(SamplePortalCatalog.standardItem);
    await catalogPage.addItem(SamplePortalCatalog.secondItem);
    await catalogPage.expectCartCount(2);

    await catalogPage.removeItem(SamplePortalCatalog.standardItem);
    await catalogPage.expectCartCount(1);

    await catalogPage.openCart();
    const cartPage = new CartPage(page);
    await cartPage.expectLineItems(1);
  });
});
