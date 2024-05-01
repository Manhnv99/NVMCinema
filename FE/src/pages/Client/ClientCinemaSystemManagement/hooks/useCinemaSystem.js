import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { CinemaSystemAPI } from "../../../../apis/Client/CinemaSystem/CinemaSystemAPI";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";


export const useCinemaSystem = () => {

    //dispatch
    const dispatch = useDispatch();
    //state
    const [listBranch, setListBranch] = useState([]);
    const [dataDetail, setDataDetail] = useState({});

    const handleFetchListBranch = async () => {
        dispatch(setLoadingTrue());
        try {
            const response = await CinemaSystemAPI.fetchListBranch();
            setListBranch(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const handleFetchDetailBranch = async (branchId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await CinemaSystemAPI.fetchDetailBranch(branchId);
            console.log(response);
            setDataDetail(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    useEffect(() => {
        handleFetchListBranch()
    }, []);

    return {
        listBranch,
        handleFetchDetailBranch, dataDetail
    }

}