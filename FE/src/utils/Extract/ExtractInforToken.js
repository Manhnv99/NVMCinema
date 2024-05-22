import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../../app/Constant/TokenConstant";

export const ExtractInforToken = () => {
    return jwtDecode(localStorage.getItem(ACCESS_TOKEN));
}