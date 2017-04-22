var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testvote');

var UserSchema = new mongoose.Schema({
    username: String,
    email: String
});
var User = mongoose.model('User', UserSchema);

var OptionSchema = new mongoose.Schema({
    name: String,
    voters: [{    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});
var Option = mongoose.model('Option', OptionSchema);

var PollSchema = new mongoose.Schema({
    name: String,
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    voters_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

var Poll = mongoose.model('Poll', PollSchema);

/*Poll.create({
    name: "Favourite Sports",
}, function(err, poll) {
    if(err) {
        console.log(err);
    } else {
        console.log(poll);
    }
});*/

Poll.findOne({name: "Favourite Sports"}, function(err, poll) {
    if(err) {
        consoel.log(err);
    } else {
        Option.find({}, function(err, option) {
            if(err) {
                console.log(err);
            } else {
                option.forEach((option) => {
                    poll.options.push(option);
                });
                poll.save(function(err, poll) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(poll);
                    }
                });
            }
        });
    }
   
});

/* Option.find({},function(err, option) {
        if(err) {
            console.log(err);
        } else {
            /*poll.options.push(option);
            poll.save(function(err, poll) {
            if(err) {
                console.log(err);
            } else {
                console.log(poll);
            }
        });
        }
    })*/