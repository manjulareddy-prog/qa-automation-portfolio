import { test } from '@playwright/test';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { SessionPage } from '../../../src/pages/common/SessionPage';
import { AppMenuPage } from '../../../src/pages/common/AppMenuPage';

test.describe('Session - Logout', () => {
  let loginPage: LoginPage;
  let sessionPage: SessionPage;
  let menuPage: AppMenuPage;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    sessionPage = new SessionPage(page);
    menuPage = new AppMenuPage(page);

    await page.goto(baseURL!);
    await loginPage.loginAsUserType('Shopper');
  });

  /* Scenario: Shopper logs out
    Given the shopper is on the catalog
    When they log out from the menu
    Then the login page should be displayed */

  test('Shopper should be able to logout successfully', async () => {
    await sessionPage.isOnCatalogPage();
    await menuPage.logout();
    await sessionPage.catalogHeadingIsHidden();
    await sessionPage.isOnLoginPage();
  });
});
