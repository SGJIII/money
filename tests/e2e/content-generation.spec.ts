import { test, expect } from '@playwright/test';

test.describe('Content Generation', () => {
  // Set up authenticated context for all tests
  test.beforeEach(async ({ page }) => {
    // Go to dashboard
    await page.goto('/dashboard');
    
    // Check if we're redirected to login
    const currentURL = page.url();
    if (currentURL.includes('sign-in')) {
      // Handle Clerk authentication
      await page.waitForSelector('input[name="identifier"]');
      await page.fill('input[name="identifier"]', process.env.TEST_USER_EMAIL || 'test@example.com');
      await page.click('button:has-text("Continue")');
      await page.waitForSelector('input[name="password"]');
      await page.fill('input[name="password"]', process.env.TEST_USER_PASSWORD || 'testpassword');
      await page.click('button:has-text("Continue")');
      
      // Wait for redirect back to dashboard and content to load
      await page.waitForURL('/dashboard');
      await page.waitForSelector('h2:has-text("Generate Content")');
    }

    // Mock OpenAI API response
    await page.route('/api/generate', async route => {
      const request = route.request();
      const body = JSON.parse(request.postData() || '{}');
      
      let content = '';
      if (body.contentType === 'Blog Article') {
        content = `This is a comprehensive blog article about ${body.topic}. `.repeat(50) +
          'Here are some key points to consider: '.repeat(20) +
          'In conclusion, we can see that '.repeat(10);
      } else {
        content = `This is a social media post about ${body.topic} with a ${body.tone} tone. #AI #Content #Trending`;
      }

      await route.fulfill({
        status: 200,
        body: JSON.stringify({ content })
      });
    });
  });

  test('should show content generation form', async ({ page }) => {
    // Wait for form elements to be visible
    await expect(page.locator('select:has-text("Social Media Post")')).toBeVisible();
    await expect(page.locator('input[placeholder="Enter your topic or keywords"]')).toBeVisible();
    await expect(page.locator('select:has-text("Professional")')).toBeVisible();
    await expect(page.locator('button:has-text("Generate Content")')).toBeVisible();
  });

  test('should generate social media post', async ({ page }) => {
    await page.selectOption('select:has-text("Social Media Post")', 'Social Media Post');
    await page.fill('input[placeholder="Enter your topic or keywords"]', 'AI Technology');
    await page.selectOption('select:has-text("Professional")', 'Professional');
    await page.click('button:has-text("Generate Content")');
    
    // Wait for generation to complete
    await expect(page.locator('textarea[placeholder="Your generated content will appear here..."]')).toBeVisible({ timeout: 60000 });
    const content = await page.locator('textarea[placeholder="Your generated content will appear here..."]').inputValue();
    expect(content).toBeTruthy();
    expect(content).toContain('AI Technology');
    expect(content).toContain('#AI');
  });

  test('should generate blog article', async ({ page }) => {
    await page.selectOption('select:has-text("Social Media Post")', 'Blog Article');
    await page.fill('input[placeholder="Enter your topic or keywords"]', 'Future of AI');
    await page.selectOption('select:has-text("Professional")', 'Professional');
    await page.click('button:has-text("Generate Content")');
    
    // Wait for generation to complete
    await expect(page.locator('textarea[placeholder="Your generated content will appear here..."]')).toBeVisible({ timeout: 60000 });
    const content = await page.locator('textarea[placeholder="Your generated content will appear here..."]').inputValue();
    expect(content).toBeTruthy();
    expect(content).toContain('Future of AI');
    expect(content.length).toBeGreaterThan(500); // Blog should be longer
  });

  test('should show error for missing topic', async ({ page }) => {
    await page.selectOption('select:has-text("Social Media Post")', 'Social Media Post');
    // Don't fill in topic
    
    // Button should be disabled
    await expect(page.locator('button:has-text("Generate Content")')).toBeDisabled();
  });

  test.skip('should enforce free tier limits', async ({ page }) => {
    // This test needs to be implemented after the credits system is finalized
    // Currently, the credits API behavior is inconsistent in the test environment
  });

  test('should copy generated content', async ({ page }) => {
    await page.selectOption('select:has-text("Social Media Post")', 'Social Media Post');
    await page.fill('input[placeholder="Enter your topic or keywords"]', 'Test Copy');
    await page.selectOption('select:has-text("Professional")', 'Professional');
    await page.click('button:has-text("Generate Content")');
    
    // Wait for generation to complete and content to appear
    await expect(page.locator('textarea[placeholder="Your generated content will appear here..."]')).toBeVisible({ timeout: 60000 });
    await expect(page.locator('textarea[placeholder="Your generated content will appear here..."]')).toHaveValue(/Test Copy/);
    
    // Mock clipboard API
    await page.evaluate(() => {
      window.alert = (msg) => document.body.setAttribute('data-alert', msg);
    });
    
    // Click copy and verify alert
    await page.click('button:has-text("Copy")');
    await expect(page.locator('[data-alert="Content copied to clipboard!"]')).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Override the default mock for this test
    await page.route('/api/generate', async route => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    await page.selectOption('select:has-text("Social Media Post")', 'Social Media Post');
    await page.fill('input[placeholder="Enter your topic or keywords"]', 'Error Test');
    await page.selectOption('select:has-text("Professional")', 'Professional');
    
    // Mock alert for error message
    await page.evaluate(() => {
      window.alert = (msg) => document.body.setAttribute('data-alert', msg);
    });
    
    await page.click('button:has-text("Generate Content")');
    await expect(page.locator('[data-alert="Failed to generate content. Please try again."]')).toBeVisible();
  });
});
