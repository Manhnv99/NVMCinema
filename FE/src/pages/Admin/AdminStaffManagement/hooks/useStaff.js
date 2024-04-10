import { StaffManagementAPI } from "../../../../apis/Admin/StaffManagement/StaffManagementAPI";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { useNavigate } from "react-router-dom";
import { ROUTE_MANAGEMENT_STAFF } from "../../../../app/BaseUrl/BaseUrl";
import { setDetailStaffAction, setListStaffAction, setTotalElementAction } from "../store/actions/StaffAction";
import { useContext } from "react";
import { StaffContext } from "../store/context/context";

export const useStaff = () => {

    //dispatch
    const dispatchStore = useDispatch();
    //useContext
    const [state, dispatch] = useContext(StaffContext);
    //useNav
    const navigate = useNavigate();


    //function
    const fetchRegister = async (data) => {
        //setLoading
        dispatchStore(setLoadingTrue());
        try {
            const response = await StaffManagementAPI.fetchRegister(data);
            message.success(response.data.message);
            navigate(ROUTE_MANAGEMENT_STAFF);
            dispatchStore(setLoadingFalse());
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const fetchPutRegister = async (data) => {
        //setLoading true
        dispatchStore(setLoadingTrue());
        try {
            const response = await StaffManagementAPI.fetchPutRegister(data);
            message.success(response.data.message);
            //redirect To staff management
            navigate(ROUTE_MANAGEMENT_STAFF);
            //setLoading false
            dispatchStore(setLoadingFalse());
        } catch (e) {
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const fetchListSearchStaff = async (inputSearch, page) => {
        //setLoading true
        dispatchStore(setLoadingTrue());
        try {
            const response = await StaffManagementAPI.fetchListSearchStaff(inputSearch, page);
            dispatch(setListStaffAction(response.data.data));
            dispatch(setTotalElementAction(response.data.totalPages * response.data.data.length));
            //setLoading false
            dispatchStore(setLoadingFalse());
        } catch (e) {
            //setLoading false
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
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
            fetchListSearchStaff(state.searchValue, state.currenPage);
        } catch (e) {
            //setLoading false
            dispatchStore(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
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
            //setLoading false
            dispatchStore(setLoadingFalse());
        } catch (e) {
            //setLoading false
            dispatchStore(setLoadingFalse());
            //for show error message
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    }

    return {
        fetchRegister,
        fetchPutRegister,
        fetchListSearchStaff,
        fetchDeleteStaff,
        fetchDetailStaff
    }

}