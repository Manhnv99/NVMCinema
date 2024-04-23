import { URL_API_CLIENT_HOME_PAGE } from "../../../app/BaseApi/BaseApi";
import { requestAPIClient } from "../../axiosCustomize"

export class HomePageAPI {

    static fetchListMovieCurrentShowing = (areaId) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_HOME_PAGE + `/list-movie-current-showing/${areaId}`
        });
    };

    static fetchListMoviePreTicket = (areaId) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_HOME_PAGE + `/list-movie-pre-ticket/${areaId}`
        });
    };

    static fetchListMovieUpComming = (areaId) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_HOME_PAGE + `/list-movie-upcoming/${areaId}`
        });
    };

    static fetchListArea = () => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_HOME_PAGE + "/list-area"
        });
    };

    static fetchDetailMovie = (movieId) => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_HOME_PAGE + `/detail-movie/${movieId}`
        })
    }

}