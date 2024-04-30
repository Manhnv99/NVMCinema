import { message } from "antd";
import { PromotionEventAPI } from "../../../../apis/Admin/PromotionEventManagement/PromotionEventAPI";
import { useContext } from "react";
import { PromotionEventContext } from "../store/context/context";
import { setInforListAction } from "../store/actions/PromotionEventActions";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";

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
                totalElement: response.data.totalPages * DEFAUTL_PAGE_SIZE
            }));
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    const handleFetchDetail = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await PromotionEventAPI.fetchDetail(id);
            return response;
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    const handleFetchPost = async (postRequest, handleClose) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await PromotionEventAPI.fetchPost(postRequest);
            message.success(response.data.message);
            handleFetchListSearch("", "", "", state.currentPageStore);
            handleClose();
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    const handleFetchPut = async (putRequest, handleClose) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await PromotionEventAPI.fetchPut(putRequest);
            message.success(response.data.message);
            handleFetchListSearch("", "", "", state.currentPageStore);
            handleClose();
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    return {
        handleFetchListSearch,
        handleFetchDetail,
        handleFetchPost,
        handleFetchPut,
    }

}