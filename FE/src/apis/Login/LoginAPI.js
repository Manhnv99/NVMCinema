import { URL_LOGIN_API } from "../../app/BaseApi/BaseApi"
import { requestAPI } from "../axiosCustomize"

export class LoginAPI {

    static fetchLoginAPI = (loginRequest) => {
        return requestAPI({
            method: "POST",
            data: loginRequest,
            url: URL_LOGIN_API
        });
    };

}