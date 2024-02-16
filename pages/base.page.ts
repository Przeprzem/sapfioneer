import { Locator, Page, expect } from '@playwright/test';
export class BasePage {
    url = '';
    constructor(protected page: Page) {
    }
    async getElementCSSProperty(elementLocator: Locator, propertyName: string) {
        let property = propertyName
        return elementLocator.evaluate((el, property) => {
            return window.getComputedStyle(el).getPropertyValue(property);
        }, property);
    }

    async getBackgroundColor(elementLocator: Locator): Promise<string> {
        return await this.getElementCSSProperty(elementLocator, 'background-color')
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
}