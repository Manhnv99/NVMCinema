import { message } from "antd";
import { useEffect, useState } from "react"
import { BookChairAPI } from "../../../../apis/Client/BookChair/BookChairAPI";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";


export const useBookChair = () => {

    //dispatch
    const dispatch = useDispatch();
    //state
    const [listChair, setListChair] = useState([]);
    const [detailShowTime, setDetailShowTime] = useState({});
    const [listComboFood, setListComboFood] = useState([]);
    const [promotionPrice, setPromotionPrice] = useState(0);

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
                    messageErrResponse(e.response.data[errMessage]);
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
                    messageErrResponse(e.response.data[errMessage]);
                }
            }
        }, [1000]);
    };

    const handleFetchListComboFood = async () => {
        try {
            const response = await BookChairAPI.fetchListComboFood();
            setListComboFood(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchPromotionEvent = async (code) => {
        try {
            const response = await BookChairAPI.fetchPromotionEvent(code);
            setPromotionPrice(response.data.data.promotionPrice);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchOnlineBanking = async (paymentRequest) => {
        try {
            const response = await BookChairAPI.fetchOnlineBanking(paymentRequest);
            window.location.href = response.data;
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    }

    useEffect(() => {
        handleFetchListComboFood();
    }, []);

    return {
        handleFetchListTicketChair, listChair,
        handleFetchDetailShowTime, detailShowTime,
        listComboFood,
        handleFetchPromotionEvent, promotionPrice,
        handleFetchOnlineBanking
    }

}