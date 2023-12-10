import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bookList: [],
  bookLoading: true,
  newBookLoading: false,
};

//async add new book
export const newBook = createAsyncThunk("books/add", async (book, thunkAPI) => {
  try {
    let res = await axios.post("/api/book/addbook", book);
    return res.data;
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

//async load books
export const loadBooks = createAsyncThunk("books/load", async (_, thunkAPI) => {
  try {
    let res = await axios.get("/api/book/getbooks");
    return res.data;
  } catch (error) {
    const message = error.response.data.customMessage;
    return thunkAPI.rejectWithValue(message);
  }
});

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.bookLoading = true;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.bookLoading = false;
        state.bookList = action.payload.books.reverse();
      })
      .addCase(loadBooks.rejected, (state) => {
        state.bookLoading = false;
        state.bookList = [];
      })
      .addCase(newBook.pending, (state) => {
        state.newBookLoading = true;
      })
      .addCase(newBook.fulfilled, (state, action) => {
        state.newBookLoading = false;
        state.bookList = [action.payload.newBook, ...state.bookList];
      })
      .addCase(newBook.rejected, (state) => {
        state.newBookLoading = false;
        state.bookList = [];
      });
  },
});

export default bookSlice.reducer;
