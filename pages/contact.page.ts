import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";


export class ContactPage extends BasePage {
    url = "/contact/";

    darkSectionSelector = `//*[@class='section dark']`
    //#region form fields
    formIframe = this.page.frameLocator(`//*[@class='hs-form-iframe']`)
    workEmailInput = this.formIframe.locator(`//input[@name='email']`)
    phoneInput = this.formIframe.locator(`//input[@name='phone']`)
    //#endregion

    //#region validation messages
    validationErrorMessages = this.formIframe.getByRole('alert');
    //#endregion

    //#region text content ENG
    header = this.page.locator(this.darkSectionSelector + `//h3[text()='Get in touch']`)
    contentArea_header = this.page.locator(this.darkSectionSelector + `//h1[text()='Contact us']`)
    contentArea_paragraph = this.page.locator(this.darkSectionSelector + `//p[starts-with(text(), "If you")]`)
    //#endregion

    constructor(page: Page) {
        super(page);
    }

    /**
     * 
     * @returns boolean value for the check if page was properly loaded with all expected elements visible
     */
    async isLoaded(): Promise<boolean> {
        await this.page.waitForLoadState('networkidle');

        const locators = [this.header, this.contentArea_paragraph, this.contentArea_header];
        const areAllVisible = await Promise.all(locators.map(async locator => await locator.isVisible()));

        return areAllVisible.every(isVisible => isVisible);
    }

    /**
     * 
     * @returns text content of all visible validation error messages on form as : string[]
     */
    async getValidationErrorMessages(): Promise<string[]> {
        return this.validationErrorMessages.allTextContents();
    }

    /**
     * 
     * @param expectedValidationMessage text expected to be present within visible validation error messages list
     * @returns boolean value of check if expected validation error message was found within the list of visible validation error messages
     */
    async checkIfValidationMessageWasFound(expectedValidationMessage): Promise<boolean> {
        let wasFound = (await this.getValidationErrorMessages()).includes(expectedValidationMessage);
        return wasFound;
    }
}