var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    longdescription: String,
    shortdescription: String
});

module.exports = mongoose.model('News', NewsSchema);
