import { useState } from "react";
import { StatisticManagementAPI } from "../../../../apis/AdminArea/StatisticsManagement/StatisticManagementAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";


export const useStatisticsTopGenreAndTicket = () => {

    //state
    const [topGenreAndTicket, setTopGenreAndTicket] = useState([]);

    const handleFetchStatisticsTopGenreAndTicket = async (areaId, top) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticTopGenreAndTicket(areaId, top);
            setTopGenreAndTicket(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    }

    return {
        handleFetchStatisticsTopGenreAndTicket, topGenreAndTicket
    };

};