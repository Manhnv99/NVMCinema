import { SET_DETAIL_STAFF_CONSTANT, SET_LIST_STAFF_CONSTANT, SET_SEARCH_VALUE_CONSTANT, SET_TOTAL_ELEMENT_CONSTANT } from "../constant/StaffConstant"

export const setListStaffAction = (payload) => {
    return {
        type: SET_LIST_STAFF_CONSTANT,
        payload: payload
    };
};

export const setSearchValueAction = (payload) => {
    return {
        type: SET_SEARCH_VALUE_CONSTANT,
        payload: payload
    };
};

export const setDetailStaffAction = (payload) => {
    return {
        type: SET_DETAIL_STAFF_CONSTANT,
        payload: payload
    };
};

export const setTotalElementAction = (payload) => {
    return {
        type: SET_TOTAL_ELEMENT_CONSTANT,
        payload: payload
    };
};
