import { URL_API_ADMIN_STATISTICS_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize"


export class StatisticManagementAPI {

    static fetchStatisticRevenueForYear = (areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STATISTICS_MANAGEMENT + `/statistics-revenue-for-year/${areaId}`
        });
    };

    static fetchStatisticRevenueForMonth = (areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STATISTICS_MANAGEMENT + `/statistics-revenue-for-month/${areaId}`
        });
    };

    static fetchStatisticRevenueForToday = (areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STATISTICS_MANAGEMENT + `/statistics-revenue-for-today/${areaId}`
        });
    };

    static fetchStatisticGetYear = (areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STATISTICS_MANAGEMENT + `/statistics-get-year`,
            params: {
                areaId: areaId
            }
        });
    };

    static fetchStatisticGetMonth = (year, areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STATISTICS_MANAGEMENT + `/statistics-get-month`,
            params: {
                year: year,
                areaId: areaId
            }
        });
    };

    static fetchListArea = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STATISTICS_MANAGEMENT + "/statistics-get-area",
        });
    };

    static fetchStatisticsLineTicketAndRevenue = (areaId, year, month, dateStart, dateEnd, typeFilter) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STATISTICS_MANAGEMENT + "/statistics-line-ticket-revenue",
            params: {
                areaId: areaId,
                year: year,
                month: month,
                dateStart: dateStart,
                dateEnd: dateEnd,
                typeFilter: typeFilter
            }
        });
    };

    static fetchStatisticTopMovieAndTicket = (areaId, top) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STATISTICS_MANAGEMENT + `/statistics-top-movie-and-ticket`,
            params: {
                areaId: areaId,
                top: top
            }
        });
    };

    static fetchStatisticTopGenreAndTicket = (areaId, top) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STATISTICS_MANAGEMENT + `/statistics-top-genre-and-ticket`,
            params: {
                areaId: areaId,
                top: top
            }
        });
    };

    static fetchStatisticTopComboFood = (areaId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_STATISTICS_MANAGEMENT + `/statistics-top-combo-food`,
            params: {
                areaId: areaId
            }
        });
    };

}