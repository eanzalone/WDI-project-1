var mongoose = require("mongoose");
var db = require("./models/index.js");

// var projectSchema = new Schema({
// 	title: String,
// 	description: String,
// 	characters: [{type: Schema.Types.ObjectId, ref: 'Character'}]
// });

// var CharSchema = new Schema({
//     name: String,
//     role: String, //main or supporting
//     age: Number,
//     hair: String,
//     blurb: String, // character limit
//     description: String
// });

// // define user schema
// var userSchema = new Schema({
//   email: { type:String, required:true, select:false, set: toLower },
//   passwordDigest: { type:String, required:true, select:false },
//   penname: { type:String },
//   projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
// });

var user1 = {email: 'four@test.com', password: 'test4', penname: 'four'};
var project1 = {title: 'Project 1 Title', description: 'Words1'};
var project2 = {title: 'Project 2 Title', description: 'Words2'};
var char1 = {name: 'Person1', age: 20, hair: 'Black'};
var char2 = {name: 'Person2', age: 21, hair: 'Blonde'};
var char3 = {name: 'Person3', age: 22, hair: 'Auburn'};

// db.Character.create(char1, function (err, taco){
// 	console.log('created ', taco);
// });

db.User.createSecure(user1.email, user1.password, function (err, user) {
	user.penname = user1.penname;
	user.save();
	console.log(user);
	db.Project.create(project1, function (err, taco){
		console.log('created: ', taco);
		user.projects.push(taco);
		user.save();
		console.log('user is', user);
		db.Character.create(char1, function (err, burrito){
			console.log('created: ', burrito);
			taco.characters.push(burrito);
			console.log(user);
		});
		db.Character.create(char2, function (err, burrito){
			console.log('created: ', burrito);
			taco.characters.push(burrito);
			taco.save();
			console.log(project);
		});
	});
});