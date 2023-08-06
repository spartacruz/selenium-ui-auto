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

        this.TEXT_SUDAH_PUNYA_AKUN = "Sudah Punya Akun?"
        this.TEXT_SILAHKAN_LOGIN_DISINI = "Silahkan login disini"
        this.TEXT_LABEL_EMAIL_FIELD = "Alamat Email (Login ID)"
        this.TEXT_LABEL_PASSWORD_FIELD = "Password"
        this.TEXT_LUPA_PASSWORD = "Lupa Password?"
        this.TEXT_PELANGGAN_BARU = "Pelanggan Baru?"
        this.TEXT_TITLE_KEUNTUNGAN_BISNIS = "Keuntungan menjadi Akun Bisnis"
        this.TEXT_KEUNTUNGAN_BISNIS_1 = "Diskon 10% Untuk Pembelanjaan Pertama"
        this.TEXT_KEUNTUNGAN_BISNIS_2 = "Pembayaran Tempo/TOP (Term of Payment)"
        this.TEXT_KEUNTUNGAN_BISNIS_3 = "Penerbitan Faktur Pajak"
        this.TEXT_KEUNTUNGAN_BISNIS_4 = "Lihat keuntungan lainnya"
        this.TEXT_TITLE_GRATIS_ONGKIR = "PROMO GRATIS ONGKIR*"
        this.TEXT_GRATIS_ONGKIR_EXPLAIN = "ke Jabodetabek, seluruh wilayah Pulau Jawa, Bali & Sumatera*"
        this.TEXT_GRATIS_ONGKIR_SYARAT = "Lihat syarat & ketentuan di sini"
        this.TEXT_BANTUAN_CS = "Butuh bantuan? Hubungi CS kami"
        this.TEXT_CS_LAND_PHONE = "021-3110-6990"
        this.TEXT_CS_MOBILE_PHONE = "0855-7467-8400"
        this.TEXT_CS_EMAIL = "cs@monotaro.id"
        this.TEXT_CS_ORDER_WA = "Order via WA"
        this.TEXT_CS_OPERATIONAL_HOUR = "Jam Operasional CS: Senin - Jumat | 08.00 - 18.00 WIB"

        this.TEXT_FOOTER_TITLE = "Ingin mengetahui leih lanjut mengenai monotaro.id?"
        this.TEXT_FOOTER_TENTANG_KAMI = "Tentang Kami"
        this.TEXT_FOOTER_TESTIMONI = "Testimoni Pelanggan"
        this.TEXT_FOOTER_KARIR = "Karir"
        this.TEXT_FOOTER_REQUEST_KATALOG = "Request Katalog"
        this.TEXT_FOOTER_EFLYER = "e-Flyer"
        this.TEXT_FOOTER_COPYRIGHT = "Copyright © 2021 www.monotaro.id | All Rights Reserved"


        this.warningFailedLoginWrongEmailPassword = "Email atau Password salah."
        this.warningRequiredField = "Harus diisi."
    }

    async goToPage(){
        await this.goToUrl("https://www.monotaro.id/customer/account/login/");
    }

    async elementPageVariable(){
        const pageVariables = [
            this.TEXT_SUDAH_PUNYA_AKUN,
            this.TEXT_SILAHKAN_LOGIN_DISINI,
            this.TEXT_LABEL_EMAIL_FIELD,
            this.TEXT_LABEL_PASSWORD_FIELD,
            this.TEXT_LUPA_PASSWORD,
            this.TEXT_PELANGGAN_BARU,
            this.TEXT_TITLE_KEUNTUNGAN_BISNIS,
            this.TEXT_KEUNTUNGAN_BISNIS_1,
            this.TEXT_KEUNTUNGAN_BISNIS_2,
            this.TEXT_KEUNTUNGAN_BISNIS_3,
            this.TEXT_KEUNTUNGAN_BISNIS_4,
            this.TEXT_TITLE_GRATIS_ONGKIR,
            this.TEXT_GRATIS_ONGKIR_EXPLAIN,
            this.TEXT_GRATIS_ONGKIR_SYARAT,
            this.TEXT_BANTUAN_CS,
            this.TEXT_CS_LAND_PHONE,
            this.TEXT_CS_MOBILE_PHONE,
            this.TEXT_CS_EMAIL,
            this.TEXT_CS_ORDER_WA,
            this.TEXT_CS_OPERATIONAL_HOUR,
            this.TEXT_FOOTER_TITLE,
            this.TEXT_FOOTER_TENTANG_KAMI,
            this.TEXT_FOOTER_TESTIMONI,
            this.TEXT_FOOTER_KARIR,
            this.TEXT_FOOTER_REQUEST_KATALOG,
            this.TEXT_FOOTER_EFLYER,
            this.TEXT_FOOTER_COPYRIGHT,
        ]
        return pageVariables;
    }

    async isTextShowOnPage(textString){
        // var result = await this.validateElementLocatedAndVisible(By.xpath(`//*[contains(normalize-space(text()),'${textString}')]`));
        // var result = await this.validateElementLocatedAndVisible(By.xpath(`(//*[contains(normalize-space(),'${textString}')])[last()]`));
        var result = await this.validateElementLocatedAndVisible(By.xpath(`//*[contains(normalize-space(),'${textString}')]`));
        if (result != true) {
            return result;
        } else {
            return true;
        }
    }

    async webElementFactory(locator){
        await this.validateElementLocatedAndVisible(locator);
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
            return true
        } catch(err){
            console.log(err)
            return err
        }
    }
};

module.exports = new LoginPage();