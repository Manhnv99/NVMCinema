import { AREA_CLIENT } from "../../app/Constant/TokenConstant";

export const isAreaExistInLocalStore = () => {
    if (localStorage.getItem(AREA_CLIENT) !== null) {
        return true;
    } else {
        return false;
    }
}

export const isTokenExistInLocalStore = () => {
    if (localStorage.getItem(AREA_CLIENT) !== null) {
        return true;
    } else {
        return false;
    }
}