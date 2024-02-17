import { Locator, Page, expect } from '@playwright/test';
import { cssProperties } from '../enums/enums';
export class BasePage {
    url = '';

    constructor(protected page: Page) {
    }

    /**
     * 
     * @param elementLocator locator of element to get it's css property value
     * @param propertyName css property name that it's value will be retreived
     * @returns css property value 
     */
    async getElementCSSProperty(elementLocator: Locator, propertyName: cssProperties): Promise<string> {
        let property = propertyName

        return elementLocator.evaluate((el, property) => {
            return window.getComputedStyle(el).getPropertyValue(property);
        }, property);
    }

    /**
     * 
     * @param elementLocator locator of element
     * @returns value of CSS property background-color
     */
    async getBackgroundColor(elementLocator: Locator): Promise<string> {
        return await this.getElementCSSProperty(elementLocator, cssProperties.backgroundColor)
    }

    /**
     * 
     * @returns boolean value indicating if current URL consists of expected part of URL
     */
    async confirmUrl(): Promise<Boolean> {
        const currentUrl = this.page.url();
        return currentUrl.includes(this.url)
    }

    /**
     * get's focus out of field while triggering field validations by simply pressing 'Tab' key
     */
    async tabOut() {
        await this.page.keyboard.press("Tab");
    }
}