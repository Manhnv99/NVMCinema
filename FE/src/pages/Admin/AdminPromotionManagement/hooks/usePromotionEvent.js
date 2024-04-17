import { message } from "antd";
import { PromotionEventAPI } from "../../../../apis/Admin/PromotionEventManagement/PromotionEventAPI";
import { useContext } from "react";
import { PromotionEventContext } from "../store/context/context";
import { setInforListAction } from "../store/actions/PromotionEventActions";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";

export const usePromotionEvent = () => {

    //dispatch Store
    const dispatchStore = useDispatch();
    //use Context
    const [state, dispatch] = useContext(PromotionEventContext);

    const handleFetchListSearch = async (name, timeStart, timeEnd, page) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await PromotionEventAPI.fetchListSearch(name, timeStart, timeEnd, page);
            dispatch(setInforListAction({
                listPE: response.data.data,
                totalElement: response.data.data.length * response.data.totalPages
            }));
            dispatchStore(setLoadingFalse());
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchDetail = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await PromotionEventAPI.fetchDetail(id);
            dispatchStore(setLoadingFalse());
            return response;
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchPost = async (postRequest, handleClose) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await PromotionEventAPI.fetchPost(postRequest);
            message.success(response.data.message);
            handleFetchListSearch("", "", "", 1);
            handleClose();
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchPut = async (putRequest, handleClose) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await PromotionEventAPI.fetchPut(putRequest);
            message.success(response.data.message);
            handleFetchListSearch("", "", "", 1);
            handleClose();
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchDelete = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await PromotionEventAPI.fetchDelete(id);
            message.success(response.data.message);
            handleFetchListSearch("", "", "", 1);
            dispatchStore(setLoadingFalse());
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    return {
        handleFetchListSearch,
        handleFetchDetail,
        handleFetchPost,
        handleFetchPut,
        handleFetchDelete
    }

}