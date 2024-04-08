import { DirectorManagementAPI } from "../../../../apis/Admin/Directormanagement/DirectorManagementAPI"
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { useState } from "react";

export const useDirector = () => {

    //dispatch
    const dispatch = useDispatch();
    //listDirector
    const [listDirector, setListDirector] = useState([]);
    const [totalElement, setTotalElement] = useState(1);



    //fetchPost
    const fetchPostDirector = async (data, callback) => {
        //set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await DirectorManagementAPI.fetchPostDirector(data);
            //show Success Message
            if (response.data.success) {
                fetchListSearchDirector("", 1);
                message.success(response.data.message);
                callback();
            }
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    //fetchPut
    const fetchPutDirector = async (data, callback) => {
        //set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await DirectorManagementAPI.fetchPutDirector(data);
            //show Success Message
            if (response.data.success) {
                fetchListSearchDirector("", 1);
                message.success(response.data.message);
                callback();
            }
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    //fetchDelete
    const fetchDeleteDirector = async (directorId) => {
        //set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await DirectorManagementAPI.fetchDeleteDirector(directorId);
            //show Success Message
            message.success(response.data.message);
            if (response.data.success) {
                fetchListSearchDirector("", 1);
            }
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    //handle Fetch List Search
    const fetchListSearchDirector = async (inputSearch, page) => {
        //set Loading True
        dispatch(setLoadingTrue());
        try {
            const response = await DirectorManagementAPI.fetchListSearch(inputSearch, page);
            setListDirector(response.data.data);
            setTotalElement(response.data.totalPages * response.data.data.length);
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }


    return {
        fetchPostDirector,
        fetchPutDirector,
        fetchDeleteDirector,
        fetchListSearchDirector, listDirector, totalElement
    }

}