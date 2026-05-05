import { URL_API_ADMIN_ROOM_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"

export class RoomManagementAPI {

    static fetchListSearch = (inputSearch, branchId, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_ROOM_MANAGEMENT,
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
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/one/${id}`,
        });
    };

    static fetchGetDetail = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/${id}`,
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
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/areas`,
        });
    };

    static fetchListBranch = (areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/branchs/${areaId}`,
        });
    };

    static fetchPost = (postRequest) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_ROOM_MANAGEMENT,
            data: postRequest
        });
    };

    static fetchPut = (putRequest) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_ROOM_MANAGEMENT,
            data: putRequest
        });
    };

    static fetchDelete = (id) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_ROOM_MANAGEMENT + `/${id}`,
        });
    };

}