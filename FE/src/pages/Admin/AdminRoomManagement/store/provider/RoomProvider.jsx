import { useReducer } from "react"
import { RoomContext } from "../context/context"
import { INITIAL_STATE, RoomReducer } from "../reducer/RoomReducer";

export const RoomProvider = ({ children }) => {

    const [state, dispatch] = useReducer(RoomReducer, INITIAL_STATE);

    return (
        <RoomContext.Provider value={[state, dispatch]}>
            {children}
        </RoomContext.Provider>
    )

}
