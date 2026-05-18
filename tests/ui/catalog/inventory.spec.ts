import { test } from '@playwright/test';
import { CatalogPage } from '../../../src/pages/catalog/CatalogPage';
import { CartPage } from '../../../src/pages/checkout/CartPage';
import { SamplePortalCatalog } from '../../../src/config/samplePortal';

test.describe('Catalog - Cart badge', () => {
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);
    await page.goto('/inventory.html');
    await catalogPage.waitForCatalogReady();
  });

  test('adding one item updates cart badge', async () => {
    await catalogPage.addItem(SamplePortalCatalog.standardItem);
    await catalogPage.expectCartCount(1);
  });

  test('user can open cart and see line item', async ({ page }) => {
    await catalogPage.addItem(SamplePortalCatalog.apparelItem);
    await catalogPage.openCart();

    const cartPage = new CartPage(page);
    await cartPage.waitForCartReady();
    await cartPage.expectLineItems(1);
  });
});
