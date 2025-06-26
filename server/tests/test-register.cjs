const { Builder, By, until } = require('selenium-webdriver');
const config = require('./config.cjs');

(async function testRegister() {
    let driver;
    try {
        driver = await config.createDriver();
        
        // Navigate to register page
        await driver.get(`${config.baseUrl}/register`);
        
        // Wait for page to load
        await driver.wait(until.elementLocated(By.css('input[placeholder="Full Name"]')), config.timeouts.pageLoad);
        
        // Fill registration form
        await driver.findElement(By.css('input[placeholder="Full Name"]')).sendKeys(config.testCredentials.name);
        await driver.findElement(By.css('input[placeholder="Email id"]')).sendKeys(config.testCredentials.email);
        await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys(config.testCredentials.password);
        
        // Click create account button
        const createAccountButton = await driver.findElement(By.css('button.bg-blue-600'));
        await createAccountButton.click();
        
        // Wait for dashboard redirection
        await driver.wait(until.urlContains("/dashboard"), config.timeouts.pageLoad);
        
        console.log("Registration test passed successfully!");
    } catch (error) {
        console.error("Registration test failed:", error.message);
        // Take screenshot on failure
        if (driver) {
            await driver.takeScreenshot().then(data => {
                require('fs').writeFileSync('register-failure.png', data, 'base64');
            });
        }
        throw error;
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
})();