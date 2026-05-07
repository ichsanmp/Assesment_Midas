# Tool Choice & Flaky Test Strategy

## Tool Choice: WebdriverIO + Appium
- Cross-platform mobile automation (Android & iOS)
- Native TypeScript support
- Built-in retry mechanisms
- Large community & documentation
- Mocha framework for BDD reporting

## Flaky Test Strategy (Financial Environment)

1. Retry with limits
   - Max 2 retries for network/timeout failures
   - NO retry for assertion failures (real bugs must be caught)

2. Root cause analysis
   - Screenshot on every failure (configured in wdio.conf.ts)
   - Console logs at each step
   - Tag flaky tests immediately for review

3. Isolation
   - Move flaky tests to quarantine suite
   - Fix within 24 hours (SLA for financial apps)

4. Prevention
   - Proper wait strategies (waitForDisplayed, not hardcoded sleep)
   - Independent test data per run
   - Clean app state before each test (noReset: false for critical tests)