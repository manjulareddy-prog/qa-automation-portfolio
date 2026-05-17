import { test } from '../../src/fixtures/authenticated';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

test.describe('Checkout', () => {
  test('standard user completes purchase flow', async ({ page, inventoryPage }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProductToCartByName('Sauce Labs Onesie');
    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemVisible('Sauce Labs Onesie');
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInfo('Alex', 'Tester', '10001');
    await checkoutPage.finishCheckout();
    await checkoutPage.expectOrderComplete();
  });
});
