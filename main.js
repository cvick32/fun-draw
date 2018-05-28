var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/canvas.html'));
    console.log(__dirname);
});

app.listen(8080, function(req, res) {
  console.log("listening on 8080");
});
