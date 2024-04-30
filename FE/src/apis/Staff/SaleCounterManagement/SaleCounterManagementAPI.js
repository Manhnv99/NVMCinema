import { URL_API_STAFF_SALE_COUNTER_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize";


export class SaleCounterManagementAPI {

    static fetchListSearchMovie = (name, director, genre, format, country, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + "/get-search-movie",
            params: {
                name: name,
                director: director,
                genre: genre,
                format: format,
                country: country,
                page: page
            }
        });
    };

    static fetchListCountry = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + "/get-list-country"
        });
    };

    static fetchListDirector = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + "/get-list-director"
        });
    };

    static fetchListGenre = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + "/get-list-genre"
        });
    };

    static fetchListFormat = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + "/get-list-format"
        });
    };

    static fetchListShowTime = (movieId, branchId, date) => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + "/list-show-time",
            params: {
                movieId: movieId,
                branchId: branchId,
                date: date,
            }
        });
    };

    static fetchDetailShowTime = (showTimeId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + `/detail-showtime/${showTimeId}`
        });
    };

    static fetchListTicketChair = (showTimeId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + `/list-ticket-chair/${showTimeId}`
        });
    };

    static fetchListComboFood = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + `/list-combo-food`
        });
    };

    static fetchPromotionEvent = (code) => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + `/get-pme-price`,
            params: {
                code: code
            }
        });
    };

    static fetchOnlineBanking = (paymentRequest) => {
        return requestAPI({
            method: "POST",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + "/start-online-banking",
            data: paymentRequest
        });
    };

    static fetchCashPayment = (paymentRequest) => {
        return requestAPI({
            method: "POST",
            url: URL_API_STAFF_SALE_COUNTER_MANAGEMENT + "/cash-payment",
            data: paymentRequest
        });
    }

}