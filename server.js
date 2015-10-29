// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
    db = require("./models/index.js"),
    mongoose = require("mongoose"),
    session = require('express-session');

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

// MIDDLEWARE
// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 600000 }
}));

// PAGES //

app.get('/', function (req, res) {
    res.render('frontPage');
});

app.get('/dash', function (req, res) {
    db.Project.find({}).populate('characters').exec( function (err, projects){ 
        console.log(projects); 
        console.log('session', req.session);
	   res.render('dashboard', {projects: projects, user: req.session.user });
    });
});

// app.get('/test', function(req, res) {
//     db.User.findOne({_id: '563277666bad390e104a0a89'}, function(err, user) {
//         console.log(user);
//         res.json(user);
//     });
// });

// FORM PAGES
    app.get('/new-character', function (req, res) {
        res.render('charForm');
    });
    app.get('/new-project', function (req, res) {
        res.render('projectForm');
    });

// Is the character data connected?
    app.get('/api/characters', function (req, res){
        // send character data as JSON
        res.json(db.Character);
    });

// POST CHARACTERS
    app.post('/api/characters', function (req, res){
        console.log(req.body);
        var newChar = req.body;
        db.Character.create(newChar, function (err, newChar){
            console.log(newChar);
            //push into project model
        });
        // characters.push(newChar);
        res.status(200).json(newChar);
    });

// POST PROJECTS
    app.post('/api/projects', function (req, res){
        console.log(req.body);
        var newProject = req.body;
        db.Project.create(newProject, function (err, newProject){
            console.log(newProject);
            //push into user model
        });
        res.status(200).json(newProject);
    });

// DELETE CHARACTERS
    app.delete('/api/characters/:id', function (req, res){
        var targetId = req.params.id;
        console.log(targetId);
        db.Character.findOneAndRemove({_id:targetId}, function (err, deleteItem){
            if (err) {return console.log('delete error: ' + err); }
            res.json(deleteItem);
        });
    });


app.get('/current-user', function (req, res) {
    res.json({ user: req.session.user });
});

// LOGIN
    app.post('/login', function (req, res) {
        var user = req.body;
        console.log(user);
        db.User.authenticate(user.email, user.password, function (err, user) {
            if (err) {
                console.log("Error: " + err);
            } else {
                req.session.userId = user._id;
                req.session.user = user;
                console.log(user);
                res.json(user);
            }
        });
    });

// SIGNUP
    // A create user route - creates a new user with a secure password
    app.post('/users', function (req, res) {
        var userParams = req.body;
        db.User.createSecure(userParams.email, userParams.password, function (err, user) {
            user.penname = req.body.penname;
            user.save();
            console.log(err || user);
            // console.log(user);
            req.session.userId = user._id;
            res.json({ user: user, msg: "User Created Successfully!" });
        });
    });

// LOGOUT
    app.get('/api/logout', function (req, res) {
        req.session.user = null;
        res.send('Logged Out.');
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
