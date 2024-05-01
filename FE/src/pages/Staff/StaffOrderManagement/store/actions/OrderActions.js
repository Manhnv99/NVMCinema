import {
    SET_DETAIL_ORDER_CONSTANT,
    SET_INFOR_LIST_ORDER_CONSTANT,
    SET_INFOR_SEARCH_CONSTANT,
    SET_ORDER_STATUS_CONSTANT
} from "../constant/OrderConstant";


export const setInforSearchAction = (payload) => {
    return {
        type: SET_INFOR_SEARCH_CONSTANT,
        payload: payload
    };
};

export const setInforListOrderAction = (payload) => {
    return {
        type: SET_INFOR_LIST_ORDER_CONSTANT,
        payload: payload
    };
};

export const setOrderStatusAction = (payload) => {
    return {
        type: SET_ORDER_STATUS_CONSTANT,
        payload: payload
    };
};

export const setDetailOrderAction = (payload) => {
    return {
        type: SET_DETAIL_ORDER_CONSTANT,
        payload: payload
    };
};