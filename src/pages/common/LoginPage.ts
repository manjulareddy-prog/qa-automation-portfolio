import { expect, Page } from '@playwright/test';
import { LoginLocators } from '../../locators/common/login.locators';
import { BasePage } from './BasePage';
import * as env from '../../utils/env';

// Page Object Model (POM) class for the Sample Portal login page
export class LoginPage extends BasePage {
  readonly USERNAME = LoginLocators.username;
  readonly PASSWORD = LoginLocators.password;
  readonly SIGN_IN = LoginLocators.submit;
  readonly ERROR = LoginLocators.error;

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.locator(this.USERNAME).fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.locator(this.PASSWORD).fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.page.locator(this.SIGN_IN).click();
  }

  async login(username: string, password: string): Promise<void> {
    console.log('In POM login method, logging in as ' + username);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignIn();
    console.log('Completed POM Login method');
  }

  async loginAsUserType(userType: string): Promise<void> {
    console.log('Logging in as user type: ' + userType);
    switch (userType.toLowerCase()) {
      case 'shopper':
        await this.login(env.getStandardUser(), env.getStandardPassword());
        break;
      case 'restricted':
        await this.login(env.getLockedOutUser(), env.getStandardPassword());
        return;
      case 'broken-catalog':
      case 'broken catalog':
      case 'brokencatalog':
        await this.login(env.getProblemUser(), env.getStandardPassword());
        break;
      case 'slow-shopper':
      case 'slowshopper':
        await this.login(env.getPerformanceUser(), env.getStandardPassword());
        break;
      default:
        throw new Error(`Unknown user type: ${userType}`);
    }
    await this.waitForCatalog();
  }

  async waitForCatalog(): Promise<void> {
    await this.page.waitForURL(/inventory/, { timeout: 15_000 });
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }

  async expectLoginError(message: string | RegExp): Promise<void> {
    await expect(this.page.locator(this.ERROR)).toContainText(message);
  }

  async isOnLoginPage(): Promise<void> {
    await expect(this.page.locator(this.SIGN_IN)).toBeVisible();
    await expect(this.page.locator(this.USERNAME)).toBeVisible();
  }
}
