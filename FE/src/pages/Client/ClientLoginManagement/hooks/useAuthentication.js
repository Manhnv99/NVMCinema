import { message } from "antd";
import { AuthenticationAPI } from "../../../../apis/Client/Authentication/AuthenticationAPI";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { useEffect, useState } from "react";


export const useAuthentication = () => {

    //state
    const [provinces, setProvinces] = useState([]);
    //dispatch
    const dispatch = useDispatch();

    const handleFetchRegister = async (registerRequest) => {
        dispatch(setLoadingTrue());
        try {
            const response = await AuthenticationAPI.fetchRegister(registerRequest);
            dispatch(setLoadingFalse());
            return response;
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchLogin = async (loginRequest) => {
        dispatch(setLoadingTrue());
        try {
            const response = await AuthenticationAPI.fetchLogin(loginRequest);
            dispatch(setLoadingFalse());
            return response;
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const handleFetchProvince = async () => {
        try {
            const response = await AuthenticationAPI.fetchProvince();
            setProvinces(response.data.results);
        } catch (e) {
            message.error("Không lấy được danh sách tỉnh thành phố!");
        }
    };

    useEffect(() => {
        handleFetchProvince();
    }, []);

    return {
        handleFetchLogin,
        handleFetchRegister,
        provinces
    }

};