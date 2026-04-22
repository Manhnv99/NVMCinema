import { URL_API_ADMIN_STAFF_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"

export class StaffManagementAPI {

    static fetchListArea = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + "/areas"
        });
    };

    static fetchPostStaff = (data) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_STAFF_MANAGEMENT,
            data: data
        });
    };

    static fetchPutStaff = (data) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_STAFF_MANAGEMENT,
            data: data
        });
    };

    static fetchListSearchStaff = (inputSearch, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STAFF_MANAGEMENT,
            params: {
                inputSearch: inputSearch,
                page: page
            }
        });
    };

    static fetchOneStaff = (userId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + "/one",
            params: {
                userId: userId
            }
        });
    };

    static fetchDetailStaff = (userId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + `/${userId}`
        });
    };

    static fetchDeleteStaff = (userId) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + `/${userId}`,
        });
    };

}