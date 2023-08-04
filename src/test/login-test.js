const loginPage = require('../pages/login-page.js');
const expect = require('chai').expect;
const assert = require('chai').assert;


describe('Login Page Test', function() {
    beforeEach(async function() {

    });

    afterEach(async function() {
        await loginPage.closeBrowser()
        sleep(3)
    });

    it('LO_2 - (+) Open Login page', async function() {
        await loginPage.goToPage();
    });

    it('LO_3 - (+) Login with valid email and valid password', async function() {
        await loginPage.goToPage();
        await loginPage.inputUsernameField("monotaroid@yopmail.com");
        await loginPage.inputPasswordField("Monotaroid1!");
        await loginPage.clickSubmitBtn();
        sleep(5);
    });

    it('LO_4 - (-) Login with invalid email and valid password', async function() {
        await loginPage.goToPage();
        await loginPage.inputUsernameField("xyz@yopmail.com");
        await loginPage.inputPasswordField("Monotaroid1!");
        await loginPage.clickSubmitBtn()
        warningLoginHeaderText = await loginPage.warningFailedLoginHeader();
        warningLoginHeaderText = await warningLoginHeaderText.getText();
        expect(warningLoginHeaderText).equal(loginPage.warningFailedLoginWrongEmailPassword);
        sleep(5);
    });

    it('LO_5 - (-) Login with valid email and invalid password', async function() {
        await loginPage.goToPage();
        await loginPage.inputUsernameField("monotaroid@yopmail.com");
        await loginPage.inputPasswordField("asdasdadadasd");
        await loginPage.clickSubmitBtn()
        warningLoginHeaderText = await loginPage.warningFailedLoginHeader();
        warningLoginHeaderText = await warningLoginHeaderText.getText()
        expect(warningLoginHeaderText).equal(loginPage.warningFailedLoginWrongEmailPassword);
        sleep(5)
    });

    it('LO_6 - (-) Login with invalid email and invalid password', async function() {
        await loginPage.goToPage();
        await loginPage.inputUsernameField("xyz@yopmail.com");
        await loginPage.inputPasswordField("asdasdadadasd");
        await loginPage.clickSubmitBtn();
        warningLoginHeaderText = await loginPage.warningFailedLoginHeader();
        warningLoginHeaderText = await warningLoginHeaderText.getText()
        expect(warningLoginHeaderText).equal(loginPage.warningFailedLoginWrongEmailPassword);
        sleep(5)
    });

    function sleep(second) {
        return new Promise(resolve => setTimeout(resolve, second*1000));
    }
});