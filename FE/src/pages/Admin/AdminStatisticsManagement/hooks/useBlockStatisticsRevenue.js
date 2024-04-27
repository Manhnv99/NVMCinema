import { useEffect, useState } from "react"
import { StatisticManagementAPI } from "../../../../apis/Admin/StatisticsManagement/StatisticManagementAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";


export const useBlockStatisticsRevenue = () => {

    const [revenueForYear, setRevenueForYear] = useState({
        ticketSold: 0,
        totalRevenue: 0
    });
    const [revenueForMonth, setRevenueForMonth] = useState({
        ticketSold: 0,
        totalRevenue: 0
    });
    const [revenueForToday, setRevenueForToday] = useState({
        ticketSold: 0,
        totalRevenue: 0
    });

    const handleFetchStatisticRevenueForYear = async (areaId) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticRevenueForYear(areaId);
            setRevenueForYear(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchStatisticRevenueForMonth = async (areaId) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticRevenueForMonth(areaId);
            setRevenueForMonth(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchStatisticRevenueForToday = async (areaId) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticRevenueForToday(areaId);
            setRevenueForToday(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    useEffect(() => {
        handleFetchStatisticRevenueForYear("1");
        handleFetchStatisticRevenueForMonth("1");
        handleFetchStatisticRevenueForToday("1");
    }, []);

    return {
        revenueForYear, revenueForMonth, revenueForToday
    };

};