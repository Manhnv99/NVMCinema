import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import { PromotionEventAPI } from "../../../../apis/Client/PromotionEvent/PromotionEventAPI";


export const usePromotionEvent = () => {

    //dispatch
    const dispatch = useDispatch();
    //state
    const [listPromotionEvent, setListPromotionEvent] = useState([]);
    const [dataDetail, setDataDetail] = useState({});

    const handleFetchListPromotionEvent = async () => {
        dispatch(setLoadingTrue());
        try {
            const response = await PromotionEventAPI.fetchListPromotionEvent();
            setListPromotionEvent(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const handleFetchDetailPromotionEvent = async (peId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await PromotionEventAPI.fetchDetailPromotionEvent(peId);
            setDataDetail(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    useEffect(() => {
        handleFetchListPromotionEvent();
    }, []);

    return {
        listPromotionEvent,
        handleFetchDetailPromotionEvent, dataDetail
    }

}