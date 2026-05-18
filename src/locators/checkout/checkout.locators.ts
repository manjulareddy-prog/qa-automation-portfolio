export const CartLocators = {
  lineItem: '.cart_item',
  checkout: '[data-test="checkout"]',
} as const;

export const CheckoutLocators = {
  firstName: '[data-test="firstName"]',
  lastName: '[data-test="lastName"]',
  postalCode: '[data-test="postalCode"]',
  continue: '[data-test="continue"]',
  finish: '[data-test="finish"]',
  error: '[data-test="error"]',
  completeHeader: '.complete-header',
} as const;
