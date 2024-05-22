import { LoginAPI } from "../../../apis/Login/LoginAPI";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE_ADMIN_AREA_MANAGEMENT_WELCOME, ROUTE_ADMIN_MANAGEMENT_WELCOME, ROUTE_STAFF_MANAGEMENT_WELCOME } from "../../../app/BaseUrl/BaseUrl";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../app/Redux/Slice/LoadingSlice";
import { ROLE_ADMIN, ROLE_ADMIN_AREA, ROLE_STAFF } from "../../../app/Constant/RoleConstant";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../../../app/Constant/TokenConstant";

export const useLogin = () => {

    //use Nav
    const navigate = useNavigate();
    //dispatch
    const dispatch = useDispatch();

    const handleRequestLoginAPI = async (loginRequest) => {
        dispatch(setLoadingTrue());
        try {
            const response = await LoginAPI.fetchLoginAPI(loginRequest);
            handleLoginSuccess(response?.data?.token);
        } catch (error) {
            handleLoginError(error);
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    //LoginSuccess
    const handleLoginSuccess = (token) => {
        localStorage.setItem(ACCESS_TOKEN, token);
        const roleToken = jwtDecode(token)?.roles[0]?.authority;
        message.success("Đăng nhập thành công");
        redirectUser(roleToken);
    };

    //Login Error
    const handleLoginError = (error) => {
        message.error("Đăng nhập thất bại");
        if (error.response) {
            for (let errorMessage in error?.response?.data) {
                message.error(error?.response?.data[errorMessage]);
            }
        } else {
            console.error("Lỗi khi kết nối đến server:", error.message);
        }
    };

    //RedirectUser
    const redirectUser = (roleToken) => {
        switch (roleToken) {
            case ROLE_ADMIN:
                navigate(ROUTE_ADMIN_MANAGEMENT_WELCOME);
                break;
            case ROLE_ADMIN_AREA:
                navigate(ROUTE_ADMIN_AREA_MANAGEMENT_WELCOME);
                break;
            case ROLE_STAFF:
                navigate(ROUTE_STAFF_MANAGEMENT_WELCOME);
                break;
            default:
                console.warn("Role không hợp lệ:", roleToken);
        }
    };


    return {
        handleRequestLoginAPI
    }

}