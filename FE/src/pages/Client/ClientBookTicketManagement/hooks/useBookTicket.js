import { BookTicketAPI } from "../../../../apis/Client/BookTicket/BookTicketAPI";
import { message } from "antd";

export const useBookTicket = () => {

    const handleFetchListBranch = async () => {
        try {
            const response = await BookTicketAPI.fetchListBranch(localStorage.getItem("area"));
            return response.data.data;
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchListShowTime = async (movieId, branchId, areaId, date) => {
        try {
            const response = await BookTicketAPI.fetchListShowTime(movieId, branchId, areaId, date);
            return response.data.data;
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    return {
        handleFetchListBranch,
        handleFetchListShowTime,
    };

}