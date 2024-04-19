import { message } from "antd";
import { MovieManagementAPI } from "../../../../apis/Admin/MovieManagement/MovieManagementAPI";
import { useContext } from "react";
import { MovieContext } from "../store/context/context";
import { setInforListMovieAction } from "../store/actions/movieActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { ROUTE_MANAGEMENT_MOVIE } from "../../../../app/BaseUrl/BaseUrl";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";

export const useMovie = () => {

    //useDispatch
    const dispatchStore = useDispatch();
    //use Context
    const [state, dispatch] = useContext(MovieContext);
    //usenav
    const navigate = useNavigate();

    const handleFetchPostMovie = async (postMovie) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await MovieManagementAPI.fetchPostMovie(postMovie);
            message.success(response.data.message);
            navigate(ROUTE_MANAGEMENT_MOVIE);
            handleFetchListSearchMovie("", "", "", "", "", 1);
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchPutMovie = async (putMovie) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await MovieManagementAPI.fetchPutMovie(putMovie);
            message.success(response.data.message);
            navigate(ROUTE_MANAGEMENT_MOVIE);
            handleFetchListSearchMovie("", "", "", "", "", 1);
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchDeleteMovie = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await MovieManagementAPI.fetchDeleteMovie(id);
            message.success(response.data.message);
            handleFetchListSearchMovie("", "", "", "", "", 1);
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchListSearchMovie = async (name, director, genre, format, country, page) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await MovieManagementAPI.fetchListSearchMovie(name, director, genre, format, country, page);
            dispatch(setInforListMovieAction({
                listMovie: response.data.data,
                totalElement: response.data.totalPages * DEFAUTL_PAGE_SIZE
            }));
            dispatchStore(setLoadingFalse());
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchGetOneMovie = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await MovieManagementAPI.fetchGetOneMovie(id);
            dispatchStore(setLoadingFalse());
            return response;
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchDetailMovie = async (id) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await MovieManagementAPI.fetchDetailMovie(id);
            dispatchStore(setLoadingFalse());
            return response;
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    return {
        handleFetchListSearchMovie,
        handleFetchPostMovie,
        handleFetchPutMovie,
        handleFetchDeleteMovie,
        handleFetchGetOneMovie,
        handleFetchDetailMovie
    }

}