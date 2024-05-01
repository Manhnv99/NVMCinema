import {
    SET_BOOK_TICKET_PROGRESS_CONSTANT,
    SET_DETAIL_ORDER_CONSTANT,
    SET_INFOR_LIST_MOVIE_CONSTANT,
    SET_INFOR_SEARCH_CONSTANT
} from "../constant/SaleCounterConstant";

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
    },
    bookTicketProgress: 1,
    detailOrder: {}
};

export const SaleCounterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_INFOR_LIST_MOVIE_CONSTANT:
            return {
                ...state,
                inforListMovie: action.payload
            };
        case SET_INFOR_SEARCH_CONSTANT:
            return {
                ...state,
                inforSearch: action.payload
            };
        case SET_BOOK_TICKET_PROGRESS_CONSTANT:
            return {
                ...state,
                bookTicketProgress: action.payload
            };
        case SET_DETAIL_ORDER_CONSTANT:
            return {
                ...state,
                detailOrder: action.payload
            }
        default:
            return state
    }
};