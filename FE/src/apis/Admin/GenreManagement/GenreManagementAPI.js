import { URL_API_ADMIN_GENRE_MANAGEMENT } from "../../../app/BaseApi/BaseApi"
import { requestAPI } from "../../axiosCustomize"

export class GenreManagementAPI {

    static fetchPostGenre = (data) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_GENRE_MANAGEMENT + "/post-genre",
            data: data
        });
    };

    static fetchPutGenre = (data) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_GENRE_MANAGEMENT + "/put-genre",
            data: data
        });
    };

    static fetchDeleteGenre = (genreId) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_GENRE_MANAGEMENT + `/delete-genre/${genreId}`,
        });
    };

    static fetchListSearch = (inputSearch, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_GENRE_MANAGEMENT + "/get-search-genre",
            params: {
                inputSearch: inputSearch,
                page: page
            }
        });
    };

    static fetchDetailGenre = (genreId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_GENRE_MANAGEMENT + `/get-detail-genre/${genreId}`,
        });
    };

}