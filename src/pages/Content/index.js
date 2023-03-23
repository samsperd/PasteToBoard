// import { printLine } from './modules/print';
import copy from 'copy-to-clipboard';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine' function from the Print Module");


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "copyText") {
    //   var selectedText = window.getSelection().getRangeAt(0).cloneContents();


//     var range = window.getSelection().getRangeAt(0),
//     content = range.cloneContents(),
//     span = document.createElement('SPAN');

// span.appendChild(content);

// // Loop over all elements within the selected text
// span.querySelectorAll('*').forEach(function(el) {
//   // Get the computed styles for the element
//   var styles = getComputedStyle(el);
  
//   // Loop over all style properties and add them as inline styles
//   for (var i = 0; i < styles.length; i++) {
//     var propName = styles[i];
//     var propValue = styles.getPropertyValue(propName);
//     el.style.setProperty(propName, propValue);
//   }
// });

// var htmlContent = span.innerHTML;

// range.deleteContents();
// range.insertNode(span);
      
      
      // var range = window.getSelection().getRangeAt(0),
      // content = range.cloneContents(),
      //    span = document.createElement('SPAN');
      
      // span.appendChild(content);
      // var htmlContent = span.innerHTML;
      
      // range.insertNode(span);
      
      // copy(htmlContent)

      // console.log("first function", getSelectedText());

      
      // console.log("second function", getSelectedRichTextWithStyles());

      console.log(getClickedSentence());

      sendResponse({textWithFormat: getSelectedText1().html, text: getSelectedText1().text})
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




function getClickedSentence() {
  // Get the clicked element and its text content
  const clickedElem = event.target;
  const clickedText = clickedElem.textContent;
  
  // Find the start and end indices of the clicked sentence
  const start = clickedText.lastIndexOf(".", selection.anchorOffset) + 1;
  const end = clickedText.indexOf(".", selection.focusOffset);
  const sentence = clickedText.substring(start, end);
  
  // Create a temporary element to format the sentence
  const tempElem = document.createElement("div");
  tempElem.textContent = sentence;


  // Return the formatted sentence
  return tempElem.innerHTML;

}


// function getSelectedText() {
//   var range = window.getSelection().getRangeAt(0),
//   content = range.cloneContents(),
//      span = document.createElement('SPAN');

//      var styles = window.getComputedStyle(range.commonAncestorContainer);
  
//      for (var i = 0; i < styles.length; i++) {
//        var property = styles[i];
//        var value = styles.getPropertyValue(property);
//        span.style.setProperty(property, value);
//      }
 
  
//   span.appendChild(content);
//   var htmlContent = span.innerHTML;

//   range.deleteContents();
//   range.insertNode(span);
  
//   return {
//     html: htmlContent,
//     text: range.toString()
//   };

// }






function getSelectedRichTextWithStyles() {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var content = range.cloneContents();
    var styles = window.getComputedStyle(range.commonAncestorContainer);
    var span = document.createElement('span');

    span.appendChild(content)

    range.deleteContents();
    range.insertNode(span)

    for (var i = 0; i < styles.length; i++) {
      var property = styles[i];
      var value = styles.getPropertyValue(property);
      span.style.setProperty(property, value);
    }
    // span.innerText = range.toString();


    

    console.log("first Log", range.toString());
    console.log("second Log", range.cloneContents());
    console.log("third Log", span.innerText);
  
    // return {
    //   html: span.outerHTML,
    //   text: span.innerText,
    //   styles: span.style.cssText,
    //   startOffset: range.startOffset,
    //   endOffset: range.endOffset
    // };

    return span.outerHTML
  }




  
  


  // function getSelectedRichTextWithStyles() {
  //   var selection = window.getSelection();
  //   var range = selection.getRangeAt(0);

  //   var styles = window.getComputedStyle(range.commonAncestorContainer);
  //   var span = document.createElement('span');


  //   for (var i = 0; i < styles.length; i++) {
  //     var property = styles[i];
  //     var value = styles.getPropertyValue(property);
  //     span.style.setProperty(property, value);
  //   }
  //   span.innerText = range.toString();


    

  //   console.log("first Log", range.toString());
  //   console.log("second Log", range.cloneContents());
  //   console.log("third Log", span.innerText);
  
  //   return {
  //     html: span.outerHTML,
  //     text: span.innerText,
  //     styles: span.style.cssText,
  //     startOffset: range.startOffset,
  //     endOffset: range.endOffset
  //   };

  // }


  function getSelectedRichTextWithStyles1() {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var styles = window.getComputedStyle(range.commonAncestorContainer);
    var span = document.createElement('span');
    for (var i = 0; i < styles.length; i++) {
      var property = styles[i];
      var value = styles.getPropertyValue(property);
      span.style.setProperty(property, value);
    }
    span.innerText = range.toString();
  
    return span.outerHTML
  }