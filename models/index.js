var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project1");

module.exports.Character = require("./character.js");
module.exports.Place = require("./place.js");
module.exports.Scene = require("./scene.js");