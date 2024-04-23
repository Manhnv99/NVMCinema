import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    bookTicketProgress: 1
}

const BookTicketSlice = createSlice({
    name: "bookTicket",
    initialState: INITIAL_STATE,
    reducers: {
        setBookTicketProgress: (state, action) => {
            state.bookTicketProgress = action.payload;
        }
    }
});

export const { setBookTicketProgress } = BookTicketSlice.actions;

export default BookTicketSlice.reducer;