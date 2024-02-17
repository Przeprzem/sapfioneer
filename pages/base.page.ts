import { Locator, Page, expect } from '@playwright/test';
import { cssProperties } from '../enums/enums';
export class BasePage {
    url = '';

    constructor(protected page: Page) {
    }

    async getElementCSSProperty(elementLocator: Locator, propertyName: cssProperties): Promise<string> {
        let property = propertyName

        return elementLocator.evaluate((el, property) => {
            return window.getComputedStyle(el).getPropertyValue(property);
        }, property);
    }

    async getBackgroundColor(elementLocator: Locator): Promise<string> {
        return await this.getElementCSSProperty(elementLocator, cssProperties.backgroundColor)
    }

    async confirmUrl(): Promise<Boolean> {
        const currentUrl = this.page.url();
        return currentUrl.includes(this.url)
    }

    async castLocatorToSelector(elementLocator): Promise<string> {
        let selector: string;
        selector = elementLocator.toString().slice(8);
        return selector;
    }

    async tabOut() {
        await this.page.keyboard.press("Tab");
    }
}