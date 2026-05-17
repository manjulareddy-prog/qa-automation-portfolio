import { expect, Page } from '@playwright/test';

/**
 * Shared helpers used across page objects.
 * Adapted from patterns used on a live externship automation framework.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickButtonByText(buttonText: string): Promise<void> {
    await this.page.getByRole('button', { name: buttonText }).click();
  }

  async expectHeadingVisible(heading: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: heading })).toBeVisible();
  }

  async expectUrlContains(fragment: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(fragment);
  }
}
