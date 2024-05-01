import { URL_API_CLIENT_CINEMA_SYSTEM } from "../../../app/BaseApi/BaseApi";
import { requestAPIClient } from "../../axiosCustomize"


export class CinemaSystemAPI {

    static fetchListBranch = () => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_CINEMA_SYSTEM + "/get-list-branch"
        });
    };

    static fetchDetailBranch = (branchId) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_CINEMA_SYSTEM + `/get-detail-branch/${branchId}`
        });
    };

}