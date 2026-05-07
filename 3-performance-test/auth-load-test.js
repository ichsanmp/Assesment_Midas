import http from 'k6/http';
import { check, sleep } from 'k6';

// Scenario: 200 concurrent users hitting /api/v1/auth/login
// Expected Result: Average response time < 1 second
// Expected Bug: Database deadlock when multiple requests access the same balance record simultaneously

export const options = {
    stages: [
        { duration: '30s', target: 50 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 200 },
        { duration: '1m', target: 200 },
        { duration: '30s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['avg<1000'],
    },
};

const BASE_URL = 'http://api.demobank.com/api/v1';
const payload = JSON.stringify({
    username: 'testuser',
    password: 'password123',
});

const params = {
    headers: { 'Content-Type': 'application/json' },
};

export default function () {
    // Test 1: Authentication Endpoint
    const loginRes = http.post(`${BASE_URL}/auth/login`, payload, params);
    const token = loginRes.json('token');

    check(loginRes, {
        'auth: status 200': (r) => r.status === 200,
        'auth: response < 1s': (r) => r.timings.duration < 1000,
    });

    // Test 2: Balance Endpoint (Deadlock Check)
    if (token) {
        const balanceRes = http.get(`${BASE_URL}/accounts/balance`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        check(balanceRes, {
            'balance: status 200': (r) => r.status === 200,
            'balance: no deadlock (not 500)': (r) => r.status !== 500,
        });
    }

    sleep(1);
}