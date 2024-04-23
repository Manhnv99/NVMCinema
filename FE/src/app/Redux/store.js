import { configureStore } from "@reduxjs/toolkit";
import LoadingSlice from "./Slice/LoadingSlice";
import AreaSlice from "./Slice/AreaSlice";
import BookTicketSlice from "./Slice/BookTicketSlice";

export const store = configureStore({
    reducer: {
        loading: LoadingSlice,
        area: AreaSlice,
        bookTicket: BookTicketSlice
    },
});