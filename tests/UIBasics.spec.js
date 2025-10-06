const { test, expect } = require('@playwright/test');
test('Browser global fixture', async function ({ browser }) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
});

test.only('Page global fixture', async ({ page }) => {
  const userName = page.locator("#username");
  const passWord = page.locator("[type='password']");
  const signInCTA = page.locator("#signInBtn");
  const cardTiles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //Assertions
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  //section4 11-Locator 
  await userName.fill("rahulshetty");
  await passWord.fill("Learning");
  await signInCTA.click();

  //section4 12 -extracting text fro brwoser
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  //section4 13-extract multiple webelements from one locator- traverse
  await userName.fill(""); //aditional feature of fill (To wipeout the existing data)
  await userName.fill("rahulshettyacademy");
  await passWord.fill("learning");
  await signInCTA.click();
  console.log(await cardTiles.first().textContent()); // traverse from parent to child we need to give a space
  console.log(await cardTiles.nth(0).textContent()); //textContent() supports autowaiting
  console.log(await cardTiles.nth(1).textContent());
  console.log(await cardTiles.last().textContent());
  await page.waitForLoadState('networkidle'); // we can use this synchronization method or wait mechanism for those method which doesn't support autowaiting.
  await cardTiles.first().waitFor();// sometimes the above methods may not work so we can user this to wait for particular element to be loaded.
  console.log(await cardTiles.allTextContents()); // it will return a list even if it contains zero element an autowaiting doesn't work for it

});