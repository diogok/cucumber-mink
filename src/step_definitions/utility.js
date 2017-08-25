/**
 * Dependencies
 */

import Promise from 'bluebird';

/**
 * Private
 */

const viewport = function (width, height) {
  return this.driver.setViewportSize({
    width: parseInt(width, 10),
    height: parseInt(height, 10),
  });
};

const wait = function (seconds) {
  return Promise.delay(parseInt(seconds, 10) * 1000);
};

const screenshot = function (to) {
  return this.driver.saveScreenshot('./'+to+'.png');
};

/**
 * Interface
 */

export default [
  [/I wait (\d+) seconds?/, wait],
  [/the viewport is (\d+)px width and (\d+)px height/, viewport],
  [/I take a screenshot to "([^"]+)"/, screenshot],
];
