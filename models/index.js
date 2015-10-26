var mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/project1'
);
module.exports.Character = require("./character.js");
module.exports.Place = require("./place.js");
module.exports.Scene = require("./scene.js");