import { SET_5DAY, SET_SEARCH } from "./actions";

export function searchReducer(state = null, action){
    
    switch (action.type) {
        case SET_SEARCH:
            return action.data;
        default:
            return state;
    }
}

export function search5DayReducer(state = null, action){
    
    switch (action.type) {
        case SET_5DAY:
            return action.data;
        default:
            return state;
    }
}

