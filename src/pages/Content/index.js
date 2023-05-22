
console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "copyText") {


      console.log("getClickedSentence()");

      sendResponse({ textWithHtml: getSelectedText1().html, text: getSelectedText1().text })
    }
});



function getSelectedText1() {
  var range = window.getSelection().getRangeAt(0),
  content = range.extractContents(),
     span = document.createElement('SPAN');
  
  span.appendChild(content);
  var htmlContent = span.innerHTML;

  range.deleteContents();
  range.insertNode(span);
  
  return {
    html: htmlContent,
    text: range.toString()
  };

}


