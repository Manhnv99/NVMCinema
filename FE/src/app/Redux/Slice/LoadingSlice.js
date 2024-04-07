import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    loading: false,
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
        }
    },
});

export const { setLoadingTrue, setLoadingFalse } = LoadingSlice.actions;

export default LoadingSlice.reducer;