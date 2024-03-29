import test, { expect } from '../fixtures/basePage.fixture'
import { contactValidationMessages } from '../enums/enums'

test.describe('main tests work', () => {
    test('Test 1 - Get in touch button is yellow', async ({ homePage, headerPage }) => {
        const yellowRGB = 'rgb(255, 212, 60)'

        await homePage.goTo();
        await homePage.isLoaded();

        const bckColor = await homePage.getBackgroundColor(headerPage.getInTouchBtn)

        expect(bckColor).toEqual(yellowRGB)
    });
    test('Test 2 - finance - ESG KPI Engine redirects to correct page', async ({ homePage, headerPage, esgKpiEnpinePage }) => {
        await homePage.goTo();
        await homePage.isLoaded();
        await headerPage.isLoaded();
        await headerPage.financeAndEsgNavBar.hover();
        await headerPage.finance_esgKpiEngine.click();

        expect(await esgKpiEnpinePage.confirmUrl()).toBeTruthy();
    });
    test('Test 3 - validation error is shown when invalid email is provided on contact form', async ({ homePage, contactPage, headerPage }) => {
        const invalidEmail = '342323';
        const expectedErrorMsg = contactValidationMessages.invalidEmail;

        await homePage.goTo();
        await headerPage.isLoaded();
        await homePage.isLoaded();
        await headerPage.getInTouchBtn.click();
        await contactPage.isLoaded();

        expect(await contactPage.confirmUrl()).toBeTruthy();

        await contactPage.workEmailInput.fill(invalidEmail);
        await contactPage.tabOut();

        expect(await contactPage.checkIfValidationMessageWasFound(expectedErrorMsg));
    });
});
