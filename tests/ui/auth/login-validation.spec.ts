import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/common/LoginPage';

test.describe('Auth - Login validation', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    await page.goto(baseURL!);
  });

  /* Scenario: Submit with empty username
    When the user leaves username blank and clicks sign in
    Then a validation message should appear */

  test('empty username shows required message', async () => {
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickSignIn();
    await loginPage.expectLoginError('Username is required');
  });

  test('empty password shows required message', async () => {
    await loginPage.enterUsername('standard_user');
    await loginPage.clickSignIn();
    await loginPage.expectLoginError('Password is required');
  });

  test('empty username and password shows username required first', async () => {
    await loginPage.clickSignIn();
    await loginPage.expectLoginError('Username is required');
  });

  test('locked user cannot proceed to catalog', async ({ page }) => {
    await loginPage.loginAsUserType('Restricted');
    await expect(page).not.toHaveURL(/inventory/);
    await loginPage.isOnLoginPage();
  });
});
