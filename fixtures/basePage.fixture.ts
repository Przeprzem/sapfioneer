import { test as baseTest } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { HeaderPage } from "../pages/header.page";
import { EsgKpiEnginePage } from "../pages/finance-esg/esgKpiEngine.page";
import { ContactPage } from "../pages/contact.page";

const basePageObject = baseTest.extend<{
    homePage: HomePage;
    headerPage: HeaderPage;
    esgKpiEnpinePage: EsgKpiEnginePage;
    contactPage: ContactPage;
}>({
    homePage: async ({ page }, use) => use(new HomePage(page)),
    headerPage: async ({ page }, use) => use(new HeaderPage(page)),
    esgKpiEnpinePage: async ({ page }, use) => use(new EsgKpiEnginePage(page)),
    contactPage: async ({ page }, use) => use(new ContactPage(page)),
});

export default basePageObject;
export const expect = basePageObject.expect