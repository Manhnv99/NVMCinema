import { CHUA_DUYET_CONSTANT } from "../../../../../app/Constant/OrderStatusConstant";
import {
    SET_DETAIL_ORDER_CONSTANT,
    SET_INFOR_LIST_ORDER_CONSTANT,
    SET_INFOR_SEARCH_CONSTANT,
    SET_ORDER_STATUS_CONSTANT
} from "../constant/OrderConstant";

export const INITIAL_STATE = {
    inforListOrder: {
        listOrder: [],
        totalElement: 0
    },
    inforSearch: {
        orderCode: "",
        dateStart: null,
        dateEnd: null,
        timeStart: null
    },
    orderStatus: CHUA_DUYET_CONSTANT,
    detailOrder: {}
}

export const OrderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_INFOR_SEARCH_CONSTANT:
            return {
                ...state,
                inforSearch: action.payload
            };
        case SET_INFOR_LIST_ORDER_CONSTANT:
            return {
                ...state,
                inforListOrder: action.payload
            }
        case SET_ORDER_STATUS_CONSTANT:
            return {
                ...state,
                orderStatus: action.payload
            };
        case SET_DETAIL_ORDER_CONSTANT:
            return {
                ...state,
                detailOrder: action.payload
            };
        default:
            return state;
    }
};