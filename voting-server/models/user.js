var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password_digest: String
});
var User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    UserSchema
};