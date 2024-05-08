import { useContext, useState } from "react";
import { OrderManagementAPI } from "../../../../apis/Staff/OrderManagement/OrderManagementAPI";
import { OrderContext } from "../store/context/context";
import { setDetailOrderAction, setInforListOrderAction } from "../store/actions/OrderActions";
import { messageErrResponse, messageSuccessResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";


export const useOrderManagement = () => {

    //dispatchStore
    const dispatchStore = useDispatch();
    //use Context
    const [state, dispatch] = useContext(OrderContext);
    //state
    const [isApprovedOrCancelOrRestoreSuccess, setIsApprovedOrCancelOrRestoreSuccess] = useState(false);

    const handleFetchListSearchOrder = async (orderCode, dateStart, dateEnd, timeStart, branchId, orderStatus, page) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await OrderManagementAPI.fetchListSearchOrder(orderCode, dateStart, dateEnd, timeStart, branchId, orderStatus, page);
            dispatch(setInforListOrderAction({
                listOrder: response.data.data,
                totalElement: response.data.totalPages * DEFAUTL_PAGE_SIZE
            }));
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    const handleFetchApprovedOrCancelOrRestore = async (userId, orderId, approvedOrCancelOrRestore) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await OrderManagementAPI.fetchApprovedOrCancel(userId, orderId, approvedOrCancelOrRestore);
            messageSuccessResponse(response.data.message);
            setIsApprovedOrCancelOrRestoreSuccess(!isApprovedOrCancelOrRestoreSuccess);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    const handleFetchDetailOrder = async (orderId) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await OrderManagementAPI.fetchDetailOrder(orderId);
            dispatch(setDetailOrderAction(response.data.data));
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    return {
        handleFetchListSearchOrder,
        handleFetchApprovedOrCancelOrRestore, isApprovedOrCancelOrRestoreSuccess,
        handleFetchDetailOrder
    }

};