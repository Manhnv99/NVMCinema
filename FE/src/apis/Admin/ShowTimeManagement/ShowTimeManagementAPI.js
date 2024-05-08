import { URL_API_ADMIN_SHOWTIME_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"

export class ShowTimeManagementAPI {

    static fetchListSearch = (movieName, areaId, branchId, roomId, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + "/get-search-showtime",
            params: {
                movieName: movieName,
                areaId: areaId,
                branchId: branchId,
                roomId: roomId,
                page: page
            }
        });
    };

    static fetchGetOne = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/get-one-showtime/${id}`,
        });
    };

    static fetchGetDetail = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/get-detail-showtime/${id}`,
        });
    };

    static fetchListTicketChair = (showTimeId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/get-list-ticket-chair/${showTimeId}`,
        });
    };

    static fetchListArea = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/get-list-area`,
        });
    };

    static fetchListBranch = (areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/get-list-branch/${areaId}`,
        });
    };

    static fetchListRoom = (branchId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/get-list-room/${branchId}`,
        });
    };

    static fetchListMovieCurrentShowing = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/get-list-movie-current-showing`,
        });
    };

    static fetchListMoviePreTicket = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/get-list-movie-pre-ticker`,
        });
    };

    static fetchPost = (postRequest) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/post-showtime`,
            data: postRequest
        });
    };

    static fetchPut = (putRequest) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/put-showtime`,
            data: putRequest
        });
    };

}