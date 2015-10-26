var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CharSchema = new Schema({
    name: String,
    role: String, //main or supporting
    age: String,
    gender: String,
    height: Number, //how do I want this displayed?
    hair: String,
    eyes: String,
    skin: String,
    description: String
});


var Character = mongoose.model('Character', CharSchema);
module.exports = Character;