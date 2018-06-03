var express = require('express');
var app = express();
var path = require('path');
var localPort = 8080;

app.use(express.static(__dirname + "/css/"));
app.use(express.static(__dirname + "/node_modules/"));
app.use(express.static(__dirname + "/js/"));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/canvas.html'));
});

app.listen(process.env.PORT || localPort, function(req, res) {
  console.log("listening on " + localPort);
});
