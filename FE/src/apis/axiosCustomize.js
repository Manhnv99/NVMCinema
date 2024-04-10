import axios from "axios";
import { baseURL } from "../app/BaseApi/BaseApi";
import { ROUTE_AUTHORIZATION, ROUTE_FORBIDDEN } from "../app/BaseUrl/BaseUrl";


export const requestAPI = axios.create({
    baseURL: baseURL
});

requestAPI.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
            //remove item from localStorage
            localStorage.removeItem("token");
            window.location.href = ROUTE_AUTHORIZATION;
        } else if (error.response && error.response.status === 403) {
            //redirect To Page 403
            window.location.href = ROUTE_FORBIDDEN;
        }

        throw error;
    }
);