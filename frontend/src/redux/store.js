import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import bookSlice from "./books/bookSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    book: bookSlice,
  },
});

export default store;
