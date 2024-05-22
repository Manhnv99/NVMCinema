import { HomePageAPI } from "../../../../apis/Client/HomePage/HomePageAPI";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import { AREA_CLIENT } from "../../../../app/Constant/TokenConstant";

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
            setListMovieCurrentShowing(response?.data?.data);
        } catch (e) {
            for (let errMessage in e?.response?.data) {
                messageErrResponse(e?.response?.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const handleFetchListMoviePreTicket = async (areaId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await HomePageAPI.fetchListMoviePreTicket(areaId);
            setListMoviePreTicket(response?.data?.data);
        } catch (e) {
            for (let errMessage in e?.response?.data) {
                messageErrResponse(e?.response?.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const handleFetchListMovieUpComming = async () => {
        dispatch(setLoadingTrue());
        try {
            const response = await HomePageAPI.fetchListMovieUpComming();
            setListMovieUpComming(response?.data?.data);
        } catch (e) {
            for (let errMessage in e?.response?.data) {
                messageErrResponse(e?.response?.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const handleFetchDetailMovie = async (movieId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await HomePageAPI.fetchDetailMovie(movieId);
            setDetailMovie(response.data.data);
        } catch (e) {
            for (let errMessage in e?.response?.data) {
                messageErrResponse(e?.response?.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    }

    useEffect(() => {
        handleFetchListMovieCurrentShowing(localStorage.getItem(AREA_CLIENT));
        handleFetchListMoviePreTicket(localStorage.getItem(AREA_CLIENT));
        handleFetchListMovieUpComming();
    }, [areaChange]);

    return {
        listMovieCurrentShowing,
        listMoviePreTicket,
        listMovieUpComming,
        handleFetchDetailMovie, detailMovie
    };

}