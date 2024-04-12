import { SET_INFOR_LIST_MOVIE_CONSTANT, SET_INFOR_SEARCH_CONSTANT } from "../constant/movieConstant";

export const INITIAL_STATE = {
    inforListMovie: {
        listMovie: [],
        totalElement: 0
    },
    inforSearch: {
        name: "",
        director: "",
        genre: "",
        format: "",
        country: ""
    }
};

export const movieReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_INFOR_LIST_MOVIE_CONSTANT:
            return {
                ...state,
                inforListMovie: action.payload
            }
        case SET_INFOR_SEARCH_CONSTANT:
            return {
                ...state,
                inforSearch: action.payload
            }
        default:
            return state
    }
};