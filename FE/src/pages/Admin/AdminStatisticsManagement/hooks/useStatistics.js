import { useEffect, useState } from "react"
import { StatisticManagementAPI } from "../../../../apis/Admin/StatisticsManagement/StatisticManagementAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";


export const useStatistics = () => {

    //dispatch
    const dispatch = useDispatch();
    //state
    const [listArea, setListArea] = useState([]);

    const handleFetchListArea = async () => {
        dispatch(setLoadingTrue());
        try {
            const response = await StatisticManagementAPI.fetchListArea();
            setListArea(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    useEffect(() => {
        handleFetchListArea();
    }, []);

    return {
        listArea
    }

}