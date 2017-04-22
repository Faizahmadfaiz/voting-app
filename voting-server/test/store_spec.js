import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

    it('is a Redux store configured with the corret reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        const user = Map({
            _id: "auth1",
            username: "rusty"
        });
        const pollData = fromJS({
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
        });
        store.dispatch({
            type: 'CREATE_POLL',
            pollData
        });

        expect(store.getState()).to.equal(fromJS({
            polls: [pollData]
        }));
    });
});