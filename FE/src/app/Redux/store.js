import { configureStore } from "@reduxjs/toolkit";
import LoadingSlice from "./Slice/LoadingSlice";

export const store = configureStore({
    reducer: {
        loading: LoadingSlice
    },
});