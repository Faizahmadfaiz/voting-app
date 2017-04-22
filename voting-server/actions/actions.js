const User = require('../models/user').User;
const Option = require('../models/option').Option;
const Poll = require('../models/poll').Poll;

import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';

import mongoose from 'mongoose';

export function startPollingApp() {
    return (dispatch, getState) => {
        Poll.find({}, function(err, polls) {
            if(err) {
                console.log(err);
            } else {

                //This user is just for testing placeholder,later to be changed with loggin user
                User.findOne({username: 'asdf'}, function(err, user) {
                    if(err) {
                        console.log(err);
                    } else {
                        const data = {
                            polls: polls.map((poll) => poll.toObject()),
                            user: user.toObject()
                        };
                        dispatch(loadPolls(data));
                    }
                });
            }
        });
    };
}

export function loadPolls(data) {
    return {
        type: 'LOAD_POLLS',
        data
    }
}


export function startVotePoll(voteData) {
    return (dispatch, getState) => {
        const optionId = mongoose.Types.ObjectId(voteData.option_id);
        const pollId = mongoose.Types.ObjectId(voteData.poll_id);
        const voterId = mongoose.Types.ObjectId(voteData.voter_id);
        Poll.findById(pollId, function(err, poll) {
            if(err) {
                console.log(err);
            } else {
                poll.voters_id.push(voteData.voter_id);
                const updateOptions = poll.options.map((option) => {
                    if(String(option._id) === String(optionId)) {
                        option.voters.push(voteData.voter_id);
                    } 
                    return option;
                });
                poll.options = updateOptions;
                Poll.findByIdAndUpdate(pollId, poll, {new: true}, function(err, updatedPoll) {
                    if(err) {
                        console.log(err);
                    } else {
                        dispatch(votePoll(updatedPoll.toObject()));
                    }
                });
            }
        });
    };
}
export function votePoll(voteData) {
    return {
        type: 'VOTE_POLL',
        voteData
    };
}

export function startCreatePoll(pollData) {
    return(dispatch, getState) => {
        Poll.create(pollData, function(err,newlyCreated) {
            if(err) {
                console.log(err);
            } else {
                dispatch(createPoll(newlyCreated.toObject()));
            }
        });
    }
}

export function createPoll(pollData) {
    return {
        type: 'CREATE_POLL',
        pollData
    };
}

export function startSignup(userData) {
    return (dispatch, getState) => {
        console.log(userData);


        function validateInput(data, otherValidations) {
            let {errors} = otherValidations(data);

    

            return Promise.all([
                User.findOne({email: data.email}).exec().then(user => {
                    if(user) { errors.email = 'There is user with such email'; }
                }),

                User.findOne({username: data.username}).exec().then(user => {
                    if(user) { errors.username = 'There is user with such username'; }
                })
            ]).then(() => {
                return {
                    errors,
                    isValid: isEmpty(errors)
                }
            });
}


        //const {errors, isValid} = validateInput(userData);

        validateInput(userData, commonValidations).then(({errors, isValid}) => {
            if(isValid) {
                const {username, password, email} = userData;
                const password_digest = bcrypt.hashSync(password, 10);

                User.create({username, password_digest, email}, function(err, newUser) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(newUser);
                    }
                });
            } else {
            //res.status(400).json(errors);
            }
        });
    }
}