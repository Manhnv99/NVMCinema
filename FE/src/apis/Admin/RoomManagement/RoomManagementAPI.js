import { URL_API_ADMIN_ROOM_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"

export class RoomManagementAPI {

    static fetchListSearch = (inputSearch, branchId, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + "/get-search-room",
            params: {
                inputSearch: inputSearch,
                branchId: branchId,
                page: page
            }
        });
    };

    static fetchGetOne = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/get-one-room/${id}`,
        });
    };

    static fetchGetDetail = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/get-detail-room/${id}`,
        });
    };

    static fetchListChair = (roomId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/get-list-chair/${roomId}`,
        });
    };

    static fetchListArea = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/get-list-area`,
        });
    };

    static fetchListBranch = (areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/get-list-branch/${areaId}`,
        });
    };

    static fetchPost = (postRequest) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + "/post-room",
            data: postRequest
        });
    };

    static fetchPut = (putRequest) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + "/put-room",
            data: putRequest
        });
    };

    static fetchDelete = (id) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/delete-room/${id}`,
        });
    };

}