import { URL_API_CLIENT_INFORMATION_CLIENT } from "../../../app/BaseApi/BaseApi";
import { requestAPIClient } from "../../axiosCustomize";


export class InformationClientAPI {

    static fetchProvince = () => {
        return requestAPIClient({
            method: "GET",
            url: "https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100",
        });
    };

    static fetchDetailClient = (id) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_INFORMATION_CLIENT + `/detail-client/${id}`,
        });
    };

    static fetchPutClient = (putClientRequest) => {
        return requestAPIClient({
            method: "PUT",
            url: URL_API_CLIENT_INFORMATION_CLIENT + "/put-client",
            data: putClientRequest
        });
    };

    static fetchTransactionHistory = (clientId, dateFind, page) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_INFORMATION_CLIENT + "/transaction-history",
            params: {
                clientId: clientId,
                dateFind: dateFind,
                page: page
            }
        });
    };

};