var express = require('express');
var bodyParser = require("body-parser");
var app = express();   // crud = create, read, update, delete
var mysql = require('mysql');
var portMySQL = process.env.WEBSITE_MYSQL_PORT;
var port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/list', function (req, res) {
var con = mysql.createConnection({host:'localhost',user:'azure',password:'password',database:'azuredb',port:portMySQL});
	con.connect();
			con.query('SELECT * FROM log', function(err,rows){
				if (err) throw err;
				console.log(rows);
			});
	con.end();
	res.end();
});	

app.get('/', function (req, res) {res.sendFile( __dirname + "/" + "default.html");});

app.post('/create', function (req, res) {
var con = mysql.createConnection({host:'localhost',user:'azure',password:'password',database:'azuredb',port:portMySQL});
mib = req.body.miBot;
did = req.body.diaId;
sta = req.body.stamp;
	if (mib == 'room') { yson = { diaId: did, room: sta } };
	if (mib == 'sleep') { yson = [{sleep:sta},{diaId:did}] };
	if (mib == 'seat') { yson = [{seat:sta},{diaId:did}] };
	con.connect();
			if (mib == 'room') {
					con.query('INSERT INTO log SET ?', yson, function(err,res) { if (err) throw err; });
			} else {
					con.query('UPDATE log SET ? WHERE ?', yson, function(err,res) { if (err) throw err; });						
			}		

	con.end();	
	res.end();
});

app.listen(port, function () {
  console.log('Example app listening on port 80!');
});