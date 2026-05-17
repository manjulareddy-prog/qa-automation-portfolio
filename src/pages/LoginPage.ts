import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import * as env from '../utils/env';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async loginAsStandardUser(): Promise<void> {
    await this.login(env.getStandardUser(), env.getStandardPassword());
  }

  async expectInventoryVisible(): Promise<void> {
    await expect(this.page.locator('.inventory_list')).toBeVisible();
    await this.expectUrlContains(/inventory/);
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message);
  }
}
