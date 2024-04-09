import { useReducer } from "react"
import { MovieContext } from "../context/context"
import { INITIAL_STATE, movieReducers } from "../reducers/movieReducers";


export const MovieProvider = ({ children }) => {

    const [state, dispatch] = useReducer(movieReducers, INITIAL_STATE);

    return (
        <MovieContext.Provider value={[state, dispatch]}>
            {children}
        </MovieContext.Provider>
    )

}