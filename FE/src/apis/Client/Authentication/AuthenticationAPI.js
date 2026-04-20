import axios from "axios";
import {URL_API_CLIENT_AUTHENTICATION, URL_API_CLIENT_INFORMATION_CLIENT} from "../../../app/BaseApi/BaseApi";
import { requestAPIClient } from "../../axiosCustomize";
import { ExtractInforToken } from "../../../utils/Extract/ExtractInforToken";

export class AuthenticationAPI {

    static fetchRegister = (registerRequest) => {
        return requestAPIClient({
            method: "POST",
            url: URL_API_CLIENT_AUTHENTICATION + `/register`,
            data: registerRequest
        });
    };

    static fetchLogin = (loginRequest) => {
        return requestAPIClient({
            method: "POST",
            url: URL_API_CLIENT_AUTHENTICATION + `/login`,
            data: loginRequest
        });
    };

    static fetchProvince = () => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_AUTHENTICATION + "/provinces",
        });
    };

    static fetchRefreshToken = () => {
        return axios.post("http://localhost:8080" + URL_API_CLIENT_AUTHENTICATION + "/refresh-token", {
            clientId: ExtractInforToken().id,
            refreshToken: localStorage.getItem("refreshToken")
        });
    }

}
