import BasePage from './basepage';

/**
 * Login Page Object
 * @description Handles login screen interactions
 * 
 * Test Scenario Steps:
 * 1. Open Application (handled by capabilities)
 * 2. Input Username & Password
 * 3. Click Login
 */

class LoginPage extends BasePage {
    
    // Element Selectors

    private get usernameInput(): string {
        return '~username_input';
    }
    
    private get passwordInput(): string {
        return '~password_input';
    }
    
    private get loginButton(): string {
        return '~login_button';
    }

    // Page Actions


    /**
     * Enter username in the username field
     * @param username - User's username
     */

    async enterUsername(username: string): Promise<void> {
        console.log(`Input username: ${username}`);
        await this.setValue(this.usernameInput, username);
    }

    /**
     * Enter password in the password field
     * @param password - User's password
     */

    async enterPassword(password: string): Promise<void> {
        console.log('Input password: ********');
        await this.setValue(this.passwordInput, password);
    }

    /**
     * Click login button
     */

    async clickLoginButton(): Promise<void> {
        console.log('Clicking login button');
        await this.click(this.loginButton);
    }

    /**
     * Complete login flow
     * @param username - User credentials
     * @param password - User credentials
     */

    async login(username: string, password: string): Promise<void> {
        console.log('Performing login');
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Check if login button is enabled
     * @returns boolean
     * @description Used to detect bug: "Login button remains disabled after filling fields"
     */

    async isLoginButtonEnabled(): Promise<boolean> {
        const isEnabled = await this.isEnabled(this.loginButton);
        console.log(`Login button enabled: ${isEnabled}`);
        
        // Bug detection
        if (!isEnabled) {
            console.warn('BUG DETECTED: Login button is disabled after filling all fields!');
            console.warn('Expected: Button should be enabled');
            console.warn('Actual: Button remains disabled');
            await this.takeScreenshot('bug-login-button-disabled');
        }
        return isEnabled;
    }

    /**
     * Wait for login page to load
     */

    async waitForLoginPage(): Promise<void> {
        console.log('Waiting for login page');
        await this.waitForDisplayed(this.usernameInput);
        await this.waitForDisplayed(this.passwordInput);
        await this.waitForDisplayed(this.loginButton);
        console.log('Login page ready');
    }
}

export default new LoginPage();