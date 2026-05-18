import { test, expect } from '@playwright/test';
import { CatalogPage } from '../../../src/pages/catalog/CatalogPage';
import { AppMenuPage } from '../../../src/pages/common/AppMenuPage';
import { SamplePortalCatalog } from '../../../src/config/samplePortal';

test.describe('Session - Reset app state', () => {
  test('reset clears cart badge', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const menuPage = new AppMenuPage(page);

    await page.goto('/inventory.html');
    await catalogPage.waitForCatalogReady();
    await catalogPage.addItem(SamplePortalCatalog.standardItem);
    await catalogPage.expectCartCount(1);

    await menuPage.resetAppState();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});
