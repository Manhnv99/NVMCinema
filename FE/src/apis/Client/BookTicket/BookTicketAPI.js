import { URL_API_CLIENT_BOOK_TICKET } from "../../../app/BaseApi/BaseApi";
import { requestAPIClient } from "../../axiosCustomize"


export class BookTicketAPI {

    static fetchListBranch = (areaId) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_BOOK_TICKET + `/list-branch/${areaId}`
        });
    };

    static fetchListShowTime = (movieId, branchId, areaId, date) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_BOOK_TICKET + "/list-show-time",
            params: {
                movieId: movieId,
                branchId: branchId,
                areaId: areaId,
                date: date,
            }
        });
    };

}