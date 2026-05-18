import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { CatalogPage } from '../../../src/pages/catalog/CatalogPage';
import { SamplePortalCatalog } from '../../../src/config/samplePortal';

test.describe('Auth - Persona behavior', () => {
  let loginPage: LoginPage;
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    catalogPage = new CatalogPage(page);
    await page.goto(baseURL!);
  });

  /* Scenario: Broken catalog persona hits client-side item error
    Given a user flagged for catalog issues
    When they add the same item twice
    Then the UI should surface an error state on the item */

  test('Broken-catalog persona shows item error on repeat add', async ({ page }) => {
    await loginPage.loginAsUserType('broken-catalog');
    await catalogPage.waitForCatalogReady();

    const slug = SamplePortalCatalog.standardItem;
    await catalogPage.addItem(slug);
    await catalogPage.addItem(slug);
    await expect(page.locator('.error-button')).toBeVisible();
  });

  test('@smoke Slow-shopper persona still reaches catalog', async () => {
    test.setTimeout(120_000);
    await loginPage.loginAsUserType('SlowShopper');
    await catalogPage.waitForCatalogReady();
  });
});
