import { URL_API_ADMIN_FORMAT_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"

export class FormatManagementAPI {

    static fetchPostFormat = (data) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_FORMAT_MANAGEMENT + "/post-format",
            data: data
        });
    };

    static fetchPutFormat = (data) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_FORMAT_MANAGEMENT + "/put-format",
            data: data
        });
    };

    static fetchDeleteFormat = (formatId) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_FORMAT_MANAGEMENT + `/delete-format/${formatId}`,
        });
    };

    static fetchListSearch = (inputSearch, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_FORMAT_MANAGEMENT + "/get-search-format",
            params: {
                inputSearch: inputSearch,
                page: page
            }
        });
    };

    static fetchDetailFormat = (formatId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_FORMAT_MANAGEMENT + `/get-detail-format/${formatId}`,
        });
    };

}