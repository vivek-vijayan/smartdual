
/* Getting the URL of the current page  */
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  document.getElementById('url').innerHTML = tabs[0].title;
});


