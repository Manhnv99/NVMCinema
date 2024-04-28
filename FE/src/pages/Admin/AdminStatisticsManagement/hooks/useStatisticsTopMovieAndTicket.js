import { useState } from "react";
import { StatisticManagementAPI } from "../../../../apis/Admin/StatisticsManagement/StatisticManagementAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";


export const useStatisticsTopMovieAndTicket = () => {

    //state
    const [topMovieAndTicket, setTopMovieAndTicket] = useState([]);

    const handleFetchStatisticsTopMovieAndTicket = async (areaId, top) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticTopMovieAndTicket(areaId, top);
            setTopMovieAndTicket(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    }

    return {
        handleFetchStatisticsTopMovieAndTicket, topMovieAndTicket
    };

};