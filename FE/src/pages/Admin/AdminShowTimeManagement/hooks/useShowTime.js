import { useContext } from "react";
import { ShowTimeContext } from "../store/context/context";
import { message } from "antd";
import { ShowTimeManagementAPI } from "../../../../apis/Admin/ShowTimeManagement/ShowTimeManagementAPI";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { setInforListSearchAction } from "../store/actions/ShowTimeActions";

export const useShowTime = () => {

    //dispatch Store
    const dispatchStore = useDispatch();
    //useContext
    const [state, dispatch] = useContext(ShowTimeContext);

    const handleFetchListSearchShowTime = async (movieName, areaId, branchId, roomId, page) => {
        dispatchStore(setLoadingTrue());
        try {
            const response = await ShowTimeManagementAPI.fetchListSearch(movieName, areaId, branchId, roomId, page);
            dispatch(setInforListSearchAction({
                listShowTime: response.data.data,
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

    return {
        handleFetchListSearchShowTime
    }

}