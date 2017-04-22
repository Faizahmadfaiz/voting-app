import axios from 'axios';

export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function votePoll(voteData) {
    return {
        meta: {remote: true},
        type: 'VOTE_POLL',
        voteData
    };
}

export function createPoll(pollData) {
    return {
        meta: {remote: true},
        type: 'CREATE_POLL',
        pollData
    };
}


export function userSignupRequest(userData) {
    return {
        meta: {remote: true},
        type: 'USER_SIGNUP',
        userData
    }
}

export function addFlashMessage(message) {
    return {
        type: 'ADD_FLASH_MESSAGE',
        message
    }
}

export function deleteFlashMessage(id) {
    return {
        type: 'DELETE_FLASH_MESSAGE',
        id
    }
}