import { test } from '@playwright/test';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { SessionPage } from '../../../src/pages/common/SessionPage';
import * as env from '../../../src/utils/env';

test.describe('Auth - Login', () => {
  let loginPage: LoginPage;
  let sessionPage: SessionPage;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    sessionPage = new SessionPage(page);
    await page.goto(baseURL!);
  });

  /* Scenario: Shopper signs in with valid credentials
    When the user logs in as a Shopper
    Then the catalog page should load */

  test('Shopper can sign in and reach catalog', async () => {
    await loginPage.loginAsUserType('Shopper');
    await sessionPage.isOnCatalogPage();
    await sessionPage.catalogHeadingIsVisible();
  });

  test('Restricted account shows lockout message', async () => {
    await loginPage.loginAsUserType('Restricted');
    await loginPage.expectLoginError('Sorry, this user has been locked out');
  });

  test('Wrong password is rejected', async () => {
    await loginPage.login(env.getStandardUser(), 'bad-password');
    await loginPage.expectLoginError('Username and password do not match');
  });
});
