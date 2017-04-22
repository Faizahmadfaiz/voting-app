var mongoose = require('mongoose');

var Option = require('./option').Option;
var Poll = require('./poll').Poll;
var User = require('./user');
const db =  process.env.MONGODB_URI || "mongodb://localhost/voteapp";
mongoose.connect(db);

var newPoll = new Poll({
    name: "Favourite Food",
    options:[
            {
                name: "Burger"
            }, 
            {
                name:"Pizza"
            }
        ],
    author: {username: 'Chance'},
});
newPoll.save(function(err, poll) {
    if(err) {
        console.log(err);
    } else {
        console.log(poll);
    }
});