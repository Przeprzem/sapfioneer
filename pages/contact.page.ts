import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";


export class ContactPage extends BasePage {
    url = "/contact/";

    darkSectionSelector = `//*[@class='section dark']`

    formIframe = this.page.frameLocator(`//*[@class='hs-form-iframe']`)
    workEmailInput = this.formIframe.locator(`//input[@name='email']`)
    phoneInput = this.formIframe.locator(`//input[@name='phone']`)

    workEmailErrorMsg = this.page.frameLocator(`//*[@class='hs-form-iframe']`).getByRole('alert');

    validationErrorMessages = this.page.frameLocator(`//*[@class='hs-form-iframe']`).getByRole('alert');


    header = this.page.locator(this.darkSectionSelector + `//h3[text()='Get in touch']`)
    contentArea_header = this.page.locator(this.darkSectionSelector + `//h1[text()='Contact us']`)
    contentArea_paragraph = this.page.locator(this.darkSectionSelector + `//p[starts-with(text(), "If you")]`)

    constructor(page: Page) {
        super(page);
    }

    async isLoaded(): Promise<boolean> {
        await this.page.waitForLoadState('networkidle');

        const locators = [this.header, this.contentArea_paragraph, this.contentArea_header];
        const areAllVisible = await Promise.all(locators.map(async locator => await locator.isVisible()));

        return areAllVisible.every(isVisible => isVisible);
    }

    async getValidationErrorMessages(): Promise<string[]> {
        return this.validationErrorMessages.allTextContents();
    }

    async checkIfValidationMessageWasFound(expectedValidationMessage): Promise<boolean> {
        let wasFound = (await this.getValidationErrorMessages()).includes(expectedValidationMessage);
        return wasFound;
    }
}