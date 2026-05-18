import { chromium, type FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const authFile = path.join(__dirname, '.auth', 'shopper.json');

async function globalSetup(_config: FullConfig): Promise<void> {
  const baseURL = process.env.BASE_URL;
  if (!baseURL) {
    throw new Error('BASE_URL must be set before running tests (see .env.example).');
  }

  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(baseURL);
  await page.locator('[data-test="username"]').fill(process.env.STANDARD_USER ?? 'standard_user');
  await page.locator('[data-test="password"]').fill(process.env.STANDARD_PASSWORD ?? 'secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL(/inventory/);

  await context.storageState({ path: authFile });
  await browser.close();
}

export default globalSetup;
