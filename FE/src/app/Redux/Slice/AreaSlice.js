import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    areaChange: false,
    listAreaGlobal: [],
    textAreaGlobal: "Khu vực"
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
        },
        setTextAreaGlobal: (state, action) => {
            state.textAreaGlobal = action.payload
        }
    },
});

export const { setAreaChange, setListAreaGlobal, setTextAreaGlobal } = AreaSlice.actions;

export default AreaSlice.reducer;