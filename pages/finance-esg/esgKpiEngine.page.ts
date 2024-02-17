import { Locator, Page } from "@playwright/test";
import { BasePage } from '../base.page';

export class EsgKpiEnginePage extends BasePage {
    url = "/finance-esg/esg-kpi-engine/";

    darkSectionSelector = `//*[@class='section dark']`

    //#region text content ENG
    contentArea_header = this.page.locator(this.darkSectionSelector + `//h1[text()='Master ESG KPI management']`)
    contentArea_paragraph = this.page.locator(this.darkSectionSelector + `//p[starts-with(text(), 'Financial services institutions')]`)
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

        const locators = [this.contentArea_paragraph, this.contentArea_header];
        const areAllVisible = await Promise.all(locators.map(async locator => await locator.isVisible()));

        return areAllVisible.every(isVisible => isVisible);
    }
}