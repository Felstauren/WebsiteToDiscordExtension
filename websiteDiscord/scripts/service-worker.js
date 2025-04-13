import { webhook } from './config.js';

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: sendUrl,
    args: [webhook] // Pass the webhook value as an argument
  });
});

function sendUrl(webhookFromArg) {
  let title = document.evaluate("/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/div[2]/ytd-watch-metadata/div/div[1]/h1/yt-formatted-string", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  console.log(title)
  let request = new XMLHttpRequest();
  request.open("POST", webhookFromArg);
  request.setRequestHeader("Content-type", "application/json");

  let params = {
      username: "Extension",
      avatar_url: "",
      content: window.location.href,
      tag: "allgemeines",
      thread_name: title.innerText
  };

  request.send(JSON.stringify(params));
}
