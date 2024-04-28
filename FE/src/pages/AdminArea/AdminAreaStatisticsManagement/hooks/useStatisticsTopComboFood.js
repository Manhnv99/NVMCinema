import { useState } from "react";
import { StatisticManagementAPI } from "../../../../apis/AdminArea/StatisticsManagement/StatisticManagementAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";


export const useStatisticsTopComboFood = () => {

    //state
    const [topComboFood, setTopComboFood] = useState([]);

    const handleFetchStatisticsTopComboFood = async (areaId) => {
        try {
            const response = await StatisticManagementAPI.fetchStatisticTopComboFood(areaId);
            setTopComboFood(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    }

    return {
        handleFetchStatisticsTopComboFood, topComboFood
    };

};