import { URL_API_ADMIN_SHOWTIME_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"

export class ShowTimeManagementAPI {

    static fetchListSearch = (movieName, areaId, branchId, roomId, typeShowTime, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT,
            params: {
                movieName: movieName,
                areaId: areaId,
                branchId: branchId,
                roomId: roomId,
                typeShowTime: typeShowTime,
                page: page
            }
        });
    };

    static fetchGetOne = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/one/${id}`,
        });
    };

    static fetchGetDetail = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/${id}`,
        });
    };

    static fetchListTicketChair = (showTimeId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/ticket-chair/${showTimeId}`,
        });
    };

    static fetchListArea = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/areas`,
        });
    };

    static fetchListBranch = (areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/branches/${areaId}`,
        });
    };

    static fetchListRoom = (branchId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/rooms/${branchId}`,
        });
    };

    static fetchListMovieCurrentShowing = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/movie-current-showing`,
        });
    };

    static fetchListMoviePreTicket = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT + `/movie-pre-ticker`,
        });
    };

    static fetchPost = (postRequest) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT,
            data: postRequest
        });
    };

    static fetchPut = (putRequest) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_SHOWTIME_MANAGEMENT,
            data: putRequest
        });
    };

}