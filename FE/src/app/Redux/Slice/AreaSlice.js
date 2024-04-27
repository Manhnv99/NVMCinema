import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    areaChange: false,
    listAreaGlobal: []
}

const AreaSlice = createSlice({
    name: "area",
    initialState: INITIAL_STATE,
    reducers: {
        setAreaChange: (state) => {
            state.areaChange = !state.areaChange
        },
        setListAreaGlobal: (state, action) => {
            state.listAreaGlobal = action.payload
        }
    },
});

export const { setAreaChange, setListAreaGlobal } = AreaSlice.actions;

export default AreaSlice.reducer;