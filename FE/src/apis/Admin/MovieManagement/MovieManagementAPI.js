import { URL_API_ADMIN_MOVIE_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize";

export class MovieManagementAPI {

    static fetchListSearchMovie = (name, director, genre, format, country, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT,
            params: {
                name: name,
                director: director,
                genre: genre,
                format: format,
                country: country,
                page: page
            }
        });
    };

    static fetchGetOneMovie = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + `/one/${id}`
        });
    };

    static fetchDetailMovie = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + `/${id}`
        });
    };

    static fetchPostMovie = (postMovie) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT,
            data: postMovie
        });
    };

    static fetchPutMovie = (putMovie) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT,
            data: putMovie
        });
    };

    static fetchDeleteMovie = (id) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + `/${id}`,
        });
    }

    static fetchListCountry = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/countries"
        });
    };

    static fetchListDirector = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/directors"
        });
    };

    static fetchListGenre = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/genres"
        });
    };

    static fetchListFormat = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/formats"
        });
    };

}