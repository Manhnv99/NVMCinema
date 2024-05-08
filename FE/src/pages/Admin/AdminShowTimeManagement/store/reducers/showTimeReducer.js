import { MOVIE_CURRENT_SHOWING } from "../../../../../app/Constant/ShowTimeConstant"
import { SET_CURRENT_PAGE, SET_INFOR_LIST_SEARCH_CONSTANT, SET_INFOR_SEARCH_CONSTANT, SET_TYPE_OF_MOVIE_CONSTANT } from "../constant/ShowTimeConstants"


export const INITIAL_STATE = {
    inforListShowTime: {
        listShowTime: [],
        totalElement: 0
    },
    inforSearch: {
        movieName: "",
        areaId: "",
        branchId: "",
        roomId: ""
    },
    currentPage: 1,
    typeOrMovie: MOVIE_CURRENT_SHOWING.value
}

export const showTimeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_INFOR_LIST_SEARCH_CONSTANT:
            return {
                ...state,
                inforListShowTime: action.payload
            };
        case SET_INFOR_SEARCH_CONSTANT:
            return {
                ...state,
                inforSearch: action.payload
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        case SET_TYPE_OF_MOVIE_CONSTANT:
            return {
                ...state,
                typeOrMovie: action.payload
            };
    }
}