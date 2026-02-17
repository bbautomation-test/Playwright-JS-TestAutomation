//Complete sign-in action method that handles all form inputs
const { test, expect } = require('@playwright/test');
async function completeSignIn(page, options = {}) {
  // Default values
  const {
    username = 'rahulshettyacademy',
    password = 'Learning@830$3mK2',
    userType = 'admin',
    role = 'stud',
    acceptTerms = true
  } = options;

  // Locators
  const usernameInput = page.locator("#username");
  const passwordInput = page.locator("#password");
  const adminRadio = page.locator("input[type='radio'][value='admin']");
  const userRadio = page.locator("input[type='radio'][value='user']");
  const roleDropdown = page.locator("select.form-control");
  const termsCheckbox = page.locator("#terms");
  const signInBtn = page.locator("#signInBtn");

  // Fill username
  await usernameInput.fill(username);

  // Fill password
  await passwordInput.fill(password);

  // Select user type (Admin or User)
  if (userType.toLowerCase() === 'admin') {
    await adminRadio.check();
  } else if (userType.toLowerCase() === 'user') {
    await userRadio.check();
    // Handle the popup that appears when User is selected
    const okayBtn = page.locator("#okayBtn");
    await okayBtn.click();
  }

  // Select role from dropdown
  await roleDropdown.selectOption(role);

  // Accept terms and conditions
  if (acceptTerms) {
    await termsCheckbox.check();
  }

  // Click sign in button
  await signInBtn.click();
}

// Example usage in a test:
test('Complete sign-in with all form inputs', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
  // Sign in with default values
  await completeSignIn(page);
  
  // Wait for navigation after login
  await page.waitForLoadState('networkidle');
  
  // Add your assertions here
  await expect(page).toHaveURL(/.*shop/);
});

test('Sign in as User with Teacher role', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
  // Sign in with custom options
  await completeSignIn(page, {
    username: 'rahulshettyacademy',
    password: 'Learning@830$3mK2',
    userType: 'user',
    role: 'teach',
    acceptTerms: true
  });
  
  await page.waitForLoadState('networkidle');
});

test('Sign in as Consultant without accepting terms', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
  await completeSignIn(page, {
    userType: 'admin',
    role: 'consult',
    acceptTerms: false
  });
  
  // Verify sign-in button is disabled or form validation prevents submission
});