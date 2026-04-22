import { URL_API_ADMIN_DIRECTOR_MANAGEMENT } from "../../../app/BaseApi/BaseApi"
import { requestAPI } from "../../axiosCustomize"

export class DirectorManagementAPI {

    static fetchPostDirector = (data) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_DIRECTOR_MANAGEMENT,
            data: data
        });
    };

    static fetchPutDirector = (data) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_DIRECTOR_MANAGEMENT,
            data: data
        });
    };

    static fetchDeleteDirector = (directorId) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_DIRECTOR_MANAGEMENT + `/${directorId}`,
        });
    };

    static fetchListSearch = (inputSearch, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_DIRECTOR_MANAGEMENT,
            params: {
                inputSearch: inputSearch,
                page: page
            }
        });
    };

    static fetchDetailDirector = (directorId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_DIRECTOR_MANAGEMENT + `/${directorId}`,
        });
    };

}