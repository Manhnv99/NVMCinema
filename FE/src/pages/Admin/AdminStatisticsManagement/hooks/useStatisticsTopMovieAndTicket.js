import { useEffect, useState } from "react";
import { StatisticManagementAPI } from "../../../../apis/Admin/StatisticsManagement/StatisticManagementAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import { ExtractInforToken } from "../../../../utils/Extract/ExtractInforToken";


export const useStatisticsTopMovieAndTicket = () => {

    const [yearFilter, setYearFilter] = useState([]);
    const [monthFilter, setMonthFilter] = useState([]);
    const [topMovieAndTicket, setTopMovieAndTicket] = useState([]);

    const handleFetchStatisticGetYear = async (areaId) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticGetYear(areaId);
            setYearFilter(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchStatisticGetMonth = async (year, areaId) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticGetMonth(year, areaId);
            setMonthFilter(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchStatisticsTopMovieAndTicket = async (areaId, top, year, month, dateStart, dateEnd) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticTopMovieAndTicket(areaId, top, year, month, dateStart, dateEnd);
            setTopMovieAndTicket(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    }

    useEffect(() => {
        handleFetchStatisticGetYear("1");
        handleFetchStatisticGetMonth(new Date().getFullYear(), "1");
        handleFetchStatisticsTopMovieAndTicket("1", 5, new Date().getFullYear(), null, null, null);
    }, []);

    return {
        yearFilter,
        handleFetchStatisticGetMonth, monthFilter,
        topMovieAndTicket
    };

};