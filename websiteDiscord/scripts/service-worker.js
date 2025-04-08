import { webhook } from './config.js';

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: sendUrl,
    args: [webhook] // Pass the webhook value as an argument
  });
});

function sendUrl(webhookFromArg) {
  let request = new XMLHttpRequest();
  request.open("POST", webhookFromArg);
  request.setRequestHeader("Content-type", "application/json");

  let params = {
      username: "Extension",
      avatar_url: "",
      content: window.location.href
  };

  request.send(JSON.stringify(params));
}
