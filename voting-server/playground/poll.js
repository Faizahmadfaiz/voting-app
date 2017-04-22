var mongoose = require('mongoose');
var OptionSchema = require('./option').OptionSchema;
var UserSchema = require('./user').UserSchema;

var PollSchema = new mongoose.Schema({
    name: String,
    options: [OptionSchema],
    author: UserSchema,
    voters_id: [UserSchema]
});

var Poll = mongoose.model('Poll', PollSchema);

module.exports = {
    Poll,
    PollSchema
}