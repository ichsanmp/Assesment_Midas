import BasePage from './basepage';

/**
 * Dashboard Page Object
 * @description Handles dashboard and balance verification
 * 
 * Test Scenario Step:
 * 4. Verify Balance element is visible
 */

class DashboardPage extends BasePage {

    // Element Selectors
    
    private get accountBalance(): string {
        return '~account_balance';
    }
    
    private get balanceAmount(): string {
        return '~balance_amount';
    }

    // Page Actions

    /**
     * Verify balance element is visible on dashboard (Step 4 from test scenario)
     * @returns boolean - true if balance is displayed
     */
    async isBalanceDisplayed(): Promise<boolean> {
        console.log('Verifying balance element');
        
        try {
            await this.waitForDisplayed(this.accountBalance, 15000);
            console.log('Balance element is visible on dashboard');
            return true;
        } catch (error) {
            console.error('Balance element NOT found!');
            await this.takeScreenshot('error-balance-not-displayed');
            return false;
        }
    }

    /**
     * Get the account balance text
     * @returns Balance amount as string
     */
    async getBalanceText(): Promise<string> {
        const balanceText = await this.getText(this.balanceAmount);
        console.log(`Balance: ${balanceText}`);
        return balanceText;
    }

    /**
     * Verify balance is not empty/zero
     * @returns boolean
     */
    async isBalanceNotEmpty(): Promise<boolean> {
        const balanceText = await this.getBalanceText();
        const isEmpty = !balanceText || balanceText === '0';
        if (isEmpty) {
            console.warn('Balance is empty or zero');
            return false;
        }
        console.log('Balance has value');
        return true;
    }
}

export default new DashboardPage();