import { useEffect, useState } from "react";
import { StatisticManagementAPI } from "../../../../apis/Admin/StatisticsManagement/StatisticManagementAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";


export const useStatisticsTopMovieAndTicket = () => {

    const [yearFilter, setYearFilter] = useState([]);
    const [monthFilter, setMonthFilter] = useState([]);

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

    useEffect(() => {
        handleFetchStatisticGetYear("1");
        handleFetchStatisticGetMonth(new Date().getFullYear(), "1");
    }, []);

    return {
        yearFilter,
        handleFetchStatisticGetMonth, monthFilter
    };

};