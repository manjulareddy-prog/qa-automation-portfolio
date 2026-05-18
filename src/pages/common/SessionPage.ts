import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';

// helpers used after login / around logout (same idea as LogoutPage in team framework)
export class SessionPage extends BasePage {
  private loginPage: LoginPage;

  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPage(page);
  }

  async isOnCatalogPage(): Promise<void> {
    await expect(this.page.locator('.inventory_list')).toBeVisible({ timeout: 30_000 });
    await expect(this.page).toHaveURL(/inventory/);
  }

  async isOnLoginPage(): Promise<void> {
    await this.loginPage.isOnLoginPage();
  }

  async catalogHeadingIsVisible(): Promise<void> {
    await this.verifyHeading('Products');
  }

  async catalogHeadingIsHidden(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Products' })).toBeHidden();
  }
}
