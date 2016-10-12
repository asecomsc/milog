var express = require('express');
var app = express();
var port = process.env.PORT || 80;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/todo',function (req, res) {
  console.log('primer prueba en azure');
})

app.listen(port, function () {
  console.log('Example app listening on port 80!');
});