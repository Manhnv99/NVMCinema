import { SET_INFOR_LIST_MOVIE_CONSTANT, SET_INFOR_SEARCH_CONSTANT } from "../constant/movieConstant"


export const setInforListMovieAction = (payload) => {
    return {
        type: SET_INFOR_LIST_MOVIE_CONSTANT,
        payload: payload
    }
};

export const setInforSearchAction = (payload) => {
    return {
        type: SET_INFOR_SEARCH_CONSTANT,
        payload: payload
    }
};