import { test } from '@playwright/test';
import { CatalogPage } from '../../../src/pages/catalog/CatalogPage';
import { ProductDetailsPage } from '../../../src/pages/catalog/ProductDetailsPage';
import { SamplePortalCatalog } from '../../../src/config/samplePortal';

test.describe('Catalog - Product detail', () => {
  let catalogPage: CatalogPage;
  let detailsPage: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);
    detailsPage = new ProductDetailsPage(page);
    await page.goto('/inventory.html');
    await catalogPage.waitForCatalogReady();
  });

  test('shopper adds item from detail page', async ({ page }) => {
    await catalogPage.openItem(SamplePortalCatalog.standardItem);
    await detailsPage.waitForDetailsReady();
    await detailsPage.addToCart();
    await detailsPage.backToCatalog();

    await catalogPage.waitForCatalogReady();
    await catalogPage.expectCartCount(1);
  });
});
