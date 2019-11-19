const EC = protractor.ExpectedConditions;
const TIMEOUT = 30000;
var co = require('co');


module.exports = {
  waitFor: async function (el, t = TIMEOUT,
    msg = `Element was still absent after ${TIMEOUT} milliseconds`) {
    return browser.wait(EC.presenceOf(el), t, msg);
  },

  waitForNo: async function (el, t = TIMEOUT,
    msg = `Element was still present after ${TIMEOUT} milliseconds`) {
    return browser.wait(EC.not(EC.presenceOf(el)), t, msg);
  },

  waitForVisibility: async function (el, t = TIMEOUT,
    msg = `Element was still invisible after ${TIMEOUT} milliseconds`) {
    return browser.wait(EC.visibilityOf(el), 30000, msg);
  },

  waitForClickable: async function (el, t = TIMEOUT,
    msg = `Element was still invisible after ${TIMEOUT} milliseconds`) {
    return browser.wait(EC.elementToBeClickable(el), 30000, msg);
  },

  waitForVisibility22: async function (el, t = TIMEOUT,
    msg = `Element was still invisible after ${TIMEOUT} milliseconds`) {
    console.log("Waiting for element...");
    try {
      console.log("Check for element...");
      return el.waitReady().then(function (text) {
        console.log("Check for element..." + text);
        if (text == true) {
          browser.wait(EC.presenceOf(el), t, msg).then(function (pre) {
            console.log("presence..." + pre);
            if (pre == true) {
              browser.wait(EC.visibilityOf(el), t, msg).then(function (dis) {
                console.log("Display..." + dis);
              });
            }
          }, 5000)
        } else {
          return browser.wait(EC.visibilityOf(el), t, msg);
        }
      }, 5000)
    } catch (err) {
      console.log("Error on wait..." + err);
      if (err && err.message.indexOf('stale element reference') >= 0) {
        console.log('[safeIsVisible] Got stale element reference; trying again...');
        return browser.wait(EC.visibilityOf(el), t, msg);
      }
    }
  },

  waitElementUntilVisibleOrEnable: function (element, identity, options) {

    var options = {};

    options.mustBeTrue = true;
    options.expecation = true;
    options.testEnable = false;
    //options.waitTime=this.isDefined(options.waitTime)?options.waitTime:this.TIMEOUT;
    options.waitTime = 20000;

    var self = this;

    var waitFun = function () {
      if (options.expecation) {
        return element.isPresent().then(function (present) {
          return present && self.isElementDisplayedOrEnabled(element, identity, options);
        });
      } else {
        return element.isPresent().then(function (present) {
          return !present || !self.isElementDisplayedOrEnabled(element, identity, options);
        });
      }
    }
    return browser.driver.wait(function () {
      return waitFun();
    }, options.waitTime, "wait for element to be visible:" + identity).then(function () {
      console.log("waitElementUntilVisibleOrEnable_(" + JSON.stringify(options) + ") on " + identity + ":" + options.expecation);
      return options.expecation;
    }, function (error) {
      console.log("Oops!waitElementUntilVisibleOrEnable_(" + JSON.stringify(options) + ") on " + identity + " met an error:" + error);
      if (options.mustBeTrue) {
        throw new Error("Oops!waitElementUntilVisibleOrEnable_(" + JSON.stringify(options) + ") on " + identity + " met an error:" + error);
      } else {
        return !options.expecation;
      }
    });
  },
  isElementDisplayedOrEnabled: function (element, identity, testEnable) {
    var uponError = true;
    var ret = false;
    var self = this;
    return co(function* () {
      var i = 0;
      while (uponError && i < 4) {
        var p;
        if (testEnable) {
          p = element.isEnabled();
        } else {
          p = element.isDisplayed();
        }

        yield p.then(function (testResult) {
          uponError = false;
          ret = testResult;
          return ret;

        }, function (error) {
          uponError = true;
          console.log("Oops!isElementDisplayedOrEnabled_ when waiting for " + identity + "to be visible/enable, met an error:" + error);
          ret = false;
          i++;
        });

      }
      return ret;

    });

  },

  waitForNoVisibility: async function (el, t = TIMEOUT,
    msg = 'Element was still visible after ' + TIMEOUT + ' milliseconds') {
    return browser.wait(EC.not(EC.visibilityOf(el)), t, msg);
  },
  openPageInNewTab: async (url) => {
    await browser.executeScript('window.open()');
    var handles = await browser.getAllWindowHandles();
    const newWindowHandle = await handles[1];
    await browser.switchTo().window(newWindowHandle);
    await browser.get(url);
  },

  createNewBrowserTab: function () {
    browser.executeScript('window.open()');
  },

  switchToTabNumber: function (number) {
    return browser.getAllWindowHandles().then(function (handles) {
      const newWindowHandle = handles[number];
      browser.switchTo().window(newWindowHandle);
    });
  }
};