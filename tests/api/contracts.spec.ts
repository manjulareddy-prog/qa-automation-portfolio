import { test, expect } from '@playwright/test';
import { getApiBaseUrl } from '../../src/utils/env';

test.describe('API - Sample Portal public contracts', () => {
  const baseURL = getApiBaseUrl();

  test('GET /todos/1 returns expected contract', async ({ request }) => {
    // Arrange
    const endpoint = `${baseURL}/todos/1`;

    // Act
    const response = await request.get(endpoint);
    const body = await response.json();

    // Assert
    expect(response.ok()).toBeTruthy();
    expect(body).toMatchObject({
      userId: 1,
      id: 1,
      completed: expect.any(Boolean),
    });
    expect(typeof body.title).toBe('string');
  });

  test('GET /todos returns a non-empty list', async ({ request }) => {
    const response = await request.get(`${baseURL}/todos`);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('POST /posts creates a resource', async ({ request }) => {
    const response = await request.post(`${baseURL}/posts`, {
      data: {
        title: 'automation-contract-check',
        body: 'payload from Playwright request fixture',
        userId: 1,
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe('automation-contract-check');
    expect(body.id).toBeTruthy();
  });
});
