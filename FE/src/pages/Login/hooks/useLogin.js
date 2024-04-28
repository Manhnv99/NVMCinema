import { LoginAPI } from "../../../apis/Login/LoginAPI";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE_ADMIN_MANAGEMENT_WELCOME } from "../../../app/BaseUrl/BaseUrl";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../app/Redux/Slice/LoadingSlice";

export const useLogin = () => {

    //use Nav
    const navigate = useNavigate();
    //dispatch
    const dispatch = useDispatch();

    const handleRequestLoginAPI = async (loginRequest) => {
        dispatch(setLoadingTrue());
        try {
            const response = await LoginAPI.fetchLoginAPI(loginRequest);
            //set Token to localStorage
            localStorage.setItem("token", response.data.token);
            //show message login success
            message.success(response.data.message);
            //redirect to admin page
            navigate(ROUTE_ADMIN_MANAGEMENT_WELCOME);
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            //show error message
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    return {
        handleRequestLoginAPI
    }

}