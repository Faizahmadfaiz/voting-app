import {fromJS, List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function loadPoll(state, data) {
    data = fromJS(data);
    return state.merge(data);
}

export function createPoll(pollsState, newPoll) {
    newPoll = fromJS(newPoll);
    return pollsState.push(newPoll);
};

function func(list, voteData) {
	return list.map((val) => {
  	if(val.get('_id') === voteData.get('option_id')) {
    	return val.update('voters', (list=List([])) => list.push(voteData.get('voter_id')));
    }
    return val;
  });
}

export function votePoll(state, voteData) {
    voteData = fromJS(voteData);
    let polls = state.get('polls').map((poll) => {
        if(String(poll.get('_id')) === String(voteData.get('_id'))) {
            return poll.update((val) => voteData);
        }
        return poll;
    });
    return state.mergeIn(['polls'], polls);
};