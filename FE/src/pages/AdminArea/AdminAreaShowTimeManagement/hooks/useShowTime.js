import { useContext } from "react";
import { ShowTimeContext } from "../store/context/context";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { setInforListSearchAction } from "../store/actions/ShowTimeActions";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { ShowTimeManagementAPI } from "../../../../apis/AdminArea/ShowTimeManagement/ShowTimeManagementAPI";

export const useShowTime = () => {

    //dispatch Store
    const dispatchStore = useDispatch();
    //useContext
    const [state, dispatch] = useContext(ShowTimeContext);

    const handleFetchListSearchShowTime = async (movieName, areaId, branchId, roomId, page) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchListSearch(movieName, areaId, branchId, roomId, page);
            dispatch(setInforListSearchAction({
                listShowTime: response.data.data,
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

    const handleFetchGetOneShowTime = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchGetOne(id);
            return response;
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    const handleFetchGetDetailShowTime = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchGetDetail(id);
            return response;
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    const handleFetchListTicketChair = async (showTimeId) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchListTicketChair(showTimeId);
            return response;
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    }

    const handlePostShowTime = async (postRequest, handleCloseModal, areaId) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchPost(postRequest);
            message.success(response.data.message);
            handleFetchListSearchShowTime("", areaId, "", "", state.currentPage);
            handleCloseModal();
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    const handlePutShowTime = async (putRequest, handleCloseModal, areaId) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchPut(putRequest);
            message.success(response.data.message);
            handleFetchListSearchShowTime("", areaId, "", "", state.currentPage);
            handleCloseModal();
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };


    return {
        handleFetchListSearchShowTime,
        handlePostShowTime,
        handlePutShowTime,
        handleFetchGetOneShowTime,
        handleFetchGetDetailShowTime,
        handleFetchListTicketChair
    }

}