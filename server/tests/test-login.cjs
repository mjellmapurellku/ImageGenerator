const { Builder, By, until } = require('selenium-webdriver');
const config = require('./config.cjs');

(async function testLogin() {
    let driver;
    try {
        console.log('Creating driver...');
        driver = await config.createDriver();
        console.log('Driver created successfully');
        
        console.log(`Navigating to ${config.baseUrl}/login`);
        await driver.get(`${config.baseUrl}/login`);
        
        console.log('Waiting for page to load...');
        await driver.wait(until.elementLocated(By.css('input[placeholder="Email id"]')), config.timeouts.pageLoad);
        
        console.log('Filling login form...');
        await driver.findElement(By.css('input[placeholder="Email id"]')).sendKeys(config.testCredentials.email);
        await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys(config.testCredentials.password);
        
        console.log('Clicking login button...');
        const loginButton = await driver.findElement(By.css('button.bg-blue-600'));
        await loginButton.click();
        
        console.log('Waiting for dashboard redirection...');
        await driver.wait(until.urlIs(`${config.baseUrl}/`), config.timeouts.pageLoad);
        
        console.log("Login test passed successfully!");
    } catch (error) {
        console.error("Login test failed:", error.message);
        console.error("Stack trace:", error.stack);
        
        // Take screenshot on failure
        if (driver) {
            try {
                const screenshot = await driver.takeScreenshot();
                require('fs').writeFileSync('login-failure.png', screenshot, 'base64');
                console.log('Screenshot saved as login-failure.png');
            } catch (screenshotError) {
                console.error('Failed to take screenshot:', screenshotError.message);
            }
        }
        
        // Get current URL for debugging
        if (driver) {
            try {
                const currentUrl = await driver.getCurrentUrl();
                console.log('Current URL at failure:', currentUrl);
            } catch (urlError) {
                console.error('Failed to get current URL:', urlError.message);
            }
        }
        
        throw error;
    } finally {
        if (driver) {
            try {
                await driver.quit();
                console.log('Driver quit successfully');
            } catch (quitError) {
                console.error('Failed to quit driver:', quitError.message);
            }
        }
    }
})();