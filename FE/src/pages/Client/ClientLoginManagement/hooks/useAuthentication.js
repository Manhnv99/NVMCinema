import { AuthenticationAPI } from "../../../../apis/Client/Authentication/AuthenticationAPI";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { useEffect, useState } from "react";
import { messageErrResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";


export const useAuthentication = () => {

    //state
    const [provinces, setProvinces] = useState([]);
    //dispatch
    const dispatch = useDispatch();

    const handleFetchRegister = async (registerRequest) => {
        dispatch(setLoadingTrue());
        try {
            const response = await AuthenticationAPI.fetchRegister(registerRequest);
            return response;
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const handleFetchLogin = async (loginRequest) => {
        dispatch(setLoadingTrue());
        try {
            const response = await AuthenticationAPI.fetchLogin(loginRequest);
            return response;
        } catch (e) {
            for (let errMessage in e.response.data) {
                messageErrResponse(e.response.data[errMessage]);
            }
        } finally {
            dispatch(setLoadingFalse());
        }
    };

    const handleFetchProvince = async () => {
        setProvinces([]);
        // try {
        //     const response = await AuthenticationAPI.fetchProvince();
        //     setProvinces(response.data.results);
        // } catch (e) {
        //     messageErrResponse("Không lấy được danh sách tỉnh thành phố!");
        // }
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