import { test, expect } from '@playwright/test';
import { getApiBaseUrl } from '../../src/utils/env';

test.describe('API — JSONPlaceholder', () => {
  const baseURL = getApiBaseUrl();

  test('GET /todos/1 returns expected contract', async ({ request }) => {
    const response = await request.get(`${baseURL}/todos/1`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toMatchObject({
      userId: 1,
      id: 1,
      completed: expect.any(Boolean),
    });
    expect(typeof body.title).toBe('string');
  });

  test('GET /todos returns a non-empty list', async ({ request }) => {
    const response = await request.get(`${baseURL}/todos`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('POST /posts creates a resource', async ({ request }) => {
    const response = await request.post(`${baseURL}/posts`, {
      data: {
        title: 'portfolio sample',
        body: 'created via Playwright request API',
        userId: 1,
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe('portfolio sample');
    expect(body.id).toBeTruthy();
  });
});
