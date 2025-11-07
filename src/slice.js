import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

// ✅ Register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("http://192.168.0.21:5000/api/users/register", payload);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

// ✅ Login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("http://192.168.0.21:5000/api/users/login", payload);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
