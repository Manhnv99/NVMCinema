import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { InformationClientAPI } from "../../../../apis/Client/InformationClient/InformationClientAPI";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { messageErrResponse, messageSuccessResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";

export const useInformation = () => {

    //state
    const [provinces, setProvinces] = useState([]);
    const [putSuccess, setPutSuccess] = useState(false); // use for make getDetailClient re-render
    const [listTransactionHistory, setListTransactionHistory] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    //dispatch
    const dispatch = useDispatch();

    const handleFetchProvince = async () => {
        try {
            const response = await InformationClientAPI.fetchProvince();
            setProvinces(response.data.results);
        } catch (e) {
            messageErrResponse("Không lấy được danh sách tỉnh thành phố!");
        }
    };

    const handleFetchClientDetail = async (id) => {
        dispatch(setLoadingTrue());
        try {
            const response = await InformationClientAPI.fetchDetailClient(id);
            return response.data.data;
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const handleFetchPutClient = (putClientRequest) => {
        dispatch(setLoadingTrue());
        setTimeout(async () => {
            try {
                const response = await InformationClientAPI.fetchPutClient(putClientRequest);
                messageSuccessResponse(response.data.message);
                setPutSuccess(true);
            } catch (e) {
                for (let errMessage in e.response.data) {
                    messageErrResponse(e.response.data[errMessage]);
                }
            } finally {
                dispatch(setLoadingFalse());
            }
        }, [1000]);
    };

    const handleFetchTransactionHistory = async (clientId, dateFind, page) => {
        dispatch(setLoadingTrue());
        try {
            const response = await InformationClientAPI.fetchTransactionHistory(clientId, dateFind, page);
            setListTransactionHistory(response.data.data);
            console.log(response.data.totalPages * DEFAUTL_PAGE_SIZE);
            setTotalPages(response.data.totalPages * DEFAUTL_PAGE_SIZE);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    }

    useEffect(() => {
        handleFetchProvince();
    }, []);

    return {
        provinces,
        handleFetchClientDetail,
        handleFetchPutClient, putSuccess,
        handleFetchTransactionHistory, listTransactionHistory, totalPages
    }

}