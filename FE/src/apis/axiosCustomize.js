import axios from "axios";
import { baseURL } from "../app/BaseApi/BaseApi";
import { ADMIN_ROUTE_AUTHORIZATION, ADMIN_ROUTE_FORBIDDEN, ROUTE_CLIENT_ACCOUNT } from "../app/BaseUrl/BaseUrl";
import { AuthenticationAPI } from "./Client/Authentication/AuthenticationAPI";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../app/Constant/TokenConstant";

export const requestAPI = axios.create({
    baseURL: baseURL
});

export const requestAPIClient = axios.create({
    baseURL: baseURL
});

requestAPI.interceptors.request.use((config) => {
    let accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
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
            localStorage.removeItem(ACCESS_TOKEN);
            window.location.href = ADMIN_ROUTE_AUTHORIZATION;
        } else if (error.response && error.response.status === 403) {
            //redirect To Page 403
            window.location.href = ADMIN_ROUTE_FORBIDDEN;
        }
        throw error;
    }
);

requestAPIClient.interceptors.request.use((config) => {
    let accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
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
            localStorage.removeItem(ACCESS_TOKEN);
            window.location.href = ROUTE_CLIENT_ACCOUNT;
        } else if (error.response && error.response.status === 999 && !originalConfig._retry) {
            originalConfig._retry = true;
            const responseRefreshToken = await AuthenticationAPI.fetchRefreshToken();
            localStorage.setItem(ACCESS_TOKEN, responseRefreshToken.data.token);
            localStorage.setItem(REFRESH_TOKEN, responseRefreshToken.data.refreshToken);
            return requestAPIClient(originalConfig); //recall original API
        } else if (error.response && error.response.status === 403) {
            //redirect To Page 403
            window.location.href = ROUTE_CLIENT_ACCOUNT;
        }

        throw error;
    }
);