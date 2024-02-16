import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HeaderPage extends BasePage {
    url = "/";
    navBarSelector = `//*[@id='masthead']//a[@class='nav-top-link']`

    contactBtn = this.page.locator(`//*[@id='masthead']//a[@href='/contact/']`)

    logo = this.page.locator(`//*[@id='logo']/a`)

    bankingNavBar = this.page.locator(this.navBarSelector + `[text()='Banking']`)
    InsuranceNavBar = this.page.locator(this.navBarSelector + `[text()='Insurance']`)
    financeAndEsgNavBar = this.page.locator(this.navBarSelector + `[text()='Finance & ESG']`)
    servicesNavBar = this.page.locator(this.navBarSelector + `[text()='Services']`)
    partnersNavBar = this.page.locator(this.navBarSelector + `[text()='Partners']`)
    companyNavBar = this.page.locator(this.navBarSelector + `[text()='Company']`)
    resourcesNavBar = this.page.locator(this.navBarSelector + `[text()='Resources']`)

    //#region navBarDropdownOptions
    finance_esgKpiEngine = this.page.locator(`//*[@class='sub-menu nav-dropdown']//a[contains(@href,'https://www.sapfioneer.com/finance-esg/esg-kpi-engine/')]`)
    //#endregion

    languageNavBar = this.page.locator(`//*[@id='masthead']//li[contains(@class,'wpml-ls-current-language')]//a[@class='nav-top-link']`)

    constructor(page: Page) {
        super(page);
    }

    async isLoaded(): Promise<boolean> {
        await this.page.waitForLoadState('networkidle');

        const locators = [this.logo, this.bankingNavBar, this.InsuranceNavBar, this.financeAndEsgNavBar, this.servicesNavBar, this.partnersNavBar, this.companyNavBar, this.resourcesNavBar, this.languageNavBar];
        const areAllVisible = await Promise.all(locators.map(async locator => await locator.isVisible()));

        return areAllVisible.every(isVisible => isVisible);
    }
}