import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import * as env from '../../src/utils/env';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('standard user reaches inventory after login', async () => {
    await loginPage.loginAsStandardUser();
    await loginPage.expectInventoryVisible();
  });

  test('locked out user sees error message', async () => {
    await loginPage.login(env.getLockedOutUser(), env.getStandardPassword());
    await loginPage.expectLoginError('Sorry, this user has been locked out');
  });

  test('invalid password shows validation error', async () => {
    await loginPage.login(env.getStandardUser(), 'wrong_password');
    await loginPage.expectLoginError('Username and password do not match');
  });
});
