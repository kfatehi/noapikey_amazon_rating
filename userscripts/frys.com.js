// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.frys.com/search?query_string=&cat=-70418&pType=pDisplay&fq=101051%20Air_Purifier&sort=price%20desc&start=0&cat=-70418&from=0&to=24
// @copyright  2012+, You
// ==/UserScript==

function amazonFrame(productName) {
  var url = "/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords="+productName;
  return $("<iframe src='http://www.amazon.com"+url+"'>");
}

var resultLinks = $('a font[face=Verdana][size=1]');

resultLinks.each(function(i,e) {
  var a = $(e).parent('a');
  var productName = a.text().trim();
  a.after(amazonFrame(productName))
});

