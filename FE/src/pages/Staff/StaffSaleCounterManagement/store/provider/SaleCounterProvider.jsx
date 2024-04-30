import { useReducer } from "react"
import { SaleCounterContext } from "../context/context"
import {
    INITIAL_STATE,
    SaleCounterReducer
} from "../reducers/SaleCounterReducers";


export const SaleCounterProvider = ({ children }) => {

    const [state, dispatch] = useReducer(SaleCounterReducer, INITIAL_STATE);

    return (
        <>
            <SaleCounterContext.Provider value={[state, dispatch]}>
                {children}
            </SaleCounterContext.Provider>
        </>
    )

}