import { BookTicketAPI } from "../../../../apis/Client/BookTicket/BookTicketAPI";
import { AREA_CLIENT } from "../../../../app/Constant/TokenConstant";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";

export const useBookTicket = () => {

    const handleFetchListShowTime = async (movieId, branchId, areaId, date) => {
        try {
            const response = await BookTicketAPI.fetchListShowTime(movieId, branchId, areaId, date);
            return response.data.data;
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchListBranch = async () => {
        try {
            const response = await BookTicketAPI.fetchListBranch(localStorage.getItem(AREA_CLIENT));
            return response.data.data;
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchClosestScreeningDate = async (movieId) => {
        try {
            const response = await BookTicketAPI.fetchGetClosestScreeningDate(movieId);
            return response.data.data.screeningDate;
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    return {
        handleFetchListBranch,
        handleFetchListShowTime,
        handleFetchClosestScreeningDate
    };

}