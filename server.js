// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('splash');
});

app.get('/home', function(req, res) {
	res.render('infoDisplay');
});

// app.get('/new', function(req, res) {
	//res.render('');
	// New Form page doens't exist yet
// });

// CONNECTED SERVER //
app.listen(3000, function (){
  console.log("Server Connected to http://localhost:3000/");
});