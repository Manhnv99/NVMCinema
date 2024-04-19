import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    loading: false,
    statusLogin: 0
}

const LoadingSlice = createSlice({
    name: "loading",
    initialState: INITIAL_STATE,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true;
        },
        setLoadingFalse: (state) => {
            state.loading = false;
        },
        setStatusLogin: (state) => {
            state.statusLogin++
        }
    },
});

export const { setLoadingTrue, setLoadingFalse, setStatusLogin } = LoadingSlice.actions;

export default LoadingSlice.reducer;