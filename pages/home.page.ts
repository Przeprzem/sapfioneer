import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    url = "/";

    logo = this.page.locator(`//*[@id='logo']/a`)
    headerBar = this.page.locator(`//*[@id='masthead']`)
    darkSectionSelector = `//*[@class='section dark']`

    contentArea_header = this.page.locator(this.darkSectionSelector + `//h1[text()='Rock-solid technology.']`)
    contentArea_paragraph = this.page.locator(this.darkSectionSelector + `//p[starts-with(text(), 'We empower banks')]`)
    contentArea_contactBtn = this.page.locator(this.darkSectionSelector + `//a[@href='/contact']`)

    constructor(page: Page) {
        super(page);
    }

    /**
     * 
     * @returns boolean value for the check if page was properly loaded with all expected elements visible
     */
    async isLoaded(): Promise<boolean> {
        await this.page.waitForLoadState('networkidle');

        const locators = [this.logo, this.headerBar, this.contentArea_header, this.contentArea_paragraph, this.contentArea_contactBtn];
        const areAllVisible = await Promise.all(locators.map(async locator => await locator.isVisible()));

        return areAllVisible.every(isVisible => isVisible);
    }

    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }
}