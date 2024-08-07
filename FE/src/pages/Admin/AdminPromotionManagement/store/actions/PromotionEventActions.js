import { SET_CURRENT_PAGE, SET_INFOR_LIST_CONSTANT, SET_INFOR_SEARCH_CONSTANT } from "../constant/PromotionEventConstant"

export const setInforListAction = (data) => {
    return {
        type: SET_INFOR_LIST_CONSTANT,
        payload: data
    }
};

export const setInforSearchAction = (data) => {
    return {
        type: SET_INFOR_SEARCH_CONSTANT,
        payload: data
    }
};

export const setCurrentPageStore = (data) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: data
    }
};