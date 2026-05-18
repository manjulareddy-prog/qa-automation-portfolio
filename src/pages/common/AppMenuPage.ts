import { Page } from '@playwright/test';
import { AppMenuLocators } from '../../locators/common/appMenu.locators';
import { BasePage } from './BasePage';

export class AppMenuPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openSidebar(): Promise<void> {
    await this.page.locator(AppMenuLocators.openMenu).click();
  }

  async logout(): Promise<void> {
    await this.openSidebar();
    await this.page.locator(AppMenuLocators.logout).click();
  }

  async resetAppState(): Promise<void> {
    await this.openSidebar();
    await this.page.locator(AppMenuLocators.resetApp).click();
  }
}
