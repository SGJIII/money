import { test, expect } from '@playwright/test';

test.describe('Route Testing', () => {
  const routes = [
    { path: '/', title: 'QuickWrite' },
    { path: '/sign-up', title: 'Sign Up' },
    { path: '/sign-in', title: 'Sign In' },
    { path: '/pricing', title: 'Pricing' },
    { path: '/dashboard', title: 'Dashboard' },
  ];

  // Test each route
  for (const route of routes) {
    test(`should load ${route.path} successfully`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      await expect(page).not.toHaveURL(/.*404.*/);
      
      // Check for common error indicators
      await expect(page.locator('text=404')).not.toBeVisible();
      await expect(page.locator('text=Error')).not.toBeVisible();
      await expect(page.locator('text=Not Found')).not.toBeVisible();
      
      // Verify page title or key content
      await expect(page.locator(`text=${route.title}`)).toBeVisible();
    });
  }

  test('should verify all navigation links work', async ({ page }) => {
    // Start from homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all links
    const links = await page.locator('a[href^="/"]').all();
    const hrefs = await Promise.all(links.map(link => link.getAttribute('href')));
    
    // Test each link
    for (const href of hrefs) {
      if (!href) continue;
      
      console.log(`Testing link: ${href}`);
      await page.goto(href);
      await page.waitForLoadState('networkidle');
      
      // Verify no 404
      await expect(page).not.toHaveURL(/.*404.*/);
      await expect(page.locator('text=404')).not.toBeVisible();
      await expect(page.locator('text=Error')).not.toBeVisible();
      await expect(page.locator('text=Not Found')).not.toBeVisible();
    }
  });

  test('should verify all button actions work', async ({ page }) => {
    // Start from homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test primary CTA buttons
    const ctaButtons = [
      { text: 'Start Free', expectedUrl: '/signup' },
      { text: 'Get Started', expectedUrl: '/signup' },
      { text: 'Sign In', expectedUrl: '/sign-in' },
    ];

    for (const button of ctaButtons) {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await page.click(`button:has-text("${button.text}"), a:has-text("${button.text}")`);
      await expect(page).toHaveURL(new RegExp(button.expectedUrl));
    }
  });

  test('should verify all API endpoints return valid responses', async ({ page }) => {
    const endpoints = [
      '/api/generate',
      '/api/create-checkout',
      '/api/webhook/stripe',
    ];

    for (const endpoint of endpoints) {
      const response = await page.request.get(endpoint);
      expect(response.status()).not.toBe(404);
      expect(response.status()).not.toBe(500);
    }
  });
}); 