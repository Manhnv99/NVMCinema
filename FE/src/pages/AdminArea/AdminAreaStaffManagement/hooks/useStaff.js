import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { useNavigate } from "react-router-dom";
import { ROUTE_ADMIN_AREA_MANAGEMENT_STAFF } from "../../../../app/BaseUrl/BaseUrl";
import { setDetailStaffAction, setListStaffAction, setTotalElementAction } from "../store/actions/StaffAction";
import { useContext } from "react";
import { StaffContext } from "../store/context/context";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { StaffManagementAPI } from "../../../../apis/AdminArea/StaffManagement/StaffManagementAPI";

export const useStaff = () => {

    //dispatch
    const dispatchStore = useDispatch();
    //useContext
    const [state, dispatch] = useContext(StaffContext);
    //useNav
    const navigate = useNavigate();

    //function
    const fetchPostStaff = async (data) => {
        //setLoading
        dispatchStore(setLoadingTrue());
        try {
            const response = await StaffManagementAPI.fetchPostStaff(data);
            message.success(response.data.message);
            navigate(ROUTE_ADMIN_AREA_MANAGEMENT_STAFF);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const fetchPutStaff = async (data) => {
        //setLoading true
        dispatchStore(setLoadingTrue());
        try {
            const response = await StaffManagementAPI.fetchPutStaff(data);
            message.success(response.data.message);
            //redirect To staff management
            navigate(ROUTE_ADMIN_AREA_MANAGEMENT_STAFF);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    const fetchListSearchStaff = async (inputSearch, areaId, page) => {
        //setLoading true
        dispatchStore(setLoadingTrue());
        try {
            const response = await StaffManagementAPI.fetchListSearchStaff(inputSearch, areaId, page);
            dispatch(setListStaffAction(response.data.data));
            dispatch(setTotalElementAction(response.data.totalPages * DEFAUTL_PAGE_SIZE));
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    };

    const fetchDeleteStaff = async (userId) => {
        //setLoading true
        dispatchStore(setLoadingTrue());
        try {
            const response = await StaffManagementAPI.fetchDeleteStaff(userId);
            //show message Success
            message.success(response.data.message);
            //make component re-render
            fetchListSearchStaff(state.searchValue, 1);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    }

    //fetchDetailStaff
    const fetchDetailStaff = async (userId) => {
        //set loading true
        dispatchStore(setLoadingTrue());
        try {
            const response = await StaffManagementAPI.fetchDetailStaff(userId);
            //set DetailStaff Action
            dispatch(setDetailStaffAction(response.data.data));
        } catch (e) {
            //for show error message
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        } finally {
            dispatchStore(setLoadingFalse());
        }
    }

    return {
        fetchPostStaff,
        fetchPutStaff,
        fetchListSearchStaff,
        fetchDeleteStaff,
        fetchDetailStaff
    }

}