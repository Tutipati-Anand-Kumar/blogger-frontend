import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import articleReducer from "./slices/articleSlice"
import friendReducer from "./slices/friendSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    friends: friendReducer,
  },
});

export default store
