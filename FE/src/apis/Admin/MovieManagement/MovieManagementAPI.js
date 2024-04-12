import { URL_API_ADMIN_MOVIE_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize";

export class MovieManagementAPI {

    static fetchListSearchMovie = (name, director, genre, format, country, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/get-search-movie",
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
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + `/get-one-movie/${id}`
        });
    };

    static fetchDetailMovie = (id) => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + `/get-detail-movie/${id}`
        });
    };

    static fetchPostMovie = (postMovie) => {
        return requestAPI({
            method: "POST",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/post-movie",
            data: postMovie
        });
    };

    static fetchPutMovie = (putMovie) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/put-movie",
            data: putMovie
        });
    };

    static fetchDeleteMovie = (id) => {
        return requestAPI({
            method: "DELETE",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + `/delete-movie/${id}`,
        });
    }

    static fetchListCountry = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/get-list-country"
        });
    };

    static fetchListDirector = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/get-list-director"
        });
    };

    static fetchListGenre = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/get-list-genre"
        });
    };

    static fetchListFormat = () => {
        return requestAPI({
            method: "GET",
            url: URL_API_ADMIN_MOVIE_MANAGEMENT + "/get-list-format"
        });
    };

}