import { test, expect } from '@playwright/test';

test.describe('Critical User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Set up authentication
    await page.goto('/sign-in');
    await page.waitForLoadState('networkidle');
    
    // Set auth cookie
    await page.evaluate(() => {
      localStorage.setItem('__clerk_client_jwt', process.env.TEST_AUTH_TOKEN || 'test_token');
    });
  });

  test('should generate content and upgrade to pro', async ({ page }) => {
    // 1. Go to dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // 2. Generate content
    await page.fill('input[placeholder="Enter your topic or keywords"]', 'Test Topic');
    await page.click('button:has-text("Generate")');
    await expect(page.locator('textarea')).toBeVisible({ timeout: 30000 });

    // 3. Upgrade to pro
    await page.click('text=Upgrade');
    await page.waitForLoadState('networkidle');
    await page.click('button:has-text("Get Started")');
    
    // 4. Fill payment form
    const stripeFrame = page.frameLocator('iframe[name*="stripe-elements"]').first();
    await stripeFrame.locator('[placeholder*="card number"]').fill('4242424242424242');
    await stripeFrame.locator('[placeholder*="MM / YY"]').fill('1234');
    await stripeFrame.locator('[placeholder*="CVC"]').fill('123');
    await page.click('button:has-text("Subscribe")');

    // 5. Verify pro features
    await page.waitForURL('/dashboard?success=true');
    await expect(page.locator('text=Pro Plan')).toBeVisible();
  });
}); 