import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  user: null,
  isAuthenticated: false,
  registerLoading: true,
  isRegister: false,
  loginLoading: false,
  userLoading: true,
  isError: null,
};

//async register user
export const registerUser = createAsyncThunk(
  "users/register",
  async (user, thunkAPI) => {
    try {
      let res = await axios.post("/api/users/register", user);
      return res.data;
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//async login user
export const loginUser = createAsyncThunk(
  "users/login",
  async (user, thunkAPI) => {
    try {
      let res = await axios.post("/api/users/login", user);
      return res.data;
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//async account verify
export const authUser = createAsyncThunk("users/auth", async (_, thunkAPI) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    let res = await axios.get("/api/users/auth");
    return res.data;
  } catch (error) {
    const message = error.response.data.error;
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerLoading = false;
        state.isRegister = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerLoading = false;
        state.isRegister = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.loginLoading = false;
        state.isAuthenticated = true;
        state.isError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.isAuthenticated = false;
        state.isError = action.payload;
      })
      .addCase(authUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(authUser.rejected, (state) => {
        state.userLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
