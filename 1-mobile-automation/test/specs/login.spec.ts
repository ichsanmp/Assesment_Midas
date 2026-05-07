import LoginPage from '../pageobjects/login.page';
import DashboardPage from '../pageobjects/dashboard.page';

describe('Mobile Banking - Login & Balance', () => {
    it('should login with valid credentials and display balance', async () => {
        console.log('\nSTEP 1: Open Application');
        await LoginPage.waitForLoginPage();

        console.log('\nSTEP 2: Input Credentials');
        await LoginPage.enterUsername('testuser');
        await LoginPage.enterPassword('password123');
        console.log('Actual Result: Credentials entered successfully');
        
        console.log('\nCHECK: Login Button State');
        await LoginPage.isLoginButtonEnabled();
        
        console.log('\nSTEP 3: Click Login');
        await LoginPage.clickLoginButton();
        console.log('Actual Result: Login button clicked');
        
        console.log('\nSTEP 4: Verify Balance');
        await expect(DashboardPage.isBalanceDisplayed()).resolves.toBe(true);
    });
});