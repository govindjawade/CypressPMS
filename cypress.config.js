const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": 'https://pms.hplbusiness.com',
 
    pageLoadTimeout: 200000,
 
    experimentalOriginDependencies: true,
 
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
