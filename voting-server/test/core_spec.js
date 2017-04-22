import {fromJS, List, Map} from 'immutable';
import {expect} from 'chai';

import {createPoll, votePoll} from '../src/core';

describe('application logic', () => {

  describe('create a poll', () => {

    it('adds poll to state', () => {
        
        const poll1 = fromJS({
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
        });
        const pollData = fromJS({
            _id: "def345",
            name: "Favourite Color",
            options: [
                {
                    _id: "col1",
                    name: "Red"
                },
                {
                    _id: "col2",
                    name: "Blue"
                }
            ],
            author: {
                _id: "auth2",
                username: "musty"
            }
        });
      const initialState = List([poll1]);
     
      const nextState = createPoll(initialState, pollData);

      expect(nextState).to.equal(List([poll1, pollData]));
    });

    it('vote on one of the choices', () => {
        const state = fromJS({
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
        const vote = fromJS({
            voter_id: "auth2",
            poll_id: "abc123",
            option_id: "piz2"
        });
        const nextState = votePoll(state, vote);

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

});
