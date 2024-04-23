import { message } from "antd";
import { useState } from "react"
import { BookChairAPI } from "../../../../apis/Client/BookChair/BookChairAPI";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";


export const useBookChair = () => {

    //dispatch
    const dispatch = useDispatch();
    //state
    const [listChair, setListChair] = useState([]);
    const [detailShowTime, setDetailShowTime] = useState({});

    const handleFetchListTicketChair = (showTimeId) => {
        dispatch(setLoadingTrue());
        setTimeout(async () => {
            try {
                const response = await BookChairAPI.fetchListTicketChair(showTimeId);
                setListChair(response.data.data);
                dispatch(setLoadingFalse());
            } catch (e) {
                dispatch(setLoadingFalse());
                for (let errMessage in e.response.data) {
                    message.error(e.response.data[errMessage]);
                }
            }
        }, [1000]);
    };

    const handleFetchDetailShowTime = (showTimeId) => {
        dispatch(setLoadingTrue());
        setTimeout(async () => {
            try {
                const response = await BookChairAPI.fetchDetailShowTime(showTimeId);
                setDetailShowTime(response.data.data);
                dispatch(setLoadingFalse());
            } catch (e) {
                dispatch(setLoadingFalse());
                for (let errMessage in e.response.data) {
                    message.error(e.response.data[errMessage]);
                }
            }
        }, [1000]);
    };

    return {
        handleFetchListTicketChair, listChair,
        handleFetchDetailShowTime, detailShowTime
    }

}