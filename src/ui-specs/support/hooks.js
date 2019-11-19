var outputDir = './reports/';
var screenshotDir = './reports/screenshots/';
var targetJson = outputDir + 'cucumber_report.json';

var JsonFormatter = require('cucumber').JsonFormatter;
var fse = require('fs-extra');
var reporter = require('cucumber-html-reporter');
var DBUtil = require("../utils/dataBaseUtils");
var EmailUtils = require("../utils/emailUtils");

var DataBaseUtils = new DBUtil();

var { defineSupportCode, After, AfterAll, BeforeAll, Before } = require('cucumber');

defineSupportCode(function ({ Before, registerHandler }) {
    registerHandler('BeforeFeatures', async () => {
     //   DataBaseUtils.removeDocumentByEmail(browser.params.userEmail);
        await browser.sleep(5000);
    });

    Before(async () => {
        //   await console.log("Launching test in environment with base URL: ", browser.baseUrl);
        //    browser.driver.manage().window().maximize();
        await browser.waitForAngularEnabled(false);
        //    await browser.get(browser.baseUrl);  
        //   await browser.sleep(15000); 

        // DataBaseUtils.removeDocumentByEmail(browser.params.userEmail);
    });
});

defineSupportCode(function ({ setDefaultTimeout }) {
    setDefaultTimeout(10 * 60 * 1000);
});

/**defineSupportCode(function ({ After, AfterAll, registerListener }) {

    var writeScreenshotToFile = async (image) => {

        if (!fse.existsSync(screenshotDir)) {
            try {
                await fse.mkdirSync(screenshotDir);
            } catch (e) {
                if (e.code != "EEXIST") {
                    console.log("Error while creating dir:" + screenshotDir);
                    throw e;
                }
            }
        }
        var date = await new Date();
        var timestamp = await date.getTime();
        var filename = await "error_" + timestamp + ".png";
        var stream = await fse.createWriteStream(screenshotDir + filename);
        await stream.write(image);
        await stream.end();
    };

    After(function (scenario, done) {
        let self = this;
        if (scenario.isFailed()) {
            browser.takeScreenshot().then(function (png) {
                let decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
                writeScreenshotToFile(decodedImage);
                self.attach(decodedImage, 'image/png');
                done();
            }, function (err) {
                done(err);
            });
        } else {
            done();
        }
    });

    var createHtmlReport = function (sourceJson) {

        var options = {
            theme: 'bootstrap',
            jsonFile: sourceJson,
            output: outputDir + 'cucumber_report.html',
            reportSuiteAsScenarios: true,
            launchReport: true
        };

        reporter.generate(options);
    };

    jsonFormatter = new JsonFormatter;
    jsonFormatter.log = function (string) {
        if (!fse.existsSync(outputDir)) {
            fse.mkdirSync(outputDir);
        }

        fse.writeFile(targetJson, string, function (err) {
            if (err) {
                console.log('Failed to save cucumber test results to json file.');
                console.log(err);
            } else {
                createHtmlReport(targetJson);
            }
        });
    };

    registerListener(jsonFormatter);
});**/
