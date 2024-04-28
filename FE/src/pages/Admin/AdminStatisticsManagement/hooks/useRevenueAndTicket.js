import { useState } from "react"
import { StatisticManagementAPI } from "../../../../apis/Admin/StatisticsManagement/StatisticManagementAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";


export const useRevenueAndTicket = () => {

    //dispatch
    const dispatch = useDispatch();
    //state
    const [listYear, setListYear] = useState([]);
    const [listMonth, setListMonth] = useState([]);
    const [listLineTicketAndRevenue, setListLineTicketAndRevenue] = useState([]);


    const handleFetchYear = async (areaId) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticGetYear(areaId);
            setListYear(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handlFetchMonth = async (year, areaId) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticGetMonth(year, areaId);
            setListMonth(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchStatisticsLineTicketAndRevenue = async (areaId, year, month, dateStart, dateEnd, typeFilter) => {
        dispatch(setLoadingTrue());
        try {
            const response = await StatisticManagementAPI.fetchStatisticsLineTicketAndRevenue(areaId, year, month, dateStart, dateEnd, typeFilter);
            console.log(response.data.data);
            setListLineTicketAndRevenue(response.data.data);
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    return {
        handleFetchStatisticsLineTicketAndRevenue, listLineTicketAndRevenue,
        handleFetchYear, listYear,
        handlFetchMonth, listMonth
    };

}