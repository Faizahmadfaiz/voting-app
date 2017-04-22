const express = require('express');
const app = express();
const mongoose = require('mongoose');
import path from 'path';
import bodyParser from 'body-parser';

const Option = require('../models/option');
const Poll = require('../models/poll');
const User = require('../models/user');
import {startCreatePoll, startVotePoll, startSignup} from '../actions/actions';
//import users from '../routes/users';

const server = app.listen('8090');
const db =  process.env.MONGODB_URI || "mongodb://localhost/voteapp";

export default function startServer(store) {
    const io = require('socket.io').listen(server);  
    console.log('Polling Server is running at http://localhost:8090');
    mongoose.connect(db);
    
    //app.use(bodyParser.json());

    //app.use('/api/users', users);

    store.subscribe(() => {
        io.emit('state', store.getState().toJS());
    });

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', function(action) {
            switch(action.type) {
                case 'CREATE_POLL':
                    return store.dispatch(startCreatePoll(action.pollData));
                case 'VOTE_POLL':
                    return store.dispatch(startVotePoll(action.voteData));
                case 'USER_SIGNUP':
                    return store.dispatch(startSignup(action.userData));
            }
        })
        //socket.on('action', store.dispatch.bind(store)); //In most real-world cases, 
        //there should be some kind of firewall here, probably not dissimilar to the one
         //in the Vert.x Event Bus Bridge. Apps that have an authentication mechanism should also plug it in here.
    });
}