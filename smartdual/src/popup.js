/* Getting the URL of the current page  */

var newURL;
var logoURL;
var tabid;
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  document.getElementById('current-tab-name').innerHTML = tabs[0].title;
  tabid = tabs[0].id;
  document.getElementById('logo-image').setAttribute('src', tabs[0].favIconUrl);
  document.getElementById('copy-link').setAttribute('href', tabs[0].url);
  newURL = tabs[0].url;
  logoURL = tabs[0].favIconUrl;
});

function changeBackgroundColor() {
  document.body.style.backgroundColor = 'red';
}

function run() {
  const tabId = tabid;
  chrome.scripting.executeScript(
    {
      target: { tabId: tabid },
      files: ['remoteScreen.js'],
    },
    function () {
      chrome.tabs.sendMessage(tabid, { url: newURL, logo: logoURL });
    }
  );
}

document.addEventListener('DOMContentLoaded', function () {
  var activate = document.getElementById('activate');
  // onClick's logic below:
  activate.addEventListener('click', function () {
    run();
  });
});
