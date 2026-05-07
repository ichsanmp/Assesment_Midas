-- Scenario: Verify account status before automation flow
-- Expected Result: Retrieve account_number and balance for active user

-- Step 1: Check data exists
SELECT COUNT(*) AS row_count
FROM accounts 
WHERE user_id = 101 
  AND status = 'ACTIVE';

-- Step 2: Retrieve account details
SELECT account_number, balance 
FROM accounts 
WHERE user_id = 101 
  AND status = 'ACTIVE';