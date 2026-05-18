import { test } from '@playwright/test';
import { CatalogPage } from '../../../src/pages/catalog/CatalogPage';
import { CartPage } from '../../../src/pages/checkout/CartPage';
import { CheckoutPage } from '../../../src/pages/checkout/CheckoutPage';
import { SamplePortalCatalog } from '../../../src/config/samplePortal';

test.describe('Checkout - Happy path', () => {
  test('@smoke shopper completes order', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/inventory.html');
    await catalogPage.waitForCatalogReady();

    await test.step('Add item and open cart', async () => {
      await catalogPage.addItem(SamplePortalCatalog.accessoryItem);
      await catalogPage.openCart();
      await cartPage.waitForCartReady();
    });

    await test.step('Shipping and confirmation', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.fillShipping('Manjula', 'Reddy', '75001');
      await checkoutPage.continueToSummary();
      await checkoutPage.finishOrder();
      await checkoutPage.expectOrderComplete();
    });
  });
});
