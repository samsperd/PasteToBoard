console.log('This is the background page.');
console.log('Put the background scripts here.');

var dataArray = [];
let idInt = 1;

chrome.runtime.onInstalled.addListener(() => {
    saveArrayToStorage();

    // create context menu item
    chrome.contextMenus.create({
        id: "copy-to-board",
        title: "Copy to Board",
        contexts: ["selection", "image"],
    });
});

// handle context menu click
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "copy-to-board") {
        // Inject content script file when context menu item is clicked
        chrome.scripting
        .executeScript({
          target : {tabId : tab.id},
          files : [ "contentScript.bundle.js" ],
        })
        .then(() => {
            // Script injected successfully
            chrome.tabs.sendMessage(tab.id, { action: "copyText" }, function (response) {
                console.log(response);
                const { text, textWithHtml } = response;
    
                var texts = {
                    text: text,
                    textWithHtml: textWithHtml,
                };
                var url = tab.url;
                var hostname = new URL(url).hostname;
    
                // add data to array
                addDataToArray(texts, url, hostname);
    
                // save array to storage
                saveArrayToStorage();
    
                console.log(dataArray);
            });
            
        });        

    }
});

function addDataToArray(texts, url, hostname) {
    var timestamp = new Date().getTime();
    var data = {
        texts: texts,
        id: idInt,
        url: url,
        hostname: hostname,
        timestamp: timestamp,
    };
    dataArray.push(data);
    idInt++;
}

chrome.runtime.onMessage.addListener(updateArrayToStorage);

function saveArrayToStorage() {
    chrome.storage.local.set({ dataArray: dataArray }, function () {
        console.log("Data array saved to storage");
    });
}

function updateArrayToStorage(request, sender, sendResponse) {
    if (request.contentId) {
        dataArray = dataArray.filter((data) => data.id !== request.contentId);

        saveArrayToStorage();
    }

    sendResponse("The data has been received");
}

console.log(dataArray);
