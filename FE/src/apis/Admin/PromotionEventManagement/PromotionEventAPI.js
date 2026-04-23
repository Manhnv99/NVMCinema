import { URL_API_ADMIN_PROMOTION_EVENT_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"


export class PromotionEventAPI {

    static fetchListSearch = (name, timeStart, timeEnd, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_PROMOTION_EVENT_MANAGEMENT,
            params: {
                name: name,
                timeStart: timeStart,
                timeEnd: timeEnd,
                page: page
            }
        });
    };

    static fetchDetail = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_PROMOTION_EVENT_MANAGEMENT + `/${id}`,
        });
    };

    static fetchDelete = (id) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_PROMOTION_EVENT_MANAGEMENT + `/${id}`,
        });
    };

    static fetchPost = (postRequest) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_PROMOTION_EVENT_MANAGEMENT,
            data: postRequest
        });
    };

    static fetchPut = (putRequest) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_PROMOTION_EVENT_MANAGEMENT,
            data: putRequest
        });
    };

    // static fetchDelete = (id) => {
    //     return requestAPI({
    //         method: "DELETE",
    //         url: URL_API_ADMIN_PROMOTION_EVENT_MANAGEMENT + `/delete-promotion_event/${id}`,
    //     });
    // };

}
