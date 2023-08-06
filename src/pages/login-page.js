const { By } = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
let BasePage = require('../pages/base-page.js');
const WAITING_ELEMENT_TIMEOUT = 10000 //milis

class LoginPage extends BasePage {
    
    constructor(){
        super()
        this.usernameField = By.id("email");
        this.passwordField = By.id("password");
        this.loginBtn = By.xpath("//button[@type='submit']");
        this.loginFailedWarning = By.className("message-error error message");
        this.emailRequiredWarning = By.id("email-error");
        this.passwordRequiredWarning = By.id("password-error");

        this.warningFailedLoginWrongEmailPassword = "Email atau Password salah."
        this.warningRequiredField = "Harus diisi."
    }

    async goToPage(){
        await this.goToUrl("https://www.monotaro.id/customer/account/login/");
    }

    async webElementFactory(locator){
        await this.validateElementLocatedAndVisible(this.locator);
        return this.driver.findElement(locator);
    }

    async inputUsernameField(userName) {
        await this.validateElementLocatedAndVisible(this.usernameField);
        await this.driver.findElement(this.usernameField).sendKeys(userName);
    }

    async inputPasswordField(password) {
        await this.validateElementLocatedAndVisible(this.passwordField);
        await this.driver.findElement(this.passwordField).sendKeys(password);
    }

    async clickSubmitBtn(){
        await this.validateElementLocatedAndVisible(this.loginBtn);
        await this.driver.findElement(this.loginBtn).click();
    }

    async warningFailedLoginHeaderElement(){
        await this.validateElementLocatedAndVisible(this.loginFailedWarning);
        return this.driver.findElement(this.loginFailedWarning);
    }

    async warningFailedFieldRequired(field){
        let locator = ''

        if (field == "email") {
            locator = this.emailRequiredWarning;
        }

        if (field == "password") {
            locator = this.passwordRequiredWarning;
        }

        if (field !== "email" && field !== "password") {
            throw "Must be email or password"
        }
        await this.validateElementLocatedAndVisible(locator)
        return this.driver.findElement(locator);
    }

    async validateElementLocatedAndVisible(locator){
        try {
            await this.driver.wait(until.elementLocated(locator), WAITING_ELEMENT_TIMEOUT);
            await this.driver.wait(until.elementIsVisible(this.driver.findElement(locator)), WAITING_ELEMENT_TIMEOUT);
        } catch(err){
            console.log(err)
        }
    }
};

module.exports = new LoginPage();