import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { useState } from "react";
import { BranchManagementAPI } from "../../../../apis/Admin/BranchManagement/BranchManagementAPI";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";

export const useBranch = () => {

    //dispatch
    const dispatch = useDispatch();
    //listDirector
    const [listData, setListData] = useState([]);
    const [totalElement, setTotalElement] = useState(1);
    const [listArea, setListArea] = useState([]);
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
            const response = await BranchManagementAPI.fetchPostBranch(data);
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
            const response = await BranchManagementAPI.fetchPutBranch(data);
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
    const handleFetchDelete = async (id) => {
        //set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await BranchManagementAPI.fetchDeleteBranch(id);
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
    const handleFetchListSearch = async (searchRequest, page) => {
        //set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await BranchManagementAPI.fetchListSearch(searchRequest, page);
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
    const handleFetchDetail = async (id) => {
        dispatch(setLoadingTrue());
        try {
            const response = await BranchManagementAPI.fetchDetail(id);
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

    //handleGetOne
    const handleFetchGetOne = async (id) => {
        dispatch(setLoadingTrue());
        try {
            const response = await BranchManagementAPI.fetchGetOne(id);
            console.log(response);
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
    }

    //handle Fetch List Area
    const handleFetchListArea = async () => {
        try {
            const response = await BranchManagementAPI.fetchListArea();
            setListArea(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }


    return {
        handleFetchPost,
        handleFetchDelete,
        handleFetchPut,
        handleFetchListSearch, listData, totalElement,
        handleFetchDetail, dataDetail, render,
        handleFetchGetOne,
        handleFetchListArea, listArea,
        setCurrentPage
    }

}