import { useReducer } from "react"
import { StaffContext } from "../context/context"
import { INITIAL_STATE, StaffReducer } from "../reducers/StaffReducer";


export const StaffProvider = ({ children }) => {
    const [state, dispatch] = useReducer(StaffReducer, INITIAL_STATE);

    return (
        <StaffContext.Provider value={[state, dispatch]}>
            {children}
        </StaffContext.Provider>
    )

}