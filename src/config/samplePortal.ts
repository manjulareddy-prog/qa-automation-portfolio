export const SAMPLE_PORTAL_NAME = 'Sample Portal';

/** Catalog item slugs — map to host data-test attributes (see InventoryLocators). */
export const SamplePortalCatalog = {
  standardItem: 'sauce-labs-backpack',
  apparelItem: 'sauce-labs-bolt-t-shirt',
  accessoryItem: 'sauce-labs-onesie',
  secondItem: 'sauce-labs-bike-light',
} as const;

export type CatalogSlug = (typeof SamplePortalCatalog)[keyof typeof SamplePortalCatalog];
