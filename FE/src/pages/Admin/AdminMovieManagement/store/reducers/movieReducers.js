import { SET_LIST_MOVIE_CONSTANT } from "../constant/movieConstant";

export const INITIAL_STATE = {
    listMovie: []
};

export const movieReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LIST_MOVIE_CONSTANT:
            return {
                state,
                listMovie: action.payload
            }
        default:
            return state
    }
};