// redux/slices/friendSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Send friend request
export const sendFriendRequest = createAsyncThunk(
  "friends/sendRequest",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`users/${userId}/friend-request`);
      return { userId, ...data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send request");
    }
  }
);

const friendSlice = createSlice({
  name: "friends",
  initialState: {
    requests: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendFriendRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.requests.push(action.payload.userId);
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default friendSlice.reducer;
