import { SET_LIST_MOVIE_CONSTANT } from "../constant/movieConstant"


export const setListMovieAction = (payload) => {
    return {
        type: SET_LIST_MOVIE_CONSTANT,
        payload: payload
    }
}