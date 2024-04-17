import { SET_INFOR_LIST_CONSTANT, SET_INFOR_SEARCH_CONSTANT } from "../constant/PromotionEventConstant";

export const INITIAL_STATE = {
    inforList: {
        listPE: [],
        totalElement: 0
    },
    inforSearch: {
        name: "",
        timeStart: "",
        timeEnd: ""
    }
};

export const PromotionEventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_INFOR_LIST_CONSTANT:
            return {
                ...state,
                inforList: action.payload
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