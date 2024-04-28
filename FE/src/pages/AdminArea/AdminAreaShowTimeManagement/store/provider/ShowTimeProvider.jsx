import { useReducer } from "react"
import { ShowTimeContext } from "../context/context"
import { INITIAL_STATE, showTimeReducer } from "../reducers/showTimeReducer";

export const ShowTimeProvider = ({ children }) => {

    const [state, dispatch] = useReducer(showTimeReducer, INITIAL_STATE);

    return (
        <ShowTimeContext.Provider value={[state, dispatch]}>
            {children}
        </ShowTimeContext.Provider>
    )
}