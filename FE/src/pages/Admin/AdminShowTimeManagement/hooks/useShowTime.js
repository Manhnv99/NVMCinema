import { useContext } from "react";
import { ShowTimeContext } from "../store/context/context";
import { message } from "antd";
import { ShowTimeManagementAPI } from "../../../../apis/Admin/ShowTimeManagement/ShowTimeManagementAPI";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { setInforListSearchAction } from "../store/actions/ShowTimeActions";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";

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
            dispatchStore(setLoadingFalse());
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchGetOneShowTime = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchGetOne(id);
            dispatchStore(setLoadingFalse());
            return response;
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchGetDetailShowTime = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchGetDetail(id);
            dispatchStore(setLoadingFalse());
            return response;
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchListTicketChair = async (showTimeId) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchListTicketChair(showTimeId);
            dispatchStore(setLoadingFalse());
            return response;
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    const handlePostShowTime = async (postRequest, handleCloseModal) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchPost(postRequest);
            message.success(response.data.message);
            handleFetchListSearchShowTime("", "", "", "", 1);
            handleCloseModal();
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handlePutShowTime = async (putRequest, handleCloseModal) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchPut(putRequest);
            message.success(response.data.message);
            handleFetchListSearchShowTime("", "", "", "", 1);
            handleCloseModal();
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
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