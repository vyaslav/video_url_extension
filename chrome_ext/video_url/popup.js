chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerHTML = request.source;
    chrome.tabs.create({ url: "http://vyaslav.github.io/video_url_extension/?" + encodeURIComponent(request.source), active: false });
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');


  chrome.tabs.executeScript(null, {
    file: "graburl.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });

}

window.onload = onWindowLoad;