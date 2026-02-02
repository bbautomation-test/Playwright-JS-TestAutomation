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
  // console.log(await page.locator("[style*='block']").textContent());
  // await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  //section4 13-extract multiple webelements from one locator- traverse
  await userName.fill(""); //aditional feature of fill (To wipeout the existing data)
  await userName.fill("rahulshettyacademy");
  await passWord.fill("learning");
   const incorrectPasswordText = await page.locator("[style*='block']").textContent();
  console.log(incorrectPasswordText);
  const splitContent= incorrectPasswordText.split('"');
  const newPassword= splitContent[3];
   console.log(newPassword); 
  await passWord.fill("");
  await passWord.fill(newPassword);
  await signInCTA.click();
  console.log(await cardTiles.first().textContent()); // traverse from parent to child we need to give a space
  console.log(await cardTiles.nth(0).textContent()); //textContent() supports autowaiting
  console.log(await cardTiles.nth(1).textContent());
  console.log(await cardTiles.last().textContent());
  await page.waitForLoadState('networkidle'); // we can use this synchronization method or wait mechanism for those method which doesn't support autowaiting.
  await cardTiles.first().waitFor();// sometimes the above methods may not work so we can user this to wait for particular element to be loaded.
  console.log(await cardTiles.allTextContents()); // it will return a list even if it contains zero element an autowaiting doesn't work for it

});

test('Wait dynamically for service based application', async ({ page }) => {
    //Section4 15- techniques to wait dynamically for a new page.
    const userName = page.locator("#userEmail");
    const passWord = page.locator("#userPassword");
    const loginCTA = page.locator("#login");
    const cardTiles = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client");
    await userName.fill("anshika@gmail.com");
    await passWord.fill("Iamking@000");
    await loginCTA.click();
    await page.waitForLoadState('networkidle');// we can use this synchronization method or wait mechanism for those method which doesn't support autowaiting.
    await cardTiles.first().waitFor();//sometimes the above methods may not work so we can user this to wait for particular element to be loaded.
    console.log(await cardTiles.allTextContents());
});
//Section5 17- Handling static dropdown and radio btn
test('Page global fixtures', async ({ page }) => {
    const userName = page.locator("#username");
    const passWord = page.locator("[type='password']");
    const signInCTA = page.locator("#signInBtn");
    const cardTiles = page.locator(".card-body a");
    const dropdown = page.locator("select.form-control");
    const userRadioBtn = page.locator(".radiotextsty").last();
    const okayPopupBtn = page.locator("#okayBtn");
    const termCheckBox= page.locator("#terms");
    const documentLink= page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    await dropdown.selectOption("consult");
    //await page.pause();
    await userRadioBtn.click();
   // await page.pause(); // to pause the script
    await okayPopupBtn.click();
    await signInCTA.click();
    //section 18,19,20, 21-assertions for selecting radio btns and checkbox
    await expect(userRadioBtn).toBeChecked();
    console.log(await userRadioBtn.isChecked());
    await termCheckBox.check();
    await expect(termCheckBox).toBeChecked();
    await termCheckBox.uncheck();
    await expect(termCheckBox).not.toBeChecked();
    expect(await termCheckBox.isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

});
//section 23-Handling child windows and tabs by switching broweser context.
test.only('Handling child windows and tabs', async ({ browser }) => 
    {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const documentLink= page.locator("[href*='documents-request']");
      const[newpage]=await Promise.all([
        context.waitForEvent('page'), // listen for any new page event pending, rejected or fullfilled
        documentLink.click()
      ]); // new page is opened after clicking on document link
      const text= await newpage.locator(".red").textContent();
        console.log(text);
        const arraytext=text.split("@");
        const domain=arraytext[1].split(" ")[0];
        console.log(domain); 
    });