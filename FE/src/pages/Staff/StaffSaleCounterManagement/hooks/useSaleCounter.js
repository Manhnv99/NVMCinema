import { useContext } from "react";
import { SaleCounterContext } from "../store/context/context";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { SaleCounterManagementAPI } from "../../../../apis/Staff/SaleCounterManagement/SaleCounterManagementAPI";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import { setDetailOrderAction, setInforListMovieAction } from "../store/actions/SaleCounterAction";


export const useSaleCounter = () => {

    //useDispatch
    const dispatchStore = useDispatch();
    //use Context
    const [state, dispatch] = useContext(SaleCounterContext);

    const handleFetchListSearchMovie = async (name, director, genre, format, country, page) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await SaleCounterManagementAPI.fetchListSearchMovie(name, director, genre, format, country, page);
            dispatch(setInforListMovieAction({
                listMovie: response.data.data,
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

    const handleFetchDetailOrder = async (orderId) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await SaleCounterManagementAPI.fetchDetailOrder(orderId);
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
        handleFetchListSearchMovie,
        handleFetchDetailOrder
    };

};