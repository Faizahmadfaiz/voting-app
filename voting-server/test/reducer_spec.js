import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles CREATE_POLL', () => {
        const user = {
            _id: "auth1",
            username: "rusty"
        };
        const initialState = fromJS({
            users: [user]
        });
        
        const pollData = {
            _id: "abc123",
            name: "Favourite food",
            options: [
                {
                    _id: "bir1",
                    name: "Biryani"
                },
                {
                    _id: "piz2",
                    name: "Pizza"
                }
            ],
            author: user
        };
        const action = {type: 'CREATE_POLL', pollData};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            polls: [pollData],
            users: [user]
        }));
    });

    it('handles VOTE_POLL', () => {
        const initialState = fromJS({
            polls:[{
                _id: "abc123",
                name: "Favourite food",
                options: [
                    {
                        _id: "bir1",
                        name: "Biryani"
                    },
                    {
                        _id: "piz2",
                        name: "Pizza"
                    }
                ],
                author: {
                    _id: "auth1",
                    username: "rusty"
                }
            }]
        });
        const voteData = {
            voter_id: "auth2",
            poll_id: "abc123",
            option_id: "piz2"
        };
        const action = {type: 'VOTE_POLL', voteData};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            polls:[{
                _id: "abc123",
                name: "Favourite food",
                options: [
                    {
                        _id: "bir1",
                        name: "Biryani"
                    },
                    {
                        _id: "piz2",
                        name: "Pizza",
                        voters: ["auth2"]
                    }
                ],
                voters_id: ["auth2"],
                author: {
                    _id: "auth1",
                    username: "rusty"
                }
            }]
        }));
    });
});