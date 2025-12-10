const { test, expect } = require('@playwright/test');
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
test('Page global fixture', async ({ page }) => {
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
    //section 18,19,20-assertions for selecting radio btns and checkbox
    await expect(userRadioBtn).toBeChecked();
    console.log(await userRadioBtn.isChecked());
    await termCheckBox.check();
    await expect(termCheckBox).toBeChecked();
    await termCheckBox.uncheck();
    await expect(termCheckBox).not.toBeChecked();
    expect(await termCheckBox.isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

});
//section 21-Handling child windows and tabs by switching broweser context.
test.only('Handling child windows and tabs', async ({ browser }) => 
    {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.goto("https://rahulshettyacademy.com/loginpagePractise/");
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