import { test, expect } from '../../src/fixtures/authenticated';
import { InventoryPage } from '../../src/pages/InventoryPage';

test.describe('Inventory', () => {
  test('user can add item and see cart badge update', async ({ page, inventoryPage }) => {
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.expectCartBadgeCount(1);
  });

  test('user can open cart with selected product', async ({ page, inventoryPage }) => {
    const productName = 'Sauce Labs Bolt T-Shirt';
    await inventoryPage.addProductToCartByName(productName);
    await inventoryPage.openCart();
    await expect(page.locator('.cart_item').filter({ hasText: productName })).toBeVisible();
  });
});
