import {
    SET_BOOK_TICKET_PROGRESS_CONSTANT,
    SET_INFOR_LIST_MOVIE_CONSTANT,
    SET_INFOR_SEARCH_CONSTANT,
} from "../constant/SaleCounterConstant"


export const setInforListMovieAction = (payload) => {
    return {
        type: SET_INFOR_LIST_MOVIE_CONSTANT,
        payload: payload
    };
};

export const setInforSearchAction = (payload) => {
    return {
        type: SET_INFOR_SEARCH_CONSTANT,
        payload: payload
    };
};

export const setBookTicketProgressAction = (payload) => {
    return {
        type: SET_BOOK_TICKET_PROGRESS_CONSTANT,
        payload: payload
    };
};