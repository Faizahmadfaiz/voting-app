var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String
});
var User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    UserSchema
};