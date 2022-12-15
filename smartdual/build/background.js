/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
// A function to use as callback
function doStuffWithDom(domContent) {
  console.log('I received the following DOM content:\n' + domContent);
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
  // ...check the URL of the active tab against our pattern and...

  // ...if it matches, send a message specifying a callback too
  chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom);
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['contentScript.js'],
  });
});

/******/ })()
;
//# sourceMappingURL=background.js.map