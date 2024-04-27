import { URL_API_CLIENT_HOME_PAGE } from "../../../app/BaseApi/BaseApi";
import { requestAPIClient } from "../../axiosCustomize"

export class HomePageAPI {

    static fetchListMovieCurrentShowing = () => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_HOME_PAGE + `/list-movie-current-showing`
        });
    };

    static fetchListMoviePreTicket = () => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_HOME_PAGE + `/list-movie-pre-ticket`
        });
    };

    static fetchListMovieUpComming = () => {
        return requestAPIClient({
            method: "GET",
            url: URL_API_CLIENT_HOME_PAGE + `/list-movie-upcoming`
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