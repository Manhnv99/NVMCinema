import { OrderContext } from "../context/context";
import { INITIAL_STATE, OrderReducer } from "../reducers/OrderReduder";
import { useReducer } from "react";


export const OrderProvider = ({ children }) => {

    const [state, dispatch] = useReducer(OrderReducer, INITIAL_STATE);

    return (
        <OrderContext.Provider value={[state, dispatch]}>
            {children}
        </OrderContext.Provider>
    )
};