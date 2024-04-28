import { ExtractInforToken } from "../../../../../utils/Extract/ExtractInforToken";
import { SET_DETAIL_STAFF_CONSTANT, SET_LIST_STAFF_CONSTANT, SET_SEARCH_VALUE_CONSTANT, SET_TOTAL_ELEMENT_CONSTANT } from "../constant/StaffConstant";

export const INITIAL_STATE = {
    listStaff: [],
    searchValue: "",
    detailStaff: {},
    totalElement: 0,
    areaId: ExtractInforToken().areaId
}

export const StaffReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LIST_STAFF_CONSTANT:
            return {
                ...state,
                listStaff: action.payload
            };
        case SET_SEARCH_VALUE_CONSTANT:
            return {
                ...state,
                searchValue: action.payload
            };
        case SET_DETAIL_STAFF_CONSTANT:
            return {
                ...state,
                detailStaff: action.payload
            };
        case SET_TOTAL_ELEMENT_CONSTANT:
            return {
                ...state,
                totalElement: action.payload
            };
        default:
            return state;
    }
};