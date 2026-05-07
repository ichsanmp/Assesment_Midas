// Validate JSON response does NOT contain "PIN"
function validateNoSensitiveData(response) {
    const jsonString = JSON.stringify(response);
    
    if (jsonString.toLowerCase().includes('pin')) {
        console.error('FAIL: Response contains PIN!');
        return false;
    }
    
    console.log('PASS: No PIN in response');
    return true;
}

// Usage
const response = await api.get('/account/details');
expect(validateNoSensitiveData(response)).toBe(true);