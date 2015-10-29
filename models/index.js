var mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/project1'
);
module.exports.Character = require("./character.js");
module.exports.Place = require("./place.js");
module.exports.Scene = require("./scene.js");
module.exports.User = require("./user.js");
module.exports.Project = require("./project.js");