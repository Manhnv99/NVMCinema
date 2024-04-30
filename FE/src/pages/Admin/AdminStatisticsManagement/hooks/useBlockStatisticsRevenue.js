import { useEffect, useState } from "react"
import { StatisticManagementAPI } from "../../../../apis/Admin/StatisticsManagement/StatisticManagementAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";


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

    //loading
    const dispatch = useDispatch();

    const handleFetchStatisticRevenueForYear = async (areaId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await StatisticManagementAPI.fetchStatisticRevenueForYear(areaId);
            setRevenueForYear(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const handleFetchStatisticRevenueForMonth = async (areaId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await StatisticManagementAPI.fetchStatisticRevenueForMonth(areaId);
            setRevenueForMonth(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const handleFetchStatisticRevenueForToday = async (areaId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await StatisticManagementAPI.fetchStatisticRevenueForToday(areaId);
            setRevenueForToday(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
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