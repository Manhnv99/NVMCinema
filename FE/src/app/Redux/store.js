import { configureStore } from "@reduxjs/toolkit";
import LoadingSlice from "./Slice/LoadingSlice";
import AreaSlice from "./Slice/AreaSlice";

export const store = configureStore({
    reducer: {
        loading: LoadingSlice,
        area: AreaSlice
    },
});