var express = require('express'),
app = express(),
port = process.env.PORT || 1337,
jsdom = require('jsdom'),
jquery = "http://0.0.0.0:"+port+"/vendor/jquery.js",
Amazon = require(__dirname+"/lib/amazon.js"),
amazon = new Amazon(jsdom, jquery);

app.get('/amazon/:method/:keywords', function(req,res) {
  var action = amazon[req.params.method];
  if (action) 
    action(req.params.keywords, function(err, results) {
      if (err) res.send(500);
      else res.json(results);
    });
  else res.send(404);
});

app.use("/vendor", express.static(__dirname+"/vendor"));
app.listen(port);

console.log("Listening on port "+port);
