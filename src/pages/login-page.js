const { By } = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
let BasePage = require('../pages/base-page.js');
const WAITING_ELEMENT_TIMEOUT = 15000 //milis

class LoginPage extends BasePage {
    
    constructor(){
        super()
        this.usernameField = By.id("email");
        this.passwordField = By.id("password");
        this.loginBtn = By.xpath("//button[@type='submit']");
        this.loginFailedWarning = By.xpath("//div[contains(@class, 'message-error')]");

        this.warningFailedLoginWrongEmailPassword = "Email atau Password salah."
    }

    async goToPage(){
        await this.goToUrl("https://www.monotaro.id/customer/account/login/");
    }

    async webElementFactory(locator){
        return this.driver.findElement(locator);
    }

    async inputUsernameField(userName) {
        // this.webElementUsernameField = await this.driver.findElement(this.usernameField);
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.usernameField)), WAITING_ELEMENT_TIMEOUT);
        await this.driver.findElement(this.usernameField).sendKeys(userName);
    }

    async inputPasswordField(password) {
        // this.webElementPasswordField = await this.driver.findElement(this.passwordField);
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.passwordField)), WAITING_ELEMENT_TIMEOUT);
        await this.driver.findElement(this.passwordField).sendKeys(password);
    }

    async clickSubmitBtn(){
        // this.webElementSubmitBtn = await this.driver.findElement(this.loginBtn);
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.loginBtn)), WAITING_ELEMENT_TIMEOUT);
        await this.driver.findElement(this.loginBtn).click();
    }

    async warningFailedLoginHeader(){
        // this.webElementLoginHeader = await this.driver.findElement(this.loginFailedWarning);
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.loginFailedWarning)), WAITING_ELEMENT_TIMEOUT);
        return this.driver.findElement(this.loginFailedWarning);
    }
};

module.exports = new LoginPage();