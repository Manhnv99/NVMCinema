import { URL_API_ADMIN_STAFF_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"

export class StaffManagementAPI {

    static fetchListArea = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + "/get-all-area"
        });
    };

    static fetchPostStaff = (data) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + "/post-staff",
            data: data
        });
    };

    static fetchPutStaff = (data) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + "/put-staff",
            data: data
        });
    };

    static fetchListSearchStaff = (inputSearch, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + "/get-search-staff",
            params: {
                inputSearch: inputSearch,
                page: page
            }
        });
    };

    static fetchOneStaff = (userId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + "/get-one-staff",
            params: {
                userId: userId
            }
        });
    };

    static fetchDetailStaff = (userId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + "/get-detail-staff",
            params: {
                userId: userId
            }
        });
    };

    static fetchDeleteStaff = (userId) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_STAFF_MANAGEMENT + `/delete-staff/${userId}`,
        });
    };

}