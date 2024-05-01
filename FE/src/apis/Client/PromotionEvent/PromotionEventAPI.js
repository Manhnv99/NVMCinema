import { URL_API_CLIENT_PROMOTION_EVENT } from "../../../app/BaseApi/BaseApi";
import { requestAPIClient } from "../../axiosCustomize";


export class PromotionEventAPI {

    static fetchListPromotionEvent = () => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_PROMOTION_EVENT + "/get-list-promotion_event"
        });
    };

    static fetchDetailPromotionEvent = (peId) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_PROMOTION_EVENT + `/get-detail-promotion_event/${peId}`
        });
    };

}