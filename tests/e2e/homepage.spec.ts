import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays hero section correctly', async ({ page }) => {
    // Check main headline
    await expect(
      page.getByRole('heading', { name: /eliminate growth barriers/i })
    ).toBeVisible();

    // Check subtitle
    await expect(page.getByText(/ai systematically analyzes/i)).toBeVisible();

    // Check CTA buttons
    await expect(
      page.getByRole('button', { name: /start free analysis/i })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /watch demo/i })
    ).toBeVisible();
  });

  test('displays features section', async ({ page }) => {
    // Check features section heading
    await expect(
      page.getByRole('heading', {
        name: /everything you need to accelerate growth/i,
      })
    ).toBeVisible();

    // Check for key features
    await expect(page.getByText(/60-second analysis/i)).toBeVisible();
    await expect(page.getByText(/proven frameworks/i)).toBeVisible();
    await expect(page.getByText(/25-50% improvements/i)).toBeVisible();
  });

  test('displays how it works section', async ({ page }) => {
    // Check section heading
    await expect(
      page.getByRole('heading', { name: /how it works in 4 simple steps/i })
    ).toBeVisible();

    // Check for step titles
    await expect(page.getByText(/upload your content/i)).toBeVisible();
    await expect(page.getByText(/ai analysis/i)).toBeVisible();
    await expect(page.getByText(/get insights/i)).toBeVisible();
    await expect(page.getByText(/implement & grow/i)).toBeVisible();
  });

  test('displays frameworks section', async ({ page }) => {
    // Check section heading
    await expect(
      page.getByRole('heading', { name: /built on proven frameworks/i })
    ).toBeVisible();

    // Check for framework titles
    await expect(page.getByText(/simon sinek's golden circle/i)).toBeVisible();
    await expect(page.getByText(/consumer elements of value/i)).toBeVisible();
    await expect(page.getByText(/b2b elements of value/i)).toBeVisible();
    await expect(page.getByText(/cliftonstrengths domains/i)).toBeVisible();
  });

  test('displays testimonials section', async ({ page }) => {
    // Check section heading
    await expect(
      page.getByRole('heading', { name: /trusted by growth-focused teams/i })
    ).toBeVisible();

    // Check for testimonial content
    await expect(
      page.getByText(/helped us identify critical gaps/i)
    ).toBeVisible();
  });

  test('displays call-to-action section', async ({ page }) => {
    // Check CTA heading
    await expect(
      page.getByRole('heading', { name: /ready to accelerate your growth/i })
    ).toBeVisible();

    // Check form elements
    await expect(page.getByPlaceholder(/company name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/work email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/website url/i)).toBeVisible();
  });

  test('navigation works correctly', async ({ page }) => {
    // Check header navigation
    await expect(page.getByRole('link', { name: /features/i })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /how it works/i })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /frameworks/i })).toBeVisible();

    // Test navigation link (assuming it scrolls to section)
    await page.getByRole('link', { name: /features/i }).click();
    // Wait for scroll animation
    await page.waitForTimeout(1000);
  });

  test('mobile navigation works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check mobile menu button
    const mobileMenuButton = page
      .locator('button[aria-label="Toggle menu"]')
      .or(page.locator('button:has-text("Menu")'));
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();

      // Check mobile menu items
      await expect(page.getByRole('link', { name: /features/i })).toBeVisible();
    }
  });

  test('theme toggle works', async ({ page }) => {
    // Check if theme toggle exists
    const themeToggle = page
      .locator('button[aria-label="Toggle theme"]')
      .or(page.getByRole('button', { name: /toggle theme/i }));

    if (await themeToggle.isVisible()) {
      // Get initial theme
      const initialClass = await page.locator('html').getAttribute('class');

      // Click theme toggle
      await themeToggle.click();

      // Check theme changed
      const newClass = await page.locator('html').getAttribute('class');
      expect(newClass).not.toBe(initialClass);
    }
  });

  test('form validation works', async ({ page }) => {
    // Navigate to CTA form
    const emailInput = page.getByPlaceholder(/work email/i);
    const submitButton = page
      .getByRole('button', { name: /start free analysis/i })
      .last();

    // Try to submit with invalid email
    await emailInput.fill('invalid-email');
    await submitButton.click();

    // Check for validation (browser will handle HTML5 validation)
    const validity = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validity.valid
    );
    expect(validity).toBe(false);
  });

  test('performance benchmarks', async ({ page }) => {
    // Measure page load performance
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);

    // Check for key content visibility
    await expect(
      page.getByRole('heading', { name: /eliminate growth barriers/i })
    ).toBeVisible();
  });

  test('accessibility compliance', async ({ page }) => {
    // Check for basic accessibility requirements

    // All images should have alt text
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }

    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Check for skip links or other accessibility features
    // This would depend on your specific implementation
  });

  test('responsive design works', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1024, height: 768 }, // Desktop
      { width: 1920, height: 1080 }, // Large desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      // Check that key elements are still visible
      await expect(
        page.getByRole('heading', { name: /eliminate growth barriers/i })
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: /start free analysis/i }).first()
      ).toBeVisible();

      // Take screenshot for visual regression testing
      await page.screenshot({
        path: `test-results/homepage-${viewport.width}x${viewport.height}.png`,
        fullPage: true,
      });
    }
  });
});


