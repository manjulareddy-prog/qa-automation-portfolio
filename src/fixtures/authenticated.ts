import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

type AuthenticatedFixtures = {
  inventoryPage: InventoryPage;
};

/**
 * Fixture: starts each test on the inventory page as a logged-in user.
 * Demonstrates reusable setup beyond beforeEach hooks.
 */
export const test = base.extend<AuthenticatedFixtures>({
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginAsStandardUser();
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
