import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { useState } from "react";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { DirectorManagementAPI } from "../../../../apis/Admin/Directormanagement/DirectorManagementAPI";

export const useDirector = () => {

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
            const response = await DirectorManagementAPI.fetchPostDirector(data);
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
            const response = await DirectorManagementAPI.fetchPutDirector(data);
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
    const handleFetchDelete = async (directorId) => {
        //set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await DirectorManagementAPI.fetchDeleteDirector(directorId);
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
            const response = await DirectorManagementAPI.fetchListSearch(inputSearch, page);
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
    const handleFetchDetail = async (directorId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await DirectorManagementAPI.fetchDetailDirector(directorId);
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