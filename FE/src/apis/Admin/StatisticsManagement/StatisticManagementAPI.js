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

}