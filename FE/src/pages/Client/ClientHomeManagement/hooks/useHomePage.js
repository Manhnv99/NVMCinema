import { message } from "antd"
import { HomePageAPI } from "../../../../apis/Client/HomePage/HomePageAPI";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";

export const useHomePage = () => {

    const [listMovieCurrentShowing, setListMovieCurrentShowing] = useState([]);

    const [listMoviePreTicket, setListMoviePreTicket] = useState([]);

    const [listMovieUpComming, setListMovieUpComming] = useState([]);

    const [detailMovie, setDetailMovie] = useState({});

    //use Selector
    const areaChange = useSelector(state => state.area.areaChange);
    //dispatch
    const dispatch = useDispatch();

    //handle
    const handleFetchListMovieCurrentShowing = async (areaId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await HomePageAPI.fetchListMovieCurrentShowing(areaId);
            setListMovieCurrentShowing(response.data.data);
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchListMoviePreTicket = async (areaId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await HomePageAPI.fetchListMoviePreTicket(areaId);
            setListMoviePreTicket(response.data.data);
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchListMovieUpComming = async (areaId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await HomePageAPI.fetchListMovieUpComming(areaId);
            setListMovieUpComming(response.data.data);
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchDetailMovie = async (movieId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await HomePageAPI.fetchDetailMovie(movieId);
            setDetailMovie(response.data.data);
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    useEffect(() => {
        const areaId = localStorage.getItem("area");
        handleFetchListMovieCurrentShowing(areaId);
        handleFetchListMoviePreTicket(areaId);
        handleFetchListMovieUpComming(areaId);
    }, [areaChange]);

    return {
        listMovieCurrentShowing,
        listMoviePreTicket,
        listMovieUpComming,
        handleFetchDetailMovie, detailMovie
    };

}