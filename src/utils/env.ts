function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getBaseUrl(): string {
  return requireEnv('BASE_URL');
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

export function getProblemUser(): string {
  return process.env.PROBLEM_USER ?? 'problem_user';
}

export function getPerformanceUser(): string {
  return process.env.PERFORMANCE_USER ?? 'performance_glitch_user';
}

export function getApiBaseUrl(): string {
  return process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';
}

export { requireEnv };
