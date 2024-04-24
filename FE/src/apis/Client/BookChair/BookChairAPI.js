import { URL_API_CLIENT_BOOK_CHAIR } from "../../../app/BaseApi/BaseApi";
import { requestAPIClient } from "../../axiosCustomize"


export class BookChairAPI {

    static fetchDetailShowTime = (showTimeId) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_BOOK_CHAIR + `/detail-showtime/${showTimeId}`
        });
    };

    static fetchListTicketChair = (showTimeId) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_BOOK_CHAIR + `/list-ticket-chair/${showTimeId}`
        });
    };

    static fetchListComboFood = () => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_BOOK_CHAIR + `/list-combo-food`
        });
    };



}