import { jwtDecode } from "jwt-decode";

export const ExtractInforToken = () => {
    return jwtDecode(localStorage.getItem("token"));
}