import { SET_CURRENT_PAGE_CONSTANT, SET_INFOR_LIST_SEARCH_CONSTANT, SET_INFOR_SEARCH_CONSTANT, SET_TYPE_OF_MOVIE_CONSTANT } from "../constant/ShowTimeConstants";


export const setInforListSearchAction = (data) => {
    return {
        type: SET_INFOR_LIST_SEARCH_CONSTANT,
        payload: data
    };
};

export const setInforSearchAction = (data) => {
    return {
        type: SET_INFOR_SEARCH_CONSTANT,
        payload: data
    };
};

export const setCurrentPage = (data) => {
    return {
        type: SET_CURRENT_PAGE_CONSTANT,
        payload: data
    };
};

export const setTypeOfMovieAction = (data) => {
    return {
        type: SET_TYPE_OF_MOVIE_CONSTANT,
        payload: data
    };
};