var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
	title: String,
	description: String,
	characters: [{type: Schema.Types.ObjectId, ref: 'Character'}]
});

var Project = mongoose.model('Project', projectSchema);
module.exports = Project;