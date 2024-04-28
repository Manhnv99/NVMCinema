import { useState } from "react";
import { message } from "antd";
import { ShowTimeManagementAPI } from "../../../../apis/AdminArea/ShowTimeManagement/ShowTimeManagementAPI";


export const useFetchEntity = () => {

    //state
    const [listBranch, setListBranch] = useState([]);
    const [listRoom, setListRoom] = useState([]);
    const [listMovie, setListMovie] = useState([]);

    const handleFetchListBranch = async (areaId) => {
        try {
            const response = await ShowTimeManagementAPI.fetchListBranch(areaId);
            setListBranch(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchListRoom = async (branchId) => {
        try {
            const response = await ShowTimeManagementAPI.fetchListRoom(branchId);
            setListRoom(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchListMovie = async () => {
        try {
            const response = await ShowTimeManagementAPI.fetchListMovie();
            setListMovie(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    return {
        handleFetchListBranch, listBranch,
        handleFetchListRoom, listRoom,
        handleFetchListMovie, listMovie
    }

}