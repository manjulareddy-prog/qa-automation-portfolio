import { test } from '@playwright/test';
import { CatalogPage } from '../../../src/pages/catalog/CatalogPage';
import { CartPage } from '../../../src/pages/checkout/CartPage';
import { CheckoutPage } from '../../../src/pages/checkout/CheckoutPage';
import { SamplePortalCatalog } from '../../../src/config/samplePortal';

test.describe('Checkout - Validation', () => {
  let catalogPage: CatalogPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto('/inventory.html');
    await catalogPage.waitForCatalogReady();
    await catalogPage.addItem(SamplePortalCatalog.apparelItem);
    await catalogPage.openCart();
    await cartPage.waitForCartReady();
    await cartPage.proceedToCheckout();
  });

  test('missing shipping fields show error', async () => {
    await checkoutPage.submitEmptyShippingAndContinue();
    await checkoutPage.expectValidationError();
  });
});
