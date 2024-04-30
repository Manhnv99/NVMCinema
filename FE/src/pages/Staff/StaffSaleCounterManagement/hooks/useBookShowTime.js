import { SaleCounterManagementAPI } from "../../../../apis/Staff/SaleCounterManagement/SaleCounterManagementAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";


export const useBookShowTime = () => {

    const handleFetchListShowTime = async (movieId, branchId, date) => {
        try {
            const response = await SaleCounterManagementAPI.fetchListShowTime(movieId, branchId, date);
            return response.data.data;
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    return {
        handleFetchListShowTime
    };

};