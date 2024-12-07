import { test, expect } from '@playwright/test';

test.describe('Complete User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Enable iframe debugging
    await page.route('**/*', route => {
      console.log(`Loading: ${route.request().url()}`);
      return route.continue();
    });
  });

  test('should complete signup, payment, and content generation flow', async ({ page }) => {
    // 1. Start from homepage and click signup
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('nav span.text-2xl.font-bold.text-indigo-600')).toBeVisible({ timeout: 30000 });
    
    // Click the "Start Free" button in the nav
    await page.evaluate(() => {
      const button = document.querySelector('nav a[href="/signup"]');
      if (button) {
        (button as HTMLElement).click();
      }
    });
    
    // Verify we're on the signup page
    await expect(page).toHaveURL(/.*signup/);
    await page.waitForLoadState('networkidle');

    // 2. Fill out signup form (using Clerk test credentials)
    // Wait for Clerk UI to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000); // Give Clerk more time to initialize
    
    // Wait for Clerk iframe and retry if not found
    let clerkFrame = null;
    for (let i = 0; i < 3; i++) {
      try {
        // Wait for Clerk script to load
        await page.waitForFunction(() => {
          return window.Clerk && window.Clerk.isReady() && document.querySelector('iframe[src*="clerk"]');
        }, { timeout: 30000 });
        
        // Find the iframe
        const frames = page.frames();
        clerkFrame = frames.find(frame => frame.url().includes('clerk'));
        if (clerkFrame) break;
      } catch (e) {
        console.log('Retrying to find Clerk iframe...', e);
        await page.reload();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
      }
    }
    
    if (!clerkFrame) {
      throw new Error('Could not find Clerk iframe after multiple attempts');
    }
    
    // Fill email
    await clerkFrame.waitForSelector('input[name="emailAddress"]', { timeout: 30000 });
    await clerkFrame.fill('input[name="emailAddress"]', process.env.TEST_USER_EMAIL || 'test@example.com');
    await clerkFrame.click('button:has-text("Continue")');
    
    // Fill password
    await clerkFrame.waitForSelector('input[name="password"]', { timeout: 30000 });
    await clerkFrame.fill('input[name="password"]', process.env.TEST_USER_PASSWORD || 'testpassword123');
    await clerkFrame.click('button:has-text("Continue")');

    // 3. Should redirect to dashboard after signup
    await page.waitForURL('/dashboard', { timeout: 30000 });
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h2.text-2xl.font-bold.text-gray-900', { hasText: 'Generate Content' })).toBeVisible({ timeout: 30000 });

    // 4. Test free tier content generation
    await page.selectOption('select.mt-1.block.w-full', 'Social Media Post');
    await page.fill('input[placeholder="Enter your topic or keywords"]', 'AI Technology');
    await page.selectOption('select.mt-1.block.w-full', 'Professional');
    await page.click('button:has-text("Generate Content")', { timeout: 30000 });
    
    // Verify content is generated
    await expect(page.locator('textarea[placeholder="Your generated content will appear here..."]')).toBeVisible({ timeout: 60000 });
    const content = await page.locator('textarea[placeholder="Your generated content will appear here..."]').inputValue();
    expect(content).toBeTruthy();

    // 5. Navigate to pricing
    await page.click('a[href="/#pricing"]', { timeout: 30000 });
    await page.waitForLoadState('networkidle');
    
    // Scroll to pricing section and wait for it to be visible
    await page.evaluate(() => {
      const element = document.querySelector('#pricing');
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    });
    await page.waitForTimeout(2000); // Wait for scroll and animations
    
    await page.waitForSelector('p.mt-2.text-4xl.font-bold', { hasText: 'Choose your plan', timeout: 30000 });

    // 6. Select Pro plan and initiate checkout
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const proButton = buttons.find(button => button.textContent?.includes('Get Started'));
      if (proButton) {
        (proButton as HTMLElement).click();
      }
    });

    // 7. Fill out Stripe payment form (using test card)
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000); // Give Stripe more time to initialize
    
    // Wait for Stripe iframe and retry if not found
    let stripeFrame = null;
    for (let i = 0; i < 3; i++) {
      try {
        // Wait for Stripe script to load
        await page.waitForFunction(() => {
          return window.Stripe && document.querySelector('iframe[name*="stripe-elements"]');
        }, { timeout: 30000 });
        
        // Find the iframe
        const frames = page.frames();
        stripeFrame = frames.find(frame => frame.url().includes('stripe'));
        if (stripeFrame) break;
      } catch (e) {
        console.log('Retrying to find Stripe iframe...', e);
        await page.reload();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
      }
    }
    
    if (!stripeFrame) {
      throw new Error('Could not find Stripe iframe after multiple attempts');
    }
    
    await stripeFrame.waitForSelector('[placeholder*="card number"]', { timeout: 30000 });
    await stripeFrame.fill('[placeholder*="card number"]', '4242424242424242');
    await stripeFrame.fill('[placeholder*="MM / YY"]', '1234');
    await stripeFrame.fill('[placeholder*="CVC"]', '123');
    await page.click('button:has-text("Subscribe")', { timeout: 30000 });

    // 8. Should redirect back to dashboard with pro features
    await page.waitForURL('/dashboard?success=true', { timeout: 30000 });
    await page.waitForLoadState('networkidle');
    await expect(page.locator('div.text-sm.text-gray-500', { hasText: 'Credits remaining: 100' })).toBeVisible({ timeout: 30000 });

    // 9. Test pro features
    // Generate multiple pieces of content
    for (let i = 0; i < 3; i++) {
      await page.selectOption('select.mt-1.block.w-full', 'Social Media Post');
      await page.fill('input[placeholder="Enter your topic or keywords"]', `Test Topic ${i}`);
      await page.click('button:has-text("Generate Content")', { timeout: 30000 });
      await expect(page.locator('textarea[placeholder="Your generated content will appear here..."]')).toBeVisible({ timeout: 60000 });
    }

    // 10. Test scheduling feature (Pro only)
    await page.click('button:has-text("Schedule Post")', { timeout: 30000 });
    await expect(page.locator('h3', { hasText: 'Schedule Content' })).toBeVisible({ timeout: 30000 });
    
    // 11. Test analytics (Pro only)
    await page.click('button:has-text("Analytics")', { timeout: 30000 });
    await page.click('a[href="/dashboard/analytics"]', { timeout: 30000 });
    await expect(page.locator('h2', { hasText: 'Content Analytics' })).toBeVisible({ timeout: 30000 });

    // 12. Logout
    await page.click('[aria-label="User menu"]', { timeout: 30000 });
    await page.click('button:has-text("Sign out")', { timeout: 30000 });
    await expect(page).toHaveURL('/');
  });

  test('should handle failed payment gracefully', async ({ page }) => {
    // Start checkout process
    await page.goto('/#pricing');
    await page.waitForLoadState('networkidle');
    
    // Scroll to pricing section and wait for it to be visible
    await page.evaluate(() => {
      const element = document.querySelector('#pricing');
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    });
    await page.waitForTimeout(2000); // Wait for scroll and animations
    
    await page.waitForSelector('p.mt-2.text-4xl.font-bold', { hasText: 'Choose your plan', timeout: 30000 });
    
    // Click the Pro plan button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const proButton = buttons.find(button => button.textContent?.includes('Get Started'));
      if (proButton) {
        (proButton as HTMLElement).click();
      }
    });

    // Use declined test card
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000); // Give Stripe more time to initialize
    
    // Wait for Stripe iframe and retry if not found
    let stripeFrame = null;
    for (let i = 0; i < 3; i++) {
      try {
        // Wait for Stripe script to load
        await page.waitForFunction(() => {
          return window.Stripe && document.querySelector('iframe[name*="stripe-elements"]');
        }, { timeout: 30000 });
        
        // Find the iframe
        const frames = page.frames();
        stripeFrame = frames.find(frame => frame.url().includes('stripe'));
        if (stripeFrame) break;
      } catch (e) {
        console.log('Retrying to find Stripe iframe...', e);
        await page.reload();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
      }
    }
    
    if (!stripeFrame) {
      throw new Error('Could not find Stripe iframe after multiple attempts');
    }
    
    await stripeFrame.waitForSelector('[placeholder*="card number"]', { timeout: 30000 });
    await stripeFrame.fill('[placeholder*="card number"]', '4000000000000002');
    await stripeFrame.fill('[placeholder*="MM / YY"]', '1234');
    await stripeFrame.fill('[placeholder*="CVC"]', '123');
    await page.click('button:has-text("Subscribe")', { timeout: 30000 });

    // Should show error message
    await expect(page.locator('text=Your card was declined')).toBeVisible({ timeout: 30000 });
    await expect(page).toHaveURL(/.*pricing/);
  });

  test('should handle cancellation flow', async ({ page }) => {
    // Login as pro user
    await page.goto('/sign-in');
    await page.waitForLoadState('networkidle');
    
    // Wait for Clerk UI to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000); // Give Clerk more time to initialize
    
    // Wait for Clerk iframe and retry if not found
    let clerkFrame = null;
    for (let i = 0; i < 3; i++) {
      try {
        // Wait for Clerk script to load
        await page.waitForFunction(() => {
          return window.Clerk && window.Clerk.isReady() && document.querySelector('iframe[src*="clerk"]');
        }, { timeout: 30000 });
        
        // Find the iframe
        const frames = page.frames();
        clerkFrame = frames.find(frame => frame.url().includes('clerk'));
        if (clerkFrame) break;
      } catch (e) {
        console.log('Retrying to find Clerk iframe...', e);
        await page.reload();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
      }
    }
    
    if (!clerkFrame) {
      throw new Error('Could not find Clerk iframe after multiple attempts');
    }
    
    // Fill email
    await clerkFrame.waitForSelector('input[name="identifier"]', { timeout: 30000 });
    await clerkFrame.fill('input[name="identifier"]', process.env.TEST_PRO_USER_EMAIL || 'pro@example.com');
    await clerkFrame.click('button:has-text("Continue")');
    
    // Fill password
    await clerkFrame.waitForSelector('input[name="password"]', { timeout: 30000 });
    await clerkFrame.fill('input[name="password"]', process.env.TEST_PRO_USER_PASSWORD || 'testpassword123');
    await clerkFrame.click('button:has-text("Continue")');

    // Navigate to billing settings
    await page.click('[aria-label="User menu"]', { timeout: 30000 });
    await page.click('a[href="/billing"]', { timeout: 30000 });

    // Cancel subscription
    await expect(page.locator('h2', { hasText: 'Subscription' })).toBeVisible({ timeout: 30000 });
    await page.click('button:has-text("Cancel")', { timeout: 30000 });
    await page.click('button:has-text("Confirm")', { timeout: 30000 });

    // Should show cancellation confirmation
    await expect(page.locator('text=Subscription cancelled')).toBeVisible({ timeout: 30000 });
    
    // Should revert to free tier at end of billing period
    await expect(page.locator('text=Your pro access ends on')).toBeVisible({ timeout: 30000 });
  });
}); 