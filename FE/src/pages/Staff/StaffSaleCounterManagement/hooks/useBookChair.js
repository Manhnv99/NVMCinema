import { useDispatch } from "react-redux";
import { SaleCounterManagementAPI } from "../../../../apis/Staff/SaleCounterManagement/SaleCounterManagementAPI";
import {
    messageErrResponse,
    messageSuccessResponse,
    messageWarResponse
} from "../../../../app/CustomizeMessage/CustomizeMessage";
import {
    setLoadingFalse,
    setLoadingTrue
} from "../../../../app/Redux/Slice/LoadingSlice";
import { useEffect, useState } from "react";
import {ConvertCurrencyVND} from "../../../../utils/ConvertCurrency/ConvertCurrency.js";

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
                const response = await SaleCounterManagementAPI.fetchListTicketChair(showTimeId);
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
                const response = await SaleCounterManagementAPI.fetchDetailShowTime(showTimeId);
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
            const response = await SaleCounterManagementAPI.fetchListComboFood();
            setListComboFood(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchPromotionEvent = (code, currentOrderValue) => {
        if (!code || code.trim() === "") {
            messageWarResponse("Vui lòng nhập mã giảm giá!");
            return;
        }

        if (promotionApplied.code && promotionApplied.code === code) {
            messageWarResponse("Mã giảm giá này đã được áp dụng!");
            return;
        }

        dispatch(setLoadingTrue());

        setTimeout(async () => {
            try {
                const response = await SaleCounterManagementAPI.fetchPromotionEvent(code);
                const promo = response?.data?.data;

                if (!promo) {
                    messageErrResponse("Mã giảm giá không tồn tại!");
                    return;
                }

                if (promo.minOrderValue && currentOrderValue < promo.minOrderValue) {
                    messageWarResponse(
                        `Đơn hàng phải từ ${ConvertCurrencyVND(promo.minOrderValue)} để áp dụng mã này!`
                    );
                    return;
                }

                if (!promo.promotionPrice || promo.promotionPrice <= 0) {
                    messageErrResponse("Mã giảm giá không hợp lệ!");
                    return;
                }

                const discount = Math.min(promo.promotionPrice, currentOrderValue);

                setPromotionApplied({
                    code: code,
                    price: discount
                });

                messageSuccessResponse("Áp dụng mã giảm giá thành công!");

            } catch (e) {
                setPromotionApplied({
                    code: "",
                    price: 0
                });

                if (e?.response?.data) {
                    for (let errMessage in e.response.data) {
                        messageErrResponse(e.response.data[errMessage]);
                    }
                } else {
                    messageErrResponse("Có lỗi xảy ra, vui lòng thử lại!");
                }
            } finally {
                dispatch(setLoadingFalse());
            }
        }, 1000); // ✅ fix lỗi [1000]
    };

    const handleFetchOnlineBanking = async (paymentRequest) => {
        try {
            const response = await SaleCounterManagementAPI.fetchOnlineBanking(paymentRequest);
            window.location.href = response.data;
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchCashPayment = (paymentRequest) => {
        dispatch(setLoadingTrue());
        setTimeout(async () => {
            try {
                const response = await SaleCounterManagementAPI.fetchCashPayment(paymentRequest);
                window.location.href = response.data.urlRedirect;
            } catch (e) {
                for (let errMessage in e.response.data) {
                    messageErrResponse(e.response.data[errMessage]);
                }
            } finally {
                dispatch(setLoadingFalse());
            }
        }, [1000]);
    }

    useEffect(() => {
        handleFetchListComboFood();
    }, []);

    return {
        handleFetchListTicketChair, listChair,
        handleFetchDetailShowTime, detailShowTime,
        listComboFood,
        handleFetchPromotionEvent, promotionApplied,
        handleFetchOnlineBanking,
        handleFetchCashPayment
    }

}
