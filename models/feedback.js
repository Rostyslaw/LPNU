var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    longdescription: String,
    shortdescription: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
