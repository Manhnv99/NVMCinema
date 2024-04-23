import { SET_CURRENT_PAGE, SET_INFOR_LIST_ROOM_CONSTANT, SET_INFOR_SEARCH_ROOM_CONSTANT } from "../constant/RoomConstant"

export const INITIAL_STATE = {
    inforListRoom: {
        listRoom: [],
        totalElement: 0
    },
    inforSearch: {
        inputSearch: "",
        branchId: ""
    },
    currentPageStore: 1
}

export const RoomReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_INFOR_LIST_ROOM_CONSTANT:
            return {
                ...state,
                inforListRoom: action.payload
            }
        case SET_INFOR_SEARCH_ROOM_CONSTANT:
            return {
                ...state,
                inforSearch: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPageStore: action.payload
            }
        default:
            return state;
    }
}