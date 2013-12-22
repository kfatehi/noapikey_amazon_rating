function Amazon(jsdom, jquery) {
  /*
   * Returns the first page of search results from Amazon's mobile search
   */
  this.search = function(keywords, callback) {
    searchURL =  "http://www.amazon.com/gp/aw/s/ref=is_box_?k="+keywords;
    jsdom.env(searchURL, [jquery], function (errors, window) {
      if (errors) callback(errors);
      else {
        var results = [];
        var prices = window.$('font:contains(Price) font b');
        window.$('form[method=post] > a').each(function(i, e) {
          results.push({
            name: e.textContent,
            price: (prices[i] ? prices[i].textContent : "N/A"),
            url: e.href
          });
        });
        callback(null, results);
      }
    })
  }

  /*
   * Uses the search method to retrieve search results based on the
   * keyword, accesses the given product URL and retrieves the customer
   * rating. The rating is also provided as a percent for convenience.
   */
  this.rating = function(keywords, callback) {
    this.search(keywords, function(err, results) {
      if (results.length > 0) {
        var result = results[0];
        jsdom.env(result.url, [jquery], function (errors, window) {
          if (errors) callback(errors);
          else {
            var html = window.$('body').html(),
            ratingData = html.match(/\:&nbsp;(\d+\.?\d+)&nbsp;\/&nbsp;(\d+\.?\d+)/);
            if (ratingData) {
              result.rating = parseFloat(ratingData[1]);
              result.ratingPercent = (result.rating[0] / 5.0) * 100;
            } else {
              result.rating = "N/A";
              result.ratingPercent = "N/A";
            }
            callback(null, result); 
          }
        })
      } else callback(null, {});
    });
  }.bind(this);
};

module.exports = Amazon;
