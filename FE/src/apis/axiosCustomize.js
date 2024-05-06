import axios from "axios";
import { baseURL } from "../app/BaseApi/BaseApi";
import { ADMIN_ROUTE_AUTHORIZATION, ADMIN_ROUTE_FORBIDDEN, ROUTE_CLIENT_ACCOUNT } from "../app/BaseUrl/BaseUrl";
import { AuthenticationAPI } from "./Client/Authentication/AuthenticationAPI";

export const requestAPI = axios.create({
    baseURL: baseURL
});

export const requestAPIClient = axios.create({
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
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            //redirect To Login
            //remove item from localStorage
            localStorage.removeItem("token");
            window.location.href = ADMIN_ROUTE_AUTHORIZATION;
        } else if (error.response && error.response.status === 403) {
            //redirect To Page 403
            window.location.href = ADMIN_ROUTE_FORBIDDEN;
        }
        throw error;
    }
);

requestAPIClient.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

requestAPIClient.interceptors.response.use(
    response => response,
    async error => {
        const originalConfig = error.config;
        if (error.response && error.response.status === 401) {
            //redirect To Login
            //remove item from localStorage
            localStorage.removeItem("token");
            window.location.href = ROUTE_CLIENT_ACCOUNT;
        } else if (error.response && error.response.status === 999 && !originalConfig._retry) {
            originalConfig._retry = true;
            const responseRefreshToken = await AuthenticationAPI.fetchRefreshToken();
            localStorage.setItem("token", responseRefreshToken.data.token);
            localStorage.setItem("refreshToken", responseRefreshToken.data.refreshToken);
            return requestAPIClient(originalConfig); //recall original API
        } else if (error.response && error.response.status === 403) {
            //redirect To Page 403
            window.location.href = ROUTE_CLIENT_ACCOUNT;
        }

        throw error;
    }
);