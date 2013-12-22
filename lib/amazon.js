function Amazon(jsdom, jquery) {
  /*
   * Returns the first page of search results from Amazon's mobile search
   */
  this.search = function(keywords, callback) {
    searchURL =  "http://www.amazon.com/gp/aw/s/ref=is_box_?k="+keywords;
    jsdom.env(searchURL, [jquery], function (errors, window) {
      var results = [];
      window.$('form[method=post] > a').each(function(i, e) {
        results.push({
          name: e.textContent,
          url: e.href
        });
      });
      callback(null, results);
    })
  }
};

module.exports = Amazon;
