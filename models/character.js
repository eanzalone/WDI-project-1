var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CharSchema = new Schema({
    name: String,
    role: String, //main or supporting
    age: Number,
    gender: String,
    height: Number, // ft/in or cm?
    hair: String,
    eyes: String,
    skin: String,
    build: String,
    blurb: String, // character limit
    education: String,
    skills: String,
    hopes: String,
    fears: String,
    goals: String,
    description: String
});


var Character = mongoose.model('Character', CharSchema);
module.exports = Character;