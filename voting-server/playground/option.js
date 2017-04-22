var mongoose = require('mongoose');
var UserSchema = require('./user').UserSchema;

var OptionSchema = new mongoose.Schema({
    name: String,
    voters: [UserSchema]
});
var Option = mongoose.model('Option', OptionSchema);

module.exports = {
    Option,
    OptionSchema
}