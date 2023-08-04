// let webdriver = require('selenium-webdriver');

// let driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .setChromeOptions({
//         addArguments: '--disable-blink-features=AutomationControlled',
//         excludeSwitches: 'enable-logging'
//     }).build();
// driver.manage().setTimeouts({implicit: (10000)});


const chrome = require('selenium-webdriver/chrome')
const webdriver = require('selenium-webdriver')

let options = new chrome.Options()
options.addArguments(["--disable-blink-features=AutomationControlled", "start-maximized", "disable-infobars", "--disable-extensions"])
options.excludeSwitches('enable-logging')
let driver = new webdriver.Builder()
 .withCapabilities(webdriver.Capabilities.chrome())
 .setChromeOptions(options)
 .build()


class BasePage {
    constructor(){
        this.driver = driver;
    }
    async goToUrl(url){
        await driver.get(url);
    }
    async closeBrowser(){
        await driver.close()
    }
};

module.exports = BasePage;