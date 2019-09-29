// This is the code for the global header across all pages. It's been done this way to make less work for me.
// It allows me to update the header across the website by updating one file.
//
// This file is the script for the header. Call this file to the page by placing this line of code in the <head>:
// <script type="text/javascript" src="js/head.js"></script>
//
//
// For the actual header, place this line of code in the very beginning of the <body> tag:
// <div include-html="global/header.html"></div><script>headerHTML();</script>
// The div calls the document, and the script places it on the page.

function headerHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include-html");
          headerHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};
