import { useState } from "react";
import { message } from "antd";
import { ShowTimeManagementAPI } from "../../../../apis/Admin/ShowTimeManagement/ShowTimeManagementAPI";


export const useFetchEntity = () => {

    //state
    const [listArea, setListArea] = useState([]);
    const [listBranch, setListBranch] = useState([]);
    const [listRoom, setListRoom] = useState([]);
    const [listMovie, setListMovie] = useState([]);

    const handleFetchListArea = async () => {
        try {
            const response = await ShowTimeManagementAPI.fetchListArea();
            setListArea(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

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
        handleFetchListArea, listArea,
        handleFetchListBranch, listBranch,
        handleFetchListRoom, listRoom,
        handleFetchListMovie, listMovie
    }

}