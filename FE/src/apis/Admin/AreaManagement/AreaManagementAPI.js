import { URL_API_ADMIN_AREA_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"

export class AreaManagementAPI {

    static fetchPostArea = (data) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_AREA_MANAGEMENT + "/post-area",
            data: data
        });
    };

    static fetchPutArea = (data) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_AREA_MANAGEMENT + "/put-area",
            data: data
        });
    };

    static fetchDeleteArea = (areaId) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_AREA_MANAGEMENT + `/delete-area/${areaId}`,
        });
    };

    static fetchListSearch = (inputSearch, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_AREA_MANAGEMENT + "/get-search-area",
            params: {
                inputSearch: inputSearch,
                page: page
            }
        });
    };

    static fetchDetailArea = (areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_AREA_MANAGEMENT + `/get-detail-area/${areaId}`,
        });
    };

}