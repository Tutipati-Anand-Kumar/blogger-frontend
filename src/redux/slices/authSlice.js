import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  auth: null,
  status: "idle",
  error: null,
  isAuthenticated: !!localStorage.getItem("authtoken"), 
};

const BASE_URL = "http://192.168.0.37:5000/api/"

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}users/register`, payload);
      // console.log(data)
      localStorage.setItem('authtoken', data.token);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}users/login`, payload);
      localStorage.setItem('authtoken', data.token);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Login failed";
      // return rejectWithValue(message);
      return rejectWithValue(message || "");
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  localStorage.removeItem('token');
  dispatch(logout());
});

const authSlice= createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authToken");
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      }).addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.isAuthenticated = false; // ✅ mark logged out
        });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
