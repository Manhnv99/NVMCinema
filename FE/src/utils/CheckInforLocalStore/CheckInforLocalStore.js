
export const isAreaExistInLocalStore = () => {
    if (localStorage.getItem("area") !== null) {
        return true;
    } else {
        return false;
    }
}

export const isTokenExistInLocalStore = () => {
    if (localStorage.getItem("token") !== null) {
        return true;
    } else {
        return false;
    }
}