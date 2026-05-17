function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getBaseUrl(): string {
  return process.env.BASE_URL ?? 'https://www.saucedemo.com';
}

export function getStandardUser(): string {
  return process.env.STANDARD_USER ?? 'standard_user';
}

export function getStandardPassword(): string {
  return process.env.STANDARD_PASSWORD ?? 'secret_sauce';
}

export function getLockedOutUser(): string {
  return process.env.LOCKED_OUT_USER ?? 'locked_out_user';
}

export function getApiBaseUrl(): string {
  return process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';
}

export { requireEnv };
