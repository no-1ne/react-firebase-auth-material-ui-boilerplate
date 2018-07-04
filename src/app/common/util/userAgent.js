// from: https://github.com/google/emoji-scavenger-hunt/blob/master/src/js/utils.ts
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

/**
 * Checks if the current platform is iOS.
 *
 * @returns true if the platform is iOS, false otherwise.
 */
function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Checks if the current platform is Android.
 *
 * @returns true if the platform is Android, false otherwise.
 */
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

/**
 * Checks if the current platform is a mobile device.
 *
 * @returns true if the platform is a mobile device, false otherwise.
 */
function isMobile() {
  return isIOS() || isAndroid();
}

/**
 * returns the user agent.
 *
 * @returns the user agent
 */
function getUserAgent() {
  return navigator.userAgent;
}
// get broswer details
// return object contain broswer name and version

// https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser

const getBrowserDetails = () => {
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: "IE", version: tem[1] || "" };
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return { name: "Opera", version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1]
  };
};

//return object contain browser name and version 
//only if that current broswer version and name present in config object
const checkBrowserCompatibility = (config, currentBrowserDetails) => {
  return config.filter(function(browserDetail) {
    const { name, version } = browserDetail;
    return (
      name.toLowerCase() === currentBrowserDetails.name.toLowerCase() &&
      currentBrowserDetails.version >= version
    );
  });
};

export {
  isMobile,
  isIOS,
  isAndroid,
  getUserAgent,
  getBrowserDetails,
  checkBrowserCompatibility
};
