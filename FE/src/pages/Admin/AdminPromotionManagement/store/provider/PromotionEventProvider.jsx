import { useReducer } from "react"
import { PromotionEventContext } from "../context/context"
import { INITIAL_STATE, PromotionEventReducer } from "../reducers/PromotionEventReducer";


export const PromotionEventProvider = ({ children }) => {

    const [state, dispatch] = useReducer(PromotionEventReducer, INITIAL_STATE);

    return (
        <PromotionEventContext.Provider value={[state, dispatch]}>
            {children}
        </PromotionEventContext.Provider>
    )

}