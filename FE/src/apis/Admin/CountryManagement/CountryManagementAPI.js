import { URL_API_ADMIN_COUNTRY_MANAGEMENT } from "../../../app/BaseApi/BaseApi"
import { requestAPI } from "../../axiosCustomize"

export class CountryManagementAPI {

    static fetchPostCountry = (data) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_COUNTRY_MANAGEMENT + "/post-country",
            data: data
        });
    };

    static fetchPutCountry = (data) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_COUNTRY_MANAGEMENT + "/put-country",
            data: data
        });
    };

    static fetchDeleteCountry = (countryId) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_COUNTRY_MANAGEMENT + `/delete-country/${countryId}`,
        });
    };

    static fetchListSearch = (inputSearch, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_COUNTRY_MANAGEMENT + "/get-search-country",
            params: {
                inputSearch: inputSearch,
                page: page
            }
        });
    };

    static fetchDetailCountry = (countryId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_COUNTRY_MANAGEMENT + `/get-detail-country/${countryId}`,
        });
    };

}