import { URL_API_ADMIN_COMBO_FOOD_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize";


export class ComboFoodManagementAPI {

    static fetchPostComboFood = (data) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_COMBO_FOOD_MANAGEMENT,
            data: data
        });
    };

    static fetchPutComboFood = (data) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_COMBO_FOOD_MANAGEMENT,
            data: data
        });
    };

    static fetchDeleteComboFood = (comboFood) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_COMBO_FOOD_MANAGEMENT + `/${comboFood}`,
        });
    };

    static fetchListSearch = (inputSearch, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_COMBO_FOOD_MANAGEMENT,
            params: {
                inputSearch: inputSearch,
                page: page
            }
        });
    };

    static fetchDetailComboFood = (comboFood) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_COMBO_FOOD_MANAGEMENT + `/${comboFood}`,
        });
    };

}