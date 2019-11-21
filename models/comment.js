var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

var commentSchema = new mongoose.Schema({
	recipeID: ObjectId,
	poster: String,
	posterID: ObjectId,
	comment: String,
	date: String
});

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment