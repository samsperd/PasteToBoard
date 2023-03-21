// import { printLine } from './modules/print';
import copy from 'copy-to-clipboard';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine' function from the Print Module");


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "copyText") {
    //   var selectedText = window.getSelection().getRangeAt(0).cloneContents();
      
      
      var range = window.getSelection().getRangeAt(0),
      content = range.cloneContents(),
      content = range.startContainer.parentNode,
         span = document.createElement('SPAN');
      
      span.appendChild(content);
      var htmlContent = span.innerHTML;
      
      range.insertNode(span);
      
      copy(htmlContent)

      console.log("first function", htmlContent);
      
      console.log("second function", getSelectionHtml());

      sendResponse(htmlContent)
    }
});





function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

// let paragraphs = document.getElementsByTagName('p')

// for (const element of paragraphs) {
//     element.style['backgroundColor'] = "red"
// }


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // 2. A page requested user data, respond with a copy of `user`
//     console.log("agba checker", message);
//     if (message.action) {
//       if (message.action === "copy") {
//         var selectedText = window.getSelection().toString();
//         var htmlData = "<div contenteditable>" + selectedText + "</div>";
//         var clipboardData = new ClipboardEvent("").clipboardData || new DataTransfer();
//         clipboardData.setData("text/html", htmlData);
//         document.dispatchEvent(new ClipboardEvent("paste", {clipboardData}));
//         var copiedHTML = clipboardData.getData("text/html");
  
//         console.log("agba booker");
//         sendResponse({ copiedHTML: copiedHTML });      
//       }
//     }
//   });