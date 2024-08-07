import { SET_CURRENT_PAGE, SET_INFOR_LIST_SEARCH_CONSTANT, SET_INFOR_SEARCH_CONSTANT } from "../constant/ShowTimeConstants"


export const INITIAL_STATE = {
    inforListShowTime: {
        listShowTime: [],
        totalElement: 0
    },
    inforSearch: {
        movieName: "",
        branchId: "",
        roomId: ""
    },
    currentPage: 1
}

export const showTimeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_INFOR_LIST_SEARCH_CONSTANT:
            return {
                ...state,
                inforListShowTime: action.payload
            }
        case SET_INFOR_SEARCH_CONSTANT:
            return {
                ...state,
                inforSearch: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
    }
}