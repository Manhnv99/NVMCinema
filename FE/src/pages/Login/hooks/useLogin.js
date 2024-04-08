import { LoginAPI } from "../../../apis/Login/LoginAPI";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE_MANAGEMENT_WELCOME } from "../../../app/BaseUrl/BaseUrl";

export const useLogin = () => {

    const navigate = useNavigate();


    const handleRequestLoginAPI = async (loginRequest) => {
        try {
            const response = await LoginAPI.fetchLoginAPI(loginRequest);
            console.log(response);
            //set Token to localStorage
            localStorage.setItem("token", response.data.token);
            //show message login success
            message.success(response.data.message);
            //redirect to admin page
            navigate(ROUTE_MANAGEMENT_WELCOME);
        } catch (e) {
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