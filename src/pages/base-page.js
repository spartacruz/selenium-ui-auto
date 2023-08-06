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
const logging = require('selenium-webdriver/lib/logging')

function buildDriver(){
    let options = new chrome.Options()
    options.addArguments(["--disable-blink-features=AutomationControlled", "start-maximized", "disable-infobars", "--disable-extensions"])
    options.excludeSwitches('enable-logging')
    let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(options)
    .build()

    return driver;
}


class BasePage {
    constructor(){
        this.driver = buildDriver();

        //set logging to severe only
        this.logger = logging.getLogger('webdriver');
        this.logger.setLevel(logging.Level.INFO)
    }
    async goToUrl(url){
        await this.driver.get(url);
    }
    async closeBrowser(){
        await this.driver.close();
        await this.driver.quit();
    }

    async refreshSession(){
        // await this.driver.reloadSession();
        this.driver = await buildDriver();
    }
};

module.exports = BasePage;