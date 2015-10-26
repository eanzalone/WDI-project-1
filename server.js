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

// app.get('/', function(req, res) {
//  res.render('splash');
// });

// app.get('/home') -> changed to / while I'm editing the page for simplicity
app.get('/', function(req, res) {
    db.Character.find({}, function(err, characters){    
	   res.render('infoDisplay', {characters: characters});
    });
});

// Is the data connected?
app.get('/api/characters', function (req, res){
    // send character data as JSON
    res.json(characters);
});

app.post('/api/characters', function(req, res){
    console.log(req.body);
    var newChar = req.body;
    db.Character.create(newChar, function(err, newChar){
        console.log(newChar);
    });
    // characters.push(newChar);
    res.status(200).json(newChar);
});

app.delete('/api/characters/:id', function(req, res){
    var targetId = req.params.id;
    console.log(targetId);
    db.Character.findOneAndRemove({_id:targetId}, function(err, deleteItem){
        if (err) {return console.log('delete error: ' + err); }
        //console.log(deleteItem() + " removed");
        res.json(deleteItem);
    });
});
// db.character.findById
// req.params.id

// app.delete('/api/foods/:id', function(req, res){
//     var idInt = parseInt(req.params.id);
//     var deletedObj = where(foods, {id: idInt});
//     console.log(deletedObj);
//     var idRemove = foods.indexOf(deletedObj);
//     foods.splice(idRemove, 1);
//     res.json(foods);
// });



















// app.get('/new', function(req, res) {
	//res.render('');
	// New Form not yet created
	// What is better practice, a different page for each type of form, or single page with options?
// });

// app.get('/profile', function(req, res) {
// 	res.render('');
//	Profile not yet created
// });














// CONNECTED SERVER //
app.listen(process.env.PORT || 3000, function (){
  console.log("Server Connected to http://localhost:3000/");
});
