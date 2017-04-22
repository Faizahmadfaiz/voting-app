import {fromJS, List, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

export function createPoll(pollsState, newPoll) {
    console.log("From CreatePoll");
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
function votePoll(state, voteData) {
    console.log("From CreatePoll");
    voteData = fromJS(voteData);
    let polls = state.get('polls').map((poll) => {
        if(poll.get('_id') === voteData.get('poll_id')) {
            let poll1 = poll.update('voters_id', (list=List([])) => list.push(voteData.get('voter_id')));
            return poll1.update('options', (list) => func(list, voteData));
        }
        return poll;
    });
    return state.mergeIn(['polls'], polls);
};

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
        return setState(state, action.state);
    case 'VOTE_POLL':
        return votePoll(state,action.voteData);
    case 'CREATE_POLL':
        return state.update('polls',(pollsState=List()) => createPoll(pollsState, action.pollData));
    }
  return state;
}










/*import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
    switch(action.type) {
        case 'ADD_FLASH_MESSAGE':
            return [
                ...state,
                {
                    id: shortid.generate,
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case 'DELETE_FLASH_MESSAGE':
            const index = findIndex(state, {id: action.id});
            if(index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ]
            }
            return state;
            
            default: return state;
    }
}*/