/**
 * Base Page Object - Contains reusable methods for all pages
 */

export default class BasePage {
    /**
     * Wait for element to be displayed
     */
    async waitForDisplayed(selector: string, timeout: number = 10000): Promise<void> {
        const element = $(selector);
        await element.waitForDisplayed({
            timeout: timeout,
            timeoutMsg: `Element "${selector}" not displayed after ${timeout}ms`
        });
    }

    /**
     * Type text into input field with clear first
     */
    async setValue(selector: string, value: string): Promise<void> {
        const element = $(selector);
        await element.clearValue();
        await element.setValue(value);
    }

    /**
     * Click element after waiting for it
     */
    async click(selector: string): Promise<void> {
        const element = $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
    }

    /**
     * Get text from element
     */
    async getText(selector: string): Promise<string> {
        const element = $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        return element.getText();
    }

    /**
     * Check if element is enabled
     */
    async isEnabled(selector: string): Promise<boolean> {
        const element = $(selector);
        return element.isEnabled();
    }

    /**
     * Check if element is displayed
     */
    async isDisplayed(selector: string): Promise<boolean> {
        try {
            const element = $(selector);
            return await element.isDisplayed();
        } catch {
            return false;
        }
    }

    /**
     * Take screenshot with timestamp
     */
    async takeScreenshot(name: string): Promise<void> {
        const timestamp = Date.now();
        await browser.saveScreenshot(`./screenshots/${name}-${timestamp}.png`);
    }
}