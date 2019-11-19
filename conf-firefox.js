exports.config = {

    // setting to launch tests directly without selenium server
    directConnect: true,
    // address of running selenium server
    //   seleniumAddress: 'http://localhost:4444/wd/hub',

    // setting time outs
    getPageTimeOut: 200000,
    allScriptsTimeout: 5000000,

    // setting framework
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    // setting protractor to ignore uncaught exceptions to take care by protractor-cucumber-framework
    ignoreUncaughtExceptions: true,

    // configuration parameters
    params: {
        testEnv: 'test'
    },

    // browser to launch tests
       capabilities: {
           browserName: 'firefox',
           'shardTestFiles': true,
           'maxInstances': 3,
    },

  /**   capabilities: {
        // browserName: 'chrome',
        browserName: 'firefox'
  },**/


    /**  multiCapabilities: [{
          'browserName': 'firefox'
      },
       {
          'browserName': 'chrome',
          chromeOptions: {
              args: ['--disable-extensions',]
          }
      }],**/

    localSeleniumStandaloneOpts: {
        jvmArgs: ["-Dwebdriver.gecko.driver=node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.24.0.exe"]
    },

    // Specify Test Files
    //
    // Define which tests should execute
    specs: [
            //   'src/ui-specs/features/emailSignUpPositive.feature'
           //    'src/ui-specs/features/emailSignUpNegetive.feature'
          //    'src/ui-specs/features/googleSignUpPositive.feature',
         //     'src/ui-specs/features/twitterSignUpPositive.feature',

          'src/ui-specs/features/*.feature'
    ],

    //Define which tests should be excluded from execution.
    exclude: [
        // 'features/search.feature'
    ],

    // Set log level and enables colors for log output
    logLevel: 'verbose',
    coloredLogs: true,

    onPrepare: () => {

        browser.getCapabilities().then((c) => {
            browser.baseUrl = browser.params.baseUrl;
            browser.name = c.get('browserName');
            browser.signupUrl =  browser.params.signupUrl;
            browser.userEmail = browser.params.userEmail;
            browser.userPassword = browser.params.userPassword;
            browser.twitterMobile = "7983993915";
            browser.googleMobile ="9978077098";
            browser.ignoreSynchronization = true;
            browser.manage().timeouts().pageLoadTimeout(40000);
            browser.manage().timeouts().implicitlyWait(25000);
            //Reporter.createDirectory(jsonReports);
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
            var saveExpectedConditions = require('protractor-save-expected-conditions');
            protractor.ExpectedConditions.visibilityOf = saveExpectedConditions.saveVisibilityOf;
            protractor.ExpectedConditions.textToBePresentInElement = saveExpectedConditions.saveTextToBePresentInElement;
            browser.driver.manage().window().maximize();
            browser.get(browser.baseUrl);
            require('./src/ui-specs/utils/waitReady')
        })
    },

   plugins: [{
		package: 'protractor-multiple-cucumber-html-reporter-plugin',
		options:{
			jsonDir: './report',
			jsonOutputPath:'./report',
		//	reportPath:'./',
	        	automaticallyGenerateReport: true,
	        	openReportInBrowser: true,
	        	saveCollectedJSON: true,
	        	disableLog: true,
	        	displayDuration: true,
	        	removeOriginalJsonReportFile: true,
	            removeExistingJsonReportFile: true
		}
	}],

    // arguments to cucumber.js
    cucumberOpts: {
        require: [
            'src/ui-specs/step_definitions/emailSignupSteps.js',
            'src/ui-specs/support/env.js',
            'src/ui-specs/support/hooks.js',
            'src/ui-specs/step_definitions/googleSignupSteps.js',
            'src/ui-specs/step_definitions/twitterSignupSteps.js',
            'src/ui-specs/step_definitions/selectVotingPageSteps.js'
        ],
        tags: "@smoke or @regression or @TypeScriptScenario or @OutlineScenario",
        format: 'json:.tmp/results.json',
        strict: true
    }
};
