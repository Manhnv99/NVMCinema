import { useEffect, useState } from "react";
import { message } from "antd";
import { ShowTimeManagementAPI } from "../../../../apis/Admin/ShowTimeManagement/ShowTimeManagementAPI";


export const useFetchEntity = () => {

    //state
    const [listArea, setListArea] = useState([]);
    const [listBranch, setListBranch] = useState([]);
    const [listRoom, setListRoom] = useState([]);
    const [listMovieCurrentShowing, setListMovieCurrentShowing] = useState([]);
    const [listMoviePreTicket, setListMoviePreTicket] = useState([]);

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

    const handleFetchListMovieCurrentShowing = async () => {
        try {
            const response = await ShowTimeManagementAPI.fetchListMovieCurrentShowing();
            setListMovieCurrentShowing(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchListMoviePreTicket = async () => {
        try {
            const response = await ShowTimeManagementAPI.fetchListMoviePreTicket();
            setListMoviePreTicket(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    useEffect(() => {
        handleFetchListArea();
        handleFetchListMovieCurrentShowing();
        handleFetchListMoviePreTicket();
    }, []);

    return {
        listArea,
        handleFetchListBranch, listBranch,
        handleFetchListRoom, listRoom,
        listMovieCurrentShowing, listMoviePreTicket,
    };

}