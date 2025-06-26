const { Builder, By, until } = require('selenium-webdriver');
const config = require('./config.cjs');

(async function testImageGeneration() {
    let driver;
    try {
        driver = await config.createDriver();
        
        // Login first
        await driver.get(`${config.baseUrl}/login`);
        await driver.wait(until.elementLocated(By.name("email")), config.timeouts.pageLoad);
        
        await driver.findElement(By.name("email")).sendKeys(config.testCredentials.email);
        await driver.findElement(By.name("password")).sendKeys(config.testCredentials.password);
        await driver.findElement(By.xpath("//button[text()='Login']")).click();
        
        await driver.wait(until.urlIs(`${config.baseUrl}/`), config.timeouts.pageLoad);
        
        // Navigate to dashboard (root URL)
        await driver.get(`${config.baseUrl}/`);
        await driver.wait(until.elementLocated(By.css('input[placeholder="Enter your prompt here..."]')), config.timeouts.pageLoad);
        
        // Generate image
        const prompt = "A beautiful landscape";
        await driver.findElement(By.css('input[placeholder="Enter your prompt here..."]')).sendKeys(prompt);
        
        const generateButton = await driver.findElement(By.css('button.bg-blue-600'));
        await generateButton.click();
        
        // Wait for image generation
        await driver.wait(until.elementLocated(By.xpath("//img[contains(@src, 'generated-image')]")), config.timeouts.imageGeneration);
        
        // Verify image is visible
        const generatedImage = await driver.findElement(By.xpath("//img[contains(@src, 'generated-image')]"));
        if (await generatedImage.isDisplayed()) {
            console.log("Image generation test passed successfully!");
        } else {
            throw new Error("Generated image is not visible");
        }
    } catch (error) {
        console.error("Image generation test failed:", error.message);
        // Take screenshot on failure
        if (driver) {
            await driver.takeScreenshot().then(data => {
                require('fs').writeFileSync('image-generation-failure.png', data, 'base64');
            });
        }
        throw error;
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
})();