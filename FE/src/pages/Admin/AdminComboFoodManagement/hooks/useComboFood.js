import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { useState } from "react";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { ComboFoodManagementAPI } from "../../../../apis/Admin/ComboFoodManagement/ComboFoodManagementAPI";

export const useComboFood = () => {

    //dispatch
    const dispatch = useDispatch();
    //listDirector
    const [listData, setListData] = useState([]);
    const [totalElement, setTotalElement] = useState(1);
    //datadetail
    const [dataDetail, setDataList] = useState({});
    //state 
    const [render, setRender] = useState(false);
    //page
    const [currentPage, setCurrentPage] = useState(1);

    //fetchPost
    const handleFetchPost = async (data, handleClose) => {
        //set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await ComboFoodManagementAPI.fetchPostComboFood(data);
            //show Success Message
            if (response.data.success) {
                handleFetchListSearch("", currentPage);
                message.success(response.data.message);
                handleClose();
            }
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    //fetchPut
    const handleFetchPut = async (data, handleClose) => {
        // set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await ComboFoodManagementAPI.fetchPutComboFood(data);
            //show Success Message
            if (response.data.success) {
                handleFetchListSearch("", currentPage);
                message.success(response.data.message);
                handleClose();
            }
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    //fetchDelete
    const handleFetchDelete = async (comboFoodId) => {
        //set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await ComboFoodManagementAPI.fetchDeleteComboFood(comboFoodId);
            //show Success Message
            message.success(response.data.message);
            if (response.data.success) {
                handleFetchListSearch("", 1);
            }
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    //handle Fetch List Search
    const handleFetchListSearch = async (inputSearch, page) => {
        //set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await ComboFoodManagementAPI.fetchListSearch(inputSearch, page);
            setListData(response.data.data);
            setTotalElement(response.data.totalPages * DEFAUTL_PAGE_SIZE);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    }

    //handleGetDetail
    const handleFetchDetail = async (comboFoodId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await ComboFoodManagementAPI.fetchDetailComboFood(comboFoodId);
            if (response.data.success) {
                setRender(!render);
                setDataList(response.data.data);
            }
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };


    return {
        handleFetchPost,
        handleFetchDelete,
        handleFetchPut,
        handleFetchListSearch, listData, totalElement,
        handleFetchDetail, dataDetail, render,
        setCurrentPage
    }

}