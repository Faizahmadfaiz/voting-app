import {List} from 'immutable';

import {createPoll, votePoll, loadPoll, INITIAL_STATE} from './core';

export default function reducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        case 'LOAD_POLLS':
            return loadPoll(state, action.data);
        case 'CREATE_POLL':
            return state.update('polls',(pollsState=List()) => createPoll(pollsState, action.pollData));
        case 'VOTE_POLL':
            return votePoll(state, action.voteData);
    }
    return state;
}