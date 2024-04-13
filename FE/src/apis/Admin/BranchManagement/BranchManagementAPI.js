import { URL_API_ADMIN_BRANCH_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"

export class BranchManagementAPI {

    static fetchPostBranch = (data) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_BRANCH_MANAGEMENT + "/post-branch",
            data: data
        });
    };

    static fetchPutBranch = (data) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_BRANCH_MANAGEMENT + "/put-branch",
            data: data
        });
    };

    static fetchDeleteBranch = (id) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_BRANCH_MANAGEMENT + `/delete-branch/${id}`,
        });
    };

    static fetchListSearch = (searchRequest, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_BRANCH_MANAGEMENT + "/get-search-branch",
            params: {
                inputSearch: searchRequest.inputSearch,
                areaId: searchRequest.areaId,
                page: page
            }
        });
    };

    static fetchGetOne = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_BRANCH_MANAGEMENT + `/get-one-branch/${id}`,
        });
    };
    static fetchDetail = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_BRANCH_MANAGEMENT + `/get-detail-branch/${id}`
        });
    };

    static fetchDetailBranch = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_BRANCH_MANAGEMENT + `/get-detail-branch/${id}`,
        });
    };

    static fetchListArea = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_BRANCH_MANAGEMENT + `/get-list-area`,
        })
    }

}