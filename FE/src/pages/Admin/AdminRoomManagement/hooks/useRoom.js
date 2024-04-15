import { useContext, useState } from "react";
import { RoomManagementAPI } from "../../../../apis/Admin/RoomManagement/RoomManagementAPI";
import { message } from "antd";
import { RoomContext } from "../store/context/context";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { setInforListRoomAction } from "../store/actions/RoomActions";

export const useRoom = () => {

    //useDispatch
    const dispatchStore = useDispatch();
    //useContext
    const [state, dispatch] = useContext(RoomContext);
    //state
    const [listArea, setListArea] = useState([]);
    const [listBranch, setListBranch] = useState([]);

    const handleFetchListSearchRoom = async (inputSearch, branchId, page) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await RoomManagementAPI.fetchListSearch(inputSearch, branchId, page);
            dispatch(setInforListRoomAction({
                listRoom: response.data.data,
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

    const handleFetchOneRoom = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await RoomManagementAPI.fetchGetOne(id);
            dispatchStore(setLoadingFalse());
            return response;
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    const handleFetchListChair = async (roomId) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await RoomManagementAPI.fetchListChair(roomId);
            dispatchStore(setLoadingFalse());
            return response;
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    const handleFetchDetailRoom = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await RoomManagementAPI.fetchGetDetail(id);
            dispatchStore(setLoadingFalse());
            return response;
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    const handleFetchListArea = async () => {
        try {
            const response = await RoomManagementAPI.fetchListArea();
            setListArea(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    const handleFetchListBranch = async (id) => {
        try {
            const response = await RoomManagementAPI.fetchListBranch(id);
            setListBranch(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    const handleFetchPostBranch = async (postRequest, handleClose) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await RoomManagementAPI.fetchPost(postRequest);
            message.success(response.data.message);
            handleClose();
            handleFetchListSearchRoom("", "", 1);
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    const handleFetchPutBranch = async (putRequest, handleClose) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await RoomManagementAPI.fetchPut(putRequest);
            message.success(response.data.message);
            handleClose();
            handleFetchListSearchRoom("", "", 1);
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    const handleFetchDeleteBranch = async (id,) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await RoomManagementAPI.fetchDelete(id);
            message.success(response.data.message);
            handleFetchListSearchRoom("", "", 1);
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    return {
        handleFetchListSearchRoom,
        handleFetchListArea, listArea,
        handleFetchListBranch, listBranch,
        handleFetchPostBranch,
        handleFetchPutBranch,
        handleFetchDeleteBranch,
        handleFetchOneRoom,
        handleFetchDetailRoom,
        handleFetchListChair
    }

}