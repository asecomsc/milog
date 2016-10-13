var express = require('express');
var app = express();
var port = process.env.PORT || 80;
var mysql = require('mysql');
var portMySQL = process.env.WEBSITE_MYSQL_PORT;

app.get('/', function (req, res) {
  res.send('route root ok..');
});

app.get('/mysql',function (req, res) {
var connection = mysql.createConnection({host:'localhost',user:'azure',password:'password',database:'azuredb',port:portMySQL});
connection.connect();
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
    });
connection.end();
res.send('route log working..');
});

app.listen(port, function () {
  console.log('Example app listening on port 80!');
});