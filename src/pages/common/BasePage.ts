import { expect, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout: 60_000 });
  }

  async clickButtonByText(buttonText: string): Promise<void> {
    await this.page.getByRole('button', { name: buttonText }).click();
  }

  async clickByRole(name: string, timeout = 30_000): Promise<void> {
    const element = this.page
      .getByRole('button', { name })
      .or(this.page.getByRole('link', { name }));
    await expect(element).toBeVisible({ timeout });
    await element.click();
  }

  async verifyHeading(heading: string, timeout = 30_000): Promise<void> {
    await expect(this.page.getByRole('heading', { name: heading })).toBeVisible({ timeout });
  }
}
