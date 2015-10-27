// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
    db = require("./models"),
    mongoose = require("mongoose");
    //mdl = require("material-design-lite");

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// hmm this seems odd
app.use("/node_modules", express.static("node_modules"));
// body parser config to accept our datatypes
//added from Braus-video
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PAGES //
// var characters = require('./models/character.js');

// app.get('/', function (req, res) {
//     res.render('splash');
// });

app.get('/dash', function (req, res) {
    db.Character.find({}, function (err, characters){    
	   res.render('dashboard', {characters: characters});
    });
});

// Is the data connected?
app.get('/api/characters', function (req, res){
    // send character data as JSON
    res.json(characters);
});

app.post('/api/characters', function (req, res){
    console.log(req.body);
    var newChar = req.body;
    db.Character.create(newChar, function (err, newChar){
        console.log(newChar);
        //push into user model
    });
    // characters.push(newChar);
    res.status(200).json(newChar);
});

app.delete('/api/characters/:id', function (req, res){
    var targetId = req.params.id;
    console.log(targetId);
    db.Character.findOneAndRemove({_id:targetId}, function (err, deleteItem){
        if (err) {return console.log('delete error: ' + err); }
        res.json(deleteItem);
    });
});

app.get('/signup', function (req, res) {
    res.render('_signup');
});

app.get('/login', function (req, res) {
    res.send('login coming soon');
    //res.render('_login');
});

// A create user route - creates a new user with a secure password
app.post('/users', function (req, res) {
    console.log('request body: ', req.body);
    // User
    res.json({msg: "hella."});
});













// app.get('/new', function(req, res) {
	// res.render('');
	// New Form not yet created
	// What is better practice, a different page for each type of form, or single page with options?
// });















// CONNECTED SERVER //
app.listen(process.env.PORT || 3000, function (){
  console.log("Server Connected to http://localhost:3000/");
});
