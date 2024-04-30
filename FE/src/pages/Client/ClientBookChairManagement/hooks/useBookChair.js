import { useEffect, useState } from "react"
import { BookChairAPI } from "../../../../apis/Client/BookChair/BookChairAPI";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { messageErrResponse, messageSuccessResponse, messageWarResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";


export const useBookChair = () => {

    //dispatch
    const dispatch = useDispatch();
    //state
    const [listChair, setListChair] = useState([]);
    const [detailShowTime, setDetailShowTime] = useState({});
    const [listComboFood, setListComboFood] = useState([]);
    const [promotionApplied, setPromotionApplied] = useState({
        code: "",
        price: 0
    });

    const handleFetchListTicketChair = (showTimeId) => {
        dispatch(setLoadingTrue());
        setTimeout(async () => {
            try {
                const response = await BookChairAPI.fetchListTicketChair(showTimeId);
                setListChair(response.data.data);
            } catch (e) {
                for (let errMessage in e.response.data) {
                    messageErrResponse(e.response.data[errMessage]);
                }
            } finally {
                dispatch(setLoadingFalse());
            }
        }, [1000]);
    };

    const handleFetchDetailShowTime = (showTimeId) => {
        dispatch(setLoadingTrue());
        setTimeout(async () => {
            try {
                const response = await BookChairAPI.fetchDetailShowTime(showTimeId);
                setDetailShowTime(response.data.data);
            } catch (e) {
                for (let errMessage in e.response.data) {
                    messageErrResponse(e.response.data[errMessage]);
                }
            } finally {
                dispatch(setLoadingFalse());
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

    const handleFetchPromotionEvent = (code) => {
        if (promotionApplied.code !== "" && promotionApplied.code === code) {
            messageWarResponse("Bạn giảm giá này đang được áp dụng vào hóa đơn của bạn!");
        } else {
            dispatch(setLoadingTrue());
            setTimeout(async () => {
                try {
                    const response = await BookChairAPI.fetchPromotionEvent(code);
                    messageSuccessResponse("Áp dụng mã giảm giá thành công!");
                    setPromotionApplied({
                        code: code,
                        price: response.data.data.promotionPrice
                    });
                } catch (e) {
                    setPromotionApplied({
                        code: "",
                        price: 0
                    });
                    for (let errMessage in e.response.data) {
                        messageErrResponse(e.response.data[errMessage]);
                    }
                } finally {
                    dispatch(setLoadingFalse());
                }
            }, [1000]);
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
    };

    useEffect(() => {
        handleFetchListComboFood();
    }, []);

    return {
        handleFetchListTicketChair, listChair,
        handleFetchDetailShowTime, detailShowTime,
        listComboFood,
        handleFetchPromotionEvent, promotionApplied,
        handleFetchOnlineBanking
    }

}