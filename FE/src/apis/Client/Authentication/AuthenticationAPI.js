import { URL_API_CLIENT_AUTHENTICATION } from "../../../app/BaseApi/BaseApi";
import { requestAPIClient } from "../../axiosCustomize";

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
            url: "https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100",
        });
    };

}