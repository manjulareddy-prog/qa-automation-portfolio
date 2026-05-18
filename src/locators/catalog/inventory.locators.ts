export const InventoryLocators = {
  list: '.inventory_list',
  sortDropdown: '[data-test="product-sort-container"]',
  itemName: '[data-test="inventory-item-name"]',
  cartLink: '.shopping_cart_link',
  cartBadge: '.shopping_cart_badge',
  addToCart: (slug: string) => `[data-test="add-to-cart-${slug}"]`,
  itemTitleLink: (slug: string) => `[data-test="item-${slug}-title-link"]`,
} as const;
