console.log('This is the background page.');
console.log('Put the background scripts here.');

var dataArray = [];
let idInt = 1


chrome.runtime.onInstalled.addListener(() => {

    // create context menu item
    chrome.contextMenus.create({
        id: "copy-to-board",
        title: "Copy to Board",
        contexts: ["selection", "image"]
    });
    
    
    saveArrayToStorage();
    
})
// handle context menu click
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "copy-to-board") {
        // get text, url, and hostname of current tab

        console.log(info);
        
        // send id
        chrome.tabs.sendMessage(tab.id, {action: "copyText"}, (response) => {
            var text = {
                text: response,
                original_text: response,
            };
            var url = tab.url;
            var hostname = new URL(url).hostname;

            console.log("text", response);



            // add data to array
            addDataToArray(text, url, hostname);
            
            // save array to storage
            saveArrayToStorage();
            
            console.log(dataArray);
            // save array to firebase
            // saveToFirebase();
        });


        
    }
})



function addDataToArray(text, url, hostname) {
    var timestamp = new Date().getTime();
    var data = {
        text: text,
        id: idInt,
        url: url,
        hostname: hostname,
        timestamp: timestamp
    };
    dataArray.push(data);
    idInt++
}

chrome.runtime.onMessage.addListener(updateArrayToStorage)

function saveArrayToStorage() {
    chrome.storage.local.set({dataArray: dataArray}, function() {
        console.log("Data array saved to storage");
    });
}

function updateArrayToStorage(request, sender, sendResponse) {

    if (request.contentId) {
        dataArray = dataArray.filter((data) => data.id !== request.contentId)

        saveArrayToStorage()

    }

    sendResponse('The data has been recieved')

}

console.log(dataArray);


        // check if the clicked item is an image
        // if (info.mediaType == "image") {
        //     // get the image URL
        //     var imageUrl = info.srcUrl;

        //     // initiate download of the image
        //     chrome.downloads.download({ url: imageUrl }, function(downloadId) {
        //         // check if the download was successful
        //         if (downloadId) {
        //             // get the downloaded file path
        //             chrome.downloads.search({ id: downloadId }, function(downloadItems) {
        //                 if (downloadItems.length > 0) {
        //                     var imagePath = downloadItems[0].filename;

        //                     // save data to storage
        //                     var data = {
        //                         text: "",
        //                         url: tab.url,
        //                         hostname: new URL(tab.url).hostname,
        //                         timestamp: Date.now(),
        //                         imagePath: imagePath
        //                     };
        //                     addDataToArray(data);
        //                     saveArrayToStorage();
        //                     saveToFirebase();

        //                     // copy text and image to clipboard
        //                     copyToClipboard(data);
        //                 }
        //             });
        //         }
        //     });
        // } else {
        //     // get highlighted text, url, and hostname of current tab
        //     var text = info.selectionText;
        //     var url = tab.url;
        //     var hostname = new URL(url).hostname;

        //     // save data to storage
        //     var data = {
        //         text: text,
        //         url: url,
        //         hostname: hostname,
        //         timestamp: Date.now(),
        //         imagePath: ""
        //     };
        //     addDataToArray(data);
        //     saveArrayToStorage();
        //     saveToFirebase();

        //     // copy text to clipboard
        //     copyToClipboard(data);
        // }
