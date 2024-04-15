import { SET_INFOR_LIST_ROOM_CONSTANT, SET_INFOR_SEARCH_ROOM_CONSTANT } from "../constant/RoomConstant"

export const setInforListRoomAction = (data) => {
    return {
        type: SET_INFOR_LIST_ROOM_CONSTANT,
        payload: data
    }
}

export const setInforSearchRoomAction = (data) => {
    return {
        type: SET_INFOR_SEARCH_ROOM_CONSTANT,
        payload: data
    }
}