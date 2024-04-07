import axios from "axios";
import { baseURL } from "../app/BaseApi/BaseApi";


export const requestAPI = axios.create({
    baseURL: baseURL
});

requestAPI.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        //redirect To Error Page
    }
    return config;
});

requestAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            //redirect To Login
            //remove Cookie
        } else if (error.response && error.response.status === 403) {
            //redirect To Page 403
        }

        throw error;
    }
);