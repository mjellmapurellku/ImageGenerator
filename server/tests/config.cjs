const selenium = require('selenium-webdriver');
const { Builder, By, until } = selenium;
const { Options } = require('selenium-webdriver/chrome');

const config = {
    // Base URL for the application
    baseUrl: 'http://localhost:3000',
    
    // Test credentials (should be moved to environment variables in production)
    testCredentials: {
        email: process.env.TEST_EMAIL || 'testuser@gmail.com',
        password: process.env.TEST_PASSWORD || 'password123',
        name: 'Test User'
    },
    
    // WebDriver configuration
    createDriver: async () => {
        const options = new Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-gpu');
        options.addArguments('--window-size=1920,1080');
        
        const driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
            
        return driver;
    },
    
    // Wait timeouts in milliseconds
    timeouts: {
        pageLoad: 10000,
        element: 5000,
        imageGeneration: 30000
    }
};

module.exports = config;;
