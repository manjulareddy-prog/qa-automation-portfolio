/**
 * Sample Portal — login screen locators (data-test first).
 * Kept separate from page classes so selectors are easy to review in interviews.
 */
export const LoginLocators = {
  username: '[data-test="username"]',
  password: '[data-test="password"]',
  submit: '[data-test="login-button"]',
  error: '[data-test="error"]',
} as const;
